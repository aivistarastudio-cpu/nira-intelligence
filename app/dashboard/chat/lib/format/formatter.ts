import { Block, ListItem } from "./types";
import { normalizeText } from "./normalizer";
import { sanitizeInput } from "./sanitizer";
import { postProcess } from "./postProcessor";
import type { ResponsePlan } from "../brain/responsePlanner";

import { safeSplitResponse, cleanText, getLevelFromIndent, getIndent } from "./utils/textUtils";
import { applyMathToBlocks } from "./utils/mathUtils";
import { cleanBlocks, addSmartSpacing } from "./utils/blockCleaners";
import { safeDetectFormatterIntent, checkIsStopBlock } from "./utils/detectors";

export function formatResponse(
  text: string,
  responseMode: "solution" | "explanation" = "explanation",
  responsePlan?: ResponsePlan
): Block[] {
  try {
    if (!text) return [];

    // 🔥 USE SAFE SPLIT
    const { solution, explanation } = safeSplitResponse(text);

    // 🔥 SAFE SOURCE SELECTOR
    const sourceText =
      responseMode === "solution"
        ? solution || text
        : explanation || text;

    // 🔥 CLEAN INPUT PIPELINE
    let cleanInput = sourceText || "";
    try {
      cleanInput = sanitizeInput(normalizeText(sourceText || ""));
    } catch {
      // Fallback if helpers are missing or crash
    }
    const lines = cleanInput.split("\n");

    // 🔥 BLOCK STORAGE
    const blocks: Block[] = [];

    // 🔥 LIST STATE
    let listStack: {
      items: ListItem[];
      indent: number;
      ordered: boolean;
    }[] = [];

    const plannerBlocks = responsePlan?.blocks ?? [];

    // 🔥 ORDER COUNTER (SAFE RESET)
    let orderedCounterStack: number[] = [];

    // 🔥 CODE STATE
    let codeBuffer: string[] = [];
    let codeLang = "";

    // 🔥 PARAGRAPH STATE
    let paragraphBuffer: string[] = [];

    // 🔥 FLAGS
    let inCode = false;
    let inMath = false;

    // 🔥 MATH BUFFER
    let mathBuffer: string[] = [];

    /* -------------------- HELPERS -------------------- */

    const flushList = () => {
      if (!listStack.length) return;

      const root = listStack[0];

      const checkOrderedDeep = (items: ListItem[]): boolean => {
        return items.some(i => {
          if (i.index !== undefined) return true;
          if (i.children) return checkOrderedDeep(i.children);
          return false;
        });
      };

      const isOrderedList = checkOrderedDeep(root.items);

      blocks.push({
        type: "list",
        items: root.items,
        ordered: isOrderedList,
      });

      listStack = [];
      orderedCounterStack = [];
    };

    const flushCode = () => {
      if (!codeBuffer.length) return;

      blocks.push({
        type: "code",
        content: codeBuffer.join("\n"),
        lang: codeLang || undefined,
      });

      codeBuffer = [];
      codeLang = "";
    };

    const flushParagraph = () => {
      if (!paragraphBuffer.length) return;

      const textVal = cleanText(paragraphBuffer.join("\n"));
      if (textVal) {
        blocks.push({
          type: "paragraph",
          content: textVal,
        });
      }

      paragraphBuffer = [];
    };

    const flushMath = () => {
      if (!mathBuffer.length) return;

      const rawMath = mathBuffer.join("\n").trim();

      const isValidMath = (math: string) => {
        let stack = 0;

        for (let idx = 0; idx < math.length; idx++) {
          const char = math[idx];

          if (char === "{") stack++;
          if (char === "}") stack--;

          if (stack < 0) return false;
        }

        const hasFrac = /\\frac/.test(math);
        const hasUnclosedFrac = /\\frac\{[^}]*\}\{[^}]*$/.test(math);

        const hasSqrt = /\\sqrt/.test(math);
        const hasUnclosedSqrt = /\\sqrt\{[^}]*$/.test(math);

        if (hasFrac && hasUnclosedFrac) return false;
        if (hasSqrt && hasUnclosedSqrt) return false;

        return stack === 0;
      };

      const safeMath = rawMath.trim();

      if (!isValidMath(safeMath)) {
        blocks.push({
          type: "code",
          content: safeMath,
          lang: "latex",
        });
      } else {
        blocks.push({
          type: "math",
          content: safeMath || " ",
        });
      }

      mathBuffer = [];
    };

    const flushAll = () => {
      flushParagraph();
      flushList();
      flushCode();
      if (inMath) {
        flushMath();
        inMath = false;
      }
    };

    const addDividerIfNeeded = () => {
      const last = blocks[blocks.length - 1];

      if (
        blocks.length > 0 &&
        last?.type !== "divider" &&
        last?.type !== "heading"
      ) {
        blocks.push({ type: "divider" });
      }
    };

    /* -------------------- MAIN LOOP -------------------- */
    
    const parseAlertLikeBlock = (
      blockType: "warning" | "tip" | "summary" | "niraInsight" | "info" | "success",
      inlineText: string,
      currentIndex: number
    ): number => {
      flushAll();
      const contentLines: string[] = [];
      const trimmedInline = inlineText.trim();

      if (trimmedInline) {
        contentLines.push(trimmedInline);
      }

      let j = currentIndex + 1;
      let started = trimmedInline ? true : false;

      while (j < lines.length) {
        const nextRaw = lines[j];
        const nextTrim = nextRaw.trim();

        if (!nextTrim) {
          if (started) break;
          j++;
          continue;
        }

        const isStopBlock = checkIsStopBlock(nextTrim, nextRaw);
        if (isStopBlock) break;

        const isAlertStop =
          nextTrim.startsWith("-") ||
          nextTrim.startsWith("*") ||
          /^\d+\./.test(nextTrim);
        if (isAlertStop) break;

        started = true;
        contentLines.push(nextTrim);
        j++;
      }

      const finalContent = contentLines.join(" ").trim();
      if (finalContent.length > 0) {
        blocks.push({
          type: blockType,
          content: finalContent,
        } as any);
      }
      return j - 1;
    };

    const parsePhase3Block = (
      blockType: string,
      subType: string,
      inlineText: string,
      currentIndex: number
    ): number => {
      flushAll();
      const contentLines: string[] = [];
      const trimmedInline = inlineText.trim();

      if (trimmedInline) {
        contentLines.push(trimmedInline);
      }

      let j = currentIndex + 1;
      let started = trimmedInline ? true : false;

      while (j < lines.length) {
        const nextRaw = lines[j];
        const nextTrim = nextRaw.trim();

        if (!nextTrim) {
          if (started) break;
          j++;
          continue;
        }

        const isStopBlock = checkIsStopBlock(nextTrim, nextRaw);
        if (isStopBlock) break;

        const isAlertStop =
          nextTrim.startsWith("-") ||
          nextTrim.startsWith("*") ||
          /^\d+\./.test(nextTrim);
        
        // Let Phase 3 blocks capture bullets naturally!
        // ONLY stop if it's a completely different block like a heading or another alert
        if (isAlertStop && blockType !== "highlightListBlock" && blockType !== "infoBlock") break;

        started = true;
        contentLines.push(nextTrim);
        j++;
      }

      const finalContent = contentLines.join("\n").trim();
      if (finalContent.length > 0) {
        blocks.push({
          type: blockType,
          subType,
          content: finalContent,
        } as any);
      }
      return j - 1;
    };

    for (let i = 0; i < lines.length; i++) {
      const rawLine = lines[i];
      const line = rawLine.trim();

      const plannerIntent =
        plannerBlocks.length > 0
          ? plannerBlocks[0]
          : null;

      const fIntent =
        plannerIntent ??
        (
          responseMode === "solution"
            ? "solution"
            : safeDetectFormatterIntent(line)
        );

      // 🔥 EMPTY LINE HANDLING (SMART + SAFE)
      if (!line) {
        if (inMath) {
          mathBuffer.push(""); // preserve spacing
          continue;
        }

        // paragraph flush karo
        flushParagraph();

        // 🔥 NIRA FIX: Empty lines no longer aggressively break lists!
        continue;
      }

      // 🔥 CODE BLOCK HANDLING (STABLE)
      if (/^\s*```/.test(rawLine)) {
        flushParagraph();
        flushList();
        orderedCounterStack = []; 

        if (!inCode) {
          inCode = true;
          codeLang = rawLine.replace(/```/, "").trim().split(/\s+/)[0];
        } else {
          inCode = false;
          flushCode();
        }

        continue;
      }
      
      // 🔥 SINGLE LINE \[ \] MATH
      if (line.startsWith("\\[") && line.endsWith("\\]")) {
        flushAll();

        blocks.push({
          type: "math",
          content: line.replace(/\\\[|\\\]/g, "").trim(),
        });

        continue;
      }

      // 🔥 START \[ MATH
      if (/^\s*\\\[\s*$/.test(rawLine)) {
        flushParagraph();
        flushList();

        inMath = true;
        mathBuffer = [];
        continue;
      }

      // 🔥 END \] MATH
      if (/^\s*\\\]\s*$/.test(rawLine)) {
        flushMath();
        inMath = false;
        continue;
      }

      // 🔥 INSIDE CODE (NO INTERFERENCE)
      if (inCode) {
        codeBuffer.push(rawLine);
        continue;
      }

      // 🔥 ✅ FIRST: detect $$ (START / END)
      if (/^\s*\$\$\s*$/.test(rawLine)) {
        flushParagraph();
        flushList();

        if (!inMath) {
          inMath = true;
          mathBuffer = [];
        } else {
          flushMath();
          inMath = false;
        }

        continue;
      }

      // 🔥 ✅ THEN: math content
      if (inMath) {
        const isNewBlockStart =
          line.startsWith("#") ||
          line.startsWith("##") ||
          line.startsWith("-") ||
          line.startsWith("*") ||
          line.startsWith(">") ||
          line.startsWith("```") ||
          /^\d+\./.test(line) || // ordered list
          line.startsWith("|") || // table
          /^(-{3,}|\*{3,}|_{3,})$/.test(line); // divider

        // ❌ agar new block start ho raha hai → math force close
        if (isNewBlockStart) {
          flushMath();
          inMath = false;
        } else {
          mathBuffer.push(line);
          continue;
        }
      }

      // ==========================================
      // 🚀 NEW NIRA PREMIUM DETECTORS (V16 UPGRADE)
      // ==========================================
      
      // 🛡️ REGEX HARDENING: Strip markdown decorations for robust detection
      const strippedLine = line.replace(/^(#+)\s*/, "").replace(/\*\*/g, "").trim();

      // ⚠️ SPECIFIC ALERT DETECTORS
      const warningMatch = line.match(/^([-*+]|\d+\.)?\s*(?:⚠️|❗|🔥)?\s*\*\*?Warning\*\*?:\s*(.*)/i);
      if (warningMatch) {
        i = parseAlertLikeBlock("warning", warningMatch[2], i);
        continue;
      }

      const tipMatch = line.match(/^([-*+]|\d+\.)?\s*(?:💡)?\s*\*\*?Tip\*\*?:\s*(.*)/i);
      if (tipMatch) {
        i = parseAlertLikeBlock("tip", tipMatch[2], i);
        continue;
      }

      const summaryMatch = line.match(/^([-*+]|\d+\.)?\s*\*\*?Summary\*\*?:\s*(.*)/i);
      if (summaryMatch) {
        i = parseAlertLikeBlock("summary", summaryMatch[2], i);
        continue;
      }

      const insightMatch = line.match(/^([-*+]|\d+\.)?\s*(?:ℹ️|✅|💡|⚠️|❗|🔥)?\s*(?:NIRA\s+)?Insight:\s*(.*)/i);
      if (insightMatch) {
        i = parseAlertLikeBlock("niraInsight", insightMatch[2], i);
        continue;
      }

      // ==========================================
      // 🚀 PHASE 3.2: ADVANCED SMART BLOCKS (Hardened Regex)
      // ==========================================
      
      const prefixRegexStr = "^(?:(?:#+\\s*|[-*+]\\s*|\\d+\\.\\s*)\\s*)*(?:[^\\w\\s<>\\[\\]()-]+\\s*)?";

      const infoMatch = line.match(new RegExp(prefixRegexStr + "\\*\\*?(Concept|Explanation|Background|Principles|Derivation|Root Cause|Optimization|Historical Impact|Real World Application|Acknowledgement|Reflection|Perspective|Event|Analysis|Conversation)\\*\\*?:?\\s*(.*)", "i"));
      if (infoMatch) {
        i = parsePhase3Block("infoBlock", infoMatch[1].toLowerCase().replace(/\s+/g, "_"), infoMatch[2], i);
        continue;
      }

      const highlightListMatch = line.match(new RegExp(prefixRegexStr + "\\*\\*?(Key Points|Important Events|Next Steps|Action Steps|Key Facts|Causes|Effects)\\*\\*?:?\\s*(.*)", "i"));
      if (highlightListMatch) {
        i = parsePhase3Block("highlightListBlock", highlightListMatch[1].toLowerCase().replace(/\s+/g, "_"), highlightListMatch[2], i);
        continue;
      }

      const calloutMatch = line.match(new RegExp(prefixRegexStr + "\\*\\*?(Answer|Recommendation|Best Practice|Fix|Support)\\*\\*?:?\\s*(.*)", "i"));
      if (calloutMatch) {
        i = parsePhase3Block("calloutBlock", calloutMatch[1].toLowerCase().replace(/\s+/g, "_"), calloutMatch[2], i);
        continue;
      }

      const formulaMatch = line.match(new RegExp(prefixRegexStr + "\\*\\*?(Formula)\\*\\*?:?\\s*(.*)", "i"));
      if (formulaMatch) {
        i = parsePhase3Block("formulaBlock", "formula", formulaMatch[2], i);
        continue;
      }

      const exampleMatch = line.match(new RegExp(prefixRegexStr + "\\*\\*?(Example)\\*\\*?:?\\s*(.*)", "i"));
      if (exampleMatch) {
        i = parsePhase3Block("exampleBlock", "example", exampleMatch[2], i);
        continue;
      }

      const problemMatch = line.match(new RegExp(prefixRegexStr + "\\*\\*?(Problem)\\*\\*?:?\\s*(.*)", "i"));
      if (problemMatch) {
        i = parsePhase3Block("problemBlock", "problem", problemMatch[2], i);
        continue;
      }

      // 📊 METRIC DETECTOR
      if (/^Metric:\s*/i.test(strippedLine)) {
        flushAll();
        const content = strippedLine.replace(/^Metric:\s*/i, "").trim();
        let titlePart = "";
        let valuePart = "";

        // 1. Try to parse from the same line (supports Pipe, Equals, Colon, and Dash splits)
        if (content) {
          if (content.includes("|")) {
            const parts = content.split("|");
            titlePart = parts[0].trim();
            valuePart = parts[1].trim();
          } else if (content.includes("=")) {
            const parts = content.split("=");
            titlePart = parts[0].trim();
            valuePart = parts[1].trim();
          } else {
            const colonMatch = content.match(/^(.+?)\s*:\s*(.+)$/);
            if (colonMatch) {
              titlePart = colonMatch[1].trim();
              valuePart = colonMatch[2].trim();
            } else {
              const dashMatch = content.match(/^(.+?)\s+-\s+(.+)$/);
              if (dashMatch) {
                titlePart = dashMatch[1].trim();
                valuePart = dashMatch[2].trim();
              }
            }
          }
        }

        // 2. If same line has no data, check the subsequent line safely
        if (!titlePart && !valuePart && lines[i + 1]) {
          const next = lines[i + 1].trim();
          if (next.includes("|")) {
            const parts = next.split("|");
            titlePart = parts[0].trim();
            valuePart = parts[1].trim();
            i++; // consume subsequent value line
          } else if (next.includes("=")) {
            const parts = next.split("=");
            titlePart = parts[0].trim();
            valuePart = parts[1].trim();
            i++; // consume subsequent value line
          } else {
            const colonMatch = next.match(/^(.+?)\s*:\s*(.+)$/);
            if (colonMatch) {
              titlePart = colonMatch[1].trim();
              valuePart = colonMatch[2].trim();
              i++; // consume subsequent value line
            } else {
              const dashMatch = next.match(/^(.+?)\s+-\s+(.+)$/);
              if (dashMatch) {
                titlePart = dashMatch[1].trim();
                valuePart = dashMatch[2].trim();
                i++; // consume subsequent value line
              }
            }
          }
        }

        // 3. Prevent swallowing: Fallback to paragraph if unable to split perfectly
        if (titlePart && valuePart) {
          blocks.push({
            type: "metric",
            title: titlePart,
            value: valuePart,
          } as any);
        } else if (content) {
          blocks.push({
            type: "paragraph",
            content: line,
          });
        }
        continue;
      }

      // 📈 STATS DETECTOR
      if (/^Stats:\s*$/i.test(strippedLine) || strippedLine.startsWith("Stats:")) {
        flushAll();
        const statsItems: { label: string; value: string }[] = [];
        
        const parseStatsItem = (contentStr: string) => {
          if (contentStr.includes("|")) {
            const parts = contentStr.split("|");
            return { label: parts[0].trim(), value: parts[1].trim() };
          } else if (contentStr.includes("=")) {
            const parts = contentStr.split("=");
            return { label: parts[0].trim(), value: parts[1].trim() };
          } else if (contentStr.includes(":")) {
            const parts = contentStr.split(":");
            return { label: parts[0].trim(), value: parts.slice(1).join(":").trim() };
          }
          return null;
        };

        // 1. Same-line stats item parser (e.g. Stats: Users: 10K)
        const initialContent = strippedLine.replace(/^Stats:\s*/i, "").trim();
        const initialItem = parseStatsItem(initialContent);
        if (initialItem) {
          statsItems.push(initialItem);
        }

        let j = i + 1;
        let started = statsItems.length > 0;

        while (j < lines.length) {
          const nextRaw = lines[j];
          const nextTrim = nextRaw.trim();

          if (!nextTrim) {
            if (started) break;
            j++;
            continue;
          }

          if (checkIsStopBlock(nextTrim, nextRaw)) break;

          // Strip list bullets securely (e.g., "- Users: 10K" -> "Users: 10K")
          const cleanItemLine = nextTrim.replace(/^([-*+]|\d+\.)\s+/, "").trim();
          const item = parseStatsItem(cleanItemLine);

          if (item && item.label.length < 50 && item.value.length < 50) {
            started = true;
            statsItems.push(item);
          } else {
            break;
          }
          j++;
        }

        // 2. Prevent swallowing: fallback to a sub-heading instead of throwing it away
        if (statsItems.length > 0) {
          blocks.push({
            type: "stats",
            items: statsItems,
          } as any);
        } else {
          blocks.push({
            type: "heading",
            content: "Stats",
            level: 3,
          });
        }
        i = j - 1;
        continue;
      }

      // 📅 TIMELINE DETECTOR
      if (/^(Timeline|Roadmap|Step-by-Step Progression):\s*$/i.test(strippedLine) || /^(Timeline|Roadmap|Step-by-Step Progression):/i.test(strippedLine)) {
        flushAll();
        const timelineItems: { year: string; label: string }[] = [];
        
        // 1. Same-line timeline item parser (e.g. Timeline: 2024 - Founded)
        const initialContent = strippedLine.replace(/^(Timeline|Roadmap|Step-by-Step Progression):\s*/i, "").trim();
        if (initialContent) {
          const sameLineMatch = initialContent.match(/^([^:-–]{1,15})\s*[-:–]\s*(.*)$/);
          if (sameLineMatch) {
            timelineItems.push({
              year: sameLineMatch[1].trim(),
              label: sameLineMatch[2].trim(),
            });
          }
        }

        let j = i + 1;
        let started = timelineItems.length > 0;

        while (j < lines.length) {
          const nextRaw = lines[j];
          const nextTrim = nextRaw.trim();

          if (!nextTrim) {
            if (started) break;
            j++;
            continue;
          }

          if (checkIsStopBlock(nextTrim, nextRaw)) break;

          // Strip list bullets securely (e.g. "- 2024: Started" -> "2024: Started")
          const cleanItemLine = nextTrim.replace(/^([-*+]|\d+\.)\s+/, "").trim();
          const timelineMatch = cleanItemLine.match(/^([^:-–]{1,15})\s*[-:–]\s*(.*)$/);

          if (timelineMatch) {
            started = true;
            timelineItems.push({
              year: timelineMatch[1].trim(),
              label: timelineMatch[2].trim(),
            });
          } else {
            break;
          }
          j++;
        }

        // 2. Prevent swallowing: fallback to standard sub-heading
        if (timelineItems.length > 0) {
          blocks.push({
            type: "timeline",
            items: timelineItems,
          } as any);
        } else {
          blocks.push({
            type: "heading",
            content: "Timeline",
            level: 3,
          });
        }
        i = j - 1;
        continue;
      }

      // 🖼️ IMAGE DETECTOR
      if (/^Image:\s*/i.test(line)) {
        flushAll();
        const content = line.replace(/^Image:\s*/i, "").trim();
        let queryPart = content;

        if (!queryPart && lines[i + 1]) {
          const next = lines[i + 1].trim();
          if (!checkIsStopBlock(next, lines[i + 1])) {
            queryPart = next;
            i++; // consume subsequent line
          }
        }

        if (queryPart) {
          blocks.push({
            type: "image",
            query: queryPart,
          } as any);
        }
        continue;
      }

      // 🗺️ MAP DETECTOR
      if (/^Map:\s*/i.test(line)) {
        flushAll();
        const content = line.replace(/^Map:\s*/i, "").trim();
        let mapData = content;

        if (!mapData && lines[i + 1]) {
          const next = lines[i + 1].trim();
          if (!checkIsStopBlock(next, lines[i + 1])) {
            mapData = next;
            i++; // consume subsequent line
          }
        }

        if (mapData) {
          let titlePart = mapData;
          let addressPart = "";

          if (mapData.includes(",")) {
            const parts = mapData.split(",");
            titlePart = parts[0].trim();
            addressPart = parts.slice(1).join(",").trim();
          }

          blocks.push({
            type: "map",
            title: titlePart,
            address: addressPart || titlePart,
          } as any);
        }
        continue;
      }

      // ❓ FAQ DETECTOR
      if (/^Q(?:uestion)?:\s*/i.test(strippedLine) || /^FAQ:\s*$/i.test(strippedLine)) {
        flushAll();
        const faqItems: { question: string; answer: string }[] = [];
        let j = i;
        
        if (/^FAQ:\s*$/i.test(strippedLine)) {
          j = i + 1;
        }

        let currentQuestion = "";
        let currentAnswer = "";

        while (j < lines.length) {
          const nextRaw = lines[j];
          const nextTrim = nextRaw.trim();

          if (!nextTrim) {
            j++;
            continue;
          }

          const isStopBlock = checkIsStopBlock(nextTrim, nextRaw);
          if (isStopBlock && !/^Q(?:uestion)?:\s*/i.test(nextTrim) && !/^A(?:nswer)?:\s*/i.test(nextTrim)) {
            break;
          }

          const qMatch = nextTrim.match(/^Q(?:uestion)?:\s*(.*)/i);
          const aMatch = nextTrim.match(/^A(?:nswer)?:\s*(.*)/i);

          if (qMatch) {
            if (currentQuestion && currentAnswer) {
              faqItems.push({ question: currentQuestion, answer: currentAnswer });
              currentQuestion = "";
              currentAnswer = "";
            }
            currentQuestion = qMatch[1].trim();
          } else if (aMatch) {
            currentAnswer = aMatch[1].trim();
          } else {
            if (currentAnswer) {
              currentAnswer += " " + nextTrim;
            } else if (currentQuestion) {
              currentQuestion += " " + nextTrim;
            } else {
              break;
            }
          }
          j++;
        }

        if (currentQuestion && currentAnswer) {
          faqItems.push({ question: currentQuestion, answer: currentAnswer });
        }

        if (faqItems.length > 0) {
          blocks.push({
            type: "faq",
            items: faqItems,
          } as any);
          i = j - 1;
          continue;
        }
      }

      // 🔥 TABLE
      if (line.startsWith("|") && lines[i + 1]?.includes("---")) {
        addDividerIfNeeded();
        flushAll();

        const splitTableRow = (rowLine: string) => {
          const parts = rowLine.split("|");
          if (parts[0] === "") parts.shift();
          if (parts[parts.length - 1] === "") parts.pop();
          return parts.map(p => p.trim());
        };

        const headers = splitTableRow(line);
        i += 2;

        const rows: string[][] = [];

        while (i < lines.length && lines[i].trim().startsWith("|")) {
          const row = splitTableRow(lines[i]);
          rows.push(row);
          i++;
        }

        i--;

        // ⚖️ COMPARISON DETECTOR: Intercept table if it's a comparison
        const isComparison = headers.length >= 2 && headers.length <= 4 && 
          (headers.some(h => /vs|pros|cons|feature|advantage/i.test(h)) || fIntent === "compare");

        blocks.push({
          type: "table",
          headers,
          rows,
          variant: isComparison ? "comparison" : "default"
        } as any);

        continue;
      }

      // 🔥 QUOTE
      if (fIntent === "quote" || line.startsWith(">")) {
        flushParagraph();
        flushList();

        const quoteLines: string[] = [];
        let j = i;

        while (j < lines.length) {
          const nextRaw = lines[j];
          const nextTrim = nextRaw.trim();

          if (nextTrim.startsWith(">")) {
            quoteLines.push(cleanText(nextTrim.replace(/^>\s*/, "")));
          } else if (!nextTrim) {
            if (lines[j + 1]?.trim().startsWith(">")) {
              quoteLines.push("");
            } else {
              break;
            }
          } else {
            break;
          }
          j++;
        }

        blocks.push({
          type: "quote",
          content: quoteLines.join("\n").trim(),
        });
        i = j - 1;
        continue;
      }

      // 🔥 ALERT (GENERIC FALLBACK)
      const genericAlertMatch = line.match(/^(⚠️|❗|🔥|💡|ℹ️|✅)\s*(.*)/);
      if (genericAlertMatch || fIntent === "alert") {
        let type: "warning" | "tip" | "info" | "success" = "info";
        let inlineText = line;
        if (genericAlertMatch) {
          const emoji = genericAlertMatch[1];
          inlineText = genericAlertMatch[2];
          if (emoji === "⚠️" || emoji === "❗" || emoji === "🔥") type = "warning";
          else if (emoji === "💡") type = "tip";
          else if (emoji === "ℹ️") type = "info";
          else if (emoji === "✅") type = "success";
        } else {
          if (line.startsWith("⚠️") || line.startsWith("❗") || line.startsWith("🔥")) type = "warning";
          else if (line.startsWith("💡")) type = "tip";
          else if (line.startsWith("ℹ️")) type = "info";
          else if (line.startsWith("✅")) type = "success";
          inlineText = line.replace(/^(⚠️|❗|🔥|💡|ℹ️|✅)\s*/, "");
        }
        i = parseAlertLikeBlock(type, inlineText, i);
        continue;
      }

      // 🔥 MATH BLOCK DETECTION
      if (/^\$\$.*\$\$$/.test(line) && !inMath) {
        flushAll();

        blocks.push({
          type: "math",
          content: line.replace(/\$\$/g, "").trim(),
        });

        continue;
      }

      // 🔥 EMOJI INLINE SUPPORT
      const emojiMatch = line.match(/^([\u{1F300}-\u{1FAFF}⚠️💡🔥🚀])\s*(.*)/u);

      if (emojiMatch) {
        const emoji = emojiMatch[1];
        const textVal = cleanText(emojiMatch[2]);

        paragraphBuffer.push(`${emoji} ${textVal}`);
        continue;
      }

      // 🔥 DIVIDER
      if (/^(-{3,}|\*{3,}|_{3,})$/.test(line)) {
        flushAll();

        blocks.push({
          type: "divider",
        });

        continue;
      }

      // 🔥 HIGHLIGHT (👉 Important)
      if (/^👉/.test(line)) {
        flushAll();

        const content = cleanText(line.replace(/^👉\s*/, ""));

        blocks.push({
          type: "highlight",
          content,
        });

        continue;
      }

      // 🔥 CHECKLIST (MERGED)
      const checklistMatch = line.match(/^([-*+])\s+\[(\s*|\s*x\s*|v|X)\]\s*(.*)/i);
      if (checklistMatch) {
        flushParagraph();
        flushList();

        const checkedMark = checklistMatch[2].toLowerCase().trim();
        const checked = checkedMark === "x" || checkedMark === "v";
        const textVal = cleanText(checklistMatch[3]);

        const lastBlock = blocks.length ? blocks[blocks.length - 1] : null;

        if (lastBlock && lastBlock.type === "checklist") {
          if (!lastBlock.items) lastBlock.items = [];
          lastBlock.items.push({ text: textVal, checked });
        } else {
          blocks.push({
            type: "checklist",
            items: [{ text: textVal, checked }],
          });
        }

        continue;
      }

      // 🔥 STEPS BLOCK
      if (fIntent === "steps") {
        addDividerIfNeeded();
        flushParagraph();

        const title = cleanText(
          line.replace(/^step\s*\d+[:.)-]?\s*/i, "")
        );

        const lastStepsBlock = (() => {
          if (blocks.length === 0) return null;
          const last = blocks[blocks.length - 1];
          if (last && last.type === "steps") return last;
          if (blocks.length >= 2) {
            const prev = blocks[blocks.length - 2];
            if (last && last.type === "divider" && prev && prev.type === "steps") {
              blocks.pop(); 
              return prev;
            }
          }
          return null;
        })();

        if (lastStepsBlock) {
          if (!lastStepsBlock.steps) {
            lastStepsBlock.steps = [];
          }
          lastStepsBlock.steps.push({
            title,
            items: [],
          });
        } else {
          blocks.push({
            type: "steps",
            steps: [
              {
                title,
                items: [],
              },
            ],
          });
        }

        continue;
      }

      // 🔥 HEADING
      if (fIntent === "heading") {
        addDividerIfNeeded();
        flushAll();

        const level = Math.min(
          (line.match(/^#+/)?.[0].length || 1),
          6
        ) as 1 | 2 | 3 | 4 | 5 | 6;

        blocks.push({
          type: "heading",
          content: cleanText(line.replace(/^#+/, "")),
          level,
        });

        continue;
      }

      // 🔥 FALLBACK HEADING
      if (
        line.endsWith(":") &&
        line.length < 50 &&
        /^[A-Z]/.test(line)
      ) {
        flushAll();

        blocks.push({
          type: "heading",
          content: cleanText(line.replace(":", "")),
          level: 2,
        });
        continue;
      }

      // 🔥 LIST PARSER
      if (fIntent === "list" || /^(\s*)([-*+]|\d+\.)(\s|$)/.test(rawLine)) {
        flushParagraph();

        const rawIndent = getIndent(rawLine);
        const levelVal = getLevelFromIndent(rawIndent);
        const isOrdered = /^\s*\d+\./.test(rawLine);

        orderedCounterStack.length = levelVal + 1;

        if (
          listStack.length > 0 &&
          levelVal === 0 &&
          listStack[0].ordered !== isOrdered
        ) {
          flushList();
        }

        const textVal = cleanText(
          rawLine.replace(/^(\s*)([-*+]|\d+\.)(\s|$)/, "")
        );
        
        let index = undefined;

        if (isOrdered) {
          if (orderedCounterStack[levelVal] === undefined) {
            orderedCounterStack[levelVal] = 1;
          } else {
            orderedCounterStack[levelVal] += 1;
          }
          index = orderedCounterStack[levelVal];
        }

        const newItem: ListItem = { text: textVal, index };

        if (listStack.length === 0) {
          listStack.push({ items: [newItem], indent: 0, ordered: isOrdered });
        } else {
          while (listStack.length - 1 > levelVal && listStack.length > 1) {
            listStack.pop();
          }
          while (listStack.length - 1 < levelVal) {
            const currentLevel = listStack[listStack.length - 1];
            let parentItem = currentLevel.items[currentLevel.items.length - 1];
            
            if (!parentItem) {
               parentItem = { text: "" };
               currentLevel.items.push(parentItem);
            }
            
            if (!parentItem.children) parentItem.children = [];
            listStack.push({ items: parentItem.children, indent: (listStack.length) * 2, ordered: isOrdered });
          }
          
          const targetLevel = listStack[listStack.length - 1];
          targetLevel.ordered = isOrdered;
          targetLevel.items.push(newItem);
        }
        
        continue;
      }

      // 🔥 NORMAL TEXT
      if (listStack.length > 0) {
        if (getIndent(rawLine) >= 2) {
          const lastLevel = listStack[listStack.length - 1];
          const lastItem = lastLevel.items[lastLevel.items.length - 1];
          if (lastItem) {
            lastItem.text += "\n" + cleanText(rawLine);
            continue;
          }
        } else {
          flushList(); 
        }
      }

      paragraphBuffer.push(rawLine);
    }

    /* -------------------- FINAL -------------------- */

    flushAll();

    // 🔥 FINAL SPLIT RENDER (ONLY FOR SOLUTION MODE)
    if (responseMode === "solution" && explanation) {
      blocks.push({
        type: "divider",
      });

      blocks.push({
        type: "heading",
        content: "Explanation",
        level: 3,
      });

      let explanationBlocks: Block[] = [];

      if (!explanation.includes("Explanation:")) {
        explanationBlocks = formatResponse(explanation, "explanation");
      }

      blocks.push(...explanationBlocks);
    }

    try {
      // 🔥 Final premium pass to resolve KaTeX inline math perfectly!
      applyMathToBlocks(blocks);
    } catch {}

    let finalBlocks = addSmartSpacing(cleanBlocks(blocks));
    try {
      if (typeof postProcess === "function") {
        finalBlocks = postProcess(finalBlocks);
      }
    } catch {}

    const returnBlocks = Array.isArray(finalBlocks) ? finalBlocks : [];
    
    // 🔥 Assign Stable Identity IDs
    return returnBlocks.map((b, i) => ({
      ...b,
      id: b.id || `blk-${b.type}-${i}`,
    })) as Block[];
  } catch (e) {
    return [
      {
        id: `blk-fallback-0`,
        type: "paragraph",
        content: text,
      },
    ] as Block[];
  }
}

export const format = formatResponse;