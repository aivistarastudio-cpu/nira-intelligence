export type EmotionType =
  | "normal"
  | "confused"
  | "frustrated"
  | "excited"
  | "happy"
  | "sad"
  | "angry"
  | "curious"
  | "love"
  | "urgent"
  | "respect"
  | "thinking"
  | "planning"
  | "decision"
  | "creative"
  | "technical";

type ScoreMap = Record<EmotionType, number>;

export function detectEmotion(input: string): EmotionType[] {
  const text = input.toLowerCase();

  const score: ScoreMap = {
    normal: 0,
    confused: 0,
    frustrated: 0,
    excited: 0,
    happy: 0,
    sad: 0,
    angry: 0,
    curious: 0,
    love: 0,
    urgent: 0,
    respect: 0,
    thinking: 0,
    planning: 0,
    decision: 0,
    creative: 0,
    technical: 0,
  };

  const add = (type: EmotionType, value: number) => {
    score[type] += value;
  };

  /* -------------------------------
   💻 TECHNICAL & FRUSTRATION BOOST
  -------------------------------- */
  const techKeywords = [
    "react", "nextjs", "typescript", "bug", "api", "database", "code", "supabase", "error",
    "javascript", "node", "express", "mongodb", "postgres", "sql", "docker", "kubernetes",
    "redis", "tailwind", "css", "html", "git", "github", "vercel", "aws", "firebase", "prisma"
  ];
  const frustrationKeywords = [
    "error", "bug", "failed", "crash", "undefined", "cannot", "not working", "infinite loop"
  ];

  const hasTech = techKeywords.some(w => text.includes(w));
  const hasFrustration = frustrationKeywords.some(w => text.includes(w));

  if (hasTech) {
    add("technical", 3);
  }

  if (hasTech && hasFrustration) {
    add("frustrated", 5);
    add("urgent", 4);
  }

  /* -------------------------------
   😤 FRUSTRATED
  -------------------------------- */
  if (["error", "bug", "issue", "not working", "fail"].some(w => text.includes(w))) {
    add("frustrated", 3);
  }

  /* -------------------------------
   😡 ANGRY
  -------------------------------- */
  if (["hate", "bakwas", "annoying", "irritating"].some(w => text.includes(w))) {
    add("angry", 3);
  }

  /* -------------------------------
   🤔 CONFUSED
  -------------------------------- */
  const confusedKeywords = [
    "mujhe samaj nahi", "samajh nahi", "kya ho raha", "kyun nahi chal", "not working", "why it is not",
    "stuck", "lost", "kya karu", "not sure", "confuse", "gabar", "mushkil", "problem"
  ];
  if (confusedKeywords.some(w => text.includes(w))) {
    add("confused", 4);
  }
  if (text.includes("??")) {
    add("confused", 2);
  }

  /* -------------------------------
   🧠 CURIOUS
  -------------------------------- */
  const curiousKeywords = [
    "tell me", "explain", "detail", "samjha", "seekhna", "what is", "how", "why", "who", "kya", "kaise", "kyu"
  ];
  if (curiousKeywords.some(w => text.includes(w))) {
    const hasConfusedPhrases = ["samajh nahi", "nahi chal", "not working", "stuck"].some(w => text.includes(w));
    if (!hasConfusedPhrases) {
      add("curious", 3);
    }
  }

  /* -------------------------------
   🧠 THINKING
  -------------------------------- */
  const thinkingKeywords = ["architecture", "agi", "reasoning", "system design", "deep thinking", "concept", "theory", "explain deeply"];
  if (thinkingKeywords.some(w => text.includes(w))) {
    add("thinking", 3);
  }

  /* -------------------------------
   📋 PLANNING
  -------------------------------- */
  const planningKeywords = ["startup", "roadmap", "strategy", "business plan", "future planning", "schedule", "plan", "milestone"];
  if (planningKeywords.some(w => text.includes(w))) {
    add("planning", 3);
  }

  /* -------------------------------
   ⚖️ DECISION
  -------------------------------- */
  const hasDecision = [
    "compare", "versus", "which is better", "should i choose", "recommendation",
    "difference between", "choose between"
  ].some(w => text.includes(w)) || /\bvs\b/i.test(text);

  if (hasDecision) {
    add("decision", 3);
  }

  /* -------------------------------
   🎨 CREATIVE
  -------------------------------- */
  const creativeKeywords = ["story", "script", "design", "logo", "cinematic", "branding", "write a", "poem", "generate"];
  if (creativeKeywords.some(w => text.includes(w))) {
    add("creative", 3);
  }

  /* -------------------------------
   🚨 URGENT
  -------------------------------- */
  if (["urgent", "jaldi", "asap", "fast"].some(w => text.includes(w))) {
    add("urgent", 4);
  }

  /* -------------------------------
   ❤️ LOVE / POSITIVE
  -------------------------------- */
  if (["thanks", "thank you", "love", "mast", "great"].some(w => text.includes(w))) {
    add("love", 3);
    add("happy", 2);
  }

  /* -------------------------------
   🔥 EXCITED
  -------------------------------- */
  if (["wow", "amazing", "🔥", "awesome"].some(w => text.includes(w))) {
    add("excited", 3);
  }
  if (text.includes("!!!")) {
    add("excited", 2);
  }

  /* -------------------------------
   😔 SAD
  -------------------------------- */
  if (["sad", "dukhi", "depressed"].some(w => text.includes(w))) {
    add("sad", 3);
  }

  /* -------------------------------
   🙏 RESPECT
  -------------------------------- */
  if (["please", "sir", "kindly"].some(w => text.includes(w))) {
    add("respect", 2);
  }

  /* -------------------------------
   🔠 CAPS CHECK (ANGER BOOST)
  -------------------------------- */
  if (input.length > 5 && input === input.toUpperCase()) {
    add("angry", 2);
  }

  /* -------------------------------
   🧠 PRIORITY WEIGHTS
  -------------------------------- */
  const priority: Record<EmotionType, number> = {
  urgent: 13,
  angry: 12,
  frustrated: 11,
  technical: 10,
  decision: 9,
  planning: 8,
  thinking: 7,
  creative: 6,
  curious: 5,
  confused: 4,
  sad: 3,
  happy: 3,
  love: 3,
  excited: 2,
  respect: 1,
  normal: 0,
};

  /* -------------------------------
   🏆 FINAL DECISION (TOP 2)
  -------------------------------- */
  const sorted = Object.entries(score)
    .filter(([_, v]) => v > 0)
    .sort(
      (a, b) =>
        b[1] + priority[b[0] as EmotionType] -
        (a[1] + priority[a[0] as EmotionType])
    );

  if (sorted.length === 0) {
    return ["normal"];
  }

  return sorted.slice(0, 2).map(e => e[0] as EmotionType);
}

/* ================================
🔥 EMOJI ENGINE V3 (SAFE)
================================ */
export function getEmotionEmoji(emotions: EmotionType[]): string {
  const emojiMap: Record<EmotionType, string> = {
    frustrated: "😤",
    confused: "🤔",
    excited: "🔥",
    happy: "😄",
    sad: "😔",
    angry: "😡",
    curious: "🧠",
    love: "❤️",
    urgent: "🚨",
    respect: "🙏",
    thinking: "🧠",
    planning: "📋",
    decision: "⚖️",
    creative: "🎨",
    technical: "💻",
    normal: "",
  };

  const primary = emotions[0] || "normal";

  return emojiMap[primary] || "";
}