export function generateSmartNextStep(
  intent: string,
  input: string,
  emotion: string
) {
  const text = input.toLowerCase().trim();

  const has = (words: string[]) =>
    words.some((w) => text.includes(w));

  /* -------------------------------
   ❌ NEVER SHOW (IMPORTANT 🔥)
  ------------------------------- */
  if (
    intent === "casual" ||
    text.length < 20
  ) {
    return "";
  }

  /* -------------------------------
   💻 CODE (SMART)
  ------------------------------- */
  if (intent === "code") {
    if (has(["error", "bug", "fix"])) {
      return "Agar issue abhi bhi aa raha ho to error share kar, main fix kar deta hoon.";
    }

    return "Agar chahe to main isko optimize ya production-ready bhi bana sakta hoon.";
  }

  /* -------------------------------
   🔢 STEPS
  ------------------------------- */
  if (intent === "steps") {
    if (has(["install", "setup"])) {
      return "Agar chahe to main iska complete setup ya deployment bhi guide kar sakta hoon.";
    }

    return "Agar tu chahe to main iska real project example bhi dikha sakta hoon.";
  }

  /* -------------------------------
   📘 EXPLAIN
  ------------------------------- */
  if (intent === "explain") {
    if (emotion === "confused") {
      return "Agar thoda confusing laga ho to bol, main aur simple bana deta hoon.";
    }

    if (has(["example"])) {
      return "";
    }

    return "Agar chahe to main iska ek simple real-life example bhi de sakta hoon.";
  }

  /* -------------------------------
   💼 BUSINESS
  ------------------------------- */
  if (intent === "business") {
    return "Agar chahe to main iska execution plan ya earning model bhi bana sakta hoon.";
  }

  /* -------------------------------
   📊 COMPARE
  ------------------------------- */
  if (intent === "compare") {
    return "Agar chahe to main tere use-case ke hisab se best option suggest kar deta hoon.";
  }

  /* -------------------------------
   📖 STORY
  ------------------------------- */
  if (intent === "story") {
    return ""; // story me kabhi suggestion nahi
  }

  /* -------------------------------
   🔥 FALLBACK (RARE)
  ------------------------------- */
  return "";
}