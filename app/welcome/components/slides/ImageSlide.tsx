"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export default function ImageSlide({ active }: { active?: boolean }) {
  const prompt =
    "Ultra realistic futuristic city at sunset, cinematic lighting, nano detail";

  const [typedIndex, setTypedIndex] = useState(0);
  const [stage, setStage] = useState(0);

  /* ================= 🧲 KINETIC PERSPECTIVE ================= */

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 60, damping: 28 });
  const sy = useSpring(my, { stiffness: 60, damping: 28 });

  const rotateX = useTransform(sy, [-120, 120], ["5deg", "-5deg"]);
  const rotateY = useTransform(sx, [-120, 120], ["-5deg", "5deg"]);

  /* ================= NANO PROMPT TYPING ================= */

  useEffect(() => {
    if (!active) return;

    let i = 0;
    setTypedIndex(0);
    setStage(0);

    const typeInterval = setInterval(() => {
      i++;
      setTypedIndex(i);

      if (i >= prompt.length) {
        clearInterval(typeInterval);
        setTimeout(() => setStage(1), 500);
        setTimeout(() => setStage(2), 3500);
      }
    }, 24);

    return () => clearInterval(typeInterval);
  }, [active]);

  return (
    <div className="nira-section text-center px-6 relative overflow-hidden">

      {/* 🌌 DEEP SPACE CONIC BACKGROUND */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="
absolute inset-0
opacity-[0.04]
blur-3xl
pointer-events-none
bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]
"
      />

      <div className="max-w-6xl mx-auto relative z-10">

       {/* TITLE */}
<motion.h2
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: active ? 1 : 0, y: active ? 0 : 20 }}
  transition={{ duration: 1 }}
  className="
    text-[clamp(28px,4vw,56px)]
    font-semibold
    tracking-tight
    text-white/90
    px-4 md:px-0
  "
>
  NIRA creates what you imagine.
</motion.h2>

<p className="mt-4 md:mt-5 text-white/50 max-w-xl mx-auto text-[14px] md:text-[15px] leading-relaxed px-6 md:px-0">
  Visual intelligence is evolving — NIRA is preparing to transform your ideas into cinematic outputs.
</p>

        {/* 🧠 GENERATION WINDOW */}
        <motion.div
          className="mt-10 md:mt-16 w-full max-w-5xl mx-auto relative px-2 md:px-0"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set(e.clientX - (r.left + r.width / 2));
            my.set(e.clientY - (r.top + r.height / 2));
          }}
          onMouseLeave={() => {
            mx.set(0);
            my.set(0);
          }}
        >
          {/* PREMIUM EDGE-TO-EDGE GLASS FRAME */}
          <div
            style={{ transform: "translateZ(40px)" }}
            className="
              relative
              rounded-[1.5rem] md:rounded-[2.5rem]
              border border-white/[0.12]
              bg-[#030303]
              h-[450px] md:h-[600px]
              text-left
              shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] md:shadow-[0_50px_100px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)]
              overflow-hidden
            "
          >
            {/* 1. FLOATING TOP BAR */}
            <div className="absolute top-0 left-0 w-full h-16 md:h-20 flex items-start pt-4 md:pt-6 justify-between px-4 md:px-8 z-30 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white md:w-[14px] md:h-[14px]"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                </div>
                <span className="text-[13px] md:text-[15px] font-medium text-white/90 tracking-wide drop-shadow-md">NIRA Studio</span>
              </div>
              
              <div className="px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md flex items-center gap-2 shadow-lg">
                <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#ff80b5] shadow-[0_0_8px_#ff80b5]" />
                <span className="text-[9px] md:text-[11px] font-bold tracking-[0.15em] uppercase text-white/80">NIRA Vision-1</span>
              </div>
            </div>

            {/* 2. EDGE-TO-EDGE WORKSPACE */}
            <div className="absolute inset-0 z-0 bg-[#050505]">
              
              {/* Idle Empty State Aura */}
              <motion.div 
                animate={{ opacity: stage === 0 ? 1 : 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-96 h-96 bg-[radial-gradient(circle,rgba(255,128,181,0.4),rgba(122,162,255,0.2),transparent_60%)] blur-3xl rounded-full"
                />
              </motion.div>

              {/* The Cinematic Image */}
              <motion.img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                alt="Generated Concept"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1, filter: "blur(40px) brightness(0.2)" }}
                animate={{ 
                  opacity: stage >= 1 ? 1 : 0, 
                  scale: stage >= 2 ? 1 : 1.05,
                  filter: stage >= 2 ? "blur(0px) brightness(1)" : "blur(20px) brightness(0.5)"
                }}
                transition={{ duration: stage === 2 ? 2 : 3, ease: "easeOut" }}
              />

              {/* Elegant Rendering Overlay */}
              {stage === 1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center"
                >
                  <div className="relative w-16 h-16 flex items-center justify-center mb-6">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-[1.5px] border-transparent border-t-white/80 border-r-white/20 opacity-80"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-2 rounded-full border-[1.5px] border-transparent border-b-white/50 border-l-white/10 opacity-60"
                    />
                    <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.9)]" />
                  </div>
                  <motion.span 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[11px] font-semibold tracking-[0.3em] text-white/70 uppercase drop-shadow-md"
                  >
                    Synthesizing
                  </motion.span>
                </motion.div>
              )}
            </div>

              {/* Sent Prompt Badge */}
              {stage >= 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-24 left-1/2 -translate-x-1/2 z-30 px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl text-center max-w-[85%]"
                >
                  <p className="text-[13px] md:text-[14px] text-white/90 font-medium tracking-wide">"{prompt}"</p>
                </motion.div>
              )}

            {/* 3. FLOATING PROMPT PILL */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-[92%] sm:w-[85%] max-w-2xl z-30">
              <div className="h-14 md:h-16 rounded-full bg-white/[0.04] backdrop-blur-2xl border border-white/[0.12] shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] flex items-center px-4 md:px-6 relative">
                
                <div className="flex-1 w-full pr-10 md:pr-12">
                  <input 
                    type="text"
                    value={stage === 0 ? prompt.substring(0, typedIndex) : ""}
                    readOnly
                    placeholder={stage >= 1 ? "Generating image..." : "Enter image prompt..."}
                    className="bg-transparent border-none outline-none text-[13px] md:text-[15px] font-medium text-white/90 tracking-wide w-full placeholder:text-white/30 cursor-default pointer-events-none"
                  />
                </div>

                <div 
                  className={`absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 ${stage >= 1 ? 'bg-white/10 text-white/40 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]' : 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]'}`}
                >
                  {stage >= 1 ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 md:w-5 md:h-5 rounded-full border-[2px] border-white/20 border-t-white/80"
                    />
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-[18px] md:h-[18px] relative left-[1px]"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4Z"/></svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}