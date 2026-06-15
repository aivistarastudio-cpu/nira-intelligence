export interface DocumentChunk {
  chunkId: string;
  documentId: string;
  documentName: string;
  pageNumber: number;
  text: string;
  metadata?: Record<string, any>;
}

/**
 * Splits text into overlapping chunks using a simple sliding window approach.
 * In a production environment, this would use an advanced tokenizer (e.g., tiktoken)
 * to measure exact token counts. Here we approximate 1 token ≈ 4 characters.
 */
export function chunkDocument(
  text: string,
  documentId: string,
  documentName: string,
  chunkSizeTokens: number = 500,
  overlapTokens: number = 50
): DocumentChunk[] {
  const charsPerToken = 4;
  const chunkSizeBytes = chunkSizeTokens * charsPerToken;
  const overlapBytes = overlapTokens * charsPerToken;

  const chunks: DocumentChunk[] = [];
  let currentIndex = 0;
  let chunkIndex = 0;

  // Simulate a very basic page number heuristic by tracking character offsets.
  const pageEstimateBytes = 2000;

  while (currentIndex < text.length) {
    const chunkText = text.substring(currentIndex, currentIndex + chunkSizeBytes);
    const pageNumber = Math.floor(currentIndex / pageEstimateBytes) + 1;

    chunks.push({
      chunkId: `${documentId}_chunk_${chunkIndex}`,
      documentId,
      documentName,
      pageNumber,
      text: chunkText.trim(),
    });

    currentIndex += (chunkSizeBytes - overlapBytes);
    chunkIndex++;
  }

  return chunks;
}
