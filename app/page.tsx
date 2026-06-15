"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PremiumReviews from "./components/PremiumReviews";
import NiraOrbLogo from "./components/NiraOrbLogo";
import { playUISound } from "@/lib/audioEngine";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);
  const [logoActive, setLogoActive] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [activeSection, setActiveSection] = useState<"hero" | "reviews">("hero");

  // Audio for UI interactions using unified local synthesizer
  const uiSound = playUISound;

  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPos = container.scrollTop;
      const threshold = window.innerHeight * 0.45;
      if (scrollPos >= threshold) {
        setActiveSection("reviews");
      } else {
        setActiveSection("hero");
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
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
    <main 
      ref={mainRef}
      className="force-dark relative h-[100dvh] w-full overflow-y-auto overflow-x-hidden text-white bg-black snap-y snap-mandatory scroll-smooth z-10" 
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

      <canvas ref={canvasRef} className={`fixed inset-0 z-0 pointer-events-none transition-all duration-700 ${leaving ? "scale-110 opacity-0 blur-xl" : "opacity-100"}`} />
      
      <div className={`relative z-10 flex h-full min-h-full w-full flex-col items-center justify-center px-6 md:px-8 pt-16 pb-8 md:pt-24 md:pb-16 text-center transition-all duration-700 snap-start shrink-0 ${leaving ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
        
        {/* NIRA Official Logo */}
        <div
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
          className={`relative flex h-[50px] w-[50px] sm:h-[60px] sm:w-[60px] md:h-[80px] md:w-[80px] items-center justify-center rounded-[14px] sm:rounded-[18px] md:rounded-[24px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${logoActive ? "scale-[0.96] opacity-80" : "scale-100"}`}
        >
          <svg 
            viewBox="0 0 200 200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white"
            style={{ animation: "spin 15s linear infinite" }}
          >
            <g stroke="currentColor" strokeWidth="10" strokeLinecap="round" opacity="0.95">
              <ellipse cx="100" cy="100" rx="35" ry="80" />
              <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(60 100 100)" />
              <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(-60 100 100)" />
            </g>
          </svg>
        </div>

        {/* NIRA Text & Subtitle */}
        <div className="flex flex-col items-center mt-4 md:mt-8">
          <h1 
            className="text-[36px] sm:text-[56px] md:text-[84px] font-[400] leading-[1] tracking-[0.35em] md:tracking-[0.4em] text-[#E4E4E7] font-sans drop-shadow-none pl-[0.35em] md:pl-[0.4em] mix-blend-normal"
            style={{ WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", textShadow: "none" }}
          >
            NIRA
          </h1>
          <div 
            className="mt-2 md:mt-4 text-[10px] sm:text-[11px] md:text-[13px] font-[500] tracking-[0.6em] md:tracking-[0.8em] uppercase text-[#71717A] pl-[0.6em] md:pl-[0.8em] mix-blend-normal"
            style={{ WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", textShadow: "none" }}
          >
            Intelligence
          </div>
        </div>

        {/* Punchy Highlight */}
        <div className="mt-6 md:mt-12 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md mb-3 md:mb-5 shadow-[0_0_15px_rgba(255,255,255,0.02)]">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-[9px] sm:text-[10px] md:text-[12px] font-[600] text-white/70 tracking-[0.15em] uppercase">Neural Intelligence & Responsive Assistant</span>
          </div>
          
          <h2 className="text-[18px] sm:text-[32px] md:text-[42px] font-[600] tracking-[-0.02em] font-[var(--font-display)] text-center leading-[1.3] md:leading-[1.2] max-w-[90%] md:max-w-3xl">
            <span className="text-white">One request. </span>
            <span className="text-white/40">Multiple intelligences.</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500">The best possible answer.</span>
          </h2>
        </div>

        <p className="mt-3 md:mt-6 max-w-[85%] sm:max-w-2xl text-[13px] sm:text-[15px] md:text-[17px] leading-[1.5] tracking-[-0.01em] font-sans antialiased text-[#A1A1AA] mix-blend-normal">
          NIRA seamlessly integrates a network of the world's most powerful LLMs. It autonomously analyzes your request and dynamically routes it to the perfect model—delivering unprecedented precision across text, images, and video.
        </p>

        {/* Pills */}
        <div className="mt-4 md:mt-8 w-full overflow-hidden relative">
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
                className="group snap-center shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-[500] tracking-[0.03em] text-white/50 border border-white/[0.05] bg-white/[0.01] backdrop-blur-xl transform-gpu transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-white hover:bg-white/[0.04] hover:border-white/[0.12] hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(255,255,255,0.03)] active:scale-[0.98] active:opacity-80 cursor-pointer"
              >
                {m.icon}
                <span className="antialiased">{m.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full px-6 max-w-[320px] sm:max-w-none mx-auto">
          <button
            onMouseEnter={() => { uiSound("hover"); router.prefetch("/login"); }}
            onClick={() => { uiSound("enter"); setLeaving(true); router.push("/login"); }}
            className="group relative overflow-hidden flex items-center justify-center w-full sm:w-[220px] h-[50px] md:h-[56px] rounded-full text-[15px] md:text-[16px] font-[500] tracking-[0.02em] text-white bg-[#0A0A0A] border border-white/[0.12] shadow-[0_8px_20px_rgba(0,0,0,0.6)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hover:bg-[#1A1A1A] md:hover:border-white/[0.2] md:hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] md:hover:scale-[1.02] active:scale-[0.94] active:bg-[#1A1A1A] active:duration-75"
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
            className="group relative overflow-hidden flex items-center justify-center gap-2.5 w-full sm:w-[220px] h-[50px] md:h-[56px] rounded-full text-[15px] md:text-[16px] font-[500] tracking-[0.02em] text-[#A1A1AA] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hover:text-white md:hover:bg-white/[0.06] md:hover:border-white/[0.15] md:hover:scale-[1.02] active:scale-[0.94] active:bg-white/[0.08] active:duration-75"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent translate-x-[-100%] md:group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
            <span className="relative z-10 antialiased">Explore NIRA</span>
            <svg className="relative z-10 w-3.5 h-3.5 opacity-70 md:group-hover:opacity-100 md:group-hover:translate-x-1 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <p className="mt-6 md:mt-10 mb-0 text-[11px] md:text-[13px] text-[#52525B] tracking-[0.02em] font-[400] antialiased">
          Built for creators, teams & AI-first companies
        </p>

      </div>

      <div className={`relative z-10 w-full min-h-[100dvh] flex flex-col justify-center transition-all duration-1000 delay-300 snap-start shrink-0 ${leaving ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"}`}>
        <PremiumReviews />
      </div>

      {/* Right Side Vertical Scroll Navigation & Hint */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-6 pointer-events-none">
        <div className="flex flex-col items-center gap-3 pointer-events-auto">
          <button
            onClick={() => {
              uiSound("click");
              mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group relative flex items-center justify-center w-8 h-8 focus:outline-none cursor-pointer"
            title="Home"
          >
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              activeSection === "hero" 
                ? "bg-white scale-[1.8] shadow-[0_0_12px_rgba(255,255,255,0.8)]" 
                : "bg-white/30 group-hover:bg-white/70"
            }`} />
            <span className="absolute right-10 text-[11px] font-medium tracking-wider uppercase text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10 whitespace-nowrap">
              Home
            </span>
          </button>

          {/* Connecting Line with Animated Flowing Streak */}
          <div className="relative w-[2px] h-16 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent via-white to-transparent"
              style={{
                animation: "scrollFlowLine 2s cubic-bezier(0.25, 1, 0.5, 1) infinite"
              }}
            />
          </div>

          <button
            onClick={() => {
              uiSound("click");
              const container = mainRef.current;
              if (container) {
                container.scrollTo({ top: container.clientHeight, behavior: "smooth" });
              }
            }}
            className="group relative flex items-center justify-center w-8 h-8 focus:outline-none cursor-pointer"
            title="Reviews"
          >
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              activeSection === "reviews" 
                ? "bg-white scale-[1.8] shadow-[0_0_12px_rgba(255,255,255,0.8)]" 
                : "bg-white/30 group-hover:bg-white/70"
            }`} />
            <span className="absolute right-10 text-[11px] font-medium tracking-wider uppercase text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10 whitespace-nowrap">
              Reviews
            </span>
          </button>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes scrollFlowLine {
            0% {
              transform: translateY(-100%);
            }
            80%, 100% {
              transform: translateY(200%);
            }
          }
        `}} />
      </div>
    </main>
  );
}
