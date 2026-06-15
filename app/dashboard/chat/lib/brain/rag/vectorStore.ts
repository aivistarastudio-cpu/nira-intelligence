import { getEmbeddingProvider } from "./embedder";
import { DocumentChunk } from "./chunker";
import { supabase } from "../supabase/supabaseClient";

export class ChromaDBClient {
  async addChunks(chunks: DocumentChunk[], userId: string, projectId?: string | null): Promise<void> {
    const embedder = getEmbeddingProvider();
    
    // Process in batches
    const texts = chunks.map(c => c.text);
    const vectors = await embedder.embedBatch(texts);

    const insertData = chunks.map((chunk, idx) => ({
      user_id: userId,
      project_id: projectId || null,
      document_name: chunk.documentName,
      chunk_index: idx,
      chunk_text: chunk.text,
      embedding: vectors[idx],
    }));

    const { error } = await supabase.from("rag_chunks").insert(insertData);
    if (error) {
      console.error("Supabase RAG insertion error:", error);
      throw error;
    }
  }

  async query(
    queryVector: number[],
    topK: number,
    userId: string,
    projectId?: string | null
  ): Promise<{ chunk: { text: string }; score: number }[]> {
    const { data, error } = await supabase.rpc("match_chunks", {
      query_embedding: queryVector,
      match_threshold: 0.70,
      match_count: topK,
      p_user_id: userId,
      p_project_id: projectId || null,
    });

    if (error) {
      console.error("Supabase RAG query error:", error);
      return [];
    }

    return (data || []).map((c: any) => ({
      chunk: { text: c.chunk_text },
      score: c.similarity,
    }));
  }
}

export const vectorStore = new ChromaDBClient();
