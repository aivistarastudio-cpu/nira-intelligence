import React from "react";
import { blockSpacing } from "../utils/typography";
import { renderInline } from "../utils/inlineRenderer";

export const NiraInsightBlock = React.memo(function NiraInsightBlock({ block }: { block: any }) {
  return (
    <div
      className={`
        ${blockSpacing}
        w-full
        rounded-3xl
        border border-[var(--nira-accent)]/25
        bg-gradient-to-b
        from-[var(--nira-accent)]/[0.08]
        to-[var(--nira-bg)]
        px-8 py-8
        backdrop-blur-xl
      `}
    >
      <div className="font-display text-[18px] font-[600] text-[var(--nira-accent)] mb-4 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[var(--nira-accent)] animate-pulse" />
        NIRA Insight
      </div>
      <div className="font-sans text-[17px] font-[400] leading-[1.8] text-[var(--nira-text)]">
        {renderInline(block.content || "")}
      </div>
    </div>
  );
});
