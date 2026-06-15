"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";

import IntroSlide from "./slides/IntroSlide";
import ChatSlide from "./slides/ChatSlide";
import ImageSlide from "./slides/ImageSlide";
import VideoSlide from "./slides/VideoSlide";
import CtaSlide from "./slides/CtaSlide";
import BackgroundEngine from "./ui/BackgroundEngine";

/* ================= SLIDES ================= */
const SLIDES = [
  { id: "01", name: "Vision", Component: IntroSlide },
  { id: "02", name: "Dialogue", Component: ChatSlide },
  { id: "03", name: "Synthesis", Component: ImageSlide },
  { id: "04", name: "Motion", Component: VideoSlide },
  { id: "05", name: "Action", Component: CtaSlide },
];

export default function WelcomeEngine() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);

  const lock = useRef(false);

  /* ================= CINEMATIC CAMERA ================= */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cameraX = useSpring(mouseX, {
    stiffness: 30,
    damping: 40,
    mass: 1.2,
  });

  const cameraY = useSpring(mouseY, {
    stiffness: 30,
    damping: 40,
    mass: 1.2,
  });

  const rotateY = useTransform(cameraX, [-700, 700], [6, -6]);
  const rotateX = useTransform(cameraY, [-700, 700], [-6, 6]);

  /* ================= PAGINATION ================= */
  const paginate = useCallback(
  (dir: number) => {
    if (lock.current) return;

    const next = index + dir;
    if (next < 0 || next >= SLIDES.length) return;

    setDirection(dir);
    setIndex(next);

    // 🔥 fast lock (smooth feel)
    lock.current = true;
    setTimeout(() => {
      lock.current = false;
    }, 600); // 👈 1100 → 600
  },
  [index]
);

