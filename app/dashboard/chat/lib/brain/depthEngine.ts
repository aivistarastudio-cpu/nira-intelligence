export type DepthLevel = "short" | "medium" | "deep" | "expert";

export interface DepthResult {
  depth: DepthLevel;
  score: number;
}

// Pattern matching arrays for depth level signals
const EXPERT_PATTERNS = [
  /architect/i,
  /scal/i,
  /distribut/i,
  /orchestrat/i,
  /system\s*design/i,
  /multi\s*tenant/i,
  /microservice/i,
  /vector\s*db|vector\s*database/i,
  /rag/i,
  /\bagents?\b/i,
  /memory\s*layer/i,
  /reason/i,
  /llm/i,
  /ai\s*system/i,
  /agi/i,
  /router/i,
  /pipeline/i,
  /optimiz/i,
  /derive|derivation|proof/i,
  /\bredis\b/i,
  /\bkafka\b/i,
  /\bqueues?\b/i,
  /event[- ]driven/i,
  /websocket/i,
  /sharding/i,
  /cach(e|ing)/i,
  /load\s*balancer/i,
  /kubernetes/i,
  /docker/i,
  /supabase/i,
  /postgres(ql)?/i,
  /distributed\s*cache/i,
  /message\s*broker/i,
  /pubsub|pub\/sub/i,
  /\bworker\b/i,
  /job\s*queue/i
];

const DEEP_PATTERNS = [
  /internal/i,
  /deep/i,
  /under\s*the\s*hood/i,
  /how\s*it\s*works/i,
  /workflow/i,
  /mechanis/i,
  /render/i,
  /lifecycle/i,
  /debug/i
];

const MEDIUM_PATTERNS = [
  /what\s*is/i,
  /explain/i,
  /meaning/i,
  /example/i,
  /differ/i
];

// Code complexity patterns
const CODE_PATTERNS = /react|nextjs|typescript|useeffect|usestate|hook|supabase|tailwind|api|database|prisma|middleware|server\s*action|page\.tsx|layout\.tsx/i;

// Business complexity patterns
const BUSINESS_PATTERNS = /startup|saas|pricing|revenue|profit|growth|business\s*model|funding|marketing/i;

// Project file context patterns
const FILE_PATTERNS = /route\.ts|page\.tsx|layout\.tsx|component|hook|provider|middleware|schema|migration/i;

/**
 * Determines the target depth level and score of a user prompt using multi-signal analysis.
 * 
 * @param input The raw input query from the user.
 * @param intent Optional intent keyword passed from the intent detector.
 * @returns An object containing the detected DepthLevel and the actual confidence score.
 */
