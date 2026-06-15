"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

/* =========================================================
   LIQUID AURORA BACKGROUND (Ultra Premium)
======================================================== */
function LiquidAurora() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50 bg-[#000000]">
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: ["0%", "5%", "-5%", "0%"],
          y: ["0%", "-5%", "5%", "0%"],
        }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vh] bg-indigo-600/15 blur-[120px] rounded-full mix-blend-screen"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          x: ["0%", "-10%", "10%", "0%"],
          y: ["0%", "10%", "-10%", "0%"],
        }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vh] bg-purple-600/15 blur-[120px] rounded-full mix-blend-screen"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: ["0%", "10%", "-10%", "0%"],
          y: ["0%", "5%", "-5%", "0%"],
        }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[50vh] bg-blue-600/15 blur-[120px] rounded-full mix-blend-screen"
      />
      
      {/* Noise Overlay for Texture */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}

/* =========================================================
   NIRA LOGO COMPONENT
======================================================== */
function NiraLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)]">
        {/* NIRA Official Monogram */}
        <span className="text-black font-extrabold text-[22px] tracking-tighter leading-none font-sans">N</span>
      </div>
      <span className="text-[16px] font-semibold tracking-[0.2em] text-white/90 uppercase">
        NIRA
      </span>
    </div>
  );
}

/* =========================================================
   DASHBOARD PAGE
======================================================== */
export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Human");
  const [time, setTime] = useState("");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  
  const rotateX = useTransform(springY, [-500, 500], [5, -5]);
  const rotateY = useTransform(springX, [-500, 500], [-5, 5]);

  useEffect(() => {
    // Clock
    const updateTime = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    updateTime();
    const timer = setInterval(updateTime, 1000);

    // Fetch User
    const fetchUser = async () => {
      const devEmail = localStorage.getItem("nira_user_email");
      if (devEmail) {
        setUserName(devEmail.split("@")[0]);
      }
      const { data: authData } = await supabase.auth.getUser();
      if (authData?.user) {
        const name = authData.user.user_metadata?.full_name || authData.user.user_metadata?.name;
        if (name) setUserName(name.split(" ")[0]);
        else if (authData.user.email) setUserName(authData.user.email.split("@")[0]);
      }
    };
    fetchUser();

    // Mouse Tracking for 3D perspective
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMove);

    return () => {
      clearInterval(timer);
      window.removeEventListener("mousemove", handleMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="relative min-h-screen bg-[#000000] text-white overflow-hidden selection:bg-white/10 font-sans">
      
      <LiquidAurora />

      {/* TOP NAVIGATION */}
      <header className="absolute top-0 w-full flex justify-between items-center px-8 md:px-12 py-8 z-20">
        <NiraLogo />
        
        <div className="flex items-center gap-6">
          <span className="text-[12px] font-medium tracking-widest text-white/40 uppercase">
            {time}
          </span>
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[14px] font-bold text-white/80 uppercase shadow-lg">
            {userName.charAt(0)}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        
        <motion.div 
          style={{ rotateX, rotateY, perspective: 1000, transformStyle: "preserve-3d" }}
          className="w-full max-w-4xl flex flex-col items-center text-center"
        >
          {/* GREETING */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[48px] md:text-[80px] font-semibold tracking-tight text-white/90 leading-tight">
              Hello, {userName}.
            </h1>
            <p className="mt-6 text-[18px] md:text-[24px] text-white/40 tracking-wide font-medium">
              I am NIRA. How can I help you today?
            </p>
          </motion.div>

          {/* MASSIVE ENTRY PROMPT BAR */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full mt-16 md:mt-24 relative group cursor-pointer"
            onClick={() => router.push("/dashboard/chat")}
          >
            {/* Ambient Glow */}
            <div className="absolute inset-0 -z-10 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative h-20 md:h-24 w-full rounded-full bg-white/[0.02] border border-white/[0.08] backdrop-blur-3xl flex items-center px-8 md:px-10 shadow-[0_30px_60px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-500 group-hover:bg-white/[0.04] group-hover:border-white/[0.15] group-hover:scale-[1.01] overflow-hidden">
              
              {/* Sweep Light Effect */}
              <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-[200%] group-hover:animate-[sweep_1.5s_ease-in-out_infinite]" />

              <span className="text-white/30 text-[18px] md:text-[22px] font-medium tracking-wide flex-1 text-left group-hover:text-white/60 transition-colors duration-500">
                Start a conversation...
              </span>
              
              {/* Enter Button inside Prompt */}
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-all duration-500 shrink-0 group-hover:scale-105">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative left-[1px]"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </div>
          </motion.div>

        </motion.div>

      </main>
    </div>
  );
}