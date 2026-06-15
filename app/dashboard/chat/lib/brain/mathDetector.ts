export type MathType =
  | "arithmetic"
  | "percentage"
  | "equation"
  | "algebra"
  | "trigonometry"
  | "conversion"
  | "unknown";

export interface MathDetectionResult {
  containsMath: boolean;
  mathType: MathType;
}

export function detectMath(
  input: string
): MathDetectionResult {
  const text = input.toLowerCase().trim();

  // Arithmetic
  if (
    /\d+\s*[\+\-\*\/]\s*\d+/.test(text)
  ) {
    return {
      containsMath: true,
      mathType: "arithmetic",
    };
  }

  // Percentage
  if (
    /\d+\s*%/.test(text) ||
    text.includes("percent") ||
    text.includes("% of")
  ) {
    return {
      containsMath: true,
      mathType: "percentage",
    };
  }

  // Trigonometry
  if (
    /sin\s*\(/.test(text) ||
    /cos\s*\(/.test(text) ||
    /tan\s*\(/.test(text)
  ) {
    return {
      containsMath: true,
      mathType: "trigonometry",
    };
  }

  // Algebra
  if (
    text.includes("sqrt") ||
    text.includes("^")
  ) {
    return {
      containsMath: true,
      mathType: "algebra",
    };
  }

  // Equation
  if (
    /=/.test(text) &&
    /[a-z]/i.test(text)
  ) {
    return {
      containsMath: true,
      mathType: "equation",
    };
  }

  // Conversion
  if (
    /(km|meter|meters|cm|inch|feet|kg|gram|ml|liter)/.test(text)
  ) {
    return {
      containsMath: true,
      mathType: "conversion",
    };
  }

  return {
    containsMath: false,
    mathType: "unknown",
  };
}