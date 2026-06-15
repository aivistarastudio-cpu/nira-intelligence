"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  align?: "center" | "start";
};

export default function SlideWrapper({
  children,
  align = "center",
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1], // 🔥 premium easing
      }}
      className={`
        relative
        w-full
        max-w-[1200px]
        mx-auto

        px-4
        sm:px-6
        md:px-10
        lg:px-14

        will-change-transform
        transform-gpu

        ${align === "center" ? "text-center" : "text-left"}
      `}
    >
      {/* 🌫️ subtle ambient glow (very soft) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[60%] h-[60%] bg-white/[0.02] blur-[120px] rounded-full opacity-40" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}