import React from "react";
import { renderInline } from "../utils/inlineRenderer";
import { blockSpacing } from "../utils/typography";
import katex from "katex";

export const InfoBlock = ({ subType, content }: { subType: string; content: string }) => {
  let title = "Info";
  let icon = "ℹ️";
  if (subType === "concept") { title = "Concept"; icon = "🧠"; }
  if (subType === "explanation") { title = "Explanation"; icon = "💡"; }
  if (subType === "background") { title = "Background Context"; icon = "📖"; }
  if (subType === "principles") { title = "Core Principles"; icon = "⚖️"; }
  if (subType === "derivation") { title = "Derivation"; icon = "📐"; }
  if (subType === "root_cause") { title = "Root Cause"; icon = "🔍"; }
  if (subType === "optimization") { title = "Optimization"; icon = "⚡"; }
  if (subType === "historical_impact") { title = "Historical Impact"; icon = "🌍"; }
  if (subType === "real_world_application") { title = "Real World Application"; icon = "🏢"; }
  if (subType === "acknowledgement") { title = "Acknowledgement"; icon = "🤝"; }
  if (subType === "reflection") { title = "Reflection"; icon = "💭"; }
  if (subType === "perspective") { title = "Perspective"; icon = "🔭"; }
  if (subType === "event") { title = "Historical Event"; icon = "📜"; }
  if (subType === "analysis") { title = "Analysis"; icon = "📊"; }
  if (subType === "conversation") { title = "Conversation"; icon = "💬"; }

  return (
    <div className={`w-full flex flex-col gap-2 ${blockSpacing} p-4 bg-[var(--nira-surface)]/50 border border-[var(--nira-border)] rounded-xl relative overflow-hidden select-text group`}>
      <div className="flex items-center gap-2">
        <span className="text-[16px]">{icon}</span>
        <h4 className="text-[14px] font-semibold text-[var(--nira-text)] uppercase tracking-wider">{title}</h4>
      </div>
      <div className="text-[15px] leading-relaxed text-[var(--nira-text-muted)] mt-1 whitespace-pre-wrap">
        {renderInline(content)}
      </div>
    </div>
  );
};

export const HighlightListBlock = ({ subType, content }: { subType: string; content: string }) => {
  let title = "Highlights";
  let icon = "📌";
  if (subType === "key_points") { title = "Key Points"; icon = "✅"; }
  if (subType === "important_events") { title = "Important Events"; icon = "📅"; }
  if (subType === "next_steps") { title = "Next Steps"; icon = "🚀"; }
  if (subType === "action_steps") { title = "Action Steps"; icon = "✅"; }
  if (subType === "key_facts") { title = "Key Facts"; icon = "📌"; }
  if (subType === "causes") { title = "Causes"; icon = "🔍"; }
  if (subType === "effects") { title = "Effects"; icon = "🌊"; }

  const lines = content.split("\n").filter(l => l.trim().length > 0);
  const items = lines.map(line => line.replace(/^[-*]\s*/, ""));

  return (
    <div className={`w-full flex flex-col gap-3 ${blockSpacing} p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl relative select-text`}>
      <div className="flex items-center gap-2">
        <span className="text-[16px]">{icon}</span>
        <h4 className="text-[14px] font-semibold text-emerald-400 uppercase tracking-wider">{title}</h4>
      </div>
      <ul className="flex flex-col gap-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-[15px] text-[var(--nira-text)] leading-relaxed">
            <span className="text-emerald-500/50 mt-[2px]">•</span>
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const CalloutBlock = ({ subType, content }: { subType: string; content: string }) => {
  let title = "Note";
  let icon = "📌";
  let colorClass = "bg-[var(--nira-surface)] border-[var(--nira-border)] text-[var(--nira-text)]";
  
  if (subType === "answer") {
    title = "Final Answer";
    icon = "✅";
    colorClass = "bg-green-500/10 border-green-500/20 text-green-300";
  }
  if (subType === "recommendation") {
    title = "Recommendation";
    icon = "💡";
    colorClass = "bg-blue-500/10 border-blue-500/20 text-blue-300";
  }
  if (subType === "best_practice") {
    title = "Best Practice";
    icon = "🎯";
    colorClass = "bg-purple-500/10 border-purple-500/20 text-purple-300";
  }
  if (subType === "fix") {
    title = "Fix";
    icon = "🛠️";
    colorClass = "bg-emerald-500/10 border-emerald-500/20 text-emerald-300";
  }
  if (subType === "support") {
    title = "Support";
    icon = "🫂";
    colorClass = "bg-blue-500/10 border-blue-500/20 text-blue-300";
  }

  return (
    <div className={`w-full flex flex-col gap-2 ${blockSpacing} p-4 ${colorClass.split(' ')[0]} border ${colorClass.split(' ')[1]} rounded-xl relative select-text`}>
      <div className="flex items-center gap-2">
        <span className="text-[16px]">{icon}</span>
        <h4 className={`text-[14px] font-semibold ${colorClass.split(' ')[2]} uppercase tracking-wider`}>{title}</h4>
      </div>
      <div className="text-[15px] leading-relaxed mt-1 whitespace-pre-wrap">
        {renderInline(content)}
      </div>
    </div>
  );
};

export const FormulaBlock = ({ content }: { content: string }) => {
  let html = "";
  try {
    const safeMath = content.replace(/^\\\[|\\\]$/g, "").replace(/^\$\$|\$\$$/g, "").trim();
    html = katex.renderToString(safeMath, { throwOnError: false, displayMode: true });
  } catch {
    html = `<span class="text-red-400">Failed to render formula</span>`;
  }

  return (
    <div className={`w-full flex flex-col ${blockSpacing} p-4 bg-[var(--nira-surface)]/80 border border-[var(--nira-border)] rounded-xl relative select-text`}>
      <div className="absolute top-3 right-4 text-[12px] font-mono text-[var(--nira-text-muted)] opacity-50 uppercase tracking-wider">Formula</div>
      <div className="w-full overflow-x-auto py-2 custom-scrollbar text-center latex-display" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export const ExampleBlock = ({ content }: { content: string }) => {
  return (
    <div className={`w-full flex flex-col gap-2 ${blockSpacing} p-4 bg-[var(--nira-surface)] border-l-4 border-l-yellow-500 border-y border-r border-y-[var(--nira-border)] border-r-[var(--nira-border)] rounded-r-xl select-text`}>
      <div className="flex items-center gap-2">
        <span className="text-[16px]">📝</span>
        <h4 className="text-[14px] font-semibold text-yellow-500 uppercase tracking-wider">Example</h4>
      </div>
      <div className="text-[15px] leading-relaxed text-[var(--nira-text-muted)] mt-1 whitespace-pre-wrap">
        {renderInline(content)}
      </div>
    </div>
  );
};

export const ProblemBlock = ({ content }: { content: string }) => {
  return (
    <div className={`w-full flex flex-col gap-2 ${blockSpacing} p-4 bg-red-500/5 border-l-4 border-l-red-500 border-y border-r border-y-red-500/10 border-r-red-500/10 rounded-r-xl select-text`}>
      <div className="flex items-center gap-2">
        <span className="text-[16px]">⚠️</span>
        <h4 className="text-[14px] font-semibold text-red-500 uppercase tracking-wider">Problem</h4>
      </div>
      <div className="text-[15px] leading-relaxed text-red-200 mt-1 whitespace-pre-wrap">
        {renderInline(content)}
      </div>
    </div>
  );
};
