export const safeSplitResponse = (rawText: string) => {
  const hasValidSplit = rawText.includes("\nExplanation:");

  if (!hasValidSplit) {
    return {
      solution: rawText.trim(),
      explanation: "",
    };
  }

  const parts = rawText.split("\nExplanation:");

  return {
    solution: parts[0]?.trim(),
    explanation: parts.slice(1).join("\nExplanation:").trim(),
  };
};

export const cleanText = (txt: string) => {
  return txt
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/[ \t]+/g, " ") // 🔥 normalize spacing
    .trim();
};

export const getLevelFromIndent = (indent: number): number => {
  return Math.floor(indent / 2); // 2 spaces = 1 level
};

export const getIndent = (line: string) => {
  const match = line.match(/^(\s*)/);
  return match ? match[1].length : 0;
};
