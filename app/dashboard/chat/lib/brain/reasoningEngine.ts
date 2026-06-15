export type ReasoningLevel = "basic" | "advanced" | "expert";

export type ReasoningMode =
  | "debug"
  | "architect"
  | "teacher"
  | "planner"
  | "decision"
  | "creative"
  | "research"
  | "normal";

export interface ReasoningResult {
  mode: ReasoningMode;
  confidence: number;
  reasoningPrompt: string;
  reasoningLevel: ReasoningLevel;
}

// Pre-compiled regular expressions for performance (runtime O(n))
const DEBUG_PATTERNS = /\b(bug|error|crash|exception|undefined|null|infinite\s*loop|memory\s*leak|stack\s*trace)\b/i;

const ARCHITECT_PATTERNS = /\b(architecture|scalable|scaling|microservice|distributed|orchestration|system\s*design|systems\s*design|multi\s*tenant|multi-tenant|load\s*balancer|redis|kafka|websocket|event\s*driven|event-driven|kubernetes)\b/i;

const CREATIVE_PATTERNS = /\b(story|script|design|logo|cinematic|branding|poem|generate|ui|ux|landing\s*page|product\s*design|visual\s*identity|ad\s*creative|marketing\s*creative)\b/i;

const DECISION_PATTERNS = /(\bvs\b|versus|\bcompare\b|\bdifference\b|\bchoose\b|\brecommendation\b|which\s+is\s+better)/i;

const PLANNER_PATTERNS = /\b(roadmap|startup|business|growth|launch|milestone|strategy|execution\s*plan)\b/i;

const TEACHER_PATTERNS = /\b(teach|learn|tutorial|beginner|guide|simple\s*explanation|step-by-step|basics|fundamentals|introduction)\b/i;

/**
 * Detects the NIRA reasoning mode with strict null-safety and balanced scoring.
 */
export function detectReasoningMode(
  input: string | null | undefined,
  intent: string | null | undefined,
  depth: string | null | undefined,
  emotions: string[] | null | undefined
): { mode: ReasoningMode; confidence: number } {
  // 1. Strict Null-Safety Normalization
  const text = typeof input === "string" ? input.toLowerCase().trim() : "";
  const intentLower = typeof intent === "string" ? intent.toLowerCase().trim() : "";
  const depthLower = typeof depth === "string" ? depth.toLowerCase().trim() : "";
  const safeEmotions = Array.isArray(emotions) ? emotions : [];

  const score: Record<ReasoningMode, number> = {
    debug: 0,
    architect: 0,
    teacher: 0,
    planner: 0,
    decision: 0,
    creative: 0,
    research: 0,
    normal: 10, // Base baseline fallback
  };

  // 2. Signal A: Intent Baselines
  if (intentLower === "code") {
    score.debug += 25;
    score.architect += 10;
  } else if (intentLower === "learn" || intentLower === "teach") {
    score.teacher += 35;
  } else if (intentLower === "business" || intentLower === "planning") {
    score.planner += 35;
  } else if (intentLower === "decision" || intentLower === "compare") {
    score.decision += 35;
  } else if (intentLower === "creative") {
    score.creative += 35;
  } else if (intentLower === "analysis") {
    score.research += 15;
  }

  // 3. Signal B: Depth Signals
  if (depthLower === "short") {
    score.normal += 35;
  } else if (depthLower === "expert") {
    score.architect += 25;
    score.research += 10;
  } else if (depthLower === "deep") {
    score.research += 10;
  }

  // 4. Signal C: Emotion Vectors
  if (safeEmotions.includes("frustrated") || safeEmotions.includes("angry")) {
    score.debug += 25;
  }
  if (safeEmotions.includes("planning")) {
    score.planner += 15;
  }
  if (safeEmotions.includes("thinking")) {
    score.research += 10;
  }
  if (safeEmotions.includes("creative")) {
    score.creative += 20;
  }
  if (safeEmotions.includes("decision")) {
    score.decision += 20;
  }

  // 5. Signal D: Semantic Keywords Matching
  if (DEBUG_PATTERNS.test(text)) {
    score.debug += 55; // High priority boost to guarantee debug wins for errors/crashes
  }
  if (ARCHITECT_PATTERNS.test(text)) {
    score.architect += 35;
  }
  if (CREATIVE_PATTERNS.test(text)) {
    score.creative += 30;
  }
  if (DECISION_PATTERNS.test(text)) {
    score.decision += 35;
  }
  if (PLANNER_PATTERNS.test(text)) {
    score.planner += 30;
  }
  if (TEACHER_PATTERNS.test(text)) {
    score.teacher += 25;
  }

  // 6. Research Mode Safety: Must not override specific domain-specific intents/keywords
  const isSpecificIntent = ["code", "learn", "teach", "business", "planning", "decision", "compare", "creative"].includes(intentLower);
  const hasSpecificKeywords = DEBUG_PATTERNS.test(text) ||
                              ARCHITECT_PATTERNS.test(text) ||
                              CREATIVE_PATTERNS.test(text) ||
                              DECISION_PATTERNS.test(text) ||
                              PLANNER_PATTERNS.test(text) ||
                              TEACHER_PATTERNS.test(text);

  const isDeepOrExpert = depthLower === "deep" || depthLower === "expert";
  if (isDeepOrExpert && !isSpecificIntent && !hasSpecificKeywords) {
    score.research += 40; // Boost research only if no other specific mode matches
  }

  // Find the winning mode
  let bestMode: ReasoningMode = "normal";
  let highestScore = -1;

  for (const key in score) {
    const currentScore = score[key as ReasoningMode];
    if (currentScore > highestScore) {
      highestScore = currentScore;
      bestMode = key as ReasoningMode;
    }
  }

  // Calculate dynamic confidence score (Clamped 0-100)
  const totalScore = Object.values(score).reduce((a, b) => a + b, 0);
  let confidence = 70; // Baseline default

  if (totalScore > 0) {
    const rawRatio = highestScore / totalScore;
    confidence = Math.max(0, Math.min(Math.round(rawRatio * 75) + 25, 100));
  }

  return { mode: bestMode, confidence };
}

