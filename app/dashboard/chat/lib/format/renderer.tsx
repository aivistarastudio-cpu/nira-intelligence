"use client";

import { Block } from "./types";
import React, { useMemo } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import katex from "katex";
import MapBlock from "../../components/MapBlock";

import { PremiumAnimations } from "./components/PremiumAnimations";
import { pStyle, getHeadingStyle, container, blockSpacing, wrap } from "./utils/typography";
import { renderInline } from "./utils/inlineRenderer";
import { CodeBlock } from "./components/CodeBlock";
import { PracticeBlock } from "./components/PracticeBlock";
import { InteractiveChecklistItem, renderList } from "./components/ListBlocks";

// New Phase 2 Components
import { TableBlock } from "./components/TableBlock";
import { MathBlock } from "./components/MathBlock";
import { AlertBlock } from "./components/AlertBlock";
import { HighlightBlock } from "./components/HighlightBlock";
import { SummaryBlock } from "./components/SummaryBlock";
import { StepsBlock } from "./components/StepsBlock";
import { MetricBlock } from "./components/MetricBlock";
import { StatsBlock } from "./components/StatsBlock";
import { TimelineBlock } from "./components/TimelineBlock";
import { NiraInsightBlock } from "./components/NiraInsightBlock";
import { ImageBlock } from "./components/ImageBlock";

// Phase 3 Components
import {
  InfoBlock,
  HighlightListBlock,
  CalloutBlock,
  FormulaBlock,
  ExampleBlock,
  ProblemBlock,
} from "./components/Phase3Blocks";

