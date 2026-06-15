"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export default function VideoSlide({ active }: { active?: boolean }) {

  const prompt =
    "Cinematic slow-motion drone footage over a futuristic cyber-city, neon rain, 8k resolution, photorealistic.";

  const [typedIndex, setTypedIndex] = useState(0);
  const [stage, setStage] = useState(0);

  /* 🎬 PARALLAX */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 60, damping: 28 });
  const sy = useSpring(my, { stiffness: 60, damping: 28 });

  const rotateX = useTransform(sy, [-120, 120], ["5deg", "-5deg"]);
  const rotateY = useTransform(sx, [-120, 120], ["-5deg", "5deg"]);

  /* ⌨️ TYPE EFFECT */
  useEffect(() => {
    if (!active) return;

    let i = 0;
    setTypedIndex(0);
    setStage(0);

    const interval = setInterval(() => {
      i++;
      setTypedIndex(i);
      if (i >= prompt.length) {
        clearInterval(interval);
        setTimeout(() => setStage(1), 500);
        setTimeout(() => setStage(2), 4000);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="nira-section text-center px-6 relative overflow-hidden">

      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: active ? 1 : 0, y: active ? 0 : 20 }}
          transition={{ duration: 1 }}
          className="
            text-[clamp(34px,4vw,56px)]
            font-display
            font-semibold
            tracking-tight
            text-white/90
          "
        >
          NIRA Video Intelligence
        </motion.h2>

        {/* SUBTEXT */}
        <p className="mt-5 text-white/50 max-w-xl mx-auto text-[15px] leading-relaxed">
          NIRA is preparing cinematic video intelligence — built for creators who want motion without complexity.
        </p>

        {/* 🎬 GENERATION WINDOW */}
        <motion.div
          className="mt-16 w-full max-w-6xl mx-auto relative"
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
              rounded-[2.5rem]
              border border-white/[0.12]
              bg-[#030303]
              w-full
              aspect-video
              max-h-[700px]
              min-h-[500px]
              text-left
              shadow-[0_50px_100px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)]
              overflow-hidden
            "
          >
            {/* 1. FLOATING TOP BAR */}
            <div className="absolute top-0 left-0 w-full h-24 flex items-start pt-8 justify-between px-10 z-30 bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
                </div>
                <span className="text-[17px] font-semibold text-white/90 tracking-wide drop-shadow-md">NIRA Director</span>
                
                {/* Moved NIRA Motion-1 chip here for a cleaner layout */}
                <span className="text-white/20 font-light mx-1">|</span>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#7aa2ff] shadow-[0_0_10px_#7aa2ff]" />
                  <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-white/80">NIRA Motion-1</span>
                </div>
              </div>
            </div>

            {/* 2. EDGE-TO-EDGE WORKSPACE */}
            <div className="absolute inset-0 z-0 bg-[#020202]">
              
              {/* Idle Empty State Aura */}
              <motion.div 
                animate={{ opacity: stage === 0 ? 1 : 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex items-center justify-center pb-32"
              >
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(122,162,255,0.4),rgba(255,128,181,0.2),transparent_60%)] blur-3xl rounded-full"
                />
              </motion.div>

              {/* Cinematic Video Player (Drone Pan Simulation) */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.img 
                  src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2564&auto=format&fit=crop"
                  alt="Video Render"
                  className="absolute inset-0 w-[120%] h-[120%] object-cover origin-center"
                  initial={{ opacity: 0, scale: 1.1, filter: "blur(40px) brightness(0.2)" }}
                  animate={{ 
                    opacity: stage >= 1 ? 1 : 0, 
                    filter: stage >= 2 ? "blur(0px) brightness(1)" : "blur(20px) brightness(0.5)",
                    scale: stage >= 2 ? [1.1, 1.25] : 1.1,
                    x: stage >= 2 ? ["0%", "-5%"] : "0%",
                    y: stage >= 2 ? ["0%", "-3%"] : "0%"
                  }}
                  transition={{ 
                    opacity: { duration: 1 },
                    filter: { duration: stage === 2 ? 2 : 3 },
                    scale: { duration: 30, ease: "linear", repeat: Infinity, repeatType: "reverse" },
                    x: { duration: 30, ease: "linear", repeat: Infinity, repeatType: "reverse" },
                    y: { duration: 30, ease: "linear", repeat: Infinity, repeatType: "reverse" }
                  }}
                />
                
                {/* Video UI Overlay */}
                {stage >= 2 && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-6 left-6 flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_red]" />
                      <span className="text-[10px] text-white/80 font-bold tracking-widest uppercase shadow-black drop-shadow-md">Live Preview</span>
                    </div>
                    {/* Cinematic Vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)] z-10 mix-blend-multiply" />
                  </div>
                )}
              </div>

              {/* Elegant Rendering Overlay */}
              {stage === 1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center"
                >
                  <div className="relative w-20 h-20 flex items-center justify-center mb-8">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-[2px] border-transparent border-t-white/80 border-r-white/20 opacity-80"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-3 rounded-full border-[2px] border-transparent border-b-white/50 border-l-white/10 opacity-60"
                    />
                    <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.9)]" />
                  </div>
                  <motion.span 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[13px] font-semibold tracking-[0.4em] text-white/70 uppercase drop-shadow-md"
                  >
                    Synthesizing
                  </motion.span>
                </motion.div>
              )}

              {/* SCI-FI TELEMETRY HUD */}
              {stage >= 2 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute top-8 right-10 z-30 text-[10px] font-mono text-[#7aa2ff] tracking-widest text-right opacity-80"
                >
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>
                    SYS_RENDER: MOTION_ENGINE_ONLINE
                  </motion.div>
                  <div className="mt-1.5 opacity-60">RES: 4096x2160 // FPS: 60</div>
                  <div className="mt-1.5 opacity-60 flex justify-end gap-2 items-center">
                    <span className="w-2 h-2 bg-[#ff80b5] rounded-full animate-pulse shadow-[0_0_10px_#ff80b5]" />
                    REC
                  </div>
                </motion.div>
              )}

              {/* PROGRESS TIMELINE */}
              {stage >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-32 left-12 right-12 h-[4px] bg-white/10 rounded-full z-20 overflow-hidden"
                >
                  <motion.div
                    animate={{ width: ["0%", "100%"] }}
                    transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                    className="relative h-full bg-gradient-to-r from-[#7aa2ff] via-[#b98cff] to-[#ff80b5] rounded-full shadow-[0_0_15px_rgba(255,128,181,0.5)]"
                  />
                </motion.div>
              )}
            </div>

              {/* Sent Prompt Badge */}
              {stage >= 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-24 left-1/2 -translate-x-1/2 z-30 px-6 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl text-center max-w-[85%]"
                >
                  <p className="text-[13px] md:text-[15px] text-white/90 font-medium tracking-wide">"{prompt}"</p>
                </motion.div>
              )}

            {/* 3. FLOATING PROMPT PILL */}
            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-[92%] sm:w-[85%] max-w-3xl z-30">
              <div className="h-14 md:h-18 py-2 md:py-4 rounded-full bg-white/[0.04] backdrop-blur-2xl border border-white/[0.12] shadow-[0_25px_50px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] flex items-center px-4 md:px-8 relative">
                <div className="flex-1 w-full pr-12 md:pr-16">
                  <input 
                    type="text"
                    value={stage === 0 ? prompt.substring(0, typedIndex) : ""}
                    readOnly
                    placeholder={stage >= 1 ? "Generating video..." : "Enter video prompt..."}
                    className="bg-transparent border-none outline-none text-[13px] md:text-[16px] font-medium text-white/90 tracking-wide w-full placeholder:text-white/30 cursor-default pointer-events-none"
                  />
                </div>

                <div 
                  className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 ${stage >= 1 ? 'bg-white/10 text-white/40 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]' : 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]'}`}
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