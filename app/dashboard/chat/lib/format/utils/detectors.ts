import { detectFormatterIntent } from "../formatterIntent";

export const safeDetectFormatterIntent = (txt: string): string => {
  try {
    if (typeof detectFormatterIntent === "function") {
      return detectFormatterIntent(txt);
    }
  } catch {}
  const trimmed = txt.trim();
  if (trimmed.startsWith("###") || trimmed.startsWith("##") || trimmed.startsWith("#")) return "heading";
  if (trimmed.startsWith(">")) return "quote";
  if (trimmed.toLowerCase().startsWith("step")) return "steps";
  if (/^(⚠️|❗|🔥|💡|ℹ️|✅)/.test(trimmed)) return "alert";
  if (trimmed.startsWith("-") || trimmed.startsWith("*") || /^\d+\./.test(trimmed)) return "list";
  return "paragraph";
};

export const checkIsStopBlock = (trimLine: string, rawLine: string) => {
  const intent = safeDetectFormatterIntent(trimLine);
  return (
    trimLine.startsWith("#") ||
    intent === "heading" ||
    (trimLine.endsWith(":") && trimLine.length < 50 && /^[A-Z]/.test(trimLine)) ||
    /^(-{3,}|\*{3,}|_{3,})$/.test(trimLine) ||
    trimLine.startsWith("|") ||
    /^\s*```/.test(rawLine) ||
    trimLine.startsWith("$$") ||
    trimLine.startsWith("\\[") ||
    /^([-*+]|\d+\.)?\s*\[( |x)\]/i.test(trimLine) ||
    /^Metric:\s*/i.test(trimLine) ||
    /^Timeline:\s*/i.test(trimLine) ||
    /^(?:NIRA\s+)?Insight:\s*/i.test(trimLine) ||
    /^Stats:\s*/i.test(trimLine) ||
    /^Image:\s*/i.test(trimLine) ||
    /^Map:\s*/i.test(trimLine) ||
    /^Warning:\s*/i.test(trimLine) ||
    /^Tip:\s*/i.test(trimLine) ||
    /^Summary:\s*/i.test(trimLine) ||
    /^Q(?:uestion)?:\s*/i.test(trimLine) ||
    /^FAQ:\s*$/i.test(trimLine)
  );
};
