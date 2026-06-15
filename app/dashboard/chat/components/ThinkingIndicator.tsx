"use client";

import { motion } from "framer-motion";

interface ThinkingShimmerProps {
  thinkingText?: string;
}

export default function ThinkingShimmer({
  thinkingText = "Thinking",
}: ThinkingShimmerProps) {
  const formattedText = thinkingText.endsWith("...")
    ? thinkingText
    : `${thinkingText}...`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        relative
        flex items-center gap-3
        w-fit
        px-4 py-2
        rounded-full
        border border-[var(--nira-border)]
        bg-[var(--nira-surface)]
        select-none
      "
    >
      {/* Premium 3-Dot Wave */}
      <div className="relative flex items-center gap-1.5 shrink-0 ml-1">
        {[
          "dark:bg-blue-400 dark:shadow-blue-400/80", 
          "dark:bg-purple-400 dark:shadow-purple-400/80", 
          "dark:bg-rose-400 dark:shadow-rose-400/80"
        ].map((darkColors, index) => (
          <motion.div
            key={index}
            animate={{ 
              scale: [0.6, 1.2, 0.6],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2, // Staggered delay for the wave effect
            }}
            className={`w-1.5 h-1.5 rounded-full bg-[var(--nira-text)] shadow-[0_0_6px_var(--nira-text)] opacity-80 ${darkColors}`}
          />
        ))}
      </div>

      {/* Premium Status Text */}
      <span className="text-[13px] font-sans font-[500] tracking-wide text-[var(--nira-text)]/70 whitespace-nowrap antialiased pr-1">
        {thinkingText}
      </span>
    </motion.div>
  );
}