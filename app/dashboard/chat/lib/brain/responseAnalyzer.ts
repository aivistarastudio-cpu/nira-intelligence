export type ResponseType =
  | "table"
  | "code"
  | "list"
  | "text";

/* 🔥 DETECT TYPE */
export function detectResponseType(text: string): ResponseType {
  const t = text.trim();

  if (t.includes("|") && t.includes("---")) return "table";
  if (t.includes("```")) return "code";

  const lines = t.split("\n");

  const listCount = lines.filter(
    (line) =>
      line.trim().startsWith("- ") ||
      line.trim().startsWith("* ") ||
      /^\d+\.\s/.test(line.trim())
  ).length;

  if (listCount >= 2) return "list";

  return "text";
}

/* 🔥 MAIN ANALYZER (IMPORTANT) */
export function analyzeResponse(text: string): string {
  let t = text.trim();

  /* -------------------------------
   ❌ REMOVE BORING STARTS
  -------------------------------- */
  t = t.replace(
    /^(Sure|Here is|Here are|Of course|Certainly|Alright)[\s,:-]*/i,
    ""
  );

  /* -------------------------------
   ✨ ADD HUMAN START (SMART)
  -------------------------------- */
  const starters = [
    "Dekho simple hai 👇",
    "Straight bolu to…",
    "Scene aisa hai 👇",
    "Short me samajh 👇",
  ];

  if (t.length > 80 && !/👇/.test(t)) {
    const random =
      starters[Math.floor(Math.random() * starters.length)];
    t = random + "\n\n" + t;
  }

  /* -------------------------------
   🧹 CLEAN TEXT
  -------------------------------- */
  t = t
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s{2,}/g, " ")
    .trim();

  /* -------------------------------
   ❤️ HUMAN TOUCH (VERY LIGHT)
  -------------------------------- */
  if (!/[😊😄🔥]/.test(t) && t.length > 120) {
    t += " 😊";
  }

  return t;
}