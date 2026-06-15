import { ReasoningMode, ReasoningLevel } from "./reasoningEngine";
import { EmotionType } from "./emotion";

export type ResponseStrategy =
  | "direct"
  | "educational"
  | "analytical"
  | "creative"
  | "structured";

export interface ResponseStrategyResult {
  strategy: ResponseStrategy;
  formattingStyle: string;
  responseStructure: string;
  verbosity: "concise" | "balanced" | "detailed";
  explanationStyle: "simple" | "practical" | "internals";
  useExamples: boolean;
  useAnalogy: boolean;
  useVisualThinking: boolean;
  confidence: number;
}

interface StrategyProfile {
  strategy: ResponseStrategy;
  formattingStyle: string;
  responseStructure: string;
  verbosity: "concise" | "balanced" | "detailed";
  explanationStyle: "simple" | "practical" | "internals";
  useExamples: boolean;
  useAnalogy: boolean;
  useVisualThinking: boolean;
}

const STRATEGY_PROFILES: Record<string, StrategyProfile> = {
  debug: {
    strategy: "direct",
    formattingStyle: "step-by-step debugging flow with clean code diffs",
    responseStructure: "problem root cause → fix proposal → minimal theory → code block",
    verbosity: "balanced",
    explanationStyle: "practical",
    useExamples: true,
    useAnalogy: false,
    useVisualThinking: false,
  },
  architect: {
    strategy: "analytical",
    formattingStyle: "sections outlining systems architecture and trade-offs",
    responseStructure: "overview → architecture → tradeoffs",
    verbosity: "detailed",
    explanationStyle: "internals",
    useExamples: true,
    useAnalogy: false,
    useVisualThinking: true,
  },
  teacher: {
    strategy: "educational",
    formattingStyle: "lesson format with progressive analogies",
    responseStructure: "concept → example → summary",
    verbosity: "balanced",
    explanationStyle: "simple",
    useExamples: true,
    useAnalogy: true,
    useVisualThinking: true,
  },
  planner: {
    strategy: "structured",
    formattingStyle: "roadmap format with chronological order",
    responseStructure: "goal → milestones → execution",
    verbosity: "balanced",
    explanationStyle: "practical",
    useExamples: false,
    useAnalogy: false,
    useVisualThinking: true,
  },
  decision: {
    strategy: "analytical",
    formattingStyle: "comparison format with markdown matrix tables",
    responseStructure: "option A → option B → recommendation",
    verbosity: "balanced",
    explanationStyle: "practical",
    useExamples: true,
    useAnalogy: false,
    useVisualThinking: false,
  },
  creative: {
    strategy: "creative",
    formattingStyle: "storytelling and idea expansion",
    responseStructure: "idea → expansion → final output",
    verbosity: "detailed",
    explanationStyle: "simple",
    useExamples: true,
    useAnalogy: true,
    useVisualThinking: true,
  },
  research: {
    strategy: "analytical",
    formattingStyle: "deep-analysis format structured around hypotheses",
    responseStructure: "hypothesis → analysis → conclusion",
    verbosity: "detailed",
    explanationStyle: "internals",
    useExamples: true,
    useAnalogy: false,
    useVisualThinking: false,
  },
  normal: {
    strategy: "direct",
    formattingStyle: "simple",
    responseStructure: "answer → explanation",
    verbosity: "balanced",
    explanationStyle: "practical",
    useExamples: true,
    useAnalogy: false,
    useVisualThinking: false,
  },
};

export function getResponseStrategy(
  reasoningMode: string,
  reasoningLevel: string = "basic",
  depthLevel: string = "medium",
  primaryEmotion: string = "normal",
  skillLevel: string = "unknown",
  responseMode: string = "solution"
): ResponseStrategyResult {
  const mode = STRATEGY_PROFILES[reasoningMode] ? reasoningMode : "normal";
  const profile = { ...STRATEGY_PROFILES[mode] };

  // 1. Depth Level Adjustments
  if (depthLevel === "short") {
    profile.verbosity = "concise";
  } else if (depthLevel === "deep" || depthLevel === "expert") {
    profile.verbosity = "detailed";
    if (depthLevel === "expert" && profile.explanationStyle !== "simple") {
      profile.explanationStyle = "internals";
    }
  }

  // 2. Skill Level Adjustments
  if (skillLevel === "beginner") {
    profile.explanationStyle = "simple";
    profile.useAnalogy = true;
    profile.useExamples = true;
  } else if (skillLevel === "advanced") {
    profile.explanationStyle = "internals";
    profile.useAnalogy = false;
  }

  // 3. Emotion Overrides
  if (primaryEmotion === "frustrated") {
    profile.verbosity = "concise";
    profile.useAnalogy = false;
    profile.formattingStyle = `concise, direct, and highly focused (${profile.formattingStyle})`;
  } else if (primaryEmotion === "confused") {
    profile.explanationStyle = "simple";
    profile.useAnalogy = true;
    profile.useExamples = true;
    profile.formattingStyle = `highly beginner-friendly explanations (${profile.formattingStyle})`;
  } else if (primaryEmotion === "urgent") {
    profile.verbosity = "concise";
    profile.useAnalogy = false;
    profile.responseStructure = `immediate solution first → ${profile.responseStructure}`;
  } else if (primaryEmotion === "curious") {
    if (profile.verbosity === "concise") {
      profile.verbosity = "balanced";
    } else if (profile.verbosity === "balanced") {
      profile.verbosity = "detailed";
    }
    profile.useExamples = true;
  }

  // 4. Response Mode Alignments
  if (responseMode === "solution") {
    if (!profile.responseStructure.startsWith("immediate")) {
      profile.responseStructure = `immediate solution first → ${profile.responseStructure}`;
    }
  }

  // 5. Dynamic Confidence Score Mapping (0-100)
  let confidence = 80;

  if (reasoningLevel === "expert") {
    confidence += 15;
  } else if (reasoningLevel === "advanced") {
    confidence += 10;
  }

  if (skillLevel === "advanced" && (depthLevel === "deep" || depthLevel === "expert")) {
    confidence += 5;
  }
  if (skillLevel === "beginner" && depthLevel === "short") {
    confidence += 5;
  }

  if (primaryEmotion === "frustrated" || primaryEmotion === "urgent") {
    confidence -= 5;
  }

  confidence = Math.max(0, Math.min(confidence, 100));

  return {
    ...profile,
    confidence,
  };
}