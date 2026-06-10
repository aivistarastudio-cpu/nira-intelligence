import React from "react";
import { blockSpacing } from "../utils/typography";

export const TimelineBlock = React.memo(function TimelineBlock({ block }: { block: any }) {
  return (
    <div className={`${blockSpacing} w-full space-y-8`}>
      {block.items.map((item: any, idx: number) => (
        <div key={idx} className="flex gap-5 group/timeline">
          <div className="flex flex-col items-center">
            <div className="w-3.5 h-3.5 rounded-full bg-[var(--nira-accent)] border-[3px] border-[var(--nira-bg)] shadow-[0_0_0_1px_var(--nira-border)] group-hover/timeline:bg-[var(--nira-text)] transition-colors duration-300" />
            {idx !== block.items.length - 1 && (
              <div className="w-[2px] h-full bg-gradient-to-b from-[var(--nira-text)]/15 to-[var(--nira-text)]/5 mt-3 rounded-full" />
            )}
          </div>
          <div className="-mt-1.5 pb-2">
            <div className="text-[14px] font-mono font-medium text-[var(--nira-accent)] mb-1.5">
              {item.year}
            </div>
            <div className="text-body leading-[1.8] text-[var(--nira-text)]">
              {item.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});
