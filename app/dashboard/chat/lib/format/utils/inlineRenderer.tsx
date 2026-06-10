import React from "react";
import katex from "katex";
import { blockSpacing } from "./typography";

// ==========================================
// 💡 HIGH-PERFORMANCE STATIC INLINE RULES
// ==========================================
export const INLINE_RULES = [
  {
    regex: /^\$\$([\s\S]+?)\$\$/,
    render: (i: number, full: RegExpMatchArray) => {
      try {
        const html = katex.renderToString(full[1], {
          throwOnError: false,
          displayMode: true,
        });
        return (
          <div
            key={`inline-math-${i}`}
            className={`${blockSpacing} w-full py-4 px-5 overflow-x-auto text-center custom-scrollbar select-text bg-zinc-50 dark:bg-[#111111] border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-zinc-100 latex-display`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } catch {
        return <span key={`inline-math-fallback-${i}`} className="text-zinc-300">{full[0]}</span>;
      }
    },
  },
  {
    regex: /^\\\[([\s\S]*?)\\\]/, 
    render: (i: number, full: RegExpMatchArray) => {
      try {
        const html = katex.renderToString(full[1], {
          throwOnError: false,
          displayMode: true,
        });
        return (
          <div
            key={`bracket-math-${i}`}
            className={`${blockSpacing} w-full py-4 px-5 overflow-x-auto text-center custom-scrollbar select-text bg-zinc-50 dark:bg-[#111111] border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-zinc-100 latex-display`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } catch {
        return <span key={`bracket-math-fallback-${i}`} className="text-zinc-300">{full[0]}</span>;
      }
    },
  },
  {
    regex: /^\\\(([\s\S]*?)\\\)/, 
    render: (i: number, full: RegExpMatchArray) => {
      try {
        const html = katex.renderToString(full[1], { throwOnError: false });
        return <span key={`paren-math-${i}`} className="inline-math px-1 text-zinc-100 font-[500]" dangerouslySetInnerHTML={{ __html: html }} />;
      } catch {
        return <span key={`paren-math-fallback-${i}`} className="text-zinc-300">{full[0]}</span>;
      }
    },
  },
  {
    regex: /^\$((?:\$|[^\$])+?)\$/, 
    render: (i: number, full: RegExpMatchArray) => {
      const inner = full[1];
      if (/^\d+(?:\.\d+)?$/.test(inner.trim())) {
        return <span key={`dollar-${i}`}>${inner}</span>;
      }
      try {
        const html = katex.renderToString(inner, { throwOnError: false });
        return <span key={`dollar-math-${i}`} className="inline-math px-1 text-zinc-100 font-[500]" dangerouslySetInnerHTML={{ __html: html }} />;
      } catch {
        return <span key={`dollar-math-fallback-${i}`} className="text-zinc-300">{full[0]}</span>;
      }
    },
  },
  {
    regex: /^__MATH_START__([\s\S]*?)__MATH_END__/, 
    render: (i: number, full: RegExpMatchArray) => {
      try {
        const html = katex.renderToString(full[1], { throwOnError: false });
        return <span key={`math-token-${i}`} className="inline-math px-1 text-zinc-100 font-[500]" dangerouslySetInnerHTML={{ __html: html }} />;
      } catch {
        return <span key={`math-token-fallback-${i}`} className="text-zinc-300">{full[0]}</span>;
      }
    },
  },
  {
    regex: /^<<MATH>>([\s\S]*?)<<\/MATH>>/, 
    render: (i: number, full: RegExpMatchArray) => {
      try {
        const html = katex.renderToString(full[1], { throwOnError: false });
        return <span key={`nira-math-${i}`} className="inline-math px-1 text-zinc-100 font-[500]" dangerouslySetInnerHTML={{ __html: html }} />;
      } catch {
        return <span key={`nira-math-fallback-${i}`} className="text-zinc-300">{full[0]}</span>;
      }
    },
  },
  {
    regex: /^\*\*\*([^\*]+?)\*\*\*/, 
    render: (i: number, full: RegExpMatchArray) => (
      <strong key={`bold-italic-${i}`} className="text-[var(--nira-text)] font-extrabold italic tracking-wide">
        {full[1]}
      </strong>
    ),
  },
  {
    regex: /^\*\*([^\*]+?)\*\*/, 
    render: (i: number, full: RegExpMatchArray) => (
      <strong key={`bold-${i}`} className="text-[var(--nira-text)] font-bold tracking-wide">
        {full[1]}
      </strong>
    ),
  },
  {
    regex: /^\*([^\*]+?)\*/, 
    render: (i: number, full: RegExpMatchArray) => (
      <em key={`italic-${i}`} className="italic text-[var(--nira-text)] tracking-wide">
        {full[1]}
      </em>
    ),
  },
  {
    regex: /^~~([^~]+?)~~/, 
    render: (i: number, full: RegExpMatchArray) => (
      <span key={`strike-${i}`} className="line-through text-zinc-500">
        {full[1]}
      </span>
    ),
  },
  {
    regex: /^`([^`]+?)`/, 
    render: (i: number, full: RegExpMatchArray) => (
      <code
        key={`code-${i}`}
        className="bg-zinc-100 dark:bg-white/5 px-1.5 py-[2px] rounded-md border border-zinc-200 dark:border-white/10 text-[14px] font-mono text-[var(--nira-text)] tracking-tight antialiased inline-block align-middle"
      >
        {full[1]}
      </code>
    ),
  },
  {
    regex: /^\[([^\]]*?)\]\((.*?)\)/, 
    render: (i: number, full: RegExpMatchArray) => (
      <a
        key={`link-${i}`}
        href={full[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200 border-b border-indigo-500/30 hover:border-indigo-400/80 pb-[1px] group/link"
      >
        <span>{full[1]}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-[12px] h-[12px] opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-[2px] group-hover/link:-translate-y-[2px] transition-all duration-200 shrink-0"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </a>
    ),
  },
  // 🔥 PREMIUM STREAMING FALLBACKS (HIDES RAW '*' DURING TYPING)
  {
    regex: /^\*\*\*([^\*]+)$/, 
    render: (i: number, full: RegExpMatchArray) => (
      <strong key={`unclosed-bi-${i}`} className="text-white font-bold italic tracking-wide">
        {full[1]}
      </strong>
    ),
  },
  {
    regex: /^\*\*([^\*]+)$/, 
    render: (i: number, full: RegExpMatchArray) => (
      <strong key={`unclosed-b-${i}`} className="text-white font-semibold tracking-wide">
        {full[1]}
      </strong>
    ),
  },
  {
    regex: /^\*([^\*]+)$/, 
    render: (i: number, full: RegExpMatchArray) => (
      <em key={`unclosed-i-${i}`} className="italic text-zinc-300/90 tracking-wide">
        {full[1]}
      </em>
    ),
  },
  {
    regex: /^`([^`]+)$/, 
    render: (i: number, full: RegExpMatchArray) => (
      <code
        key={`unclosed-code-${i}`}
        className="bg-[var(--nira-text)]/[0.04] px-1.5 py-[2px] rounded-md border border-[var(--nira-border)] text-[14px] font-mono text-[var(--nira-text)] font-semibold tracking-wide antialiased inline-block align-middle"
      >
        {full[1]}
      </code>
    ),
  },
  {
    regex: /^~~([^~]+)$/, 
    render: (i: number, full: RegExpMatchArray) => (
      <span key={`unclosed-strike-${i}`} className="line-through text-zinc-500">
        {full[1]}
      </span>
    ),
  },
  {
    regex: /^(https?:\/\/[^\s]+)/, 
    render: (i: number, full: RegExpMatchArray) => (
      <a
        key={`rawlink-${i}`}
        href={full[0]}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200 border-b border-indigo-500/30 hover:border-indigo-400/80 pb-[1px] break-all group/link"
      >
        <span>{full[0]}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-[12px] h-[12px] opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-[2px] group-hover/link:-translate-y-[2px] transition-all duration-200 shrink-0"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </a>
    ),
  },
];

/**
 * Highly Optimized, Garbage-Collection Safe Inline Parsing Loop
 */
export function renderInline(text: string): React.ReactNode[] | null {
  if (!text) return null;

  const elements: React.ReactNode[] = [];
  let remaining = text;
  let i = 0;
  let currentText = "";

  while (remaining.length > 0) {
    let matched = false;

    for (const rule of INLINE_RULES) {
      const match = remaining.match(rule.regex);
      if (match) {
        if (currentText) {
          elements.push(<React.Fragment key={`text-${i++}`}>{currentText}</React.Fragment>);
          currentText = "";
        }
        elements.push(rule.render(i++, match));
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      currentText += remaining[0];
      remaining = remaining.slice(1);
    }
  }

  if (currentText) {
    elements.push(<React.Fragment key={`text-${i++}`}>{currentText}</React.Fragment>);
  }

  return elements.length > 0 ? elements : null;
}
