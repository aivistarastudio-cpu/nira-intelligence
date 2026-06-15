"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const NiraLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 200 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g stroke="currentColor" strokeWidth="10" strokeLinecap="round" opacity="0.9">
      <ellipse cx="100" cy="100" rx="35" ry="80" />
      <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(60 100 100)" />
      <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(-60 100 100)" />
    </g>
  </svg>
);

export default function ChatSlide({ active }: { active?: boolean }) {
  const fullText = "I'm feeling really overwhelmed with all these deadlines. I don't know what to do first.";
  const [typedIndex, setTypedIndex] = useState(0);
  const [step, setStep] = useState(0); // 0=typing, 1=sent, 2=thinking, 3=structuring, 4=responded

  /* ================= 🧲 MAGNETIC PRO+ ENGINE ================= */

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // ultra smooth springs (premium inertia feel)
  const sx = useSpring(mx, { stiffness: 70, damping: 30 });
  const sy = useSpring(my, { stiffness: 70, damping: 30 });

  const rotateX = useTransform(sy, [-140, 140], ["6deg", "-6deg"]);
  const rotateY = useTransform(sx, [-140, 140], ["-6deg", "6deg"]);

  // 🔥 PRO+ GLOW FOLLOW (main upgrade)
  const glowX = useTransform(sx, [-200, 200], ["30%", "70%"]);
  const glowY = useTransform(sy, [-200, 200], ["30%", "70%"]);

  /* ================= AUTO-ANIMATION ENGINE ================= */

  useEffect(() => {
    if (!active) {
      setTypedIndex(0);
      setStep(0);
      return;
    }

    let i = 0;
    setTypedIndex(0);
    setStep(0);

    const typing = setInterval(() => {
      i++;
      setTypedIndex(i);

      if (i >= fullText.length) {
        clearInterval(typing);
        
        setTimeout(() => setStep(1), 600); // 1. Auto-Send
        setTimeout(() => setStep(2), 1200); // 2. Thinking
        setTimeout(() => setStep(3), 2500); // 3. Structuring
        setTimeout(() => setStep(4), 4000); // 4. Response
      }
    }, 30);

    return () => clearInterval(typing);
  }, [active]);

  return (
    <div className="nira-section nira-alive-bg text-center px-6">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADLINE */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: active ? 1 : 0, y: active ? 0 : 20 }}
          transition={{ duration: 1 }}
          className="text-[clamp(28px,4vw,56px)] font-semibold tracking-tight text-white/90 px-4 md:px-0"
        >
          Because simple answers aren’t enough.
        </motion.h2>

        <p className="mt-4 md:mt-5 text-white/50 max-w-xl mx-auto text-[14px] md:text-[15px] leading-relaxed px-6 md:px-0">
          NIRA doesn’t just spit out text. It analyzes context, predicts your needs, and structures solutions like a true partner.
        </p>

        {/* CHAT WINDOW MOCK */}
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

         {/* GLASS WINDOW */}
<div
  style={{
    transform: "translateZ(40px)",
    transition: "transform 0.4s ease",
  }}
  className="
    relative
    w-full
    rounded-[1.5rem] md:rounded-[2.5rem]
    border border-white/[0.12]
    bg-[#070707]
    shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] md:shadow-[0_50px_100px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)]
    h-[450px] md:h-[600px]
    text-left
    overflow-hidden
    flex
  "
