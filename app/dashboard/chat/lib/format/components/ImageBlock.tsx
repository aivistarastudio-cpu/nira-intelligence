import React from "react";
import { blockSpacing } from "../utils/typography";

export const ImageBlock = React.memo(function ImageBlock({ block }: { block: any }) {
  return (
    <div
      className={`
        ${blockSpacing}
        w-full
        rounded-3xl
        border border-[var(--nira-border)]
        bg-[var(--nira-surface)]
        p-8
      `}
    >
      <div className="text-[var(--nira-subtext)] text-[13px] font-medium uppercase tracking-wider mb-3">
        Image Query
      </div>
      <div className="text-[var(--nira-text)] text-body">
        {block.query}
      </div>
    </div>
  );
});
