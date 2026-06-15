export interface EmbeddingProvider {
  name: string;
  dimension: number;
  embedText(text: string): Promise<number[]>;
  embedBatch(texts: string[]): Promise<number[][]>;
}

// Simple mock/wrapper for OpenAI embeddings to abstract away the implementation.
// In a real environment, this would call the actual OpenAI API using fetch or the OpenAI SDK.
export class OpenAIEmbedder implements EmbeddingProvider {
  name = "text-embedding-3-small";
  dimension = 1536;

  async embedText(text: string): Promise<number[]> {
    return this.embedBatch([text]).then((res) => res[0]);
  }

  async embedBatch(texts: string[]): Promise<number[][]> {
    // Simulated embedding payload for architecture purposes.
    // Replace with: await openai.embeddings.create({ model: this.name, input: texts })
    return texts.map(() => new Array(this.dimension).fill(Math.random()));
  }
}

// Simple mock/wrapper for Local ONNX embeddings
export class LocalONNXEmbedder implements EmbeddingProvider {
  name = "all-MiniLM-L6-v2";
  dimension = 384;

  async embedText(text: string): Promise<number[]> {
    return this.embedBatch([text]).then((res) => res[0]);
  }

  async embedBatch(texts: string[]): Promise<number[][]> {
    return texts.map(() => new Array(this.dimension).fill(Math.random()));
  }
}

let activeProvider: EmbeddingProvider = new OpenAIEmbedder();

export function setEmbeddingProvider(provider: EmbeddingProvider) {
  activeProvider = provider;
}

export function getEmbeddingProvider(): EmbeddingProvider {
  return activeProvider;
}