>
  {/* 🔥 LIGHT LAYER (INSIDE CARD — IMPORTANT) */}
  <div className="absolute inset-0 pointer-events-none">
    {/* CENTER GLOW */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[320px] h-[320px] bg-white/10 rounded-full blur-[120px] opacity-20" />
    </div>
    {/* TOP LIGHT GRADIENT */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-40" />
  </div>

  {/* SIDEBAR MOCK */}
  <div className="hidden sm:flex w-[260px] bg-white/[0.015] border-r border-white/5 p-5 flex-col justify-between relative z-10">
    <div className="space-y-4">
      <div className="flex items-center gap-2.5 text-white/80 font-semibold mb-8">
        <NiraLogo size={26} className="text-[#ff80b5]" />
        <span className="text-[16px] tracking-wide mt-0.5">NIRA Chat</span>
      </div>
      <div className="space-y-4">
        <div className="h-8 w-full rounded-md bg-white/[0.06] flex items-center px-3"><span className="text-[11px] font-medium tracking-wide text-white/50 uppercase">Today</span></div>
        <div className="h-7 w-[80%] rounded-md bg-white/[0.03] ml-3" />
        <div className="h-7 w-[90%] rounded-md bg-white/[0.03] ml-3" />
      </div>
    </div>
    <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/[0.04]">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/5" />
      <div className="h-3 w-20 bg-white/10 rounded-sm" />
    </div>
  </div>

  {/* MAIN CHAT AREA MOCK */}
  <div className="flex-1 flex flex-col relative z-10 bg-[#070707]">
    {/* Topbar Mock */}
    <div className="h-14 flex items-center px-8 justify-between shrink-0 border-b border-white/[0.02]">
      <div className="h-3.5 w-32 bg-white/10 rounded-sm" />
      <div className="h-7 w-20 bg-white/[0.08] rounded-full" />
    </div>
    
    {/* Messages Area */}
    <div className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6 flex flex-col overflow-y-auto">
      
      {/* Empty State when idle */}
      {step === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center opacity-40">
          <NiraLogo size={40} className="mb-4 text-white/50" />
          <p className="text-[14px] text-white/60 tracking-wide">NIRA is ready to assist.</p>
        </div>
      )}

      {/* User Message Bubble (Appears after auto-send) */}
      {step >= 1 && (
        <div className="flex justify-end relative z-10 w-full animate-slide-up">
          <div className="px-4 py-3 md:px-5 md:py-3.5 rounded-[22px] bg-white/[0.08] backdrop-blur-md text-[14px] md:text-[15px] font-medium leading-relaxed max-w-[90%] md:max-w-[85%] text-white/90 shadow-lg">
            {fullText}
          </div>
        </div>
      )}

      {/* AI Message Stream */}
      {step >= 2 && (
        <div className="flex justify-start items-start w-full mt-4">
          <div className="flex-1 pt-1">
            
            {/* APPLE / GOOGLE STYLE LOADING SHIMMER */}
            {step < 4 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4 px-4 py-3 bg-white/[0.02] rounded-2xl border border-white/[0.05] inline-flex"
              >
                {/* Glowing Orbital Ring */}
                <div className="relative w-7 h-7 flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#ff80b5] border-r-[#7aa2ff] opacity-80"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[2px] rounded-full border-2 border-transparent border-b-[#b98cff] border-l-[#ff80b5] opacity-60"
                  />
                  <div className="w-2 h-2 rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                </div>
                <motion.span 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[14px] font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#7aa2ff] via-[#b98cff] to-[#ff80b5]"
                >
                  {step === 2 ? "Understanding context..." : "Structuring a gentle path..."}
                </motion.span>
              </motion.div>
            )}

            {/* BEAUTIFUL FORMATTED RESPONSE */}
            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-[100%] md:max-w-[95%] space-y-3 md:space-y-4"
              >
                {/* Clean Flow Container (No Bubble) */}
                <div className="pt-2 pl-1 space-y-4 md:space-y-5">
                  <p className="text-[14px] md:text-[15px] text-white/90 leading-[1.6] md:leading-[1.7] tracking-wide">
                    I hear you. It's completely normal to feel paralyzed when everything piles up at once. Let's break this down into manageable, actionable steps:
                  </p>
                  
                  <div className="space-y-3 md:space-y-4 pl-1">
                    <div className="text-[14px] md:text-[15px] text-white/80 leading-[1.6] md:leading-[1.7] tracking-wide">
                      <span className="font-semibold text-white">1. Immediate Triage:</span> Identify the absolute "must-do today" tasks. We will compartmentalize everything else for now to reduce cognitive load.
                    </div>
                    
                    <div className="text-[14px] md:text-[15px] text-white/80 leading-[1.6] md:leading-[1.7] tracking-wide">
                      <span className="font-semibold text-white">2. Automated Delegation:</span> I can draft your pending emails and format your reports to save you energy on repetitive work.
                    </div>
                    
                    <div className="text-[14px] md:text-[15px] text-white/80 leading-[1.6] md:leading-[1.7] tracking-wide">
                      <span className="font-semibold text-white">3. Mandatory Recovery:</span> Once the critical path is clear, schedule a 15-minute complete disconnect. Rest is productive.
                    </div>
                  </div>

                  <p className="text-[14px] md:text-[15px] text-white/90 leading-[1.6] md:leading-[1.7] tracking-wide pt-1">
                    What is the most critical item on your desk right now? We'll tackle it together.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>

    {/* Input Bar */}
    <div className="p-4 md:p-6 shrink-0 bg-gradient-to-t from-[#070707] to-transparent relative z-20">
      <div className="h-12 md:h-14 w-full rounded-full bg-white/[0.04] border border-white/[0.08] shadow-[inset_0_2px_10px_rgba(0,0,0,0.4)] flex items-center px-4 md:px-6 relative focus-within:border-white/20 focus-within:bg-white/[0.06] transition-all">
        <input 
          type="text"
          value={step === 0 ? fullText.substring(0, typedIndex) : ""}
          readOnly
          placeholder="Message NIRA..."
          className="bg-transparent border-none outline-none text-[13px] md:text-[14px] font-medium text-white/90 tracking-wide w-full pr-12 placeholder:text-white/30 cursor-default"
        />
        <div className={`absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-colors ${step >= 1 ? 'bg-white/5 opacity-30' : 'bg-white/10 opacity-100'}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white relative left-[1px]"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4Z"/></svg>
        </div>
      </div>
    </div>
  </div>
</div>
        </motion.div>
      </div>
    </div>
  );
}

/* SMALL COMPONENTS */

function BrainLine({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.4 }}
      className="flex justify-start"
    >
      <div
        className="
          px-3 py-1.5
          rounded-[12px]
          bg-white/[0.02]
          text-[11.5px]
          text-white/60
          flex items-center gap-2
          font-medium
        "
      >
        {/* 🔥 NIRA animated thinking pulse */}
        <motion.span
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#7aa2ff] via-[#b98cff] to-[#ff80b5] shadow-[0_0_6px_rgba(185,140,255,0.4)]"
        />

        {label}
      </div>
    </motion.div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, delay }}
      className="w-2 h-2 bg-gradient-to-r from-[#7aa2ff] to-[#b98cff] rounded-full shadow-[0_0_4px_rgba(185,140,255,0.4)]"
    />
  );
}