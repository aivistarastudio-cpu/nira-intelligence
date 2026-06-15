import React, { useState } from "react";
import { blockSpacing } from "../utils/typography";

// ==========================================
// 🚀 MEMOIZED PREMIUM CODE BLOCK COMPONENT
// ==========================================
export const CodeBlock = React.memo(function CodeBlock({ block, codeHtml }: { block: { content?: string; lang?: string }; codeHtml: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(block.content || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy", e);
    }
  };

  return (
    <div className={`${blockSpacing} w-full rounded-[24px] border border-[var(--nira-border)] bg-[#0A0A0A] dark:bg-[#0A0A0A] overflow-hidden transition-all duration-300 group/code shadow-sm`}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.04] select-none">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-[12px] h-[12px] rounded-full bg-red-500/80 border border-white/10" />
            <div className="w-[12px] h-[12px] rounded-full bg-yellow-500/80 border border-white/10" />
            <div className="w-[12px] h-[12px] rounded-full bg-green-500/80 border border-white/10" />
          </div>
          <span className="text-caption font-display text-white/40 uppercase tracking-[0.25em] font-semibold mt-[2px]">
            {block.lang || "code"}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-white/10 text-[#737373] hover:text-[#E5E5E5] rounded-md text-caption font-medium active:scale-95 transition-all duration-200 cursor-pointer"
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-emerald-400 animate-premium-scale">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[11px]">Copied</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-[#737373] group-hover/code:text-[#E5E5E5]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125 .504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5" />
              </svg>
              <span className="uppercase tracking-wider text-[11px] font-semibold text-[#737373] group-hover/code:text-[#E5E5E5]">Copy</span>
            </>
          )}
        </button>
      </div>

      <pre className="px-6 py-6 overflow-x-auto text-code text-[#E5E5E5] select-text bg-transparent custom-scrollbar">
        <code
          className="bg-transparent block"
          dangerouslySetInnerHTML={{ __html: codeHtml }}
        />
      </pre>
    </div>
  );
});
