import React from "react";
import { renderInline } from "../utils/inlineRenderer";

export const SummaryBlock = React.memo(function SummaryBlock({ block }: { block: any }) {
  return (
    <div className="mt-16 mb-10 w-full text-center select-text animate-premium-fade relative py-10 px-8 overflow-hidden rounded-[2rem] border border-[var(--nira-border)] bg-[var(--nira-surface)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--nira-text)_0%,transparent_100%)] opacity-[0.03] pointer-events-none" />
      
      <div className="text-[10px] text-[var(--nira-subtext)] tracking-[0.35em] uppercase mb-5 select-none font-bold relative z-10">
        CONCLUSION & INSIGHTS
      </div>
      <div className="text-[var(--nira-text)] text-body-lg w-full mx-auto relative font-[400] tracking-normal z-10 italic">
        <span className="absolute -left-8 -top-3 text-[var(--nira-subtext)]/30 select-none text-5xl font-serif">“</span>
        {renderInline(block.content || "")}
        <span className="absolute -right-8 -bottom-1 text-[var(--nira-subtext)]/30 select-none text-5xl font-serif">”</span>
      </div>
    </div>
  );
});
