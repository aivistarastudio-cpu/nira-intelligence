import { MemoryItem } from "./memoryTypes";
import { UserProfile } from "./userUnderstandingEngine";
import { ProjectContext } from "./projectAwarenessEngine";
import type { DocumentChunk } from "./rag/chunker";

const MAX_CONTEXT_TOKENS = 8000;
const CHARS_PER_TOKEN = 4; // Approx
const MAX_CONTEXT_CHARS = MAX_CONTEXT_TOKENS * CHARS_PER_TOKEN;

export function buildDynamicContext(
  userProfile: UserProfile,
  projectContext: ProjectContext | null,
  permanentMemories: MemoryItem[],
  longTermContextMemories: MemoryItem[],
  sessionMemories: MemoryItem[],
  ragChunks: DocumentChunk[] = []
): string {
  let contextParts: string[] = [];
  let currentChars = 0;

  const addPart = (title: string, content: string) => {
    const formatted = `\n[${title}]\n${content}`;
    if (currentChars + formatted.length <= MAX_CONTEXT_CHARS) {
      contextParts.push(formatted);
      currentChars += formatted.length;
      return true;
    }
    return false;
  };

  // 1. User Profile (Highest Priority)
  let profileContent = "";
  if (userProfile.workingStyle.length) profileContent += `- Working Style: ${userProfile.workingStyle.join(", ")}\n`;
  if (userProfile.goals.length) profileContent += `- Goals: ${userProfile.goals.join(", ")}\n`;
  if (userProfile.interests.length) profileContent += `- Interests: ${userProfile.interests.join(", ")}\n`;
  if (userProfile.preferences.length) profileContent += `- Core Preferences: ${userProfile.preferences.join(", ")}\n`;
  
  if (profileContent) {
    addPart("USER PROFILE", profileContent.trim());
  }

  // 2. Project Awareness (Second Priority)
  if (projectContext && projectContext.projectId) {
    let projContent = `- Project: ${projectContext.projectName}\n`;
    if (projectContext.description) projContent += `- Description: ${projectContext.description}\n`;
    if (projectContext.currentPhase) projContent += `- Phase: ${projectContext.currentPhase}\n`;
    if (projectContext.architectureDecisions.length) projContent += `- Architecture: ${projectContext.architectureDecisions.join(" | ")}\n`;
    if (projectContext.roadmap.length) projContent += `- Roadmap: ${projectContext.roadmap.join(" | ")}\n`;
    if (projectContext.activeTasks.length) projContent += `- Active Tasks: ${projectContext.activeTasks.join(" | ")}\n`;
    if (projectContext.importantDecisions.length) projContent += `- Key Decisions: ${projectContext.importantDecisions.join(" | ")}\n`;

    addPart("ACTIVE PROJECT CONTEXT", projContent.trim());
  }

  // 3. Permanent Memories (Third Priority)
  // Deduplicate against profile to save tokens
  const profileSet = new Set([
    ...userProfile.preferences, ...userProfile.goals, ...userProfile.workingStyle, ...userProfile.interests
  ]);
  const uniquePermanent = permanentMemories.filter(m => !profileSet.has(m.compressedText));
  if (uniquePermanent.length > 0) {
    const permLines = uniquePermanent.map(m => `- ${m.compressedText}`).join("\n");
    addPart("PERMANENT MEMORIES", permLines);
  }

  // 3.5 Long-Term Context
  const uniqueLtc = longTermContextMemories.filter(m => !profileSet.has(m.compressedText));
  if (uniqueLtc.length > 0) {
    const ltcLines = uniqueLtc.map(m => `- ${m.compressedText}`).join("\n");
    addPart("RECENT CONTEXT (LONG-TERM)", ltcLines);
  }

  // 4. RAG Document Chunks (High density context)
  if (ragChunks.length > 0) {
    let ragContent = "";
    for (let i = 0; i < ragChunks.length; i++) {
      const chunk = ragChunks[i];
      const chunkText = `--- Source ${i + 1} | Document: [${chunk.documentName}] | Page: [${chunk.pageNumber}] ---\n${chunk.text}\n\n`;
      if (currentChars + ragContent.length + chunkText.length < MAX_CONTEXT_CHARS - 500) {
        ragContent += chunkText;
      } else {
        break; // Stop if adding this chunk would exceed the LLM context limits
      }
    }
    
    if (ragContent) {
      addPart(
        "RAG KNOWLEDGE BASE",
        `${ragContent.trim()}\n\n[INSTRUCTION: When answering based on the above knowledge base, you MUST explicitly cite the document name and page number (e.g., 'According to [Report.pdf, Page 4]...').]`
      );
    }
  }

  // 4. Session Memories (Lowest Priority, truncates safely)
  if (sessionMemories.length > 0) {
    // Sort session memories by importance and recency
    const sortedSession = [...sessionMemories].sort((a, b) => b.importance - a.importance || b.timestamp - a.timestamp);
    let sessionContent = "";
    for (const mem of sortedSession) {
      const line = `- ${mem.compressedText}\n`;
      if (currentChars + sessionContent.length + line.length < MAX_CONTEXT_CHARS - 50) {
        sessionContent += line;
      } else {
        sessionContent += `- [...truncated to preserve budget]`;
        break;
      }
    }
    if (sessionContent) {
      addPart("SESSION MEMORIES", sessionContent.trim());
    }
  }

  return contextParts.join("\n");
}
