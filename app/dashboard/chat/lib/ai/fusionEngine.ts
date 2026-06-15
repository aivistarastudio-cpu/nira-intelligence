import { AIResponse } from "./types";

/**
 * Fusion Engine - Rule-Based Synthesizer
 * Merges output from Gemini and OpenAI seamlessly without a third LLM pass.
 */
export function fuseOutputs(
  geminiOutput: string,
  openaiOutput: string,
  geminiConfidence: number,
  openaiConfidence: number
): string {
  // If OpenAI has overwhelming confidence over Gemini, default to OpenAI's structural logic.
  if (openaiConfidence > geminiConfidence + 15) {
    return openaiOutput;
  }

  // If Gemini has overwhelming confidence, default to Gemini.
  if (geminiConfidence > openaiConfidence + 15) {
    return geminiOutput;
  }

  // Otherwise, Rule-Based Fusion:
  // OpenAI typically produces better structure (headings, steps).
  // Gemini produces better alternatives, edge cases, and creativity.
  // We will preserve OpenAI's core response, and append Gemini's unique insights at the bottom,
  // stripping out overlapping generic headers from Gemini.

  const cleanGemini = extractUniqueInsights(geminiOutput);

  return `${openaiOutput}\n\n━━━━━━━━━━━━━━━━━━━\n\n### 💡 NIRA Lateral Exploration\n${cleanGemini}`;
}

function extractUniqueInsights(text: string): string {
  // Simple heuristic: remove the first paragraph or generic intro if it exists,
  // grab bullet points or secondary headers.
  const lines = text.split("\n");
  let contentStarted = false;
  const filtered = lines.filter((line, i) => {
    if (line.trim().startsWith("#") || line.trim().startsWith("-") || line.trim().startsWith("*")) {
      contentStarted = true;
    }
    // Skip introductory generic lines like "Here is how you do it"
    if (!contentStarted && i < 3 && !line.includes("*") && line.length < 100) {
      return false;
    }
    return true;
  });

  return filtered.join("\n").trim() || text;
}
