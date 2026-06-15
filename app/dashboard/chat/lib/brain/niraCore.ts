import { getEmbeddingProvider } from "./rag/embedder";
import { vectorStore } from "./rag/vectorStore";
import { buildDynamicContext } from "./contextBuilder";
import { detectIntent } from "./intentEngine";
import { executeReasoningPipeline } from "./reasoningEngine";
import { retrieveSupabaseMemories } from "./supabase/supabaseMemoryStorage";
import { buildUserProfile } from "./userUnderstandingEngine";

import { MemoryItem } from "./memoryTypes";

export interface NiraBrainOutput {
  finalInput: string;
  intent: string;
  plan: any;
  responseMode: string;
  mode: string;
  suggestions: string[];
  language: string;
  emotions: string[];
  primaryEmotion: string;
  debug: object;
}

export async function buildNiraInput(
  userInput: string,
  messages: any[] = [],
  userId?: string,
  projectId?: string
): Promise<NiraBrainOutput> {
  const cleanInput = userInput.trim();
  
  // 1. Intent & Reasoning Detection
  const { intent, domain, responseMode, containsMath } = detectIntent(cleanInput, "normal");
  const reasoning = executeReasoningPipeline(cleanInput, intent, "normal", []);

  // 2. Persistent Memory Retrieval (Phase 11)
  // Retrieve top 10 relevant memories from Supabase
  let rawMemories: MemoryItem[] = [];
  if (userId) {
    try {
      rawMemories = await retrieveSupabaseMemories(cleanInput, userId, projectId, 10);
    } catch (err) {
      console.error("Memory retrieval error:", err);
    }
  }

  // 3. User Understanding (Phase 8)
  const userProfile = buildUserProfile(rawMemories);

  // 4. Memory Segregation
  const projectMemories = rawMemories.filter(m => m.memoryType === "project");
  const permanentMemories = rawMemories.filter(m => m.memoryType === "permanent");
  const ltcMemories = rawMemories.filter(m => m.memoryType === "long_term_context");
  const sessionMemories = rawMemories.filter(m => m.memoryType === "session");

  // 5. RAG Pipeline (Phase 10)
  const embedder = getEmbeddingProvider();
  let ragChunks: string[] = [];
  if (userId) {
    try {
      const queryVector = await embedder.embedText(cleanInput);
      const ragResults = await vectorStore.query(queryVector, 5, userId, projectId);
      ragChunks = ragResults.map(r => r.chunk.text);
    } catch (err) {
      console.error("RAG retrieval error:", err);
    }
  }

  // 6. Context Builder
  const memoryContextText = buildDynamicContext(
    { 
      workingStyle: userProfile.workingStyle, 
      goals: userProfile.goals, 
      interests: userProfile.interests, 
      preferences: userProfile.preferences, 
    },
    projectId ? { name: "Active Project", status: "active", files: [], analysis: "", tone: "professional" } : null,
    permanentMemories,
    ltcMemories,
    [...projectMemories, ...sessionMemories],
    ragChunks.map(c => ({ text: c } as any))
  );

  // 7. Conversation History
  const contextLimit = 6;
  const context = messages
    .slice(-contextLimit)
    .map((m) =>
      m.role === "user"
        ? `User: ${m.content}`
        : `Assistant: ${m.content}`
    )
    .join("\n");

  // 8. Final Prompt Assembly
  const humanInput = `
${context ? `Conversation:\n${context}\n\n` : ""}
${memoryContextText ? `${memoryContextText}\n\n` : ""}

[Reasoning Directive: ${reasoning.reasoningPrompt}]

User:
${cleanInput}
`;

  return {
    finalInput: humanInput,
    intent: intent,
    plan: { type: reasoning.mode, level: reasoning.reasoningLevel },
    responseMode: responseMode,
    mode: reasoning.mode,
    suggestions: [],
    language: "en",
    emotions: ["normal"],
    primaryEmotion: "normal",
    debug: { memoryCount: rawMemories.length, ragCount: ragChunks.length }
  };
}
