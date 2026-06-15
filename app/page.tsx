"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import PremiumReviews from "./components/PremiumReviews";
import NiraOrbLogo from "./components/NiraOrbLogo";
import { playUISound } from "@/lib/audioEngine";
import { smoothScrollTo } from "@/lib/scrollUtils";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);
  const [logoActive, setLogoActive] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [activeSection, setActiveSection] = useState<"hero" | "reviews">("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  // Audio for UI interactions using unified local synthesizer
  const uiSound = playUISound;

  // Scroll tracking for Apple-style dynamic parallax & fades
  const { scrollY } = useScroll();

  // Scroll speed offsets for true layered depth:
  // Background particles scroll at 0.1x speed (positive value translates down relative to normal upward scroll)
  const bgY = useTransform(scrollY, [0, 500], [0, -50]);
  // Logo scrolls at 0.15x speed
  const logoY = useTransform(scrollY, [0, 500], [0, -75]);
  // Headline layer (Title, pill, tagline, paragraph) scrolls at 0.25x speed
  const headlineY = useTransform(scrollY, [0, 500], [0, -125]);
  // CTA layer (Buttons, pills, footer note) scrolls at 0.35x speed
  const ctaY = useTransform(scrollY, [0, 500], [0, -175]);

  // Background particles fade gradually from 1.0 -> 0.25
  const bgOpacity = useTransform(scrollY, [0, 600], [1.0, 0.25]);

  // Background particles scale shifts (dolly zoom depth effect)
  const bgScale = useTransform(scrollY, [0, 600], [1.0, 1.06]);

  // Hero section scale: subtle 1.0 -> 0.96 (premium and elegant)
  const heroScale = useTransform(scrollY, [0, 500], [1.0, 0.96]);

  // Hero opacity: smooth fade-out from 1.0 -> 0.0 over 450px of scroll
  const heroOpacity = useTransform(scrollY, [0, 450], [1.0, 0.0]);

  // Hero blur: subtle defocus from 0px -> maximum 3px
  const blurVal = useTransform(scrollY, [0, 400], [0, 3]);
  const heroBlur = useTransform(blurVal, (v) => `blur(${v}px)`);

  // Staggered entrance reveal variants (Apple ease-out)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 20);
      const threshold = window.innerHeight * 0.45;
      if (scrollPos >= threshold) {
        setActiveSection("reviews");
      } else {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Particle background logic
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; dx: number; dy: number; size: number }[] = [];
    let isMobile = false;
    
    const resize = () => {
      isMobile = window.innerWidth < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = [];
      // Ultra-premium aesthetic: fewer particles mean less clutter and a more elegant, focused design
      const particleCount = isMobile ? 15 : 35;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: 0,
          vy: 0,
          dx: (Math.random() - 0.5) * 0.3,
          dy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.2 + 0.6,
        });
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const pointer = { x: -9999, y: -9999 };
    
    const onMouseMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        pointer.x = e.touches[0].clientX;
        pointer.y = e.touches[0].clientY;
      }
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchMove, { passive: true });
    window.addEventListener("mouseleave", onPointerLeave);
    window.addEventListener("touchend", onPointerLeave);

    let animationFrameId: number;
    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        const dxm = p.x - pointer.x;
        const dym = p.y - pointer.y;
        const distPointer = Math.sqrt(dxm * dxm + dym * dym);

        // Buttery smooth magnetic repulsion
        const repelRadius = isMobile ? 100 : 180;
        if (distPointer < repelRadius && distPointer > 0.1) {
          const force = Math.pow((repelRadius - distPointer) / repelRadius, 1.5);
          p.vx += (dxm / distPointer) * force * 0.6;
          p.vy += (dym / distPointer) * force * 0.6;
        }

        // Apply velocities
        p.x += p.vx + p.dx;
        p.y += p.vy + p.dy;
        
        // Fluid damping
        p.vx *= 0.90;
        p.vy *= 0.90;
        
        // Wrap around edges
        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;

        // Draw ultra-sharp premium node
        ctx.fillStyle = "rgba(120, 170, 255, 0.5)";
        ctx.beginPath();
        const currentSize = p.size + (distPointer < repelRadius ? 0.6 : 0);
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchMove);
      window.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("touchend", onPointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="force-dark relative w-full text-white bg-black z-10" 
      style={{ 
        paddingTop: 'env(safe-area-inset-top)', 
        paddingBottom: 'env(safe-area-inset-bottom)', 
        paddingLeft: 'env(safe-area-inset-left)', 
        paddingRight: 'env(safe-area-inset-right)' 
      }}
    >
      
      {/* Top Left Logo Area */}
      <div className="absolute top-[calc(env(safe-area-inset-top)+1rem)] left-[calc(env(safe-area-inset-left)+1.5rem)] md:top-8 md:left-10 z-50 select-none cursor-pointer">
        <div className="flex items-center gap-2.5 md:gap-3.5 group opacity-90 hover:opacity-100 transition-opacity duration-300">
          <span className="text-[18px] md:text-[22px] font-[600] tracking-[-0.04em] text-white font-sans transition-all duration-300 antialiased">
            NIRA
          </span>
          <div className="h-[16px] w-px bg-white/[0.15] group-hover:bg-white/[0.25] transition-colors duration-300" />
          <span className="text-[11px] md:text-[12px] font-[500] tracking-[0.22em] uppercase text-white/50 group-hover:text-white/70 transition-colors duration-300 antialiased">
            Intelligence
          </span>
        </div>
      </div>

      <motion.canvas 
        ref={canvasRef} 
        style={{
          y: bgY,
          opacity: leaving ? 0 : bgOpacity,
          scale: leaving ? 1.1 : bgScale,
          filter: leaving ? "blur(20px)" : "blur(0px)",
          transition: leaving ? "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s cubic-bezier(0.16, 1, 0.3, 1)" : "none"
        }}
        className="fixed inset-0 z-0 pointer-events-none" 
      />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          opacity: leaving ? 0 : heroOpacity,
          scale: leaving ? 0.95 : heroScale,
          filter: leaving ? "blur(10px)" : heroBlur,
          transition: leaving ? "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s cubic-bezier(0.16, 1, 0.3, 1)" : "none"
        }}
        className="relative z-10 flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 md:px-8 pt-12 pb-24 md:pt-20 md:pb-36 text-center"
      >
        
        {/* NIRA Official Logo */}
        <motion.div
          variants={itemVariants}
          style={{ y: logoY }}
          onMouseEnter={() => uiSound("hover")}
          onClick={() => {
            uiSound("click");
            setLogoActive(true);
            setPulse(true);
            setTimeout(() => {
              setLogoActive(false);
              setPulse(false);
            }, 400);
          }}
          className={`relative flex h-[44px] w-[44px] sm:h-[52px] sm:w-[52px] md:h-[68px] md:w-[68px] items-center justify-center rounded-[12px] sm:rounded-[16px] md:rounded-[20px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${logoActive ? "scale-[0.96] opacity-80" : "scale-100"}`}
        >
          <svg 
            viewBox="0 0 200 200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-13 md:h-13 text-white"
            style={{ animation: "spin 15s linear infinite" }}
          >
            <g stroke="currentColor" strokeWidth="10" strokeLinecap="round" opacity="0.95">
              <ellipse cx="100" cy="100" rx="35" ry="80" />
              <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(60 100 100)" />
              <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(-60 100 100)" />
            </g>
          </svg>
        </motion.div>

        {/* NIRA Text & Subtitle */}
        <motion.div 
          variants={itemVariants}
          style={{ y: headlineY }}
          className="flex flex-col items-center mt-3 md:mt-6"
        >
          <h1 
            className="shimmer-text-wave text-[36px] sm:text-[56px] md:text-[80px] font-[700] leading-[1] tracking-[0.3em] md:tracking-[0.35em] text-white font-sans drop-shadow-none pl-[0.3em] md:pl-[0.35em] mix-blend-normal"
            style={{ WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", textShadow: "none" }}
          >
            NIRA
          </h1>
          <div 
            className="mt-1 md:mt-2.5 text-[10px] sm:text-[11px] md:text-[12px] font-[600] tracking-[0.5em] md:tracking-[0.7em] uppercase text-zinc-400 pl-[0.5em] md:pl-[0.7em] mix-blend-normal"
            style={{ WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", textShadow: "none" }}
          >
            Intelligence
          </div>
        </motion.div>

        {/* Punchy Highlight */}
        <motion.div 
          variants={itemVariants}
          style={{ y: headlineY }}
          className="mt-8 md:mt-16 flex flex-col items-center"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-white/[0.015] border border-white/[0.06] backdrop-blur-md mb-4 md:mb-6 shadow-[0_0_15px_rgba(255,255,255,0.01)]"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-[9px] sm:text-[10px] md:text-[11px] font-[600] text-zinc-300 tracking-[0.2em] uppercase">Neural Intelligence & Responsive Assistant</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-[22px] sm:text-[38px] md:text-[52px] font-[800] tracking-[-0.03em] font-[var(--font-display)] text-center leading-[1.2] md:leading-[1.1] max-w-[95%] md:max-w-4xl text-white"
          >
            <span>One request. </span>
            <span className="text-white/30">Multiple intelligences.</span> <br className="hidden sm:inline" />
            <span className="shimmer-rose-wave">The best possible answer.</span>
          </motion.h2>
        </motion.div>

        <motion.p 
          variants={itemVariants}
          style={{ y: headlineY }}
          className="mt-4 md:mt-8 max-w-[85%] sm:max-w-2xl text-[14px] sm:text-[16px] md:text-[18px] leading-[1.6] tracking-[-0.01em] font-sans antialiased text-zinc-300 mix-blend-normal"
        >
          NIRA integrates the world's most powerful AI models, dynamically routing your request to the perfect engine to deliver unprecedented speed and precision across text, images, and video.
        </motion.p>

        {/* Pills */}
        <motion.div 
          variants={itemVariants}
          style={{ y: ctaY }}
          className="mt-6 md:mt-10 w-full overflow-hidden relative"
        >
          <div className="absolute left-0 top-0 bottom-0 w-8 md:hidden bg-gradient-to-r from-black via-black/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:hidden bg-gradient-to-l from-black via-black/50 to-transparent z-10 pointer-events-none" />
          <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory items-center justify-start md:justify-center px-6 md:px-0 gap-3 pb-4 pt-2 -mb-4">
            {[
              { 
                name: "Chat", 
                icon: (
                  <svg className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                )
              },
              { 
                name: "Images", 
                icon: (
                  <svg className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                )
              },
              { 
                name: "Video", 
                icon: (
                  <svg className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 7l-7 5 7 5V7z"/>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                  </svg>
                )
              },
              { 
                name: "Code", 
                icon: (
                  <svg className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                )
              }
            ].map((m) => (
              <span 
                key={m.name} 
                onMouseEnter={() => uiSound("hover")}
                className="group snap-center shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-[500] tracking-[0.03em] text-white/50 border border-white/[0.04] bg-white/[0.01] backdrop-blur-xl transform-gpu transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-white hover:bg-white/[0.04] hover:border-white/[0.1] hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,255,255,0.02)] active:scale-[0.98] active:opacity-80 cursor-pointer"
              >
                {m.icon}
                <span className="antialiased">{m.name}</span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants}
          style={{ y: ctaY }}
          className="mt-8 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-6 max-w-[320px] sm:max-w-none mx-auto"
        >
          <button
            onMouseEnter={() => { uiSound("hover"); router.prefetch("/login"); }}
            onClick={() => { uiSound("enter"); setLeaving(true); router.push("/login"); }}
            className="group relative overflow-hidden flex items-center justify-center w-full sm:w-[220px] h-[52px] md:h-[58px] rounded-full text-[15px] md:text-[16px] font-[600] tracking-tight text-white bg-[#0D0D10]/80 backdrop-blur-2xl border border-white/[0.12] shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#161619]/90 hover:border-white/[0.2] hover:shadow-[0_0_20px_rgba(255,255,255,0.04)] hover:scale-[1.02] active:scale-[0.94] active:bg-[#161619] active:duration-75"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent translate-x-[-100%] md:group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
            <span className="relative z-10 antialiased">Ask NIRA</span>
          </button>
          
          <button
            onClick={() => {
              uiSound("click");
              if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate(40);
              }
              window.open("/nira", "_blank", "noopener,noreferrer");
            }}
            className="group relative overflow-hidden flex items-center justify-center gap-2.5 w-full sm:w-[220px] h-[52px] md:h-[58px] rounded-full text-[15px] md:text-[16px] font-[600] tracking-tight text-zinc-400 bg-white/[0.015] backdrop-blur-2xl border border-white/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-white hover:bg-white/[0.04] hover:border-white/[0.12] hover:scale-[1.02] active:scale-[0.94] active:bg-white/[0.06] active:duration-75"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent translate-x-[-100%] md:group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
            <span className="relative z-10 antialiased">Explore NIRA</span>
            <svg className="relative z-10 w-3.5 h-3.5 opacity-70 md:group-hover:opacity-100 md:group-hover:translate-x-1 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>

        <motion.p 
          variants={itemVariants}
          style={{ y: ctaY }}
          className="mt-6 md:mt-10 mb-0 text-[11px] md:text-[12px] text-zinc-600 tracking-[0.04em] uppercase font-[500] antialiased"
        >
          Built for creators, teams & AI-first companies
        </motion.p>

        {/* Premium Bottom Navigation Dock (Fixed, fades out on scroll) */}
        <div 
          className={`fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled 
              ? "opacity-0 translate-y-10 scale-95" 
              : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          <div className="flex items-center gap-1 px-1.5 py-1.5 rounded-full bg-[#0D0D10]/70 backdrop-blur-2xl border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.6)] pointer-events-auto transition-all duration-700">
            <button
              onClick={() => {
                uiSound("click");
                smoothScrollTo(0, 850);
              }}
              className={`px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-[600] tracking-[0.05em] uppercase transition-all duration-500 cursor-pointer ${
                activeSection === "hero"
                  ? "bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Overview
            </button>
            
            <button
              onClick={() => {
                uiSound("click");
                const el = document.getElementById("reviews-section");
                if (el) {
                  const targetY = el.getBoundingClientRect().top + window.scrollY;
                  smoothScrollTo(targetY, 850);
                }
              }}
              className={`px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-[600] tracking-[0.05em] uppercase transition-all duration-500 cursor-pointer ${
                activeSection === "reviews"
                  ? "bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Reviews
            </button>
          </div>
        </div>

      </motion.div>

      <div className={`relative z-10 w-full flex flex-col transition-all duration-1000 delay-300 ${leaving ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"}`}>
        <PremiumReviews />
      </div>

      {/* Premium Scroll-to-Top Button */}
      <button
        onClick={() => {
          uiSound("click");
          smoothScrollTo(0, 850);
        }}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-10 z-55 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0D0D10]/80 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-zinc-400 hover:text-white hover:scale-[1.05] active:scale-[0.92] hover:border-white/[0.15] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto ${
          isScrolled 
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" 
            : "opacity-0 translate-y-4 scale-75 pointer-events-none"
        }`}
        style={{ WebkitTapHighlightColor: "transparent" }}
        title="Scroll to Top"
      >
        <svg 
          className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </div>
  );
}
