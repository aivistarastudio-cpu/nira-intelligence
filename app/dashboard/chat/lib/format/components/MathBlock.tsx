import React from "react";
import katex from "katex";
import { blockSpacing } from "../utils/typography";

export const MathBlock = React.memo(function MathBlock({ block }: { block: any }) {
  try {
    const html = katex.renderToString(block.content || "", {
      throwOnError: false,
      displayMode: true,
    });
    return (
      <div
        className={`${blockSpacing} w-full py-6 px-8 overflow-x-auto text-center custom-scrollbar select-text bg-[var(--nira-surface)] border border-[var(--nira-border)] rounded-xl shadow-sm text-[var(--nira-text)] latex-display`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch {
    // 🔥 SAFE FALLBACK: Render neutral monospaced raw block during streaming, no red flashing error!
    return (
      <div className="w-full flex justify-center py-2 px-1">
        <pre className="font-mono text-[14px] leading-relaxed text-[var(--nira-subtext)] bg-[var(--nira-soft)]/50 border border-[var(--nira-border)]/50 p-4 rounded-xl overflow-x-auto w-full whitespace-pre-wrap">
          {block.content}
        </pre>
      </div>
    );
  }
});
