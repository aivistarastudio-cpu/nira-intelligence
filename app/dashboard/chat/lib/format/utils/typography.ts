/* ==========================================
 * 🎨 NIRA PREMIUM TYPOGRAPHY V3.1
 * ========================================== */

// Ensure we use arbitrary tailwind values so nothing gets lost by the compiler
export const pStyle =
  "text-[16px] md:text-[17px] text-[var(--nira-text)] leading-[1.6] font-[400] tracking-[-0.018em] mb-[1.5em] antialiased [text-rendering:optimizeLegibility] [text-shadow:none_!important]";

export const getHeadingStyle = (level: number) => {
  const styles = {
    1: "text-[30px] font-[600] text-[var(--nira-text)] tracking-[-0.022em] mt-10 mb-5 leading-[1.2] antialiased [text-shadow:none_!important]",
    2: "text-[28px] font-[600] text-[var(--nira-text)] tracking-[-0.015em] mt-8 mb-4 leading-[1.3] antialiased [text-shadow:none_!important]",
    3: "text-[22px] font-[600] text-[var(--nira-text)] tracking-[-0.01em] mt-7 mb-3 leading-[1.4] antialiased [text-shadow:none_!important]",
    4: "text-[18px] font-[600] text-[var(--nira-text)] mt-6 mb-2 tracking-[-0.01em] antialiased [text-shadow:none_!important]",
    5: "text-[16px] font-[600] text-[var(--nira-text)] mt-5 mb-2 tracking-[-0.01em] antialiased [text-shadow:none_!important]",
    6: "text-[14px] font-[700] text-[var(--nira-subtext)] uppercase tracking-[0.12em] mt-5 mb-2 antialiased [text-shadow:none_!important]",
  };

  return styles[level as keyof typeof styles] || styles[2];
};

export const wrap =
  "break-words whitespace-pre-wrap";

export const blockSpacing =
  "my-6 flex flex-col gap-[1.5em] first:mt-0 last:mb-0";

export const container =
  "w-full max-w-[760px] text-[16px] md:text-[17px] text-[var(--nira-text)] leading-[1.6] font-[400] tracking-[-0.018em] select-text relative antialiased [text-rendering:optimizeLegibility] [text-shadow:none_!important] prose-nira";
