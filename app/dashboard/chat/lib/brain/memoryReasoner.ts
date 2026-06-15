import { MemoryItem, MemoryCategory, MemoryReasonerResult } from "./memoryTypes";

const NOISE_PATTERN = /^(hi|hello|hey|yo|ok|okay|thanks|thank you|lol|good|great|yes|no|hmm|bro|dude|nice|perfect|cool|test)$/i;
const PROJECT_PATTERNS = /\b(project|repository|repo|codebase|app|website|architecture)\b/i;
const PERMANENT_PATTERNS = /\b(permanent|permanently|never\s+forget|always\s+remember|forever|my\s+name|i\s+prefer|i\s+like|i\s+hate|i\s+love)\b/i;
const SESSION_PATTERNS = /\b(session|this\s+chat|for\s+now|temporary|temp|fix\s+this|bug|error)\b/i;

export function compressMemoryText(rawText: string): string {
  let compressed = rawText.replace(/^(can you|could you|please|i want to|i need to|i think|maybe we should|what if we|tell me|explain|actually|changed my mind)\s+/gi, "");
  compressed = compressed.replace(/i am building a|i'm building a/gi, "Building:");
  compressed = compressed.replace(/i prefer|i like|i love/gi, "Preference:");
  compressed = compressed.replace(/i hate|i dislike/gi, "Dislikes:");
  compressed = compressed.replace(/my name is/gi, "Name:");
  compressed = compressed.trim();
  return compressed.charAt(0).toUpperCase() + compressed.slice(1);
}

export function detectContradictionsAndMerge(newMemory: MemoryItem, existingMemories: MemoryItem[]): { memories: MemoryItem[], action: "merged" | "added" | "superseded" | "discarded" } {
  let memories = [...existingMemories];
  
  newMemory.status = "active"; // Ensure new memory defaults to active

  for (let i = 0; i < memories.length; i++) {
    const mem = memories[i];
    
    // Exact Match (Discard new, keep old active)
    if (mem.compressedText.toLowerCase() === newMemory.compressedText.toLowerCase() && mem.status !== "superseded") {
      mem.timestamp = Date.now(); // Bump timestamp
      return { memories, action: "discarded" };
    }
    
    // Contradiction on Name
    if (newMemory.compressedText.startsWith("Name:") && mem.compressedText.startsWith("Name:") && mem.status !== "superseded") {
       memories[i].status = "superseded";
       memories.push(newMemory);
       return { memories, action: "superseded" };
    }
    
    // Contradiction on preferences/dislikes over same subject
    const isNewPref = newMemory.compressedText.startsWith("Preference:") || newMemory.compressedText.startsWith("Dislikes:");
    const isOldPref = mem.compressedText.startsWith("Preference:") || mem.compressedText.startsWith("Dislikes:");
    if (isNewPref && isOldPref && mem.status !== "superseded") {
       const subjectNew = newMemory.compressedText.replace(/^(Preference:|Dislikes:)\s*/, "").toLowerCase();
       const subjectOld = mem.compressedText.replace(/^(Preference:|Dislikes:)\s*/, "").toLowerCase();
       if (calculateSimilarity(subjectNew, subjectOld) > 0.6) {
          memories[i].status = "superseded";
          memories.push(newMemory);
          return { memories, action: "superseded" };
       }
    }
    
    // High similarity (Merge)
    if (calculateSimilarity(newMemory.rawText, mem.rawText || mem.content || "") > 0.85 && mem.status !== "superseded") {
      memories[i].timestamp = Date.now();
      memories[i].importance = Math.min(100, memories[i].importance + 10);
      return { memories, action: "merged" };
    }
  }

  memories.push(newMemory);
  return { memories, action: "added" };
}

function calculateSimilarity(str1: string, str2: string): number {
  const words1 = new Set(str1.toLowerCase().split(/[\s,.]+/).filter(w => w.length > 2));
  const words2 = str2.toLowerCase().split(/[\s,.]+/).filter(w => w.length > 2);
  if (words1.size === 0 || words2.length === 0) return 0;
  let matches = 0;
  for (const w of words2) {
    if (words1.has(w)) matches++;
  }
  return matches / Math.max(words1.size, words2.length);
}

export function analyzeMemory(
  input: string | null | undefined,
  existingMemories: MemoryItem[] = []
): MemoryReasonerResult {
  if (!input) return createEmptyResult();
  const clean = input.trim();
  const lower = clean.toLowerCase();
  if (clean.length < 6 || NOISE_PATTERN.test(lower)) return createEmptyResult();

  let memoryType: "session" | "long_term_context" | "permanent" | "project" | "ignore" = "long_term_context";
  let decayRate = 0.05;

  if (clean.length < 6 || NOISE_PATTERN.test(lower) || ["hello", "hi", "hey", "thanks", "ok", "yes", "no"].includes(lower)) {
    return createEmptyResult(); // Inherently IGNORE
  }

  const TRANSIENT_PATTERNS = /tired|stressed|busy|exhausted|sick|hungry|angry|sad/i;

  if (PROJECT_PATTERNS.test(lower) || lower.includes("in this codebase")) {
    memoryType = "project";
    decayRate = 0.0;
  } else if (PERMANENT_PATTERNS.test(lower) && !TRANSIENT_PATTERNS.test(lower)) {
    // True durable facts
    memoryType = "permanent";
    decayRate = 0.0;
  } else if (TRANSIENT_PATTERNS.test(lower) || lower.includes("remember") || lower.includes("save")) {
    // Temporary personal context
    memoryType = "long_term_context";
    decayRate = 0.1;
  } else if (SESSION_PATTERNS.test(lower) || clean.length < 15) {
    memoryType = "session";
    decayRate = 0.2;
  }

  let baseImportance = 0;
  if (memoryType === "permanent") baseImportance = 95;
  else if (memoryType === "project") baseImportance = 90;
  else if (memoryType === "long_term_context") baseImportance = 60;
  else if (memoryType === "session") baseImportance = 30;

  const compressedText = compressMemoryText(clean);

  return {
    shouldRemember: true,
    memoryType,
    importance: baseImportance,
    priority: baseImportance >= 85 ? "critical" : baseImportance >= 60 ? "high" : "medium",
    memoryStrength: baseImportance,
    retrievalWeight: baseImportance,
    semanticCluster: "General",
    category: "general",
    primaryTopic: "general",
    topics: [],
    entities: [],
    isDuplicate: false,
    shouldMerge: false,
    decayRate,
    confidence: 80,
    noveltyScore: 50,
    futureRelevance: 50,
    memoryRank: baseImportance >= 85 ? "critical" : "medium",
    reason: "Parsed memory",
    summary: compressedText,
    rawText: clean,
    compressedText,
    topic: "general"
  };
}

function createEmptyResult(): MemoryReasonerResult {
  return {
    shouldRemember: false,
    memoryType: "ignore",
    importance: 0,
    priority: "low",
    memoryStrength: 0,
    retrievalWeight: 0,
    semanticCluster: "General",
    category: "general",
    primaryTopic: "general",
    topics: [],
    entities: [],
    isDuplicate: false,
    shouldMerge: false,
    decayRate: 0.05,
    confidence: 0,
    noveltyScore: 0,
    futureRelevance: 0,
    memoryRank: "discard",
    reason: "Empty or noisy",
    summary: "",
    rawText: "",
    compressedText: "",
    topic: "general",
  };
}
