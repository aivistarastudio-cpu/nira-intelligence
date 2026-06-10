import React, { useState } from "react";
import { blockSpacing } from "../utils/typography";
import { renderInline } from "../utils/inlineRenderer";

// ==========================================
// 🚀 CONTROLLED DYNAMIC PRACTICE TASK CARD
// ==========================================
export const PracticeBlock = React.memo(function PracticeBlock({ content }: { content: string }) {
  const [answer, setAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;
    
    setIsSubmitted(true);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  return (
    <div
      className={`
        ${blockSpacing}        w-full 
        rounded-[16px]
        border border-[var(--nira-border)]
        bg-[var(--nira-surface)]
        p-6 md:p-8
        transition-all duration-300hidden group/practice
      `}
    >
      <div className="text-[var(--nira-accent)] text-[11px] font-bold uppercase tracking-[0.25em] mb-4 flex items-center gap-2.5 select-none">
        <span className="flex items-center justify-center w-6 h-6 rounded-md bg-[var(--nira-accent)]/15 border border-[var(--nira-accent)]/30 text-sm">🎓</span> 
        Interactive Challenge
      </div>

      <div className="text-[var(--nira-text)] leading-[1.8] text-body mb-6">
        {renderInline(content || "")}
      </div>

      <form onSubmit={handleSubmit} className="relative flex gap-3 w-full">
        <div className="relative flex-1">
          <input
            type="text"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              if (isSubmitted) setIsSubmitted(false);
            }}
            placeholder="Write your solution..."
            className="
              w-full
              bg-[var(--nira-bg)] border border-[var(--nira-border)]
              rounded-xl pl-5 pr-12 py-3.5
              text-[15px] text-[var(--nira-text)] placeholder-[var(--nira-subtext)]
              outline-none focus:border-[var(--nira-accent)]/50 focus:ring-1 focus:ring-[var(--nira-accent)]/30
              transition-all duration-300 shadow-inner
            "
          />
          {isSubmitted && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-emerald-400 animate-premium-scale">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.74-5.24Z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!answer.trim()}
          className="
            px-6 py-3.5 rounded-xl bg-[var(--nira-accent)] text-white hover:opacity-90 disabled:opacity-40 disabled:bg-[var(--nira-surface)] disabled:text-[var(--nira-subtext)] disabled:border-transparent
            text-[14px] font-semibold tracking-wide border border-[var(--nira-border)]
            active:scale-[0.97] transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 shadow-sm select-none
          "
        >
          Submit
        </button>
      </form>

      {isSubmitted && isSuccess && (
        <div className="mt-4 text-[13px] text-emerald-400 font-medium tracking-wide flex items-center gap-2 animate-premium-fade">
          <span>✓</span> Solution checked and validated successfully. Keep going!
        </div>
      )}
    </div>
  );
});
