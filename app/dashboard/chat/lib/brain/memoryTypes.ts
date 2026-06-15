export interface MemoryItem {
  id: string;
  rawText: string;
  compressedText: string;
  topic: string;
  importance: number;
  timestamp: number;
  priority?: "low" | "medium" | "high" | "critical";
  memoryType?: "session" | "long_term_context" | "permanent" | "project" | "ignore";
  projectId?: string; 
  status?: "active" | "superseded"; // New: Contradiction Engine state
  entities?: string[];
  fingerprint?: string;
  memoryStrength?: number;
  decayRate?: number;
  content?: string; 
}

export type MemoryCategory =
  | "startup"
  | "project"
  | "preference"
  | "goal"
  | "learning"
  | "general";

export interface MemoryReasonerResult {
  shouldRemember: boolean;
  memoryType: "session" | "long_term_context" | "permanent" | "project" | "ignore";
  importance: number;
  priority: "low" | "medium" | "high" | "critical";
  memoryStrength: number;
  retrievalWeight: number;
  semanticCluster: string;
  category: MemoryCategory;
  primaryTopic: string;
  topics: string[];
  entities: string[];
  isDuplicate: boolean;
  shouldMerge: boolean;
  decayRate: number;
  confidence: number;
  noveltyScore: number;
  futureRelevance: number;
  memoryRank: "discard" | "low" | "medium" | "high" | "critical";
  reason: string;
  summary: string;
  rawText: string;
  compressedText: string;
  topic: string; // Backward compatibility
}