const jumpTo = (target: number) => {
  if (lock.current || target === index) return;

  setDirection(target > index ? 1 : -1);
  setIndex(target);

  lock.current = true;
  setTimeout(() => {
    lock.current = false;
  }, 600);
};

  /* ================= EVENTS (WHEEL + TOUCH) ================= */
  useEffect(() => {
    setMounted(true);
    mouseX.set(0);
    mouseY.set(0);

    let lastScroll = 0;
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScroll < 700) return;
      if (Math.abs(e.deltaY) < 10) return;

      paginate(e.deltaY > 0 ? 1 : -1);
      lastScroll = now;
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;
      
      const now = Date.now();
      if (now - lastScroll < 700) return;

      // Swipe up (diff > 0) goes to next slide
      if (Math.abs(diffY) > 40) {
        paginate(diffY > 0 ? 1 : -1);
        lastScroll = now;
      }
    };

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("mousemove", handleMove);
    };
  }, [paginate, mouseX, mouseY]);

  return (
   <div className="
relative w-full h-[100svh] flex items-center justify-center overflow-hidden
bg-[#020202]
text-white
select-none

font-sans
[font-feature-settings:'ss01','cv02']
antialiased
">
      {/* 🌌 BACKGROUND ENGINE (SMOOTH DEPTH) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
       <BackgroundEngine index={index} />
        <div className="
absolute inset-0
bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0.92)_100%)]
" />
      </div>

      {/* ================= TOP ENTER CHAT BUTTON ================= */}
<div className="fixed top-4 right-4 md:top-6 md:right-10 z-[120]">
  <button
    onClick={() => router.push("/dashboard/chat")}
    className="
    group relative

    px-6 py-2.5
    rounded-full

    bg-[#0f172a]/80   /* deep navy glass instead of white fade */
    text-white

    text-sm font-medium tracking-[0.02em]

    border border-white/20

    shadow-[0_6px_25px_rgba(0,0,0,0.4)]

    transition-transform transition-colors duration-150 ease-out

    hover:bg-[#0f172a]
    hover:border-white/30

    active:scale-[0.96]

    flex items-center gap-2
    "
  >
    <span className="flex items-center gap-2">
      Enter Chat
      <span className="
        transition-transform duration-150
        group-hover:translate-x-1
      ">
        →
      </span>
    </span>

    {/* subtle light sweep */}
    <span className="
      pointer-events-none
      absolute inset-0 rounded-full
      bg-gradient-to-r from-white/10 via-transparent to-transparent
      opacity-0 group-hover:opacity-100
      transition-opacity duration-150
    " />
  </button>
</div>
      {/* ================= LEFT NAV ================= */}
      <nav className="fixed left-4 md:left-10 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-6 md:gap-12">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            onClick={() => jumpTo(i)}
            className="flex items-center gap-6 cursor-pointer"
          >
            <motion.div
              animate={{
                height: index === i ? 48 : 4,
                backgroundColor:
                  index === i ? "#ffffff" : "rgba(255,255,255,0.15)",
                width: index === i ? 2 : 1.5,
              }}
              className="rounded-full"
            />
            <motion.span
              animate={{ opacity: index === i ? 1 : 0 }}
              className="
hidden lg:block
text-[10px]
font-medium
tracking-[0.38em]
uppercase
text-white/70
"
            >
              {slide.name}
            </motion.span>
          </div>
        ))}
      </nav>

      {/* ================= MAIN STAGE ================= */}
      <motion.div
        className="relative z-10 w-full h-full flex items-center justify-center"
        style={{
          rotateY,
          rotateX,
          perspective: 2200,
          transformStyle: "preserve-3d",
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.section
            key={index}
            custom={direction}
            variants={{
              enter: (d: number) => ({
                opacity: 0,
                y: d > 0 ? "20%" : "-20%",
                scale: 0.85,
                rotateX: d > 0 ? -15 : 15,
                filter: "blur(20px)",
              }),
              center: {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1], // Apple-like easeOutQuint
                },
              },
              exit: (d: number) => ({
                opacity: 0,
                y: d < 0 ? "15%" : "-15%",
                scale: 1.1,
                rotateX: d < 0 ? 10 : -10,
                filter: "blur(20px)",
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full flex items-center justify-center px-6"
          >
            <div className="relative w-full max-w-[1280px] mx-auto flex items-center justify-center text-center">
              {React.createElement(SLIDES[index].Component, { active: true })}
            </div>
          </motion.section>
        </AnimatePresence>
      </motion.div>

      {/* ================= RIGHT PROGRESS ================= */}
      <div className="fixed right-10 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center gap-6">
        <div className="h-48 w-[1px] bg-white/10 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 w-full bg-white"
            animate={{
              height: `${((index + 1) / SLIDES.length) * 100}%`,
            }}
            transition={{ duration: 1.2 }}
          />
        </div>
        <motion.p
          key={index}
          className="
text-white/50
text-[11px]
tracking-[0.2em]
font-medium
"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          0{index + 1}
        </motion.p>
      </div>

      {/* ================= JUMP BUTTONS ================= */}
      
      <div className="fixed right-10 bottom-24 z-[110] flex flex-col gap-4">
        {index !== 0 && (
          <button
            onClick={() => jumpTo(0)}
            className="
w-12 h-12 rounded-2xl
border border-white/[0.08]
bg-white/[0.03]
backdrop-blur-xl

text-white/70
hover:text-white
hover:bg-white/[0.06]

transition-all duration-200 ease-out
"
          >
            ↑
          </button>
        )}
        {index !== SLIDES.length - 1 && (
          <button
            onClick={() => jumpTo(SLIDES.length - 1)}
            className="
w-12 h-12 rounded-2xl
border border-white/[0.08]
bg-white/[0.03]
backdrop-blur-xl

text-white/70
hover:text-white
hover:bg-white/[0.06]

transition-all duration-200 ease-out
"
          >
            ↓
          </button>
        )}
      </div>
      
    </div>
  );
}