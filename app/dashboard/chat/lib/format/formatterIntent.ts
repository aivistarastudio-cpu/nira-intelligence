export type FormatterIntent =
  | "steps"
  | "faq"
  | "table"
  | "alert"
  | "checklist"
  | "quote"
  | "list"
  | "heading"
  | "normal";

export function detectFormatterIntent(line: string): FormatterIntent {
  const text = line.trim();

  if (!text) return "normal";

  /* -------------------------------
   🔥 STEPS
  ------------------------------- */
  if (/^step\s*\d+[:.)-]?/i.test(text)) return "steps";

  /* -------------------------------
   🔥 CHECKLIST
  ------------------------------- */
  if (/^- \[( |x)\]/i.test(text)) return "checklist";

  /* -------------------------------
   🔥 HEADING (NEW)
  ------------------------------- */
  if (/^#{1,6}\s/.test(text)) return "heading";

  /* -------------------------------
   🔥 QUOTE
  ------------------------------- */
  if (text.startsWith(">")) return "quote";

  /* -------------------------------
   🔥 TABLE
  ------------------------------- */
  if (text.startsWith("|") && text.includes("|")) return "table";

  /* -------------------------------
   🔥 ALERT (UPGRADED)
  ------------------------------- */
  if (/^(⚠️|❗|🔥|💡|ℹ️|✅)\s/.test(text)) return "alert";

  /* -------------------------------
   🔥 FAQ
  ------------------------------- */
  if (/^(q:|question:)/i.test(text) || text.endsWith("?")) return "faq";

  /* -------------------------------
   🔥 LIST (UPGRADED)
  ------------------------------- */
  if (/^(\d+\.\s|[-•]\s)/.test(text)) return "list";

  /* -------------------------------
   🧠 DEFAULT
  ------------------------------- */
  return "normal";
}