export function detectDepth(input: string, intent?: string): DepthResult {
  const text = input.toLowerCase().trim();
  
  if (!text) {
    return { depth: "short", score: 10 };
  }

  const intentLower = intent?.toLowerCase();

  // 1. MATH FAST PATH
  // Detects if the query contains a basic math expression and non-math characters are very short
  const hasMathExpr = /(\d+(?:\.\d+)?)\s*[+\-*/%^]\s*(\d+(?:\.\d+)?)/.test(text);
  const nonMathChars = text.replace(/[\d+\-*/%^().\s]/g, "");
  if (hasMathExpr && nonMathChars.length < 10) {
    return { depth: "short", score: 10 };
  }

  // 3. SHORT GREETINGS FAST PATH
  const isShortGreeting = /^(hi|hello|hey|thanks|thank you|ok|okay|hmm|yes|no|yo|bye|tc|good morning|good afternoon|good evening)$/i.test(text);
  if (text.length < 20 && isShortGreeting) {
    return { depth: "short", score: 10 };
  }

  // 4. MULTI-SIGNAL SCORING
  let score = 0;

  // Signal A: Input Length
  if (text.length > 150) {
    score += 30;
  } else if (text.length > 80) {
    score += 25;
  } else if (text.length > 40) {
    score += 20;
  } else if (text.length > 15) {
    score += 15;
  } else {
    score += 5;
  }

  // Signal B: Keyword Matches (Weighted scoring only)
  let expertMatches = 0;
  let deepMatches = 0;
  let mediumMatches = 0;

  for (const pattern of EXPERT_PATTERNS) {
    if (pattern.test(text)) {
      expertMatches++;
    }
  }
  for (const pattern of DEEP_PATTERNS) {
    if (pattern.test(text)) {
      deepMatches++;
    }
  }
  for (const pattern of MEDIUM_PATTERNS) {
    if (pattern.test(text)) {
      mediumMatches++;
    }
  }

  score += expertMatches * 12;
  score += deepMatches * 8;
  score += mediumMatches * 5;

  // Signal C: Semantic Complexity Detections (Preventing Double Boost)
  // Architecture Detection Bonus - Only applied if no expert keywords were matched directly
  if (expertMatches === 0) {
    const hasArchitecture = /architect|scal|distribut|orchestrat|system\s*design|microservice|multi\s*tenant|vector|rag|agent|llm|agi|redis|kafka|websocket|sharding|cache|kubernetes|docker|postgres|pubsub/i.test(text);
    if (hasArchitecture) {
      score += 10;
    }
  }

  // Deep Complexity Detection Bonus - Only applied if no deep keywords were matched directly
  if (deepMatches === 0) {
    const hasDeepComplexity = /internal|deep|under\s*the\s*hood|how\s*it\s*works|workflow|mechanis|render|lifecycle|optimiz|debug/i.test(text);
    if (hasDeepComplexity) {
      score += 5;
    }
  }

  // Signal D: System Design Verbs (design, build, create, architect, implement)
  const hasDesignVerbs = /\b(design|build|create|architect|implement)\b/i.test(text);
  if (hasDesignVerbs) {
    score += 15;
  }

  // Signal E: Code Complexity Detection
  if (CODE_PATTERNS.test(text)) {
    score += 10;
  }

  // Signal F: Business Complexity Detection
  if (BUSINESS_PATTERNS.test(text)) {
    score += 10;
  }

  // Signal G: File Context Detection
  if (FILE_PATTERNS.test(text)) {
    score += 10;
  }

  // Signal H: Multi-Question Detection
  let isMultiQuestion = false;
  const questionCount = (text.match(/\?/g) || []).length;
  if (questionCount > 1) {
    isMultiQuestion = true;
  }
  const multiQuestionPattern = /\b(and|also|but)\b.*\b(how|what|why|explain|meaning|differ|optimization|work)\b/i;
  if (multiQuestionPattern.test(text)) {
    isMultiQuestion = true;
  }
  if (isMultiQuestion) {
    score += 15;
  }

  // Signal: Direct Deep Domain Triggers
  if (/optimize|scale|architecture|derive|derivation|proof|impact|real\sworld|deeply|advise/i.test(text)) {
    score += 50;
  }

  // Signal I: Intent Support & Advanced Coding Detection
  if (intentLower) {
    if (intentLower === "learn") {
      score += 10;
    } else if (["code", "business", "compare"].includes(intentLower)) {
      score += 15;
    }

    // Advanced coding detection: large query debug/refactor requests
    if (intentLower === "code" && text.length > 100) {
      score += 15;
    }
  }

  // Cap maximum raw score at 100
  if (score > 100) {
    score = 100;
  }

  // 5. DEPTH THRESHOLD CLASSIFICATION
  let depth: DepthLevel = "short";

  if (score >= 90) {
    depth = "expert";
  } else if (score >= 55) {
    depth = "deep";
  } else if (score >= 25) {
    depth = "medium";
  } else {
    depth = "short";
  }

  return { depth, score };
}

/**
 * Returns prompt instructions tailored to the evaluated depth level.
 * 
 * @param depth The target DepthLevel.
 * @returns Prompt string instructions for the LLM.
 */
export function getDepthInstructions(depth: DepthLevel): string {
  switch (depth) {
    case "short":
      return "Respond in 1-3 lines.";
    case "medium":
      return "Provide concise explanation with key points.";
    case "deep":
      return "Provide detailed explanation with internal mechanics.";
    case "expert":
      return "Provide architecture-level reasoning, tradeoffs, edge cases, scalability considerations and production guidance.";
  }
}