import { Block } from "./types";

export function postProcess(blocks: Block[]): Block[] {
  const cleanedBlocks = blocks
    .filter((block) => {
      // remove empty paragraphs
      if (block.type === "paragraph") {
        return block.content.trim().length > 0;
      }

      // remove empty lists
      if (block.type === "list") {
        return block.items && block.items.length > 0;
      }

      // keep everything else
      return true;
    })
    .map((block) => {
      // extra cleanup for paragraphs
      if (block.type === "paragraph") {
        return {
          ...block,
          content: block.content.trim(),
        };
      }

      return block;
    });

  // 🔥 NIRA PREMIUM FIX: Agar message ke aakhiri (end) mein divider hai toh use hata do
  while (cleanedBlocks.length > 0 && cleanedBlocks[cleanedBlocks.length - 1].type === "divider") {
    cleanedBlocks.pop();
  }

  // 🔥 NIRA PREMIUM FIX: Agar message ki shuruaat (start) mein divider hai toh use hata do
  while (cleanedBlocks.length > 0 && cleanedBlocks[0].type === "divider") {
    cleanedBlocks.shift();
  }

  return cleanedBlocks;
}