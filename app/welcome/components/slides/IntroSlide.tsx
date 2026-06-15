"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useEffect } from "react";
import SlideWrapper from "../ui/SlideWrapper";

type Props = {
  active?: boolean;
};

export default function IntroSlide({ active }: Props) {

  /* ================= NIRA FOCUS ENGINE ================= */

  const mouseX = useMotionValue(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const center = window.innerWidth / 2;
      mouseX.set(e.clientX - center);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX]);

  /* ================= 🚀 REFINED SMOOTH PHYSICS ================= */

  // Stiffness ko thoda badhaya hai taaki 'lag' khatam ho jaye
  // Damping ko optimize kiya hai taaki motion makkhan jaisa chale
  const smoothX = useSpring(mouseX, {
    stiffness: 25,   // 👈 Pehle 12 tha, isko badhane se lag khatam hoga
    damping: 40,     // 👈 Smoothness barkarar rakhne ke liye
    mass: 1.2,       // 👈 Subtle inertia feel ke liye
  });

  const glowRaw = useTransform(smoothX, [-900, 900], [0.92, 1]);
  const glow = useSpring(glowRaw, { stiffness: 20, damping: 45 });

  const depth = useTransform(smoothX, [-900, 900], [-8, 8]); // Range thodi badhayi hai fluidity ke liye

  return (
    <SlideWrapper align="center">

      {/* 🧠 MICRO LABEL */}
      <motion.p
        style={{ x: depth }}
        className="text-[11px] tracking-[0.45em] text-white/35 uppercase mb-6 will-change-transform"
      >
        INTELLIGENCE, REDEFINED
      </motion.p>

      {/* 🔥 PREMIUM HEADLINE */}
      <motion.h1
        style={{
          opacity: glow,
          x: depth,
          textShadow:
            "0 0 18px rgba(255,255,255,0.06), 0 0 50px rgba(255,255,255,0.02)",
        }}
        initial={{ filter: "blur(10px)", opacity: 0 }}
        animate={{
          scale: active ? 1 : 0.985,
          filter: active ? "blur(0px)" : "blur(12px)",
          opacity: active ? 1 : 0
        }}
        transition={{
          duration: 1.8,
          ease: [0.16, 1, 0.3, 1], // 👈 Elite cubic bezier for entrance
        }}
        className="
  text-[clamp(42px,5vw,72px)]
  max-w-[820px] mx-auto
  font-semibold
  tracking-[-0.03em]
  leading-[1.08]
  text-white/90
"
      >
        NIRA thinks before it answers.
        <br className="hidden md:block" />
       <span className="block mt-2 text-white/55">
  So you don’t have to.
</span>
      </motion.h1>

      {/* ✨ SUBTEXT */}
      <motion.p
        style={{ x: depth }}
        className="
          mt-8
          text-white/55
          text-[14.5px]
          md:text-[15.5px]
          max-w-2xl
          mx-auto
          leading-relaxed
          will-change-transform
        "
      >
       A system that understands your intent, chooses the right intelligence,
and delivers clear outcomes — instantly.
      </motion.p>

     {/* 🚀 ULTRA SMOOTH SCROLL ENGINE */}
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{
    opacity: active ? 1 : 0,
    y: active ? 0 : 10,
  }}
  transition={{
    duration: 1,
    delay: 1.2, // 👈 IMPORTANT (hero ke baad aaye)
    ease: "easeOut",
  }}
  className="mt-24 flex flex-col items-center gap-4 relative z-10"
>
        <div className="relative w-[1.5px] h-24 bg-white/20 rounded-full overflow-hidden">

          {/* 🌊 LIQUID FLOW LIGHT (SUPER SMOOTH) */}
          <motion.div
            animate={{
              y: ["-140%", "240%"], // Range badhayi taaki loop smooth lage
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              top-0
              left-0
              w-full
              h-24
              bg-gradient-to-b
              from-transparent
              via-white/85
              to-transparent
              blur-[0.3px]
            "
          />

          {/* ✨ BREATHING INNER GLOW */}
          <motion.div
            animate={{
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-white blur-[20px]"
          />
        </div>

        <motion.span
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-[10px] tracking-[0.35em] text-white/35"
        >
          SCROLL TO EXPLORE
        </motion.span>
      </motion.div>

    </SlideWrapper>
  );
}