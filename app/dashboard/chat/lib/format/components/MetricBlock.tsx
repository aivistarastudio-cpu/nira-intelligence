import React from "react";
import { blockSpacing } from "../utils/typography";

export const MetricBlock = React.memo(function MetricBlock({ block }: { block: any }) {
  return (
    <div
      className={`
        ${blockSpacing}
        w-full
        rounded-[2rem]
        border border-[var(--nira-border)]
        bg-[var(--nira-surface)]
        backdrop-blur-xl
        px-8 py-8
        shadow-sm
      `}
    >
      <div className="text-[48px] md:text-[60px] font-semibold tracking-[-0.04em] text-[var(--nira-text)]">
        {block.value}
      </div>
      <div className="mt-2 text-[15px] uppercase tracking-[0.2em] text-[var(--nira-subtext)] font-medium">
        {block.title}
      </div>
    </div>
  );
});