// ==========================================
// 🚀 THE MAIN RESPONSE RENDERING COMPONENT
// ==========================================
export function RenderMessage({ blocks }: { blocks: Block[] }) {
  const renderedBlocks = useMemo(() => {
    let globalOrderedIndex = 0;

    return blocks.map((block, i) => {
      const key = block.id || `${block.type}-${i}`;

      if (block.type !== "list") {
        globalOrderedIndex = 0;
      }

      if (block.type === "heading") {
        const level = block.level ?? 2;
        const style = `${getHeadingStyle(level)} ${wrap}`;
        const content = renderInline(block.content || "");

        return (
          <div key={key} className="relative select-text w-full">
            {level === 1 && <h1 className={style}>{content}</h1>}
            {level === 2 && <h2 className={style}>{content}</h2>}
            {level === 3 && <h3 className={style}>{content}</h3>}
            {level === 4 && <h4 className={style}>{content}</h4>}
            {level === 5 && <h5 className={style}>{content}</h5>}
            {level === 6 && <h6 className={style}>{content}</h6>}
          </div>
        );
      }

      if (block.type === "paragraph") {
        if (typeof block.content === "string") {
          const trimmed = block.content.trim();

          // 🔥 DISPLAY MATH SUPPORT
          const matchBrackets = trimmed.match(/^\\\[([\s\S]*)\\\]$/);
          const matchDoubleDollar = trimmed.match(/^\$\$([\s\S]*)\$\$$/);
          const matchCustomMath = trimmed.match(/^<<MATH>>([\s\S]*?)<<\/MATH>>$/);

          const mathExpr =
            matchCustomMath
              ? matchCustomMath[1].trim()
              : matchBrackets
              ? matchBrackets[1].trim()
              : matchDoubleDollar
              ? matchDoubleDollar[1].trim()
              : null;

          if (mathExpr !== null) {
            try {
              const html = katex.renderToString(mathExpr, {
                throwOnError: false,
                displayMode: true,
              });

              return (
                <div
                  key={`math-display-${i}`}
                  className={`${blockSpacing} w-full py-4 px-5 overflow-x-auto text-center custom-scrollbar select-text bg-[var(--nira-surface)] border border-[var(--nira-border)] rounded-xl text-[var(--nira-text)] latex-display`}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              );
            } catch {
              return (
                <pre
                  key={key}
                  className="text-red-400 bg-red-950/20 border border-red-900/30 p-4 rounded-xl font-mono text-[14px] text-center w-full"
                >
                  {mathExpr}
                </pre>
              );
            }
          }
        }

        const isTutorTask =
          block.content?.includes("ab tum try karo") ||
          block.content?.includes("iska answer kya hoga") ||
          block.content?.includes("Practice Task") ||
          block.content?.includes("your turn");

        if (isTutorTask) {
          return <PracticeBlock key={key} content={block.content || ""} />;
        }

        return (
          <p key={key} className={`${pStyle} ${wrap} w-full`}>
            {renderInline(block.content || "")}
          </p>
        );
      }
      
      if (block.type === "list") {
        const startOffset = globalOrderedIndex;
        if (block.ordered) {
          globalOrderedIndex += block.items?.length || 0;
        }
        return (
          <div key={key} className={`${blockSpacing} select-text w-full`}>
            {renderList(block.items || [], block.ordered, 0, startOffset)}
          </div>
        );
      }

      if (block.type === "code") {
        const lang = block.lang || "javascript";
        const grammar = Prism.languages[lang] || Prism.languages.javascript;
        const contentStr = block.content || "";
        const highlighted = Prism.highlight(contentStr, grammar, lang);

        return <CodeBlock key={key} block={block} codeHtml={highlighted} />;
      }

      if (block.type === "quote") {
        return (
          <blockquote 
            key={key} 
            className={`
              border-l-[3px] border-[var(--nira-border)] pl-5 italic text-[var(--nira-subtext)] ${blockSpacing} 
              py-2 select-text leading-[1.75] tracking-normal antialiased text-[16px] md:text-[17px]
              ${wrap} w-full
            `}
          >
            {renderInline(block.content || "")}
          </blockquote>
        );
      }

      if (block.type === "divider") {
        return (
          <div key={key} className="w-full my-6 flex items-center justify-center select-none animate-premium-fade">
            <div className="w-12 h-[3px] rounded-full bg-[var(--nira-border)] opacity-60" />
          </div>
        );
      }

      if (block.type === "emoji") {
        const getEmojiConfig = (emoji: string) => {
          switch (emoji) {
            case "⚠️": return { bg: "bg-amber-500/[0.05] dark:bg-amber-500/[0.02]", border: "border-amber-500/30", accent: "bg-amber-500/20 border-amber-500/40 text-amber-600 dark:text-amber-300" };
            case "💡": return { bg: "bg-blue-500/[0.05] dark:bg-blue-500/[0.02]", border: "border-blue-500/30", accent: "bg-blue-500/20 border-blue-500/40 text-blue-600 dark:text-blue-300" };
            case "ℹ️": return { bg: "bg-cyan-500/[0.05] dark:bg-cyan-500/[0.02]", border: "border-cyan-500/30", accent: "bg-cyan-500/20 border-cyan-500/40 text-cyan-600 dark:text-cyan-300" };
            case "✅": return { bg: "bg-emerald-500/[0.05] dark:bg-emerald-500/[0.02]", border: "border-emerald-500/30", accent: "bg-emerald-500/20 border-emerald-500/40 text-emerald-600 dark:text-emerald-300" };
            case "🔥": return { bg: "bg-rose-500/[0.05] dark:bg-rose-500/[0.02]", border: "border-rose-500/30", accent: "bg-rose-500/20 border-rose-500/40 text-rose-600 dark:text-rose-300" };
            case "🚀": return { bg: "bg-indigo-500/[0.05] dark:bg-indigo-500/[0.02]", border: "border-indigo-500/30", accent: "bg-indigo-500/20 border-indigo-500/40 text-indigo-600 dark:text-indigo-300" };
            case "👉": return { bg: "bg-pink-500/[0.05] dark:bg-pink-500/[0.02]", border: "border-pink-500/30", accent: "bg-pink-500/20 border-pink-500/40 text-pink-600 dark:text-pink-300" };
            default: return { bg: "bg-[var(--nira-surface)]", border: "border-[var(--nira-border)]", accent: "bg-[var(--nira-text)]/[0.04] border-[var(--nira-border)] text-[var(--nira-text)]" };
          }
        };

        const config = getEmojiConfig(block.emoji || "💡");

        return (
          <div key={key} className={`${blockSpacing} w-full px-6 py-5 rounded-2xl select-text shadow-sm border ${config.bg} ${config.border} animate-premium-fade`}>
            <div className="flex gap-4 items-start">
              <span className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-xl border text-[16px] mt-0.5 select-none ${config.accent}`}>
                {block.emoji}
              </span>
              <div className="leading-[1.8] flex-1 text-[16px] md:text-[17px] text-[var(--nira-text)] font-[500] pt-0.5">
                {renderInline(block.content || "")}
              </div>
            </div>
          </div>
        );
      }

      if (
        block.type === "warning" ||
        block.type === "tip" ||
        block.type === "info" ||
        block.type === "success"
      ) {
        return <AlertBlock key={key} block={block} />;
      }

      if (block.type === "highlight") {
        return <HighlightBlock key={key} block={block} />;
      }

      if (block.type === "summary") {
        return <SummaryBlock key={key} block={block} />;
      }

      if (block.type === "checklist") {
        return (
          <div key={key} className={`${blockSpacing} w-full space-y-2 pl-2 select-text animate-premium-fade`}>
            {block.items?.map((item, idx) => (
              <InteractiveChecklistItem key={idx} item={item as any} idx={idx} />
            ))}
          </div>
        );
      }

      if (block.type === "steps") {
        return <StepsBlock key={key} block={block} />;
      }

      if (block.type === "math") {
        return <MathBlock key={key} block={block} />;
      }

      if (block.type === "map") {
        return (
          <MapBlock
            key={key}
            title={block.title}
            address={block.address}
            lat={block.lat}
            lng={block.lng}
          />
        );
      }

      if (block.type === "metric") {
        return <MetricBlock key={key} block={block} />;
      }

      if (block.type === "niraInsight") {
        return <NiraInsightBlock key={key} block={block} />;
      }

      if (block.type === "stats") {
        return <StatsBlock key={key} block={block} />;
      }

      if (block.type === "timeline") {
        return <TimelineBlock key={key} block={block} />;
      }

      if (block.type === "image") {
        return <ImageBlock key={key} block={block} />;
      }

      if (block.type === "table") {
        return <TableBlock key={key} block={block} />;
      }

      // ==========================================
      // 🚀 PHASE 3.1 BLOCKS
      // ==========================================
      if (block.type === "infoBlock") {
        return <InfoBlock key={key} subType={block.subType} content={block.content} />;
      }

      if (block.type === "highlightListBlock") {
        return <HighlightListBlock key={key} subType={block.subType} content={block.content} />;
      }

      if (block.type === "calloutBlock") {
        return <CalloutBlock key={key} subType={block.subType} content={block.content} />;
      }

      if (block.type === "formulaBlock") {
        return <FormulaBlock key={key} content={block.content} />;
      }

      if (block.type === "exampleBlock") {
        return <ExampleBlock key={key} content={block.content} />;
      }

      if (block.type === "problemBlock") {
        return <ProblemBlock key={key} content={block.content} />;
      }

      return null;
    });
  }, [blocks]);

  return (
    <div className={container} style={{ contain: "layout paint" }}>
      <PremiumAnimations />
      {renderedBlocks}
    </div>
  );
}
  
export default RenderMessage;
