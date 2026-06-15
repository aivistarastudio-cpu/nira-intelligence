import { supabase } from "./supabaseClient";
import { getEmbeddingProvider } from "../rag/embedder";
import { MemoryItem } from "../memoryTypes";

// Removed MOCK_USER_ID, userId is now dynamically passed// Interface for inserting memories based on the DB schema
export interface SupabaseMemoryInsert {
  user_id: string;
  project_id?: string | null;
  raw_text: string;
  compressed_text: string;
  topic: string;
  importance: number;
  priority: "low" | "medium" | "high" | "critical";
  memory_type: string;
  embedding: number[];
  memory_strength: number;
  decay_rate: number;
  source: "chat" | "project" | "pdf" | "manual" | "agent";
}

/**
 * 1. Active Project Priority System & Retrieval
 */
export async function retrieveSupabaseMemories(
  query: string,
  userId: string,
  projectId?: string | null,
  limit: number = 10
): Promise<MemoryItem[]> {
  const embedder = getEmbeddingProvider();
  const queryVector = await embedder.embedText(query);

  // Calls the custom RPC for Priority Scoring
  const { data, error } = await supabase.rpc("match_memories", {
    query_embedding: queryVector,
    match_threshold: 0.65,
    match_count: limit,
    p_user_id: userId,
    p_project_id: projectId || null,
  });

  if (error) {
    console.error("Supabase memory retrieval error:", error);
    return [];
  }

  // 2. Memory Aging Engine: Update last_accessed and memory_strength
  if (data && data.length > 0) {
    const memoryIds = data.map((d: any) => d.id);
    // Asynchronously strengthen these memories
    strengthenMemories(memoryIds).catch(console.error);
  }

  return (data || []).map((m: any) => ({
    id: m.id,
    compressedText: m.compressed_text,
    topic: m.topic,
    importance: m.importance,
    memoryStrength: m.memory_strength,
    rawText: "", // Not needed for context
    timestamp: Date.now(),
    content: m.compressed_text
  })) as MemoryItem[];
}

/**
 * 2. Memory Aging Engine (Strengthen)
 */
async function strengthenMemories(ids: string[]) {
  // Simple strengthen formula: Add 0.5 to strength on access, cap at 10
  // Note: Supabase JS doesn't have an easy "increment" for multiple specific IDs in a single query
  // without RPC, so we do an RPC or update them. For Phase 11 Prototype, we'll do individual updates.
  for (const id of ids) {
     await supabase.rpc('strengthen_memory', { memory_id: id }); 
     // We will need to create this RPC later, or just do standard update
  }
}

/**
 * 3. Permanent Memory Protection Layer & Writing
 */
export async function saveToSupabase(
  memory: MemoryItem,
  userId: string,
  source: "chat" | "project" | "pdf" | "manual" | "agent" = "chat"
): Promise<void> {
  // Permanent Protection Layer Validation
  if (memory.memoryType === "permanent") {
    if (memory.importance < 95) {
      console.warn(`[Protection Layer] Rejected permanent memory creation (Score ${memory.importance} < 95). Saving as long_term_context instead.`);
      memory.memoryType = "long_term_context";
    }
    const transitoryPhrases = ["tired", "bad mood", "hungry", "lunch", "today", "busy", "stressed", "exhausted", "sick", "angry", "sad"];
    if (transitoryPhrases.some(p => memory.rawText.toLowerCase().includes(p))) {
      console.warn(`[Protection Layer] Downgraded transitory thought to long_term_context: ${memory.compressedText}`);
      memory.memoryType = "long_term_context";
      memory.importance = 40;
      memory.decayRate = 0.1;
    }
  }

  const embedder = getEmbeddingProvider();
  const vector = await embedder.embedText(memory.compressedText);

  const insertData: SupabaseMemoryInsert = {
    user_id: userId,
    project_id: memory.projectId || null,
    raw_text: memory.rawText,
    compressed_text: memory.compressedText,
    topic: memory.topic || "general",
    importance: memory.importance || 50,
    priority: memory.priority || "medium",
    memory_type: memory.memoryType || "fact",
    embedding: vector,
    memory_strength: memory.memoryStrength || 1.0,
    decay_rate: memory.decayRate || 0.01,
    source: source,
  };

  const { error } = await supabase.from("memories").insert(insertData);
  if (error) {
    console.error("Failed to save memory to Supabase:", error);
  } else {
    console.log("✅ Phase 11 Memory Persisted to Supabase!");
  }
}
