import { Block, ListItem } from "../types";

export const processInlineMath = (textVal: string): string => {
  return textVal.replace(/\$(?!\s)(.+?)(?<!\s)\$/g, (match: string, expr: string): string => {
    const trimmedExpr = expr.trim();
    
    // 1. Skip simple currency representations like $10 or $20.5
    if (/^\d+([.,]\d+)?$/.test(trimmedExpr)) {
      return match;
    }
    
    // 2. Skip numeric ranges like "10 to 20" or "10 - 20"
    if (/^\d+([.,]\d+)?\s*(to|and|-)\s*\d+([.,]\d+)?$/.test(trimmedExpr)) {
      return match;
    }

    let stack = 0;

    for (let idx = 0; idx < expr.length; idx++) {
      const char = expr[idx];

      if (char === "{") stack++;
      else if (char === "}") stack--;

      if (stack < 0) {
        return `\`${expr}\``; // ❌ invalid braces
      }
    }

    const isValid = stack === 0;

    if (!isValid) {
      return `\`${expr}\``; // ❌ fallback
    }

    return `<<MATH>>${expr}<</MATH>>`;
  });
};

export const applyMathToBlocks = (blocks: Block[]) => {
  blocks.forEach((b) => {
    if (b.type === "paragraph" && b.content) {
      b.content = processInlineMath(b.content);
    } else if (b.type === "heading" && b.content) {
      b.content = processInlineMath(b.content);
    } else if (b.type === "quote" && b.content) {
      b.content = processInlineMath(b.content);
    } else if (b.type === "highlight" && b.content) {
      b.content = processInlineMath(b.content);
    } else if (b.type === "summary" && b.content) {
      b.content = processInlineMath(b.content);
    } else if (
      (b.type === "warning" || b.type === "tip" || b.type === "info" || b.type === "success") &&
      b.content
    ) {
      b.content = processInlineMath(b.content);
    } else if (b.type === "emoji" && b.content) {
      b.content = processInlineMath(b.content);
    } else if (b.type === "niraInsight" && b.content) {
      b.content = processInlineMath(b.content);
    } else if (b.type === "list" && b.items) {
      const processListItems = (items: ListItem[]) => {
        items.forEach((item) => {
          if (item.text) item.text = processInlineMath(item.text);
          if (item.children) processListItems(item.children);
        });
      };
      processListItems(b.items);
    } else if (b.type === "checklist" && b.items) {
      b.items.forEach((item) => {
        if (item.text) item.text = processInlineMath(item.text);
      });
    } else if (b.type === "steps" && b.steps) {
      b.steps.forEach((step) => {
        if (step.title) step.title = processInlineMath(step.title);
        if (step.items) {
          step.items = step.items.map((item) => processInlineMath(item));
        }
      });
    } else if (b.type === "table") {
      if (b.headers) {
        b.headers = b.headers.map((h) => processInlineMath(h));
      }
      if (b.rows) {
        b.rows = b.rows.map((row) => row.map((cell) => processInlineMath(cell)));
      }
    } else if (b.type === "metric") {
      const m = b as unknown as { title?: string; value?: string };
      if (m.title) m.title = processInlineMath(m.title);
      if (m.value) m.value = processInlineMath(m.value);
    } else if (b.type === "stats") {
      const s = b as unknown as { items?: { label: string; value: string }[] };
      if (s.items) {
        s.items.forEach((item) => {
          if (item.label) item.label = processInlineMath(item.label);
          if (item.value) item.value = processInlineMath(item.value);
        });
      }
    } else if (b.type === "timeline") {
      const t = b as unknown as { items?: { year: string; label: string }[] };
      if (t.items) {
        t.items.forEach((item) => {
          if (item.label) item.label = processInlineMath(item.label);
        });
      }
    } else if (b.type === "image") {
      const img = b as unknown as { query?: string };
      if (img.query) img.query = processInlineMath(img.query);
    } else if (b.type === "map") {
      const mp = b as unknown as { title?: string; address?: string };
      if (mp.title) mp.title = processInlineMath(mp.title);
      if (mp.address) mp.address = processInlineMath(mp.address);
    } else if (b.type === "faq" && b.items) {
      const f = b as unknown as { items?: { question: string; answer: string }[] };
      if (f.items) {
        f.items.forEach((item) => {
          if (item.question) item.question = processInlineMath(item.question);
          if (item.answer) item.answer = processInlineMath(item.answer);
        });
      }
    }
  });
};
