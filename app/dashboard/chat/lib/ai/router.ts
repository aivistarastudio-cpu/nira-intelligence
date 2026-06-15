import { callOpenAI } from "./openai";
import { callGemini } from "./gemini";
import { AIResponse } from "./types";
import { MemoryItem } from "../brain/memoryTypes";
import { buildNiraInput } from "../brain/niraCore";
import { Part } from "@google/generative-ai";
import { Buffer } from "buffer";
import { loadMemories, saveMemories } from "../brain/memoryStorage";
import { retrieveMemories } from "../brain/memoryRetrieval";
import { analyzeMemory, detectContradictionsAndMerge } from "../brain/memoryReasoner";
import { fuseOutputs } from "./fusionEngine";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ResponseMode =
  | "solution"
  | "explanation";

interface ParsedInput {
  type?: "image" | "file" | "text";
  query?: string;
  content?: string;
}

export async function callAI(
  input: string,
  history: Message[] = [],
  files: File[] = [],
  userId?: string,
  projectId?: string
): Promise<
  AIResponse & {
    intent: string;
    plan: unknown;
    debug?: unknown;
    suggestions?: unknown;
    responseMode: ResponseMode;
  }
> {
  const safeHistory =
    history.slice(-8);

  /* =============================
     🖼️ VISION / NATIVE PDF ROUTE
  ============================= */
  const imageFiles = files.filter((f) => f && f.type && f.type.startsWith("image/"));
  const pdfFiles = files.filter((f) => f && f.type === "application/pdf");
  
  if (pdfFiles.length > 0) {
    try {
      const validFiles = files.filter(f => f && (f.type === "application/pdf" || f.type.startsWith("image/")));
      const geminiParts: any[] = await Promise.all(
        validFiles.map(async (file) => {
          const bytes = await file.arrayBuffer();
          return {
            inlineData: {
              data: Buffer.from(bytes).toString("base64"),
              mimeType: file.type,
            },
          };
        })
      );

      const geminiInput = [
        input,
        ...geminiParts,
      ];

      const res = await callGemini(geminiInput, safeHistory);

      return {
        text: res.text,
        provider: "gemini",
        model: res.model,
        intent: "multimodal-document",
        plan: {},
        responseMode: "explanation",
        suggestions: [],
      };
    } catch (err: any) {
      console.error("❌ NATIVE PDF ROUTE ERROR:", err);
      // Let it fall through to RAG logic if native processing fails
    }
  }
  
  if (imageFiles.length > 0 && pdfFiles.length === 0) {
    try {
      const imageParts: any[] = await Promise.all(
        imageFiles.map(async (file) => {
          const bytes = await file.arrayBuffer();
          return {
            type: "image_url",
            image_url: {
              url: `data:${file.type};base64,${Buffer.from(bytes).toString("base64")}`,
            },
          };
        })
      );

      // GPT-4o-mini Vision Array
      const openAiInput = [
        { type: "text", text: input },
        ...imageParts,
      ];

      const res = await callOpenAI(openAiInput, safeHistory);

      return {
        text: res.text,
        provider: "openai",
        model: res.model,
        intent: files.length > imageFiles.length ? "multimodal" : "vision",
        plan: {},
        responseMode: "explanation",
        suggestions: [],
      };
    } catch (err: any) {
      console.error("❌ VISION ROUTE ERROR:", err);
      return {
        text: `Vision Error Debug: ${err.message || String(err)}\nPlease show this to the developer.`,
        provider: "system",
        model: "error",
        intent: "error",
        plan: {},
        responseMode: "explanation",
        suggestions: [],
      };
    }
  }

  /* =============================
     🧠 MEMORY V11 (SUPABASE RETRIEVAL & INJECTION)
  ============================= */
  
  // 1. Active Project Context
  // In a real frontend this would be passed in the `callAI` function args.
  // We mock the frontend context hydration here:
  const activeProjectId = undefined; 
  
  // 2. Retrieve Memory (Supabase pgvector with Priority Scoring)
  const { retrieveSupabaseMemories, saveToSupabase } = require("../brain/supabase/supabaseMemoryStorage");
  const retrievedMemories = await retrieveSupabaseMemories(input, activeProjectId, 10);
  
  const memoryContext = retrievedMemories.map((m: any) => m.compressedText).join("\n");
  
  // 3. Inject into finalInput payload boundary
  let memoryHeader = "";
  if (memoryContext) {
     memoryHeader = `[USER KNOWLEDGE BASE]\n${memoryContext}\n\n`;
  }
  
  // 4. Analyze new memory and asynchronously save to Supabase
  // We use the same analyzer logic but write to the new DB
  const newMemoryResult = analyzeMemory(input, []); // empty array because merging happens in Supabase via semantic search
  if (newMemoryResult.shouldRemember && userId) {
     const newMem: MemoryItem = {
        id: Math.random().toString(36).substring(7),
        rawText: newMemoryResult.rawText,
        compressedText: newMemoryResult.compressedText,
        topic: newMemoryResult.primaryTopic,
        importance: newMemoryResult.importance,
        timestamp: Date.now(),
        priority: newMemoryResult.priority,
        memoryType: newMemoryResult.memoryType,
        projectId: projectId,
        decayRate: newMemoryResult.decayRate,
        memoryStrength: newMemoryResult.memoryStrength
     };
     
     // Save asynchronously so we don't block the chat response
     saveToSupabase(newMem, userId, "chat").catch(console.error);
  }

  /* =============================
     🧠 NIRA BRAIN
  ============================= */

  const nira =
    await buildNiraInput(
      input,
      safeHistory,
      userId,
      projectId
    );

  let {
    finalInput,
    intent,
    plan,
    suggestions,
    debug,
    responseMode,
  } = nira;

  finalInput = memoryHeader + finalInput;

  const safeResponseMode: ResponseMode =
    responseMode === "solution"
      ? "solution"
      : "explanation";

  let response: AIResponse | null =
    null;

  let providerUsed:
    | "openai"
    | "gemini" = "gemini";

  let modelUsed = "";

  try {
    /* =============================
       🔀 SMART ROUTING V2 (Orchestrator)
    ============================= */
    let routingMode: "LIGHT" | "STANDARD" | "ADVANCED" | "COLLABORATIVE" = "STANDARD";

    const inputLength = finalInput.length;
    if (intent === "casual" || intent === "greeting" || intent === "acknowledgment" || (inputLength < 500 && intent !== "code")) {
      routingMode = "LIGHT";
    } else if (files && files.length > 0 || intent === "code" || intent === "math") {
      routingMode = "ADVANCED";
    } else if (
      (intent === "business" || intent === "architecture" || intent === "planning" || intent === "design") &&
      inputLength > 100
    ) {
      routingMode = "COLLABORATIVE";
    }

    // Heuristic confidence calculation based on domain strengths
    const calculateConfidence = (provider: "openai" | "gemini", mode: string, text: string) => {
      let score = 80;
      if (provider === "openai" && (intent === "code" || intent === "architecture" || intent === "math")) score += 15;
      if (provider === "gemini" && (intent === "creative" || intent === "writing" || intent === "brainstorming")) score += 15;
      if (text.length > 500) score += 5;
      return Math.min(score, 99);
    };

    if (routingMode === "LIGHT") {
      try {
        response = await callGemini(finalInput, safeHistory);
        providerUsed = "gemini";
      } catch (err) {
        console.warn("Gemini failed in LIGHT mode, falling back to OpenAI:", err);
        response = await callOpenAI(finalInput, safeHistory);
        providerUsed = "openai";
      }
    } else if (routingMode === "ADVANCED") {
      response = await callOpenAI(finalInput, safeHistory);
      providerUsed = "openai";
    } else if (routingMode === "COLLABORATIVE") {
      // Prompt modifications for Collaboration
      const geminiInput = finalInput + "\n\n[SYSTEM RULE: Focus heavily on creativity, lateral exploration, and alternative approaches.]";
      const openaiInput = finalInput + "\n\n[SYSTEM RULE: Focus heavily on rigid reasoning, trade-offs, and execution strategy.]";

      const [geminiRes, openaiRes] = await Promise.all([
        callGemini(geminiInput, safeHistory).catch(e => ({ text: "", model: "error", provider: "gemini" as const })),
        callOpenAI(openaiInput, safeHistory).catch(e => ({ text: "", model: "error", provider: "openai" as const }))
      ]);

      const gConf = calculateConfidence("gemini", routingMode, geminiRes.text);
      const oConf = calculateConfidence("openai", routingMode, openaiRes.text);

      const fusedText = fuseOutputs(geminiRes.text, openaiRes.text, gConf, oConf);

      response = { text: fusedText, model: "multi_model_fusion_v1", provider: "openai" };
      providerUsed = "openai"; // Anchor for metadata
    } else {
      // STANDARD - dynamic fallback
      if (inputLength < 1500) {
        try {
          response = await callGemini(finalInput, safeHistory);
          providerUsed = "gemini";
        } catch (err) {
          console.warn("Gemini failed in STANDARD mode, falling back to OpenAI:", err);
          response = await callOpenAI(finalInput, safeHistory);
          providerUsed = "openai";
        }
      } else {
        response = await callOpenAI(finalInput, safeHistory);
        providerUsed = "openai";
      }
    }

    modelUsed =
      response?.model ||
      providerUsed;

    return {
      intent,

      plan,

      responseMode:
        safeResponseMode,

      suggestions,

      debug,

      provider:
        providerUsed,

      model: modelUsed,

      text:
        response?.text?.trim() ||
        "",
    };
  } catch (err) {
    console.error(
      "❌ ROUTER ERROR:",
      err
    );

    return {
      text:
        "Something went wrong 😅",

      model: "error",

      provider: "system",

      intent,

      plan,

      responseMode:
        safeResponseMode,

      debug,
    };
  }
}