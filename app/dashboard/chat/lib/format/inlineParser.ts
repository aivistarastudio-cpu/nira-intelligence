export type InlineToken =
  | { type: "text"; content: string }
  | { type: "bold"; content: string }
  | { type: "italic"; content: string }
  | { type: "code"; content: string };

export function parseInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];

  let i = 0;

  while (i < text.length) {
    // 🔥 BOLD
    if (text.startsWith("**", i)) {
      const end = text.indexOf("**", i + 2);
      if (end !== -1) {
        tokens.push({
          type: "bold",
          content: text.slice(i + 2, end),
        });
        i = end + 2;
        continue;
      }
    }

    // 🔥 CODE
    if (text.startsWith("`", i)) {
      const end = text.indexOf("`", i + 1);
      if (end !== -1) {
        tokens.push({
          type: "code",
          content: text.slice(i + 1, end),
        });
        i = end + 1;
        continue;
      }
    }

    // 🔥 ITALIC
    if (text.startsWith("*", i)) {
      const end = text.indexOf("*", i + 1);
      if (end !== -1) {
        tokens.push({
          type: "italic",
          content: text.slice(i + 1, end),
        });
        i = end + 1;
        continue;
      }
    }

    // 🔥 TEXT
    let next = text.length;

    const b = text.indexOf("**", i);
    const c = text.indexOf("`", i);
    const it = text.indexOf("*", i);

    if (b !== -1) next = Math.min(next, b);
    if (c !== -1) next = Math.min(next, c);
    if (it !== -1) next = Math.min(next, it);

    tokens.push({
      type: "text",
      content: text.slice(i, next),
    });

    i = next;
  }

  return tokens;
}