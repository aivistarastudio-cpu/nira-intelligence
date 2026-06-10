import { Block } from "../types";

export const cleanBlocks = (blocksList: Block[]): Block[] => {
  const result: Block[] = [];

  for (let idx = 0; idx < blocksList.length; idx++) {
    const b = blocksList[idx];
    const prev = result[result.length - 1];

    // ❌ remove empty paragraphs/headings/quotes/etc.
    if (b.type === "paragraph" && !b.content?.trim()) continue;
    if (b.type === "heading" && !b.content?.trim()) continue;
    if (b.type === "quote" && !b.content?.trim()) continue;
    if (b.type === "math" && !b.content?.trim()) continue;
    if (b.type === "code" && !b.content?.trim()) continue;
    if (b.type === "niraInsight" && !b.content?.trim()) continue;

    // ❌ remove empty collections
    if (b.type === "list" && (!b.items || b.items.length === 0)) continue;
    if (b.type === "checklist" && (!b.items || b.items.length === 0)) continue;
    if (b.type === "steps" && (!b.steps || b.steps.length === 0)) continue;
    if (b.type === "stats" && (!(b as any).items || (b as any).items.length === 0)) continue;
    if (b.type === "timeline" && (!(b as any).items || (b as any).items.length === 0)) continue;
    if (b.type === "faq" && (!(b as any).items || (b as any).items.length === 0)) continue;

    // ❌ remove empty tables
    if (b.type === "table" && (!b.rows || b.rows.length === 0)) continue;

    // ❌ remove empty metrics
    if (b.type === "metric" && (!(b as any).title?.trim() || !(b as any).value?.trim())) continue;

    // ❌ remove duplicate divider
    if (b.type === "divider" && prev?.type === "divider") continue;

    // ❌ remove divider at start
    if (b.type === "divider" && result.length === 0) continue;

    // ❌ remove divider before heading
    if (b.type === "divider" && blocksList[idx + 1]?.type === "heading") continue;

    result.push(b);
  }

  return result;
};

export const addSmartSpacing = (blocksList: Block[]): Block[] => {
  const result: Block[] = [];

  for (let idx = 0; idx < blocksList.length; idx++) {
    const current = blocksList[idx];
    const prev = result[result.length - 1];

    // 🔥 spacing before heading
    if (current.type === "heading" && prev && prev.type !== "divider") {
      result.push({ type: "divider" });
    }

    result.push(current);
  }

  return result;
};
