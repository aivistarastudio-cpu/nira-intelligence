"use client";

import { motion } from "framer-motion";

export default function NiraLogo() {
  return (
    <div className="relative flex items-center justify-center w-40 h-20 select-none">

      {/* 🧠 BACK TEXT — NIRA INTELLIGENCE */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.14 }}
        transition={{ duration: 1.2 }}
        className="
          absolute
          text-[11px]
          tracking-[0.35em]
          text-white
          whitespace-nowrap
          pointer-events-none
        "
      >
        NIRA&nbsp;INTELLIGENCE
      </motion.span>

      {/* ⚫ CORE DOT (CENTER) */}
      <motion.div
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[44%]
          w-[8px]
          h-[8px]
          bg-white
          rounded-full
          shadow-[0_0_14px_rgba(255,255,255,0.7)]
        "
      />

      {/* | NEURAL LINE */}
      <motion.div
        animate={{
          scaleY: [0.85, 1, 0.85],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[52%]
          w-[2px]
          h-12
          bg-white
          rounded-full
          shadow-[0_0_18px_rgba(255,255,255,0.35)]
        "
      />

      {/* 🧬 SOFT AURA */}
      <div className="absolute w-20 h-20 rounded-full bg-white/[0.05] blur-2xl" />

    </div>
  );
}