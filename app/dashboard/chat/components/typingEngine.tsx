let activeFrame: number | null = null;
let activeTimeout: ReturnType<typeof setTimeout> | null = null;

type TypingProps = {
  fullBlocks: any[];
  fullText: string;
  onUpdate: (blocks: any[], text: string) => void;
  onComplete?: () => void;
};

export function startTypingAnimation({
  fullBlocks,
  fullText,
  onUpdate,
  onComplete,
}: TypingProps) {
  let cancelled = false;

  if (activeFrame !== null) {
    cancelAnimationFrame(activeFrame);
    activeFrame = null;
  }
  if (activeTimeout !== null) {
    clearTimeout(activeTimeout);
    activeTimeout = null;
  }

  let currentBlockIndex = 0;
  let currentCharIndex = 0;
  let emittedTextLength = 0; // estimate of raw string length

  let lastFrameTime = performance.now();
  let accumulatedTime = 0;

  const BASE_SPEED = 9;
  const PUNCTUATION_SPEED = 30;
  const NEWLINE_SPEED = 60;

  const getCharDelay = (char: string): number => {
    if (char === "\n") return NEWLINE_SPEED;
    if ([".", "!", "?"].includes(char)) return PUNCTUATION_SPEED;
    if ([",", ":", ";"].includes(char)) return BASE_SPEED * 2;
    const variance = (Math.random() * 4) - 2;
    return Math.max(2, BASE_SPEED + variance);
  };

  // State to hold fully completed immutable blocks
  const completedBlocks: any[] = [];

  const animate = (currentTime: number) => {
    if (cancelled) return;

    const delta = currentTime - lastFrameTime;
    lastFrameTime = currentTime;
    accumulatedTime += Math.min(delta, 100);

    let stateChanged = false;

    while (currentBlockIndex < fullBlocks.length) {
      const block = fullBlocks[currentBlockIndex];
      const isRichBlock = ["table", "math", "code", "divider", "image", "metric", "stats", "timeline", "niraInsight", "map", "checklist", "steps", "faq", "highlight", "summary", "warning", "tip", "info", "success", "emoji"].includes(block.type);

      if (isRichBlock) {
        // 🔥 INSTANT REVEAL FOR RICH BLOCKS
        completedBlocks.push(block);
        emittedTextLength += (block.content || block.title || "").length + 20; // heuristic
        currentBlockIndex++;
        currentCharIndex = 0;
        stateChanged = true;
        // Don't consume accumulatedTime, let it instantly show and move to next
      } else {
        // paragraphs, headings, quotes, lists - stream text
        // Note: list items are complex, but for simplicity we stream their raw string representation if possible,
        // or just stream the whole block if it's too complex.
        if (block.type === "list" || block.type === "heading" || block.type === "quote") {
          // Simplification for complex but fast streaming: instantly reveal or fast forward
           completedBlocks.push(block);
           currentBlockIndex++;
           currentCharIndex = 0;
           stateChanged = true;
           continue;
        }

        // Must be paragraph. It has `content: string`.
        const textContent = block.content || "";
        let localChanged = false;

        while (currentCharIndex < textContent.length) {
          const char = textContent[currentCharIndex];
          const delay = getCharDelay(char);

          if (accumulatedTime >= delay) {
            accumulatedTime -= delay;
            currentCharIndex++;
            emittedTextLength++;
            localChanged = true;
          } else {
            break; // Wait for next frame
          }
        }

        if (localChanged) {
          stateChanged = true;
        }

        if (currentCharIndex >= textContent.length) {
          completedBlocks.push(block);
          currentBlockIndex++;
          currentCharIndex = 0;
        } else {
          // Still streaming this block, break out of the while loop and render partial
          break;
        }
      }
    }

    if (stateChanged) {
      // Build the current array: completed blocks + (optional) partial block
      const blocksToEmit = [...completedBlocks];
      
      if (currentBlockIndex < fullBlocks.length) {
        const activeBlock = fullBlocks[currentBlockIndex];
        if (activeBlock.type === "paragraph") {
          // Clone only the active block to show partial content
          blocksToEmit.push({
            ...activeBlock,
            content: (activeBlock.content || "").slice(0, currentCharIndex)
          });
        }
      }

      const partialText = fullText.slice(0, emittedTextLength);
      onUpdate(blocksToEmit, partialText);
    }

    if (currentBlockIndex < fullBlocks.length) {
      activeFrame = requestAnimationFrame(animate);
    } else {
      activeFrame = null;
      onComplete?.();
    }
  };

  activeTimeout = setTimeout(() => {
    if (cancelled) return;
    lastFrameTime = performance.now();
    activeFrame = requestAnimationFrame(animate);
  }, 15);

  return () => {
    cancelled = true;
    if (activeFrame !== null) {
      cancelAnimationFrame(activeFrame);
      activeFrame = null;
    }
    if (activeTimeout !== null) {
      clearTimeout(activeTimeout);
      activeTimeout = null;
    }
  };
}
