import { detectMath, MathType } from "./mathDetector";

export type IntentType =
  | "casual"
  | "code"
  | "compare"
  | "steps"
  | "explain"
  | "business"
  | "story"
  | "thinking"
  | "learn"
  | "design"
  | "acknowledgment";

export type DomainType = 
  | "general" 
  | "engineering" 
  | "history" 
  | "science" 
  | "business" 
  | "psychology"
  | "math"
  | "creative";

export type ResponseMode = "solution" | "explanation";

type ScoreMap = Record<IntentType, number>;

export function detectIntent(input: string, primaryEmotion?: string): {
  intent: IntentType;
  domain: DomainType;
  responseMode: ResponseMode;
  containsMath: boolean;
  mathType: MathType;
} {
  const text = input.toLowerCase().trim();

  const math = detectMath(input);

  const score: ScoreMap = {
    casual: 0,
    code: 0,
    compare: 0,
    steps: 0,
    explain: 0,
    business: 0,
    story: 0,
    thinking: 0,
    learn: 0,
    design: 0,
    acknowledgment: 0,
  };

  let responseMode: ResponseMode = "explanation";
  let domain: DomainType = "general";

  const isShort = text.length < 25;
  const isLong = text.length > 80;

  const add = (intent: IntentType, value: number) => {
    score[intent] += value;
  };

  const countMatches = (words: string[]) =>
    words.reduce((acc, w) => (text.includes(w) ? acc + 1 : acc), 0);

  // Math Detection overrides
  if (math.containsMath) {
     domain = "math";
  }

  // Engineering / Code
  const codeMatches = countMatches([
    "error", "bug", "fix", "issue", "not working", "undefined",
    "null", "exception", "console", "api", "function",
    "typescript", "react", "nextjs", "node", "code",
  ]);

  if (codeMatches > 0) {
     add("code", codeMatches * 3);
     domain = "engineering";
  }

  // History
  if (["history", "war", "empire", "century", "king", "revolution", "historical"].some(w => text.includes(w))) {
     domain = "history";
  }

  // Psychology / Emotion
  const hasEmotionalWords = ["sad", "angry", "frustrated", "anxious", "scared", "lost in life"].some(w => text.includes(w));
  if (hasEmotionalWords || (primaryEmotion && ["sad", "angry", "frustrated", "anxious", "scared"].includes(primaryEmotion))) {
     domain = "psychology";
     // If highly emotional, maybe it overrides intent to casual/support
     add("casual", 10);
  }

  if (["how to", "steps", "guide", "tutorial"].some(w => text.startsWith(w)) ||
      ["step by step", "process", "procedure"].some(w => text.includes(w)) ||
      (["kaise", "kem"].some((w) => text.startsWith(w)) && isLong)
  ) {
    add("steps", 6);
  }

  if ([" vs ", "compare", "difference", "farak", "antar"].some((w) => text.includes(w))) {
    add("compare", 5);
  }

  if (["story", "kahani", "katha", "varta"].some((w) => text.includes(w))) {
    add("story", 4);
    domain = "creative";
  }

  if (["business", "startup", "earn money", "income", "paise kamane", "side hustle"].some((w) => text.includes(w))) {
    add("business", 4);
    domain = "business";
  }

  if (["puzzle", "riddle", "logic", "brain teaser", "math problem"].some((w) => text.includes(w))) {
    add("thinking", 5);
  }

  if (isShort && ["hi", "hello", "hey", "hy", "kem cho", "kem che", "kya haal", "kaise ho", "su chale", "majama", "yo", "bro"].some((w) => text.includes(w))) {
    add("casual", 4);
  }

  // Conversation Understanding Layer: Short Replies
  if (isShort && ["ha", "yes", "ok", "hmm", "nahi", "no", "yup", "yeah", "accha", "theek", "cool", "done", "got it", "haan", "han"].some((w) => text === w || text.startsWith(w + " "))) {
    add("acknowledgment", 10);
  }

  if (isLong) add("explain", 3);
  if (["what", "why", "how", "explain"].some((w) => text.includes(w))) {
    add("explain", 2);
  }

  if (["samjha", "samjhao", "padhai", "study", "learn", "basic", "simple samjha", "easy samjha"].some((w) => text.includes(w))) {
    add("learn", 6);
  }

  if (["design", "ui", "ux", "layout", "landing page", "app design", "interface", "figma"].some((w) => text.includes(w))) {
    add("design", 5);
    domain = "creative";
  }

  if (["fix", "error", "issue", "solve", "not working", "kaise solve", "problem"].some((w) => text.includes(w))) {
    responseMode = "solution";
  }

  if (["explain", "samjhao", "why", "kaise kaam karta hai"].some((w) => text.includes(w))) {
    responseMode = "explanation";
  }

  let finalIntent: IntentType = "explain";

  if (score.code >= 6 || (isShort && score.code > 0)) {
     finalIntent = "code";
  } else if (score.steps >= 6) {
     finalIntent = "steps";
  } else {
     const sorted = Object.entries(score).sort((a, b) => b[1] - a[1]);
     const best = sorted[0];
     const second = sorted[1];
     if (best && best[1] > 0) {
       if (second && best[1] === second[1] && best[0] === "explain") {
         finalIntent = second[0] as IntentType;
       } else {
         finalIntent = best[0] as IntentType;
       }
     }
  }

  return {
    intent: finalIntent,
    domain,
    responseMode,
    containsMath: math.containsMath,
    mathType: math.mathType,
  };
}

export function getVisualHint(intent: IntentType, input: string): string {
  const text = input.toLowerCase();

  if (intent === "learn") {
    if (text.includes("fraction")) return "pizza slices diagram labeled";
    if (text.includes("water cycle")) return "water cycle diagram labeled";
    if (text.includes("electric")) return "electric circuit diagram labeled";
    return "educational diagram simple";
  }
  if (intent === "design") {
    return "modern app UI layout design";
  }
  return "";
}