/**
 * Generates NIRA's structural thinking instructions based on reasoning mode.
 */
export function buildReasoningPrompt(mode: ReasoningMode): string {
  switch (mode) {
    case "debug":
      return "Focus on root cause analysis. Identify the bug source. Propose a minimal, precise fix. Assess regression risks and address edge cases.";
    case "architect":
      return "Think as a senior systems architect. Focus on system design, scalability, modularity, tradeoffs, and maintainability.";
    case "teacher":
      return "Explain the concept step-by-step. Use clear, simple language and real-world examples. Make the explanation highly beginner-friendly.";
    case "planner":
      return "Build a structured roadmap or execution plan. Outline clear milestones, correct execution order, priorities, and dependency flows.";
    case "decision":
      return "Compare all options objectively. Map out the pros and cons of each approach, highlight the tradeoffs, and recommend the best choice with clear reasoning.";
    case "creative":
      return "Prioritize originality, storytelling, and design thinking. Avoid clichés and focus on creative and unique solutions.";
    case "research":
      return "Deconstruct the query using first principles. Explore multiple hypotheses, perform deep analysis, and detail alternative technical approaches.";
    case "normal":
      return "Answer directly, clearly, and concisely without unnecessary preambles.";
  }
}

/**
 * High-agency execution pipeline for NIRA Reasoning Engine.
 */
export function runReasoning(
  input: string | null | undefined,
  intent: string | null | undefined,
  depth: string | null | undefined,
  emotions: string[] | null | undefined
): ReasoningResult {
  const { mode, confidence } = detectReasoningMode(input, intent, depth, emotions);
  const reasoningPrompt = buildReasoningPrompt(mode);

  // Map confidence range to ReasoningLevel
  let reasoningLevel: ReasoningLevel = "basic";
  if (confidence >= 90) {
    reasoningLevel = "expert";
  } else if (confidence >= 80) {
    reasoningLevel = "advanced";
  }

  return {
    mode,
    confidence,
    reasoningPrompt,
    reasoningLevel
  };
}

// Backward-compatibility alias for executeReasoningPipeline in niraCore.ts
export const executeReasoningPipeline = runReasoning;