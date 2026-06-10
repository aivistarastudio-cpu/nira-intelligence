import React from "react";
import { renderInline } from "../utils/inlineRenderer";

export const StepsBlock = React.memo(function StepsBlock({ block }: { block: any }) {
  return (
    <div className="my-10 w-full space-y-8 select-text animate-premium-fade">
      {block.steps?.map((step: any, idx: number) => (
        <div key={idx} className="flex gap-5 items-start group/step">
          <div className="flex flex-col items-center shrink-0">
            <div className="w-[30px] h-[30px] flex items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 text-[14px] font-bold tracking-tighter group-hover/step:bg-indigo-500/20 group-hover/step:border-indigo-500/40 group-hover/step:text-indigo-300 transition-all duration-300">
              {idx + 1}
            </div>
            {idx < block.steps.length - 1 && (
              <div className="w-[2px] h-16 bg-gradient-to-b from-[var(--nira-border)] to-transparent mt-3 opacity-60 rounded-full" />
            )}
          </div>

          <div className="flex-1 min-w-0 pt-0.5">
            <div className="text-[var(--nira-text)] font-semibold leading-[1.8] text-body-lg mb-2">
              {renderInline(step.title || "")}
            </div>

            {step.items && step.items.length > 0 && (
              <ul className="mt-3 space-y-3 text-[var(--nira-subtext)] pl-5 list-disc marker:text-[var(--nira-subtext)]/50">
                {step.items.map((item: string, i: number) => (
                  <li key={i} className="leading-[1.8] text-body group-hover/step:text-[var(--nira-text)] transition-colors duration-200">
                    {renderInline(item || "")}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
});
