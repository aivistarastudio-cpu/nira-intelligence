import React from "react";
import { blockSpacing } from "../utils/typography";

export const StatsBlock = React.memo(function StatsBlock({ block }: { block: any }) {
  return (
    <div
      className={`
        ${blockSpacing}
        w-full
        grid
        grid-cols-2
        md:grid-cols-4
        gap-5
      `}
    >
      {block.items.map((item: any, idx: number) => (
        <div
          key={idx}
          className="
            rounded-2xl
            border border-[var(--nira-border)]
            bg-[var(--nira-surface)]
            px-5 py-6
            backdrop-blur-xl
            hover:bg-[var(--nira-text)]/[0.04]
            transition-colors duration-300
          "
        >
          <div className="text-3xl font-semibold text-[var(--nira-text)]">
            {item.value}
          </div>
          <div className="mt-3 text-[13px] font-medium uppercase tracking-widest text-[var(--nira-subtext)]">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
});
