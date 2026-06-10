import React from "react";
import { blockSpacing } from "../utils/typography";
import { renderInline } from "../utils/inlineRenderer";

export const HighlightBlock = React.memo(function HighlightBlock({ block }: { block: any }) {
  const variant = block.variant || "default";
  
  const getHighlightConfig = (v: string) => {
    switch (v) {
      case "default": return { bg: "bg-indigo-500/[0.05] dark:bg-indigo-500/[0.02]", border: "border-indigo-500/30", accent: "bg-indigo-500/20 border-indigo-500/40 text-indigo-600 dark:text-indigo-300", emoji: "👉" };
      case "important": return { bg: "bg-blue-500/[0.05] dark:bg-blue-500/[0.02]", border: "border-blue-500/30", accent: "bg-blue-500/20 border-blue-500/40 text-blue-600 dark:text-blue-300", emoji: "💡" };
      case "warning": return { bg: "bg-amber-500/[0.05] dark:bg-amber-500/[0.02]", border: "border-amber-500/30", accent: "bg-amber-500/20 border-amber-500/40 text-amber-600 dark:text-amber-300", emoji: "⚠️" };
      case "success": return { bg: "bg-emerald-500/[0.05] dark:bg-emerald-500/[0.02]", border: "border-emerald-500/30", accent: "bg-emerald-500/20 border-emerald-500/40 text-emerald-600 dark:text-emerald-300", emoji: "✅" };
      default: return { bg: "bg-[var(--nira-surface)]", border: "border-[var(--nira-border)]", accent: "bg-[var(--nira-text)]/[0.04] border-[var(--nira-border)] text-[var(--nira-text)]", emoji: "👉" };
    }
  };

  const config = getHighlightConfig(variant);

  return (
    <div
      className={`${blockSpacing} w-full px-6 py-5 rounded-2xl select-text shadow-sm border flex gap-4 items-start ${config.bg} ${config.border} animate-premium-fade`}
    >
      <span className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-xl border text-[16px] mt-0.5 select-none ${config.accent}`}>
        {config.emoji}
      </span>
      <div className="leading-[1.8] flex-1 text-body text-[var(--nira-text)] font-[500] pt-0.5">
        {renderInline(block.content || "")}
      </div>
    </div>
  );
});
