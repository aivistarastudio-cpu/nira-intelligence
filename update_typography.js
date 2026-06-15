const fs = require('fs');
const path = '/Users/heenatewani/Desktop/nira-intelligence/nira-intelligence/app/dashboard/chat/lib/format/utils/typography.ts';

const content = `/* ==========================================
 * 🎨 NIRA PREMIUM TYPOGRAPHY V3
 * ========================================== */

export const pStyle =
  "text-body mb-[1.5em] antialiased [text-rendering:optimizeLegibility] [text-shadow:none_!important]";

export const getHeadingStyle = (level: number) => {
  const styles = {
    1: "text-h1 mt-10 mb-5 antialiased [text-shadow:none_!important]",
    2: "text-h2 mt-8 mb-4 antialiased [text-shadow:none_!important]",
    3: "text-h3 mt-7 mb-3 antialiased [text-shadow:none_!important]",
    4: "font-sans text-[17px] md:text-[18px] font-[600] text-[var(--nira-text)] mt-6 mb-2 tracking-[-0.01em] [text-shadow:none_!important]",
    5: "font-sans text-[15px] md:text-[16px] font-[600] text-[var(--nira-text)] mt-5 mb-2 tracking-[-0.01em] [text-shadow:none_!important]",
    6: "font-sans text-[13px] md:text-[14px] font-[700] text-[var(--nira-subtext)] uppercase tracking-[0.12em] mt-5 mb-2 [text-shadow:none_!important]",
  };

  return styles[level as keyof typeof styles] || styles[2];
};

export const wrap =
  "break-words whitespace-pre-wrap";

export const blockSpacing =
  "my-6 flex flex-col gap-[1.5em] first:mt-0 last:mb-0";

export const container =
  "w-full max-w-[760px] text-body select-text relative antialiased [text-rendering:optimizeLegibility] [text-shadow:none_!important] prose-nira";
`;

fs.writeFileSync(path, content);
console.log("Updated typography.ts");
