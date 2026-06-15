export type Lang = "en" | "hi" | "gu";

interface LangState {
  lang: Lang;
  style: "normal" | "hinglish";
}

export function detectLanguage(
  input: string,
  prevState?: LangState
): LangState {
  const text = input.trim();
  const lower = text.toLowerCase();

  let style: "normal" | "hinglish" = "normal";

  /* -------------------------------
   ⚡ USER FORCE COMMAND (HIGHEST PRIORITY)
  -------------------------------- */
  if (lower.includes("english me") || lower.includes("speak english")) {
    return { lang: "en", style: "normal" };
  }

  if (lower.includes("hindi me") || lower.includes("speak hindi")) {
    return { lang: "hi", style: "normal" };
  }

  if (lower.includes("gujarati") || lower.includes("gujarati ma")) {
    return { lang: "gu", style: "normal" };
  }

  /* -------------------------------
   🧠 SCRIPT DETECTION (STRONG)
  -------------------------------- */
  if (/[\u0A80-\u0AFF]/.test(text)) {
    return { lang: "gu", style: "normal" };
  }

  if (/[\u0900-\u097F]/.test(text)) {
    return { lang: "hi", style: "normal" };
  }

  /* -------------------------------
   🧠 WORD SCORING
  -------------------------------- */
  let score = {
    en: 0,
    hi: 0,
    gu: 0,
  };

  // Hindi words
  [
    "kya", "kaise", "kyu", "hai", "bhai",
    "kar", "raha", "tum", "main"
  ].forEach((w) => {
    if (lower.includes(w)) score.hi += 2;
  });

  // Gujarati words
  [
    "kem", "cho", "majama", "shu",
    "tame", "saru", "chu"
  ].forEach((w) => {
    if (lower.includes(w)) score.gu += 2;
  });

  // English words
  [
    "hello", "hey", "hi", "how",
    "what", "why", "good", "morning",
    "bro", "dude"
  ].forEach((w) => {
    if (lower.includes(w)) score.en += 2;
  });

  /* -------------------------------
   🎭 HINGLISH DETECT
  -------------------------------- */
  if (score.hi > 0 && score.en > 0) {
    style = "hinglish";

    // 🔥 IMPORTANT: Hinglish me language lock karo
    if (prevState?.lang === "hi") {
      return { lang: "hi", style: "hinglish" };
    }

    return { lang: "hi", style };
  }

  /* -------------------------------
   🧠 FINAL LANGUAGE PICK
  -------------------------------- */
  let detected: Lang = "en";

  if (score.gu > score.hi && score.gu > score.en) {
    detected = "gu";
  } else if (score.hi > score.en) {
    detected = "hi";
  } else {
    detected = "en";
  }

  /* -------------------------------
   🔒 LANGUAGE LOCK (MOST IMPORTANT 🔥)
  -------------------------------- */
  if (prevState) {
    const isWeakInput =
      text.length < 15 &&
      !text.includes("?") &&
      score.en + score.hi + score.gu < 2;

    // agar input weak hai → previous language continue
    if (isWeakInput) {
      return prevState;
    }

    // agar language suddenly change ho rahi hai bina command ke
    if (detected !== prevState.lang) {
      return prevState;
    }
  }

  return { lang: detected, style };
}