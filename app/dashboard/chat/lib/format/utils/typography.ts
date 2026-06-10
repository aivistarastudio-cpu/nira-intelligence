/* ==========================================
 * 🎨 NIRA PREMIUM TYPOGRAPHY V2
 * ========================================== */

export const pStyle =
  "text-[16px] md:text-[17px] text-[var(--nira-text)] leading-[1.85] mb-6 font-[400] tracking-[-0.01em] select-text antialiased [text-rendering:optimizeLegibility] [text-shadow:none_!important]";

export const getHeadingStyle = (level: number) => {
  const styles = {
    1: "font-display text-[32px] md:text-[36px] font-[650] text-[var(--nira-text)] mt-10 mb-5 leading-[1.2] tracking-[-0.03em] [text-shadow:none_!important]",

    2: "font-display text-[24px] md:text-[28px] font-[700] text-[var(--nira-text)] mt-8 mb-4 leading-[1.3] tracking-[-0.02em] [text-shadow:none_!important]",

    3: "font-sans text-[20px] md:text-[22px] font-[650] text-[var(--nira-text)] mt-7 mb-3 leading-[1.4] tracking-[-0.015em] [text-shadow:none_!important]",

    4: "font-sans text-[17px] md:text-[18px] font-[600] text-[var(--nira-text)] mt-6 mb-2 tracking-[-0.01em] [text-shadow:none_!important]",

    5: "font-sans text-[15px] md:text-[16px] font-[600] text-[var(--nira-text)] mt-5 mb-2 tracking-[-0.01em] [text-shadow:none_!important]",

    6: "font-sans text-[13px] md:text-[14px] font-[700] text-[var(--nira-subtext)] uppercase tracking-[0.12em] mt-5 mb-2 [text-shadow:none_!important]",
  };

  return styles[level as keyof typeof styles] || styles[2];
};

export const wrap =
  "break-words whitespace-pre-wrap";

export const blockSpacing =
  "my-6 first:mt-0 last:mb-0";

export const container =
  "w-full max-w-[760px] space-y-6 text-[16px] md:text-[17px] leading-[1.85] font-[400] tracking-[-0.01em] text-[var(--nira-text)] select-text relative antialiased [text-rendering:optimizeLegibility] [text-shadow:none_!important]";
