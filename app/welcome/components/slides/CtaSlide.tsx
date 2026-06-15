"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function NiraCTA() {

  const router = useRouter();

  return (
    <div className="w-full min-h-screen flex items-start justify-center px-6 pt-28 pb-16 relative">

      <div className="max-w-4xl mx-auto text-center">

        {/* MICRO LABEL */}
        <p className="text-[10px] tracking-[0.4em] text-white/20 uppercase mb-6">
          NIRA SYSTEM
        </p>

        {/* 🔥 PREMIUM HEADLINE */}
        <h2 className="
          font-display
          text-[clamp(42px,5vw,72px)]
          leading-[1.05]
          tracking-[-0.045em]
          font-semibold
        ">
          <span className="text-white">
            Stop switching tools.
          </span>

          <br />

          <span className="
            bg-gradient-to-r 
            from-white/90 
            via-white/50 
            to-white/20 
            bg-clip-text 
            text-transparent
          ">
            Start thinking with NIRA.
          </span>
        </h2>

        {/* SUBTEXT */}
        <p className="
          mt-6
          text-white/45
          text-[15px]
          max-w-[480px]
          mx-auto
          leading-relaxed
        ">
          One system for chat, creation and execution — designed to stay out of your way.
        </p>

{/* 🧠 AI ORB */}
<div className="mt-16 flex justify-center">
</div>
        {/* 🔥 APPLE-LEVEL PREMIUM CTA */}
        <div className="mt-20 flex justify-center relative z-10">
          
          {/* Subtle Ambient Glow Behind Button */}
          <motion.div 
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[150px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] blur-2xl pointer-events-none" 
          />

          <motion.button
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/dashboard/chat")}
            className="
              group
              relative
              flex items-center
              pl-6 pr-2 py-2 md:pl-8 md:pr-3 md:py-3
              rounded-[4rem]
              bg-[#0a0a0a]/60
              hover:bg-[#121212]/80
              border border-white/[0.08] hover:border-white/[0.15]
              backdrop-blur-3xl
              transition-colors duration-500
              shadow-[0_20px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]
              overflow-hidden
              scale-[0.9] sm:scale-100
            "
          >
            {/* Shimmer Sweep on Hover */}
            <motion.div 
              className="absolute top-0 bottom-0 w-[120px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -skew-x-12"
              initial={{ left: "-100%" }}
              variants={{
                hover: { left: "200%", transition: { duration: 1.2, ease: "easeInOut" } }
              }}
            />

            {/* Text Content */}
            <div className="flex flex-col items-start text-left mr-4 md:mr-8">
              <span className="text-[9px] md:text-[10px] tracking-[0.3em] font-medium text-white/30 uppercase mb-0.5">
                ENTER NIRA
              </span>
              <span className="text-[17px] md:text-[20px] font-semibold text-white/90 tracking-tight group-hover:text-white transition-colors duration-300">
                Start Chatting
              </span>
            </div>

            {/* Glowing Action Circle */}
            <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-500 shrink-0 group-hover:scale-[1.05]">
               <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-[22px] md:h-[22px] group-hover:translate-x-0.5 transition-transform duration-300"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            
          </motion.button>
        </div>

      </div>
    </div>
  );
}