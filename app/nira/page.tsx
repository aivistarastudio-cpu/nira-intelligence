"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import {
 IconBrain,
 IconFingerprint,
 IconZap,
 IconShield,
 IconLayers,
 IconCpu,
 IconNetwork,
 IconRocket,
 IconInfinity,
 IconDatabase,
  IconAperture,
  IconHexagon,
  IconSearchFocus,
  IconCheckDot,
  IconMenuBars,
 IconCloseX,
 IconArrowSlant,
 IconArrowRightLine
} from "../components/PremiumIcons";

/* =========================================================
 UTILITIES
========================================================= */

function FadeIn({
 children,
 delay = 0,
 className = "",
}: {
 children: React.ReactNode;
 delay?: number;
 className?: string;
}) {
 return (
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-50px" }}
 transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
 className={className}
 >
 {children}
 </motion.div>
 );
}

const NiraLogo = ({ size = 24 }: { size?: number }) => (
 <svg 
 width={size} 
 height={size} 
 viewBox="0 0 200 200" 
 fill="none" 
 xmlns="http://www.w3.org/2000/svg"
 >
 <g stroke="currentColor" strokeWidth="10" strokeLinecap="round" opacity="0.9">
 <ellipse cx="100" cy="100" rx="35" ry="80" />
 <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(60 100 100)" />
 <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(-60 100 100)" />
 </g>
 </svg>
);

/* =========================================================
 1. NAVIGATION
========================================================= */

function Navigation() {
 const router = useRouter();
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

 useEffect(() => {
 const handleEsc = (e: KeyboardEvent) => {
 if (e.key === 'Escape') setMobileMenuOpen(false);
 };
 window.addEventListener('keydown', handleEsc);
 return () => window.removeEventListener('keydown', handleEsc);
 }, []);

 // Lock scroll when mobile menu is open
 useEffect(() => {
 if (mobileMenuOpen) {
 document.body.style.overflow = 'hidden';
 } else {
 document.body.style.overflow = 'unset';
 }
 }, [mobileMenuOpen]);

 const links = [
 { name: "Why NIRA", id: "why-nira" },
 { name: "Technology", id: "technology" },
 { name: "Capabilities", id: "capabilities" },
 { name: "Roadmap", id: "roadmap" },
 { name: "Safety", id: "safety" },
 { name: "Company", id: "company" }
 ];

 const scrollToSection = (id: string) => {
 const el = document.getElementById(id);
 if (el) {
 el.scrollIntoView({ behavior: 'smooth', block: 'start' });
 }
 };

 return (
 <>
 <header className="fixed top-0 left-0 right-0 z-[100] bg-[color-mix(in_srgb,var(--nira-bg)_90%,transparent)] md:backdrop-blur-lg border-b border-[color-mix(in_srgb,var(--nira-border)_50%,transparent)] py-4">
 <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
 <div
 onMouseEnter={() => router.prefetch("/")}
 onClick={() => router.push("/")}
 className="flex items-center gap-3 cursor-pointer select-none text-[var(--nira-text)] hover:text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)] transition-colors"
 >
 <NiraLogo size={28} />
 <span className="text-xl font-bold tracking-tight hidden sm:block mt-0.5">NIRA Intelligence</span>
 </div>

 <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-[var(--nira-subtext)]">
 {links.map((link) => (
 <span
 key={link.name}
 onClick={() => scrollToSection(link.id)}
 className="hover:text-[var(--nira-text)] transition-colors cursor-pointer"
 >
 {link.name}
 </span>
 ))}
 </div>

 <div className="hidden md:flex items-center gap-6">
 <ThemeToggle inline />
 <div className="w-px h-5 bg-[color-mix(in_srgb,var(--nira-border)_50%,transparent)]" />
 <button
 onMouseEnter={() => router.prefetch("/login")}
 onClick={() => router.push("/login")}
 className="group flex items-center gap-2 text-sm font-medium text-[var(--nira-text)] bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] border border-[color-mix(in_srgb,var(--nira-border)_50%,transparent)] md:backdrop-blur-md px-5 py-2 rounded-full hover:bg-[color-mix(in_srgb,var(--nira-text)_10%,transparent)] hover:border-[color-mix(in_srgb,var(--nira-border)_80%,transparent)] transition-all active:scale-95"
 >
 Enter NIRA <IconArrowRightLine size={14} className="group-hover:translate-x-1 transition-transform" />
 </button>
 </div>

 <div className="md:hidden flex items-center gap-4">
 <ThemeToggle inline />
 <div className="w-px h-5 bg-[color-mix(in_srgb,var(--nira-border)_50%,transparent)]" />
 <button onClick={() => setMobileMenuOpen(true)} className="w-11 h-11 flex items-center justify-center rounded-full text-[var(--nira-text)] hover:bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] transition-all active:scale-95">
 <IconMenuBars size={24} />
 </button>
 </div>
 </div>
 </header>

 {/* Mobile Menu */}
 <AnimatePresence>
 {mobileMenuOpen && (
 <motion.div
 initial={{ opacity: 0, y: -10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -10 }}
 transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
 className="fixed inset-0 z-[110] bg-[var(--nira-bg)] flex flex-col"
 style={{ paddingTop: 'env(safe-area-inset-top)' }}
 >
 {/* Header Area */}
 <div className="flex items-center justify-between px-6 py-4 border-b border-[color-mix(in_srgb,var(--nira-border)_50%,transparent)]">
 <div 
 onMouseEnter={() => router.prefetch("/")}
 onClick={() => router.push("/")}
 className="flex items-center gap-2 cursor-pointer select-none"
 >
 <NiraLogo size={24} />
 <span className="text-lg font-bold tracking-tight text-[var(--nira-text)] mt-0.5">NIRA</span>
 </div>
 <button 
 onClick={() => setMobileMenuOpen(false)} 
 className="w-11 h-11 flex items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] text-[var(--nira-text)] hover:bg-[color-mix(in_srgb,var(--nira-text)_10%,transparent)] active:scale-95 transition-all"
 >
 <IconCloseX size={22} />
 </button>
 </div>
 
 {/* Scrollable Links */}
 <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col space-y-2">
 {links.map((link) => (
 <span 
 key={link.name} 
 onClick={() => {
 setMobileMenuOpen(false);
 setTimeout(() => scrollToSection(link.id), 100);
 }} 
 className="cursor-pointer text-2xl font-medium text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)] hover:text-[var(--nira-text)] active:scale-95 origin-left transition-all py-4 border-b border-[color-mix(in_srgb,var(--nira-border)_40%,transparent)]"
 >
 {link.name}
 </span>
 ))}
 </div>
 
 {/* Footer Area */}
 <div className="px-6 py-6 bg-[color-mix(in_srgb,var(--nira-bg)_95%,transparent)] border-t border-[color-mix(in_srgb,var(--nira-border)_50%,transparent)]" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)' }}>
 <button
 onClick={() => router.push("/login")}
 className="w-full flex justify-center items-center gap-2 text-lg font-medium text-[var(--nira-bg)] bg-[var(--nira-text)] shadow-lg px-6 py-4 rounded-full hover:scale-[1.02] active:scale-95 transition-all"
 >
 Enter NIRA <IconArrowRightLine size={18} />
 </button>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </>
 );
}

/* =========================================================
 2. HERO
========================================================= */

function Hero() {
 const router = useRouter();
 
 return (
 <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 flex flex-col items-center text-center">
 
 {/* 🌌 Premium Apple Intelligence / Google Gemini Ambient Glow - INDIAN VIBE (Saffron, Rani Pink, Cyan) */}
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[700px] pointer-events-none opacity-60 dark:opacity-50">
 <motion.div 
 animate={{ rotate: 360 }}
 transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
 className="absolute -top-1/2 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-orange-500/40 via-rose-500/10 to-transparent "
 />
 <motion.div 
 animate={{ rotate: -360 }}
 transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
 className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-amber-400/30 via-fuchsia-500/10 to-transparent "
 />
 </div>

 <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
 <FadeIn delay={0.1}>
 <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[color-mix(in_srgb,var(--nira-text)_15%,transparent)] bg-[color-mix(in_srgb,var(--nira-bg)_80%,transparent)] md:backdrop-blur-xl text-xs font-medium text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)] mb-8 ">
 <div className="relative flex items-center justify-center w-2 h-2">
 <div className="absolute w-full h-full bg-orange-500 rounded-full animate-ping opacity-75"></div>
 <div className="relative w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
 </div>
 Neural Intelligence & Responsive Assistant
 </div>
 </FadeIn>

 <FadeIn delay={0.2}>
 <h1 className="text-4xl sm:text-5xl md:text-[88px] font-medium tracking-tight leading-[1.05] pb-2">
 <motion.span 
 animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
 transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
 className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#f97316,#e11d48,#d946ef,#f97316)] bg-[length:200%_auto] inline-block"
 >
 Intelligence,
 </motion.span>
 <br />
 <span className="text-[var(--nira-text)]">
 Engineered for Clarity.
 </span>
 </h1>
 </FadeIn>

 <FadeIn delay={0.3}>
 <p className="mt-8 text-lg md:text-2xl text-[color-mix(in_srgb,var(--nira-text)_85%,transparent)] font-medium max-w-2xl leading-relaxed tracking-tight">
 NIRA (Neural Intelligence & Responsive Assistant) is an advanced cognitive platform designed to augment human potential. Through seamless multimodal integration across text, image, and video, NIRA solves complex problems with unparalleled precision and reasoning.
 </p>
 </FadeIn>

 <FadeIn delay={0.4} className="mt-12 flex flex-col sm:flex-row items-center gap-4">
 <button
 onClick={() => router.push("/login")}
 className="group w-full sm:w-auto px-8 py-4 flex justify-center items-center gap-2 rounded-full bg-[var(--nira-text)] text-[var(--nira-bg)] font-medium hover:scale-105 active:scale-95 transition-all"
 >
 Start With NIRA <IconArrowRightLine size={16} className="group-hover:translate-x-1 transition-transform" />
 </button>
 <button 
 onClick={() => document.getElementById("technology")?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
 className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[color-mix(in_srgb,var(--nira-bg)_50%,transparent)] md:backdrop-blur-md border border-[color-mix(in_srgb,var(--nira-border)_50%,transparent)] text-[var(--nira-text)] font-medium hover:bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] transition-all active:scale-95"
 >
 Explore Technology <IconArrowSlant size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
 </button>
 </FadeIn>
 </div>
 </section>
 );
}

/* =========================================================
 3. WHAT IS NIRA
========================================================= */

function WhatIsNira() {
 return (
 <section className="relative py-16 md:py-24 px-6">
 {/* Indian Ambient Vibe Background */}
 <div className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.1] ">
 <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] from-orange-500/80 to-transparent" />
 <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] from-cyan-500/80 to-transparent" />
 </div>

 <div className="max-w-5xl mx-auto relative z-10">
 <FadeIn>
 <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8">
 What Is NIRA?
 </h2>
 </FadeIn>
 
 <div className="grid md:grid-cols-2 gap-16 items-center">
 <FadeIn delay={0.1}>
 <p className="text-xl md:text-2xl text-[color-mix(in_srgb,var(--nira-text)_85%,transparent)] leading-relaxed font-medium tracking-tight">
 NIRA is a state-of-the-art intelligence ecosystem built on a foundation of deep reasoning and contextual awareness. We believe that artificial intelligence should not feel like interacting with a machine, but rather like collaborating with a highly capable, universally knowledgeable partner.
 <br /><br />
 By unifying conversational intelligence, generative imaging, and video synthesis into a single, cohesive architecture, NIRA eliminates the friction of disjointed tools. Every interaction is processed through advanced neural pathways to deliver outcomes that are accurate, contextual, and immediately actionable.
 </p>
 </FadeIn>
 
 <FadeIn delay={0.2} className="relative h-[400px] md:h-[550px] w-full rounded-[2.5rem] border border-[color-mix(in_srgb,var(--nira-border)_50%,transparent)] bg-[color-mix(in_srgb,var(--nira-bg)_60%,transparent)] md:backdrop-blur-lg overflow-hidden flex items-center justify-center group perspective-1000 shadow-[0_30px_60px_-15px_color-mix(in_srgb,var(--nira-text)_10%,transparent)]">
 
 {/* Internal Glowing Aurora for Premium Depth */}
 <div className="absolute inset-0 opacity-40 dark:opacity-30 pointer-events-none ">
 <motion.div 
 animate={{ rotate: 360 }}
 transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] from-orange-500/50 via-rose-500/20 to-transparent"
 />
 </div>

 {/* The NIRA Intelligence Core (Clean Logo Animation) */}
 <div className="absolute inset-0 flex items-center justify-center z-20">
 {/* Core Pulse Glow */}
 <motion.div 
 animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
 className="absolute w-24 h-24 bg-gradient-to-br from-orange-500/40 to-fuchsia-500/40 rounded-full "
 />
 <motion.div 
 animate={{ scale: [0.95, 1.05, 0.95] }}
 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
 className="text-[var(--nira-text)] relative z-10"
 >
 <NiraLogo size={88} />
 </motion.div>
 </div>

 {/* Holographic Scanner Ring - Marigold */}
 <motion.div 
 className="absolute w-[360px] h-[360px] md:w-[500px] md:h-[500px] rounded-full border-t-[3px] border-amber-500/90 "
 style={{ rotateX: 80, transformStyle: "preserve-3d" }}
 animate={{ y: [-150, 150, -150], opacity: [0, 1, 0] }}
 transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
 />

 {/* Symmetrical Gyroscopic Orbital Sphere - Thicker & Glowing */}
 {[
 { ry: 0, ringColor: "border-orange-500/80 ", dotColor: "bg-orange-500 " }, 
 { ry: 60, ringColor: "border-fuchsia-500/80 ", dotColor: "bg-fuchsia-500 " }, 
 { ry: 120, ringColor: "border-cyan-500/80 ", dotColor: "bg-cyan-500 " }
 ].map((ring, i) => (
 <motion.div
 key={i}
 initial={{ rotateX: 75, rotateY: ring.ry, rotateZ: 0 }}
 animate={{ rotateZ: 360 }}
 transition={{ duration: i === 0 ? 20 : i === 1 ? 25 : 30, repeat: Infinity, ease: "linear" }}
 className={`absolute rounded-full w-[300px] h-[300px] md:w-[420px] md:h-[420px] border-[1.5px] ${ring.ringColor}`}
 style={{ transformStyle: "preserve-3d" }}
 >
 {/* Crisp Data Packets with intense glow */}
 <motion.div 
 className={`absolute -top-[2px] left-1/2 w-3 h-3 ${ring.dotColor} rounded-full`}
 style={{ transform: 'translateX(-50%)' }}
 />
 </motion.div>
 ))}

 {/* Neural Data Constellation - Clean Colorful Dots */}
 {[
 { x: -160, y: -120, s: 4, d: 0, c: "bg-orange-500 " }, 
 { x: 180, y: -150, s: 3.5, d: 2, c: "bg-fuchsia-500 " }, 
 { x: -180, y: 160, s: 3, d: 4, c: "bg-cyan-500 " },
 { x: 120, y: 180, s: 4.5, d: 1, c: "bg-orange-500 " }, 
 { x: -80, y: -200, s: 3.5, d: 3, c: "bg-fuchsia-500 " }, 
 { x: 200, y: 60, s: 4, d: 5, c: "bg-cyan-500 " },
 ].map((p, i) => (
 <motion.div
 key={`p-${i}`}
 className={`absolute ${p.c} rounded-full hidden md:block`}
 style={{ width: p.s, height: p.s, left: '50%', top: '50%', marginLeft: p.x, marginTop: p.y }}
 animate={{ 
 y: [0, -20, 0],
 opacity: [0.4, 1, 0.4]
 }}
 transition={{ 
 duration: 5 + (i % 3), 
 repeat: Infinity, 
 delay: p.d,
 ease: "easeInOut" 
 }}
 />
 ))}
 </FadeIn>
 </div>
 </div>
 </section>
 );
}

/* =========================================================
 4. WHY NIRA
========================================================= */


function WhyNira() {
 return (
 <section id="why-nira" className="scroll-mt-24 relative py-20 md:py-32 px-6 overflow-hidden">
 
 {/* Ambient Background to match theme */}
 <div className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.1] ">
 <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] from-cyan-500/40 to-transparent animate-pulse" />
 <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] from-fuchsia-500/40 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
 </div>

 <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-12">
 
 {/* Header Section */}
 <div className="text-center flex flex-col items-center">
 <FadeIn>
 <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--nira-text)] mb-4">
 WHY CHOOSE NIRA?
 </h2>
 <p className="text-base md:text-lg text-[color-mix(in_srgb,var(--nira-text)_70%,transparent)] font-normal max-w-3xl leading-relaxed">
 NIRA is not just an AI tool. It is an intelligent partner designed to understand you, 
 <strong className="text-[var(--nira-text)] font-semibold"> adapt to you</strong> and 
 <strong className="text-[var(--nira-text)] font-semibold"> help you achieve more.</strong>
 </p>
 </FadeIn>
 </div>

 {/* CSS Grid Layout */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 auto-rows-auto">
 
 {/* Row 1 */}
 <div className="group col-span-1 rounded-3xl p-6 border border-black/5 dark:border-white/[0.06] bg-[color-mix(in_srgb,var(--nira-bg)_80%,transparent)] md:backdrop-blur-md flex gap-5 items-center hover:-translate-y-1 hover:border-purple-500/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer relative overflow-hidden shadow-sm hover:shadow-md">
 <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg flex-shrink-0 z-10">
 <IconBrain size={22} />
 </div>
 <div className="z-10">
 <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[13px] leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">TRULY<br/>INTELLIGENT</h3>
 <p className="text-[11px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Advanced reasoning with context</p>
 </div>
 </div>

 <div className="group col-span-1 rounded-3xl p-6 border border-black/5 dark:border-white/[0.06] bg-[color-mix(in_srgb,var(--nira-bg)_80%,transparent)] md:backdrop-blur-md flex gap-5 items-center hover:-translate-y-1 hover:border-pink-500/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer relative overflow-hidden shadow-sm hover:shadow-md">
 <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-pink-500/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-lg flex-shrink-0 z-10">
 <IconFingerprint size={22} />
 </div>
 <div className="z-10">
 <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[13px] leading-tight group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">HUMAN-LIKE<br/>EXPERIENCE</h3>
 <p className="text-[11px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Natural & emotion-aware</p>
 </div>
 </div>

 <div className="group col-span-1 md:col-span-2 rounded-3xl p-6 border border-black/5 dark:border-white/[0.06] bg-[color-mix(in_srgb,var(--nira-bg)_80%,transparent)] md:backdrop-blur-md flex gap-5 items-center hover:-translate-y-1 hover:border-emerald-500/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer relative overflow-hidden shadow-sm hover:shadow-md">
 <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white shadow-lg flex-shrink-0 z-10">
 <IconZap size={22} />
 </div>
 <div className="z-10">
 <h3 className="font-bold text-emerald-600 dark:text-emerald-400 tracking-tight text-[15px] leading-tight">FASTER &<br/>SMARTER</h3>
 <p className="text-[12px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Optimized for productivity and deep workflows</p>
 </div>
 </div>

 <div className="group col-span-1 rounded-3xl p-6 border border-black/5 dark:border-white/[0.06] bg-[color-mix(in_srgb,var(--nira-bg)_80%,transparent)] md:backdrop-blur-md flex gap-5 items-center hover:-translate-y-1 hover:border-blue-500/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer relative overflow-hidden shadow-sm hover:shadow-md">
 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg flex-shrink-0 z-10">
 <IconShield size={22} />
 </div>
 <div className="z-10">
 <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[13px] leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">SECURE &<br/>PRIVATE</h3>
 <p className="text-[11px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Enterprise-grade security</p>
 </div>
 </div>

 {/* Row 2 & 3 */}
 <div className="group col-span-1 rounded-3xl p-6 border border-black/5 dark:border-white/[0.06] bg-[color-mix(in_srgb,var(--nira-bg)_80%,transparent)] md:backdrop-blur-md flex gap-5 items-center hover:-translate-y-1 hover:border-orange-500/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer relative overflow-hidden shadow-sm hover:shadow-md">
 <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white shadow-lg flex-shrink-0 z-10">
 <IconLayers size={22} />
 </div>
 <div className="z-10">
 <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[13px] leading-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">ALL-IN-ONE<br/>PLATFORM</h3>
 <p className="text-[11px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Chat, write & automate</p>
 </div>
 </div>

 <div className="group col-span-1 lg:row-span-2 rounded-3xl p-6 border border-black/5 dark:border-white/[0.06] bg-[color-mix(in_srgb,var(--nira-bg)_80%,transparent)] md:backdrop-blur-md flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:border-fuchsia-500/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:min-h-[220px] cursor-pointer relative overflow-hidden shadow-sm hover:shadow-md">
 <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-500/5 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
 <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white shadow-xl mb-5 z-10 transform group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
 <IconCpu size={30} />
 </div>
 <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[15px] leading-tight mb-2 z-10 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">MULTI-LLM<br/>POWER</h3>
 <p className="text-[12px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] leading-tight z-10">Smart routing across leading AI systems</p>
 </div>

 <div className="group col-span-1 lg:row-span-2 rounded-3xl p-6 border border-black/5 dark:border-white/[0.06] bg-[color-mix(in_srgb,var(--nira-bg)_80%,transparent)] md:backdrop-blur-md flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:border-teal-500/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:min-h-[220px] cursor-pointer relative overflow-hidden shadow-sm hover:shadow-md">
 <div className="absolute inset-0 bg-gradient-to-t from-teal-500/5 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
 <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center text-white shadow-xl mb-5 z-10 transform group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
 <IconNetwork size={30} />
 </div>
 <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[15px] leading-tight mb-2 z-10 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">DEEP<br/>REASONING</h3>
 <p className="text-[12px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] leading-tight z-10">Step-by-step intelligent problem solving</p>
 </div>

 <div className="group col-span-1 lg:row-span-2 rounded-3xl p-6 border border-black/5 dark:border-white/[0.06] bg-[color-mix(in_srgb,var(--nira-bg)_80%,transparent)] md:backdrop-blur-md flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:border-rose-500/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:min-h-[220px] cursor-pointer relative overflow-hidden shadow-sm hover:shadow-md">
 <div className="absolute inset-0 bg-gradient-to-t from-rose-500/5 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
 <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-rose-400 to-red-600 flex items-center justify-center text-white shadow-xl mb-5 z-10 transform group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
 <IconRocket size={30} />
 </div>
 <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[15px] leading-tight mb-2 z-10 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">BUILT FOR<br/>GROWTH</h3>
 <p className="text-[12px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] leading-tight z-10">Designed for creators, teams and enterprises</p>
 </div>

 <div className="group col-span-1 lg:row-span-2 rounded-3xl p-6 border border-black/5 dark:border-white/[0.06] bg-[color-mix(in_srgb,var(--nira-bg)_80%,transparent)] md:backdrop-blur-md flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:border-indigo-500/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:min-h-[220px] cursor-pointer relative overflow-hidden shadow-sm hover:shadow-md">
 <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
 <h3 className="font-bold text-[color-mix(in_srgb,var(--nira-text)_40%,transparent)] tracking-widest text-[11px] mb-4 z-10 uppercase">Multi-LLM</h3>
 
 <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-xl mb-4 z-10 transform group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-12">
 <IconInfinity size={30} />
 </div>
 
 <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[15px] leading-tight mb-2 z-10 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">ALWAYS<br/>EVOLVING</h3>
 <p className="text-[12px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] leading-tight z-10">Continuously improving intelligence</p>
 </div>

 <div className="group col-span-1 rounded-3xl p-6 border border-black/5 dark:border-white/[0.06] bg-[color-mix(in_srgb,var(--nira-bg)_80%,transparent)] md:backdrop-blur-md flex gap-5 items-center hover:-translate-y-1 hover:border-amber-500/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer relative overflow-hidden shadow-sm hover:shadow-md">
 <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-white shadow-lg flex-shrink-0 z-10">
 <IconDatabase size={22} />
 </div>
 <div className="z-10">
 <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[13px] leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">LONG-TERM<br/>MEMORY</h3>
 <p className="text-[11px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Personalized continuity</p>
 </div>
 </div>
 
 </div>

 {/* Footer Section */}
 <div className="flex flex-col md:flex-row justify-between items-end mt-4 pt-8 border-t border-[color-mix(in_srgb,var(--nira-border)_50%,transparent)] gap-8">
 <div className="max-w-2xl">
 <p className="text-xl md:text-2xl font-normal tracking-tight text-[color-mix(in_srgb,var(--nira-text)_70%,transparent)]">
 NIRA adapts to you, learns with you and grows with you.<br/>
 <span className="text-[var(--nira-text)] font-semibold">It&apos;s more than AI — it&apos;s your intelligence partner.</span>
 </p>
 </div>
 <div className="flex gap-8 text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)]">
 <div className="flex flex-col items-center gap-3 group cursor-pointer">
 <div className="w-10 h-10 rounded-full bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] flex items-center justify-center group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors">
 <IconSearchFocus size={18} />
 </div>
 <span className="text-[10px] font-bold text-center leading-tight uppercase tracking-wider group-hover:text-blue-500 transition-colors">Understand<br/>Better</span>
 </div>
 <div className="flex flex-col items-center gap-3 group cursor-pointer">
 <div className="w-10 h-10 rounded-full bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] flex items-center justify-center group-hover:bg-rose-500/10 group-hover:text-rose-500 transition-colors">
 <IconCpu size={18} />
 </div>
 <span className="text-[10px] font-bold text-center leading-tight uppercase tracking-wider group-hover:text-rose-500 transition-colors">Work<br/>Faster</span>
 </div>
 <div className="flex flex-col items-center gap-3 group cursor-pointer">
 <div className="w-10 h-10 rounded-full bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] flex items-center justify-center group-hover:bg-amber-500/10 group-hover:text-amber-500 transition-colors">
 <IconBrain size={18} />
 </div>
 <span className="text-[10px] font-bold text-center leading-tight uppercase tracking-wider group-hover:text-amber-500 transition-colors">Think<br/>Smarter</span>
 </div>
 <div className="flex flex-col items-center gap-3 group cursor-pointer">
 <div className="w-10 h-10 rounded-full bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors">
 <IconRocket size={18} />
 </div>
 <span className="text-[10px] font-bold text-center leading-tight uppercase tracking-wider group-hover:text-emerald-500 transition-colors">Achieve<br/>More</span>
 </div>
 </div>
 </div>
 </div>
 </section>
 );
}

// Remove the old SVGs from the top by deleting them
/* =========================================================
 5. HOW NIRA WORKS
========================================================= */

function HowItWorks() {
 const steps = [
 { title: "Intent Recognition", desc: "Advanced natural language processing immediately decodes the nuance and ultimate goal of your query.", color: "bg-orange-500", shadow: "rgba(249,115,22,0.8)" },
 { title: "Context Assembly", desc: "NIRA accesses both short-term conversational history and long-term memory to build a comprehensive contextual framework.", color: "bg-rose-500", shadow: "rgba(225,29,72,0.8)" },
 { title: "Neural Reasoning", desc: "The system evaluates multiple computational pathways, applying step-by-step logic to ensure accuracy and mitigate hallucinations.", color: "bg-fuchsia-500", shadow: "rgba(217,70,239,0.8)" },
 { title: "Multimodal Synthesis", desc: "Depending on the task, NIRA seamlessly routes the instruction to specialized text, image, or video neural networks.", color: "bg-indigo-500", shadow: "rgba(99,102,241,0.8)" },
 { title: "Precision Delivery", desc: "The final output is rendered in a minimalist, distraction-free interface designed for immediate human comprehension.", color: "bg-cyan-500", shadow: "rgba(6,182,212,0.8)" },
 ];

 return (
 <section className="relative py-16 md:py-24 px-6">
 {/* Indian Ambient Vibe Background */}
 <div className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.1] ">
 <div className="absolute top-[10%] right-[-20%] w-[700px] h-[700px] bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] from-cyan-500/80 to-transparent" />
 <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] from-rose-500/80 to-transparent" />
 </div>

 <div className="max-w-4xl mx-auto relative z-10">
 <FadeIn>
 <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-12">
 How NIRA Works
 </h2>
 </FadeIn>

 <div className="relative border-l border-transparent ml-6 md:ml-12 pl-10 md:pl-16 space-y-16 before:absolute before:inset-y-0 before:-left-[0.5px] before:w-px before:bg-gradient-to-b before:from-orange-500 before:via-fuchsia-500 before:to-cyan-500">
 {steps.map((step, i) => (
 <FadeIn key={i} delay={i * 0.1} className="relative group">
 {/* Vibrant Glowing Node Indicator */}
 <div 
 className={`absolute -left-[45px] md:-left-[69px] top-1.5 w-3 h-3 rounded-full ${step.color} ring-8 ring-[var(--nira-bg)] transition-all duration-300 group-hover:scale-125`} 
 style={{ boxShadow: `0 0 20px ${step.shadow}` }}
 />
 <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-2 group-hover:text-[var(--nira-text)] transition-colors text-[color-mix(in_srgb,var(--nira-text)_90%,transparent)]">{step.title}</h3>
 <p className="text-[var(--nira-subtext)] text-base md:text-lg group-hover:text-[color-mix(in_srgb,var(--nira-text)_70%,transparent)] transition-colors">{step.desc}</p>
 </FadeIn>
 ))}
 </div>
 </div>
 </section>
 );
}

/* =========================================================
 6. TECHNOLOGY
========================================================= */

function Technology() {
 const tech = [
 { icon: <IconNetwork size={24} />, title: "Cognitive Planning Engine", desc: "Utilizing advanced chain-of-thought protocols to break down complex multidimensional problems into solvable logical components.", glow: "from-orange-500/20 to-amber-500/5", iconColor: "text-orange-500" },
 { icon: <IconSearchFocus size={24} />, title: "Dynamic Context Windows", desc: "State-of-the-art token management allows NIRA to maintain deep understanding across extended research sessions.", glow: "from-fuchsia-500/20 to-rose-500/5", iconColor: "text-fuchsia-500" },
 { icon: <IconDatabase size={24} />, title: "Secure Persistent Memory", desc: "A localized vector-database approach ensures NIRA remembers your preferences and past interactions without compromising privacy.", glow: "from-cyan-500/20 to-teal-400/5", iconColor: "text-cyan-500" },
 { icon: <IconCpu size={24} />, title: "Neural Routing Architecture", desc: "Intelligently directing queries to the most optimal specialized sub-models for text analysis, image rendering, or video synthesis.", glow: "from-rose-500/20 to-orange-500/5", iconColor: "text-rose-500" },
 { icon: <IconHexagon size={24} />, title: "Extensible AI Infrastructure", desc: "Built on a modular backend designed to seamlessly integrate emerging neural network architectures and modalities as they are developed.", glow: "from-amber-500/20 to-fuchsia-500/5", iconColor: "text-amber-500" },
 ];

 return (
 <section id="technology" className="scroll-mt-24 relative py-16 md:py-24 px-6">
 {/* Indian Ambient Vibe Background */}
 <div className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.1] ">
 <div className="absolute top-[40%] right-[30%] w-[800px] h-[800px] bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] from-orange-500/80 to-transparent" />
 <div className="absolute bottom-[-10%] right-[-20%] w-[600px] h-[600px] bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] from-fuchsia-500/80 to-transparent" />
 </div>

 <div className="max-w-7xl mx-auto relative z-10">
 <FadeIn>
 <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-12">
 Technology Behind NIRA
 </h2>
 </FadeIn>
 
 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {tech.map((t, i) => (
 <FadeIn key={i} delay={i * 0.1}>
 <motion.div 
 whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } }}
 className="relative group p-8 rounded-[1.5rem] bg-[var(--nira-bg)] border border-[color-mix(in_srgb,var(--nira-border)_50%,transparent)] hover:border-transparent transition-colors duration-500 overflow-hidden"
 >
 {/* Vibrant Hover Glare Effect */}
 <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${t.glow} pointer-events-none`} />
 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />
 
 <div className={`text-[var(--nira-subtext)] mb-6 group-hover:${t.iconColor} transition-colors duration-300 relative z-10`}>{t.icon}</div>
 <h3 className="text-xl font-medium tracking-tight mb-3 relative z-10">{t.title}</h3>
 <p className="text-[color-mix(in_srgb,var(--nira-text)_70%,transparent)] font-medium text-sm leading-relaxed relative z-10">{t.desc}</p>
 </motion.div>
 </FadeIn>
 ))}
 </div>
 </div>
 </section>
 );
}

/* =========================================================
 7. CURRENT CAPABILITIES
========================================================= */

function Capabilities() {
 const items = [
 "Advanced Conversational Intelligence", 
 "Complex Code Reasoning & Generation", 
 "Deep Research & Data Analysis",
 "Contextual Memory & Recall",
 "Multilingual Natural Language Processing"
 ];
 
 return (
 <section id="capabilities" className="scroll-mt-24 relative py-16 md:py-24 px-6">
 {/* Indian Ambient Vibe Background */}
 <div className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.1] ">
 <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] from-cyan-500/60 to-transparent" />
 </div>

 <div className="max-w-4xl mx-auto text-center relative z-10">
 <FadeIn>
 <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-[var(--nira-text)] mb-12">
 Available Today
 </h2>
 </FadeIn>
 <div className="flex flex-wrap justify-center gap-3 md:gap-4">
 {items.map((item, i) => (
 <FadeIn key={i} delay={i * 0.05}>
 <div className="px-6 py-3 rounded-full border border-[color-mix(in_srgb,var(--nira-border)_50%,transparent)] bg-transparent text-sm md:text-base text-[var(--nira-subtext)] font-medium tracking-wide hover:border-white/[0.06] hover:text-[var(--nira-text)] transition-all cursor-default select-none">
 {item}
 </div>
 </FadeIn>
 ))}
 </div>
 </div>
 </section>
 );
}

/* =========================================================
 8. ROADMAP
========================================================= */

function Roadmap() {
 const roadmap = [
 {
 num: "01",
 phase: "Phase 1: Intelligence Core",
 title: "Powerful Conversational Intelligence",
 description: "Building the world's most capable and reasoning-focused chat system. Our immediate priority is creating a conversational interface that understands deep context and executes complex tasks flawlessly.",
 status: "In Progress",
 active: true,
 icon: <IconBrain size={24} />,
 color: "from-fuchsia-500 to-purple-600",
 glow: "",
 border: "hover:border-fuchsia-500/50"
 },
 {
 num: "02",
 phase: "Phase 2: Multimodal Genesis",
 title: "Image & Video Integration",
 description: "Expanding NIRA's perception and creation abilities. We will introduce native, high-fidelity image generation and cinematic video synthesis directly within the core workflow.",
 status: "Upcoming",
 active: false,
 icon: <IconAperture size={24} />,
 color: "from-blue-400 to-cyan-500",
 glow: "",
 border: "hover:border-cyan-500/50"
 },
 {
 num: "03",
 phase: "Phase 3: Autonomous Workspace",
 title: "Advanced Autonomous Automation",
 description: "Transforming NIRA from an assistant into an independent worker. By integrating advanced automation systems, NIRA will be able to spawn sub-agents and execute full-scale engineering tasks autonomously.",
 status: "In Development",
 active: false,
 icon: <IconCpu size={24} />,
 color: "from-emerald-400 to-teal-500",
 glow: "",
 border: "hover:border-teal-500/50"
 },
 {
 num: "04",
 phase: "Phase 4: The Ultimate Milestone",
 title: "Achieving AGI by 2031",
 description: "The culmination of our efforts. Evolving NIRA's architecture step-by-step until we achieve Artificial General Intelligence—a system that matches or surpasses human cognitive abilities across every domain.",
 status: "Future Vision (2031)",
 active: false,
 icon: <IconNetwork size={24} />,
 color: "from-orange-500 to-rose-600",
 glow: "",
 border: "hover:border-orange-500/50"
 }
 ];

 return (
 <section id="roadmap" className="scroll-mt-24 relative py-24 md:py-32 px-6 overflow-hidden">
 
 {/* Deep Neural AGI Background */}
 <div className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.1] ">
 <div className="absolute top-[10%] right-[10%] w-[800px] h-[800px] bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] from-indigo-500/40 to-transparent animate-pulse" />
 <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] from-rose-500/40 to-transparent animate-pulse" style={{ animationDelay: '3s' }} />
 </div>

 <div className="max-w-4xl mx-auto relative z-10">
 <FadeIn>
 <div className="text-center mb-20 relative">
 {/* Glowing orb behind title */}
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-fuchsia-500/20 blur-[50px] rounded-full pointer-events-none" />
 
 <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--nira-text)] mb-6 relative z-10">
 The Path to AGI
 </h2>
 <p className="text-lg md:text-xl text-[color-mix(in_srgb,var(--nira-text)_70%,transparent)] font-medium max-w-2xl mx-auto relative z-10">
 Our systematic approach to building the world&apos;s most advanced artificial intelligence ecosystem.
 </p>
 </div>
 </FadeIn>

 <div className="relative ml-4 md:ml-8 space-y-12 pb-8">
 
 {/* Main Neural Backbone (Glowing Line) */}
 <div className="absolute top-0 bottom-0 left-[3px] w-[2px] bg-gradient-to-b from-fuchsia-500 via-blue-500 to-orange-500 opacity-20" />

 {roadmap.map((step, i) => (
 <FadeIn key={i} delay={i * 0.1}>
 <div className="relative pl-10 md:pl-20 group">
 
 {/* AGI Glowing Node / Dot */}
 <div className="absolute -left-[9px] md:-left-[9px] top-10 flex items-center justify-center">
 <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-[var(--nira-bg)] z-10 border-2 ${step.active ? 'border-fuchsia-500 ' : 'border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)]'} transition-colors duration-300 group-hover:border-fuchsia-400`}>
 {step.active && <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />}
 </div>
 {/* Outer pulse ring for active */}
 {step.active && <div className="absolute w-12 h-12 rounded-full border border-fuchsia-500/30 animate-ping" />}
 </div>

 {/* Active Progress Line */}
 {step.active && (
 <div className="absolute left-[3px] top-16 w-[2px] h-[120%] bg-gradient-to-b from-fuchsia-500 to-transparent z-0" />
 )}

 {/* Premium Glassmorphic Card */}
 <div className={`relative p-8 md:p-10 rounded-[2rem] border transition-all duration-500 cursor-pointer overflow-hidden md:backdrop-blur-md ${step.border} group-hover:-translate-y-1 ${step.active ? "bg-[color-mix(in_srgb,var(--nira-text)_3%,transparent)] border-[color-mix(in_srgb,var(--nira-text)_15%,transparent)] " : "bg-[color-mix(in_srgb,var(--nira-text)_1%,transparent)] border-[color-mix(in_srgb,var(--nira-border)_50%,transparent)]"}`}>
 
 {/* Subtle Inner Glow on Hover */}
 <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none`} />
 
 <div className="relative z-10">
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
 
 {/* Step Badge with Icon */}
 <div className="flex items-center gap-3">
 <div className={`w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-lg ${step.glow}`}>
 {step.icon}
 </div>
 <span className={`text-sm font-bold uppercase tracking-widest ${step.active ? "text-[var(--nira-text)]" : "text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)]"}`}>
 {step.phase}
 </span>
 </div>

 {/* Status Pill */}
 <span className={`w-fit px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-colors ${step.active ? "bg-[var(--nira-text)] text-[var(--nira-bg)] border-transparent shadow-lg" : "bg-transparent text-[color-mix(in_srgb,var(--nira-text)_40%,transparent)] border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] group-hover:border-[color-mix(in_srgb,var(--nira-text)_40%,transparent)]"}`}>
 {step.status}
 </span>
 </div>
 
 <h3 className="text-2xl md:text-3xl font-bold text-[var(--nira-text)] mb-4 tracking-tight">
 {step.title}
 </h3>
 <p className="text-base md:text-lg text-[color-mix(in_srgb,var(--nira-text)_70%,transparent)] leading-relaxed font-medium">
 {step.description}
 </p>
 </div>

 </div>
 </div>
 </FadeIn>
 ))}
 </div>
 </div>
 </section>
 );
}
/* =========================================================
 9. SAFETY & PRIVACY
========================================================= */

function Safety() {
 const items = [
 "End-to-End Encryption",
 "User Data Sovereignty",
 "Cryptographic Memory Isolation",
 "Transparent Data Policies",
 "No Unauthorized Training",
 "Advanced Account Security"
 ];

 return (
 <section id="safety" className="scroll-mt-24 relative py-16 md:py-24 px-6">
 
 {/* Indian Ambient Vibe Background */}
 <div className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.1] ">
 <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] from-cyan-500/80 to-transparent" />
 <div className="absolute top-[-10%] right-[20%] w-[500px] h-[500px] bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] from-fuchsia-500/80 to-transparent" />
 </div>

 <div className="max-w-5xl mx-auto relative z-10">
 <FadeIn>
 <div className="flex items-center justify-center md:justify-start gap-4 mb-12">
 <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-400 text-white">
 <IconShield size={32} />
 </div>
 <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
 Safety & Privacy
 </h2>
 </div>
 </FadeIn>
 <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
 {items.map((item, i) => (
 <FadeIn key={i} delay={i * 0.05} className="group p-6 rounded-2xl border border-[color-mix(in_srgb,var(--nira-border)_50%,transparent)] bg-[color-mix(in_srgb,var(--nira-bg)_80%,transparent)] md:backdrop-blur-md hover:bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] transition-all hover:border-cyan-500/30 flex items-center gap-4 cursor-default">
 <div className="w-8 h-8 rounded-full bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] group-hover:bg-cyan-500/20 group-hover:text-cyan-500 flex items-center justify-center transition-colors">
 <IconCheckDot size={16} />
 </div>
 <span className="font-medium tracking-tight text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)] group-hover:text-[var(--nira-text)] transition-colors">{item}</span>
 </FadeIn>
 ))}
 </div>
 </div>
 </section>
 );
}

/* =========================================================
 10. AGI ECOSYSTEM (Replaces Pricing)
========================================================= */

function Ecosystem() {
 const capabilities = [
 {
 title: "Autonomous Agent Swarm",
 desc: "Deploy independent sub-agents that work in the background. While you focus on strategy, they execute complex coding, research, and analysis tasks autonomously.",
 icon: <IconNetwork size={24} />,
 gradient: "from-orange-500 to-rose-500"
 },
 {
 title: "Local Workspace Execution",
 desc: "NIRA reads, writes, and executes code directly in your local environment. It runs terminal commands, checks logs, and fixes issues just like a senior engineer.",
 icon: <IconDatabase size={24} />,
 gradient: "from-fuchsia-500 to-purple-500"
 },
 {
 title: "Self-Healing Workflows",
 desc: "When errors occur, NIRA doesn't just crash. It analyzes the stack trace, searches the web for solutions, and autonomously patches the bugs in real-time.",
 icon: <IconShield size={24} />,
 gradient: "from-rose-500 to-pink-500"
 },
 {
 title: "Multimodal Perception",
 desc: "Upload screenshots, architectures, or wireframes. NIRA has native vision capabilities to instantly turn your images and designs into functioning code.",
 icon: <IconSearchFocus size={24} />,
 gradient: "from-orange-400 to-orange-600"
 }
 ];

 return (
 <section className="relative py-20 md:py-32 px-6 overflow-hidden">
 {/* Background Ambient Glow */}
 <div className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.1] ">
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] from-orange-500/60 via-rose-500/30 to-transparent animate-pulse" />
 </div>

 <div className="max-w-7xl mx-auto relative z-10">
 <FadeIn>
 <div className="text-center mb-16">
 <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-500 mb-6 drop-shadow-sm">
 AGI Capabilities
 </h2>
 <p className="text-lg md:text-xl text-[color-mix(in_srgb,var(--nira-text)_70%,transparent)] font-medium max-w-2xl mx-auto leading-relaxed">
 We aren&apos;t just building another chatbot. NIRA is a fully autonomous reasoning engine designed to architect, execute, and heal entire systems.
 </p>
 </div>
 </FadeIn>

 <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
 {capabilities.map((cap, i) => (
 <FadeIn key={i} delay={i * 0.1} className="h-full">
 <div className="relative h-full rounded-[2rem] p-[1px] group overflow-hidden bg-gradient-to-br from-[color-mix(in_srgb,var(--nira-text)_10%,transparent)] to-transparent hover:from-orange-500 hover:to-fuchsia-500 transition-all duration-700 shadow-lg">
 <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-fuchsia-500/0 group-hover:from-orange-500/20 group-hover:to-fuchsia-500/20 transition-all duration-700 blur-xl" />
 
 <div className="relative h-full bg-[var(--nira-bg)] rounded-[calc(2rem-1px)] p-8 md:p-10 flex flex-col justify-start">
 <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cap.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500`}>
 {cap.icon}
 </div>
 
 <h3 className="text-2xl font-bold tracking-tight text-[var(--nira-text)] mb-4">
 {cap.title}
 </h3>
 
 <p className="text-[color-mix(in_srgb,var(--nira-text)_70%,transparent)] font-medium leading-relaxed">
 {cap.desc}
 </p>
 </div>
 </div>
 </FadeIn>
 ))}
 </div>
 </div>
 </section>
 );
}

/* =========================================================
 11. COMPANY & FOOTER
========================================================= */

function CompanyAndFooter() {
 return (
 <footer id="company" className="scroll-mt-24 relative pt-24 pb-12 px-6 border-t border-[color-mix(in_srgb,var(--nira-border)_50%,transparent)] overflow-hidden">
 
 {/* Massive Ambient Footer Aurora */}
 <div className="absolute inset-0 pointer-events-none opacity-[0.25] dark:opacity-[0.15] ">
 <div className="absolute bottom-[-50%] left-1/2 -translate-x-1/2 w-[150%] h-[800px] bg-[radial-gradient(ellipse_at_bottom,var(--tw-gradient-stops))] from-orange-500/60 via-fuchsia-500/20 to-transparent" />
 </div>

 <div className="max-w-7xl mx-auto relative z-10">
 <FadeIn>
 <h2 className="text-3xl font-semibold tracking-tight mb-8">About NIRA</h2>
 <div className="grid md:grid-cols-2 gap-16 mb-16">
 <div className="p-8 rounded-[2rem] border border-[color-mix(in_srgb,var(--nira-border)_50%,transparent)] bg-[color-mix(in_srgb,var(--nira-bg)_50%,transparent)] md:backdrop-blur-xl">
 <h3 className="text-xl font-semibold text-[var(--nira-text)] mb-4 tracking-tight">Mission & Vision</h3>
 <p className="text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)] leading-relaxed max-w-md font-medium">
 To build safe, accessible, and reasoning-focused intelligence systems that augment human capability. We are dedicated to transparent research, reliable AI infrastructure, and creating technology that earns absolute trust.
 </p>
 </div>
 <div className="relative p-8 rounded-[2rem] border border-[color-mix(in_srgb,var(--nira-border)_50%,transparent)] bg-[color-mix(in_srgb,var(--nira-bg)_50%,transparent)] md:backdrop-blur-xl overflow-hidden group min-h-[240px]">
 {/* Animated Map Background */}
 <div className="absolute inset-0 right-0 p-6 md:p-8 opacity-20 md:opacity-30 group-hover:opacity-50 transition-all duration-1000 pointer-events-none flex justify-end items-center z-0 overflow-hidden">
 <div className="absolute right-10 top-1/2 -translate-y-1/2 w-64 h-64 bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] from-orange-500/40 to-transparent animate-pulse" />
 <svg viewBox="0 0 400 400" className="w-auto h-full max-w-[65%] drop- relative z-10" fill="none" preserveAspectRatio="xMaxYMid meet">
 <path 
 d="M 171.5,351.8 L 172.1,353.9 L 170.3,353.3 L 171.5,351.8 Z M 291.4,351.2 L 292.1,351.8 L 291.4,351.2 Z M 203.4,344.9 L 203.4,344.9 Z M 211.1,342.1 L 211.9,342.7 L 210.5,342.8 L 211.1,342.1 Z M 219.1,338.2 L 219.1,338.2 Z M 221.4,337.1 L 220.6,337.8 L 221.4,337.1 Z M 222.4,336.9 L 221.9,337.1 L 222.4,336.9 Z M 222.8,336.9 L 222.8,336.9 Z M 279.4,332.3 L 280.0,333.0 L 279.4,332.3 Z M 281.3,330.9 L 281.3,330.9 Z M 280.9,330.0 L 281.1,331.0 L 280.9,330.0 Z M 282.7,329.5 L 282.5,330.1 L 282.7,329.5 Z M 281.2,327.5 L 283.2,328.4 L 281.9,331.5 L 280.5,328.3 L 281.2,327.5 Z M 246.5,320.3 L 246.3,320.9 L 246.5,320.3 Z M 275.8,316.4 L 275.8,316.4 Z M 275.5,314.8 L 275.5,314.8 Z M 276.6,313.5 L 275.8,314.7 L 276.6,313.5 Z M 278.2,311.7 L 277.3,313.0 L 278.2,311.7 Z M 278.7,311.7 L 278.7,311.7 Z M 281.1,309.9 L 280.4,310.4 L 281.1,309.9 Z M 102.9,302.8 L 102.6,303.5 L 102.9,302.8 Z M 103.1,299.9 L 103.8,301.1 L 103.1,299.9 Z M 261.6,299.9 L 262.4,300.8 L 262.0,301.9 L 261.2,300.5 L 261.6,299.9 Z M 275.6,298.9 L 275.6,298.9 Z M 277.1,298.9 L 276.8,299.5 L 277.1,298.9 Z M 277.2,298.7 L 277.2,298.7 Z M 277.6,298.4 L 277.6,298.4 Z M 276.3,298.3 L 276.3,298.9 L 277.2,298.5 L 276.5,299.6 L 275.8,298.9 L 276.3,298.3 Z M 277.7,298.3 L 277.7,298.3 Z M 276.7,298.2 L 276.7,298.2 Z M 283.9,296.7 L 285.7,297.5 L 283.6,298.0 L 283.2,297.1 L 283.9,296.7 Z M 256.9,291.6 L 257.7,294.2 L 256.5,292.4 L 256.9,291.6 Z M 261.7,279.9 L 262.1,281.1 L 261.3,280.8 L 261.7,279.9 Z M 253.2,276.2 L 253.2,276.2 Z M 268.8,263.9 L 268.8,263.9 Z M 263.5,263.5 L 264.0,263.8 L 263.5,263.5 Z M 262.7,262.3 L 263.0,264.2 L 262.3,263.6 L 262.7,262.3 Z M 77.9,258.0 L 77.9,258.0 Z M 86.5,254.9 L 85.6,255.1 L 86.5,254.9 Z M 70.3,254.3 L 70.3,254.3 Z M 70.9,253.9 L 70.9,253.9 Z M 72.0,253.3 L 72.0,253.3 Z M 71.3,253.2 L 71.3,253.2 Z M 79.4,253.0 L 79.2,254.0 L 78.6,253.4 L 79.4,253.0 Z M 88.3,252.4 L 88.4,253.1 L 88.3,252.4 Z M 76.1,251.3 L 76.1,251.3 Z M 76.0,251.1 L 76.0,251.1 Z M 67.7,248.9 L 67.7,248.9 Z M 97.0,248.8 L 98.8,250.7 L 97.6,252.0 L 94.7,250.1 L 97.0,248.8 Z M 77.4,247.9 L 78.7,248.2 L 78.9,248.9 L 77.3,249.2 L 76.8,248.8 L 77.4,247.9 Z M 67.4,247.7 L 68.0,248.5 L 65.8,248.5 L 65.7,250.1 L 64.3,251.1 L 64.8,248.6 L 67.4,247.7 Z M 64.5,246.9 L 64.5,246.9 Z M 78.7,244.7 L 80.4,244.7 L 81.1,245.6 L 79.4,245.9 L 78.2,245.1 L 78.7,244.7 Z M 116.2,244.4 L 116.2,244.4 Z M 83.6,244.4 L 83.5,244.9 L 83.6,244.4 Z M 117.0,244.2 L 117.0,244.2 Z M 117.1,243.7 L 116.8,244.2 L 117.1,243.7 Z M 116.6,243.2 L 116.7,244.1 L 115.8,244.0 L 116.6,243.2 Z M 114.6,243.1 L 116.0,245.2 L 113.3,245.6 L 111.2,244.7 L 113.2,244.9 L 113.5,243.5 L 114.6,243.1 Z M 121.0,243.1 L 120.2,243.3 L 121.0,243.1 Z M 120.2,243.1 L 119.3,243.4 L 120.2,243.1 Z M 120.9,242.8 L 120.3,243.1 L 120.9,242.8 Z M 121.9,242.2 L 121.9,242.2 Z M 122.2,242.0 L 122.2,242.0 Z M 130.5,241.3 L 130.5,241.3 Z M 120.1,240.7 L 121.0,241.1 L 121.2,242.2 L 119.1,243.4 L 117.0,243.3 L 117.4,241.6 L 120.1,240.7 Z M 131.0,240.3 L 131.0,240.3 Z M 116.4,239.9 L 117.3,240.3 L 116.4,239.9 Z M 132.6,237.5 L 132.6,237.5 Z M 133.8,235.2 L 133.8,235.2 Z M 134.2,235.2 L 134.2,235.2 Z M 134.4,234.7 L 134.4,234.7 Z M 134.3,233.0 L 134.3,233.5 L 134.3,233.0 Z M 97.9,230.3 L 99.4,231.2 L 97.2,230.5 L 97.9,230.3 Z M 97.6,229.4 L 97.6,229.4 Z M 147.0,216.4 L 145.7,217.4 L 147.0,216.4 Z M 146.2,213.1 L 144.6,214.8 L 146.2,213.1 Z M 146.6,213.0 L 144.5,216.7 L 144.6,215.0 L 146.6,213.0 Z M 146.8,213.0 L 146.8,213.0 Z M 147.2,212.7 L 146.7,213.5 L 147.2,212.7 Z M 146.8,212.5 L 146.8,212.5 Z M 147.9,212.4 L 147.3,212.8 L 147.9,212.4 Z M 148.7,212.2 L 146.5,214.6 L 148.7,212.2 Z M 35.5,202.2 L 35.8,202.8 L 35.5,202.2 Z M 34.6,200.3 L 34.6,200.3 Z M 38.5,199.8 L 38.5,199.8 Z M 36.7,198.6 L 36.7,198.6 Z M 41.3,197.3 L 41.3,197.3 Z M 32.5,197.2 L 33.4,198.4 L 33.3,197.8 L 34.3,198.3 L 33.9,197.4 L 35.7,198.2 L 35.9,199.7 L 33.3,200.4 L 34.0,200.8 L 33.4,201.3 L 31.4,200.1 L 31.4,198.9 L 32.3,199.6 L 33.0,199.1 L 32.2,198.2 L 32.5,197.2 Z M 37.6,197.2 L 37.0,197.5 L 37.6,197.2 Z M 37.0,197.0 L 37.0,197.0 Z M 37.4,196.9 L 37.4,196.9 Z M 34.3,196.9 L 35.5,197.0 L 36.1,198.1 L 34.9,197.9 L 34.3,196.9 Z M 36.9,196.7 L 36.9,196.7 Z M 36.6,196.7 L 36.7,197.3 L 36.6,196.7 Z M 36.6,196.4 L 36.6,196.4 Z M 31.5,195.5 L 31.5,195.5 Z M 32.0,195.5 L 32.0,195.5 Z M 32.4,195.5 L 32.4,195.5 Z M 29.3,195.5 L 30.6,195.8 L 31.2,196.9 L 29.1,196.6 L 29.3,195.5 Z M 30.5,195.4 L 30.9,195.6 L 30.5,195.4 Z M 32.8,195.3 L 32.8,195.3 Z M 36.9,194.9 L 37.1,195.5 L 36.9,194.9 Z M 27.3,194.6 L 27.3,194.6 Z M 33.4,194.4 L 33.5,194.9 L 33.4,194.4 Z M 34.9,194.3 L 34.9,194.3 Z M 34.3,193.5 L 34.7,194.5 L 36.1,194.8 L 36.0,196.3 L 33.0,193.7 L 34.3,193.5 Z M 31.4,193.3 L 31.4,193.3 Z M 29.1,193.0 L 29.1,193.0 Z M 29.2,192.9 L 29.2,192.9 Z M 31.1,192.9 L 31.5,193.2 L 31.1,192.9 Z M 33.7,192.9 L 34.2,193.4 L 33.7,192.9 Z M 31.1,192.7 L 31.0,193.7 L 31.1,192.7 Z M 32.2,191.7 L 32.2,191.7 Z M 31.2,191.7 L 33.0,193.4 L 32.3,194.4 L 32.0,193.7 L 32.6,193.5 L 31.7,192.2 L 30.6,192.5 L 31.2,191.7 Z M 26.6,191.7 L 26.6,191.7 Z M 30.4,191.7 L 30.6,192.8 L 30.4,191.7 Z M 27.2,191.6 L 27.2,191.6 Z M 24.7,191.5 L 24.7,191.5 Z M 26.7,191.4 L 26.7,191.4 Z M 23.5,191.4 L 23.5,191.4 Z M 32.4,191.4 L 32.4,191.4 Z M 23.8,191.4 L 24.3,191.9 L 23.8,191.4 Z M 26.6,191.2 L 26.6,191.2 Z M 31.9,191.1 L 31.5,191.6 L 31.9,191.1 Z M 22.9,190.7 L 22.9,190.7 Z M 23.0,190.6 L 23.0,190.6 Z M 22.9,190.3 L 22.9,190.3 Z M 29.1,190.0 L 29.1,190.0 Z M 30.0,190.0 L 30.0,190.0 Z M 29.0,189.8 L 29.0,189.8 Z M 29.0,189.3 L 29.0,189.3 Z M 29.0,188.7 L 28.8,189.3 L 29.0,188.7 Z M 29.4,188.6 L 30.5,189.8 L 29.8,189.1 L 30.2,189.7 L 29.1,190.2 L 29.4,188.6 Z M 23.4,188.5 L 23.4,188.5 Z M 28.9,187.4 L 29.0,188.6 L 28.9,187.4 Z M 27.3,187.1 L 28.6,188.6 L 28.0,191.8 L 26.4,190.9 L 26.6,188.7 L 27.4,188.4 L 24.7,190.1 L 24.0,189.6 L 24.7,190.1 L 24.2,190.8 L 23.6,189.4 L 25.0,189.5 L 26.1,188.3 L 25.6,187.9 L 27.3,187.1 Z M 28.9,186.6 L 27.9,187.3 L 28.9,186.6 Z M 29.3,186.4 L 29.3,186.4 Z M 29.6,186.4 L 29.6,186.4 Z M 28.2,186.2 L 28.2,186.8 L 28.2,186.2 Z M 26.9,186.1 L 27.2,187.1 L 26.5,187.2 L 26.9,186.1 Z M 25.2,185.9 L 25.2,185.9 Z M 27.8,185.9 L 27.7,187.3 L 27.8,185.9 Z M 27.0,184.5 L 26.8,185.0 L 27.0,184.5 Z M 27.4,184.2 L 27.2,184.7 L 27.4,184.2 Z M 27.3,183.7 L 27.3,183.7 Z M 27.9,182.9 L 27.9,182.9 Z M 27.7,182.6 L 27.5,183.6 L 26.1,184.2 L 27.7,182.6 Z M 12.2,180.7 L 12.2,180.7 Z M 14.2,180.5 L 13.5,180.7 L 14.2,180.5 Z M 11.8,180.4 L 11.8,180.4 Z M 27.9,180.1 L 27.8,182.2 L 25.7,183.5 L 24.7,185.5 L 25.0,182.5 L 26.1,182.2 L 27.9,180.1 Z M 26.4,179.9 L 27.0,180.4 L 26.0,181.5 L 26.4,179.9 Z M 27.9,179.5 L 27.7,180.0 L 27.9,179.5 Z M 26.3,178.4 L 26.9,179.8 L 26.0,179.7 L 25.3,180.7 L 25.0,178.9 L 26.3,178.4 Z M 28.0,178.2 L 28.4,179.6 L 27.0,180.3 L 27.1,178.9 L 28.0,178.2 Z M 27.6,172.5 L 27.3,173.0 L 27.6,172.5 Z M 25.9,171.9 L 25.9,171.9 Z M 27.0,171.5 L 28.2,172.1 L 26.5,172.4 L 27.0,171.5 Z M 28.2,171.1 L 27.8,171.7 L 28.2,171.1 Z M 11.8,169.1 L 11.9,170.5 L 11.8,169.1 Z M 19.8,167.8 L 19.3,169.2 L 19.8,167.8 Z M 20.4,167.5 L 22.8,168.7 L 24.5,168.1 L 24.0,170.1 L 22.9,170.8 L 24.0,170.2 L 24.0,172.4 L 22.3,176.6 L 21.4,177.3 L 22.3,174.7 L 19.7,180.0 L 17.8,180.9 L 17.1,180.1 L 17.3,180.9 L 16.6,181.2 L 15.3,180.4 L 16.4,179.9 L 15.2,178.8 L 15.5,178.0 L 17.7,178.5 L 17.3,178.0 L 15.5,177.9 L 14.7,179.8 L 13.4,179.5 L 13.9,180.5 L 12.1,180.5 L 12.4,179.5 L 10.7,180.1 L 10.0,178.4 L 11.1,177.0 L 14.5,177.5 L 17.6,176.9 L 12.7,177.3 L 15.0,176.9 L 17.2,175.0 L 16.7,174.8 L 18.0,172.8 L 18.7,172.4 L 18.9,173.2 L 19.2,171.3 L 19.9,171.9 L 20.0,171.3 L 19.0,170.3 L 20.4,167.5 Z M 35.3,167.2 L 34.7,168.0 L 35.3,167.2 Z M 34.8,167.1 L 34.8,167.1 Z M 17.3,166.4 L 18.2,167.5 L 17.7,168.6 L 18.3,171.8 L 16.3,172.2 L 16.0,170.6 L 16.5,172.5 L 15.3,173.8 L 14.3,172.9 L 14.9,169.5 L 15.4,168.1 L 16.8,167.6 L 16.3,166.8 L 17.3,166.4 Z M 28.7,166.0 L 30.1,166.7 L 29.7,168.5 L 28.9,168.1 L 30.3,169.3 L 30.0,170.6 L 28.3,170.3 L 29.4,170.9 L 28.2,171.6 L 26.9,169.3 L 27.5,171.4 L 25.2,171.5 L 26.3,169.4 L 25.8,167.4 L 28.7,166.0 Z M 41.5,164.7 L 41.5,164.7 Z M 41.0,164.6 L 41.0,164.6 Z M 31.0,163.4 L 30.4,164.3 L 31.0,163.4 Z M 22.6,163.1 L 24.2,163.7 L 25.3,165.5 L 24.5,167.2 L 23.5,167.3 L 23.6,166.6 L 23.9,167.7 L 23.2,168.2 L 21.7,165.5 L 23.0,168.4 L 20.2,167.2 L 18.7,168.6 L 19.5,165.4 L 22.6,163.1 Z M 13.7,163.0 L 14.0,164.1 L 12.9,165.2 L 11.8,164.9 L 11.8,163.8 L 13.7,163.0 Z M 25.9,159.5 L 26.5,159.9 L 25.6,160.6 L 26.1,162.9 L 25.4,163.6 L 24.1,163.5 L 23.6,162.7 L 24.3,162.1 L 23.4,162.7 L 23.9,163.5 L 21.5,163.2 L 19.9,165.0 L 20.2,162.4 L 21.0,162.3 L 20.1,162.8 L 20.1,161.7 L 25.9,159.5 Z M 31.1,159.0 L 32.5,160.4 L 34.3,160.8 L 30.0,164.4 L 29.1,163.3 L 28.4,163.8 L 28.1,162.4 L 29.7,161.6 L 30.5,162.2 L 29.8,161.5 L 31.2,160.7 L 30.5,159.4 L 31.1,159.0 Z M 30.5,158.8 L 29.8,158.8 L 30.5,158.8 Z M 27.9,156.2 L 29.1,157.0 L 28.7,158.4 L 30.1,159.3 L 29.3,159.3 L 30.1,160.3 L 27.8,162.4 L 27.0,162.1 L 27.7,162.4 L 27.3,164.0 L 25.5,164.9 L 24.6,164.1 L 26.1,163.0 L 26.0,160.6 L 26.7,159.8 L 24.6,159.5 L 25.9,158.2 L 25.8,156.9 L 27.9,156.2 Z M 24.7,156.0 L 24.9,157.9 L 23.7,160.1 L 19.6,161.7 L 19.1,166.7 L 18.1,167.4 L 17.1,166.3 L 16.2,166.8 L 16.6,167.6 L 15.1,168.7 L 14.8,168.2 L 14.1,172.7 L 14.9,174.4 L 13.1,175.0 L 10.4,172.0 L 11.5,170.0 L 12.0,170.5 L 12.9,169.3 L 11.9,169.0 L 11.6,165.7 L 12.9,165.6 L 13.6,164.6 L 14.5,166.3 L 14.5,165.6 L 16.1,165.4 L 14.5,165.5 L 13.8,164.6 L 14.4,163.5 L 17.2,163.9 L 17.9,163.0 L 17.1,163.8 L 14.4,163.3 L 15.5,160.9 L 19.0,160.7 L 20.5,157.1 L 21.5,156.7 L 22.7,157.8 L 24.7,156.0 Z M 246.5,116.9 L 249.4,117.5 L 250.1,118.6 L 251.5,118.9 L 253.0,118.8 L 254.2,117.5 L 259.3,119.0 L 261.7,118.4 L 260.0,120.3 L 257.2,119.5 L 255.5,120.7 L 256.7,122.5 L 257.8,122.0 L 258.1,123.2 L 260.7,122.9 L 260.5,122.0 L 261.9,122.4 L 263.6,125.5 L 267.0,125.3 L 266.7,127.9 L 268.4,131.2 L 271.0,131.0 L 270.5,128.6 L 271.2,128.7 L 273.2,125.1 L 275.8,127.2 L 282.4,128.1 L 282.2,130.4 L 284.5,133.9 L 292.7,133.7 L 296.1,136.0 L 300.2,133.8 L 298.5,132.1 L 300.1,130.3 L 299.5,128.5 L 301.5,126.6 L 302.0,127.7 L 303.8,127.6 L 306.7,126.1 L 307.2,130.0 L 305.8,131.9 L 311.0,134.6 L 313.4,133.1 L 314.7,133.7 L 313.4,135.6 L 312.3,135.0 L 311.6,137.5 L 309.4,137.2 L 305.7,144.6 L 307.7,146.5 L 307.6,147.4 L 314.2,149.8 L 312.7,152.6 L 315.5,155.1 L 318.3,154.1 L 320.8,151.3 L 320.9,148.8 L 322.5,148.9 L 323.2,148.0 L 323.0,150.4 L 325.7,152.7 L 325.2,156.3 L 326.0,156.8 L 326.3,159.9 L 324.6,160.8 L 322.6,164.1 L 323.2,166.5 L 322.6,168.6 L 323.4,169.8 L 324.8,168.8 L 326.1,169.1 L 329.6,173.3 L 331.4,173.7 L 330.9,176.8 L 331.6,177.2 L 331.0,177.9 L 331.7,178.9 L 332.8,179.1 L 335.6,176.6 L 338.1,176.8 L 340.6,178.5 L 339.2,183.0 L 340.5,185.7 L 339.6,186.1 L 338.9,188.8 L 340.1,189.5 L 343.2,188.6 L 344.5,191.2 L 346.9,188.4 L 348.0,189.9 L 350.9,189.2 L 354.7,195.8 L 357.4,195.5 L 357.9,193.6 L 358.8,193.1 L 360.5,195.7 L 363.1,196.1 L 363.3,197.7 L 364.1,197.6 L 363.8,198.3 L 367.5,198.4 L 369.3,200.1 L 368.7,205.3 L 372.1,206.9 L 373.6,204.5 L 375.9,204.8 L 378.5,209.0 L 378.1,210.4 L 382.2,214.3 L 383.5,217.5 L 381.7,218.3 L 382.9,220.2 L 385.3,222.2 L 386.4,221.1 L 388.3,220.7 L 390.0,224.7 L 389.2,227.3 L 387.6,227.6 L 387.6,229.1 L 385.4,232.4 L 384.1,238.0 L 377.1,237.6 L 374.0,242.3 L 372.6,242.3 L 372.9,242.9 L 370.7,244.3 L 370.3,245.3 L 365.8,243.2 L 363.8,243.8 L 363.3,246.8 L 364.6,245.7 L 366.2,245.8 L 366.5,247.4 L 365.9,247.2 L 365.8,248.4 L 367.3,248.3 L 367.4,250.3 L 368.5,251.1 L 369.8,248.9 L 370.5,248.9 L 370.8,250.4 L 372.4,249.7 L 372.6,247.7 L 373.4,248.3 L 373.4,250.1 L 376.4,250.4 L 377.5,252.1 L 378.8,252.7 L 376.7,252.4 L 375.9,253.7 L 374.7,253.7 L 374.8,254.9 L 373.6,254.3 L 372.6,257.1 L 369.2,256.5 L 367.8,254.1 L 365.4,254.8 L 364.7,259.3 L 366.6,261.8 L 365.6,262.4 L 365.7,263.1 L 368.5,263.7 L 369.2,266.8 L 368.9,270.6 L 370.4,270.1 L 372.0,271.3 L 371.2,271.5 L 370.9,272.9 L 369.4,273.3 L 369.8,273.9 L 367.0,275.6 L 367.4,276.6 L 370.4,277.3 L 370.1,278.9 L 353.8,286.3 L 349.6,287.2 L 351.7,289.2 L 350.9,290.8 L 354.8,294.6 L 354.9,296.6 L 353.2,298.3 L 348.3,299.2 L 350.4,300.6 L 352.7,307.0 L 355.7,305.5 L 358.5,305.7 L 359.0,304.4 L 360.2,305.4 L 360.1,304.2 L 362.6,303.5 L 369.9,303.7 L 372.1,303.0 L 373.5,304.9 L 375.5,303.7 L 377.4,304.6 L 379.8,302.6 L 380.2,304.1 L 381.3,304.3 L 380.9,307.0 L 376.6,308.9 L 375.0,307.9 L 374.5,309.2 L 372.3,308.7 L 370.5,309.5 L 368.9,308.9 L 367.8,309.8 L 365.8,309.3 L 365.1,307.8 L 364.0,311.6 L 362.0,311.7 L 359.2,313.2 L 358.2,312.6 L 358.0,318.9 L 354.6,321.1 L 350.9,320.8 L 351.2,322.3 L 350.1,324.6 L 351.2,325.1 L 350.4,326.5 L 348.8,325.9 L 348.0,326.9 L 345.5,326.8 L 345.9,327.8 L 345.2,328.6 L 341.8,327.7 L 339.1,328.9 L 339.2,327.7 L 338.1,327.4 L 337.7,326.3 L 336.2,326.8 L 336.2,327.6 L 338.7,328.4 L 338.7,329.7 L 340.4,329.6 L 340.5,330.4 L 342.6,330.8 L 343.6,329.7 L 345.3,330.8 L 346.1,330.0 L 345.3,331.2 L 345.5,333.6 L 345.8,334.5 L 347.5,335.2 L 347.5,336.3 L 349.5,335.5 L 350.0,337.1 L 352.0,336.8 L 355.4,337.9 L 356.0,339.0 L 355.1,339.2 L 354.7,340.5 L 356.7,343.0 L 356.9,346.1 L 357.8,346.6 L 357.4,351.4 L 358.0,352.5 L 356.3,353.6 L 354.2,353.2 L 352.8,355.4 L 350.4,355.4 L 350.5,356.6 L 351.7,357.0 L 351.3,360.1 L 348.2,360.9 L 345.9,363.0 L 343.0,362.4 L 341.2,363.3 L 339.1,362.3 L 338.5,359.8 L 337.4,358.9 L 334.7,358.2 L 333.2,356.6 L 330.8,357.8 L 329.8,354.0 L 328.1,354.4 L 327.3,357.1 L 325.0,358.5 L 327.3,361.4 L 329.7,362.1 L 329.8,364.5 L 330.9,364.7 L 329.2,366.3 L 329.4,367.4 L 327.8,369.1 L 326.6,372.3 L 324.3,373.7 L 324.3,374.8 L 325.7,374.3 L 326.3,376.0 L 327.1,380.3 L 326.1,381.8 L 326.7,384.8 L 325.0,385.5 L 324.6,384.7 L 323.4,384.9 L 323.3,385.7 L 322.9,384.4 L 322.0,385.3 L 319.5,384.8 L 318.4,385.6 L 318.4,388.0 L 316.4,389.8 L 315.1,389.6 L 314.9,388.8 L 314.1,390.0 L 312.8,389.5 L 312.5,387.9 L 314.5,386.2 L 311.6,384.7 L 309.3,385.0 L 309.9,386.7 L 308.4,387.8 L 307.0,387.6 L 306.5,386.8 L 305.9,387.8 L 305.1,387.4 L 304.6,385.0 L 305.3,383.4 L 307.4,383.3 L 309.5,380.4 L 311.5,379.8 L 311.4,378.4 L 310.4,378.1 L 307.5,378.9 L 308.1,377.2 L 307.2,375.5 L 306.2,377.6 L 303.7,377.8 L 303.4,379.7 L 302.3,379.5 L 301.9,378.1 L 301.9,379.7 L 300.1,379.7 L 299.7,380.9 L 297.4,379.6 L 296.1,380.5 L 297.1,382.4 L 298.9,383.2 L 298.8,384.6 L 293.1,383.7 L 293.0,384.7 L 291.7,384.7 L 291.6,385.9 L 290.8,386.0 L 290.7,388.6 L 288.7,388.3 L 288.7,389.7 L 284.8,389.0 L 285.5,385.1 L 285.0,382.6 L 285.9,379.7 L 287.1,379.0 L 287.1,377.2 L 290.5,375.0 L 291.3,372.7 L 293.2,374.3 L 292.8,372.8 L 290.8,371.4 L 293.7,367.1 L 294.2,365.2 L 294.2,359.1 L 293.2,358.0 L 291.7,352.5 L 292.8,353.1 L 294.0,352.1 L 292.6,352.1 L 290.7,350.1 L 291.0,349.1 L 291.7,349.0 L 290.2,348.1 L 288.1,343.2 L 288.2,340.2 L 286.9,340.8 L 287.2,342.0 L 285.7,340.1 L 284.0,333.9 L 286.2,333.8 L 286.8,332.9 L 282.8,332.4 L 282.6,330.8 L 283.8,328.3 L 280.6,327.5 L 280.1,331.6 L 278.2,332.3 L 277.7,323.5 L 279.4,323.8 L 279.7,323.2 L 277.1,323.0 L 276.4,321.8 L 276.8,320.2 L 275.8,320.3 L 276.4,320.0 L 275.8,319.4 L 276.3,317.8 L 278.8,314.4 L 279.4,314.4 L 279.2,315.3 L 279.5,314.7 L 278.9,314.2 L 277.9,314.9 L 278.1,313.9 L 282.4,308.9 L 279.3,310.7 L 281.5,305.7 L 281.0,305.5 L 284.8,304.4 L 285.1,303.7 L 284.7,303.3 L 284.8,304.3 L 282.9,304.8 L 281.6,304.1 L 278.1,307.2 L 277.3,305.3 L 277.8,304.9 L 277.0,304.9 L 276.4,303.6 L 277.1,303.6 L 276.9,302.0 L 278.3,299.6 L 281.1,298.9 L 282.6,297.5 L 284.0,298.3 L 285.7,297.6 L 287.9,297.9 L 290.7,296.6 L 287.4,296.9 L 284.8,295.3 L 283.3,295.9 L 276.6,295.8 L 274.2,297.1 L 272.8,296.8 L 271.8,295.2 L 271.0,295.2 L 271.7,294.6 L 270.9,294.6 L 272.9,292.5 L 274.7,287.1 L 271.6,285.1 L 270.6,279.2 L 273.4,267.5 L 275.5,264.4 L 277.4,263.4 L 279.4,263.4 L 282.6,265.4 L 286.1,266.0 L 289.1,261.7 L 293.3,263.0 L 295.3,261.8 L 295.6,259.7 L 294.0,261.8 L 292.5,261.8 L 291.3,259.5 L 285.7,262.6 L 281.8,262.1 L 279.9,259.7 L 278.7,259.3 L 273.0,261.8 L 272.8,260.0 L 273.7,259.7 L 273.1,259.6 L 269.7,264.6 L 268.9,264.4 L 270.1,262.2 L 269.1,262.3 L 270.1,261.5 L 268.7,262.1 L 266.6,258.3 L 263.8,257.8 L 265.2,254.9 L 264.1,253.4 L 262.2,253.8 L 263.4,253.8 L 264.7,255.2 L 262.8,257.4 L 263.4,258.4 L 265.3,258.6 L 265.5,262.8 L 264.4,264.5 L 263.1,262.9 L 263.2,261.0 L 261.8,260.1 L 262.7,261.7 L 262.2,264.1 L 263.6,265.1 L 263.9,266.4 L 263.0,267.5 L 261.9,264.9 L 261.6,266.6 L 261.1,266.3 L 261.8,267.5 L 261.0,269.0 L 260.8,268.1 L 259.4,267.7 L 259.5,265.6 L 258.1,264.3 L 259.2,265.6 L 259.0,267.8 L 259.9,268.7 L 257.2,278.7 L 256.7,278.5 L 257.1,280.6 L 256.2,279.7 L 255.5,277.3 L 256.0,275.4 L 254.9,273.5 L 257.6,272.0 L 258.3,272.7 L 258.4,270.0 L 257.1,271.0 L 256.3,270.2 L 257.1,271.7 L 254.4,273.3 L 254.4,275.5 L 251.5,275.3 L 250.7,274.0 L 252.4,276.3 L 254.3,276.1 L 253.6,279.2 L 251.8,280.0 L 249.2,277.5 L 250.0,278.8 L 249.2,279.2 L 251.8,280.3 L 253.6,279.7 L 255.6,282.7 L 256.3,292.2 L 255.2,289.1 L 253.5,288.5 L 252.6,287.1 L 251.3,287.2 L 252.7,287.2 L 254.9,289.4 L 258.8,299.0 L 256.5,302.3 L 255.6,306.6 L 253.8,310.4 L 247.6,317.3 L 246.9,319.8 L 244.9,318.7 L 244.8,319.5 L 246.2,320.2 L 245.3,322.1 L 245.8,323.2 L 247.1,323.5 L 247.2,325.0 L 241.4,327.6 L 240.8,328.9 L 240.1,328.0 L 241.7,326.0 L 240.9,325.7 L 239.4,327.4 L 239.8,328.3 L 238.9,329.6 L 234.2,330.3 L 233.0,331.5 L 229.4,332.6 L 228.0,333.4 L 228.6,334.6 L 226.9,334.5 L 227.3,335.0 L 224.0,336.1 L 223.1,335.7 L 221.0,337.1 L 219.0,337.2 L 217.8,338.8 L 216.9,338.4 L 214.0,340.0 L 211.0,340.0 L 210.5,341.0 L 211.1,341.6 L 209.4,342.0 L 209.8,342.5 L 208.7,343.6 L 206.5,344.8 L 202.7,344.5 L 203.1,345.5 L 199.2,346.3 L 189.3,350.3 L 189.3,351.4 L 185.3,351.6 L 184.5,352.3 L 184.8,352.7 L 183.0,353.2 L 180.6,352.6 L 179.1,353.7 L 179.9,352.5 L 179.2,352.3 L 172.3,354.4 L 172.8,353.3 L 175.1,352.8 L 172.3,353.4 L 171.7,351.7 L 170.5,351.4 L 171.9,351.1 L 171.9,349.3 L 173.5,349.3 L 173.6,347.5 L 172.9,346.8 L 170.4,347.0 L 170.0,346.1 L 168.9,345.9 L 173.9,343.8 L 173.1,340.2 L 170.6,338.7 L 166.1,339.3 L 163.9,337.5 L 164.2,338.5 L 162.9,342.2 L 160.5,346.3 L 160.9,349.5 L 159.8,351.9 L 146.0,345.8 L 144.4,344.3 L 144.7,343.7 L 142.1,343.3 L 140.7,341.7 L 138.9,341.3 L 134.7,338.2 L 134.0,337.4 L 134.5,336.9 L 133.2,337.0 L 128.2,332.8 L 128.4,332.0 L 125.5,330.6 L 106.1,309.3 L 107.4,309.6 L 107.8,308.9 L 107.2,309.6 L 105.9,309.1 L 102.2,305.0 L 103.2,304.2 L 103.0,303.3 L 105.3,302.0 L 103.7,297.6 L 102.9,298.7 L 101.7,297.8 L 99.9,298.3 L 102.5,300.5 L 101.2,301.1 L 100.9,299.8 L 97.3,298.1 L 102.8,302.3 L 102.1,304.3 L 95.5,298.4 L 94.8,298.4 L 94.6,299.4 L 94.8,298.5 L 76.2,282.9 L 62.5,268.8 L 56.6,262.2 L 55.3,257.8 L 58.2,251.5 L 63.2,247.5 L 64.3,248.0 L 61.8,250.4 L 63.3,252.6 L 64.7,252.7 L 65.3,251.8 L 66.9,252.5 L 70.9,250.9 L 71.5,252.3 L 69.9,253.7 L 68.7,257.6 L 71.4,260.4 L 73.2,260.9 L 78.5,258.9 L 79.5,257.7 L 79.3,256.6 L 81.2,257.4 L 84.5,257.5 L 86.6,256.2 L 88.6,256.1 L 88.7,255.0 L 90.8,253.2 L 89.2,250.2 L 92.4,252.1 L 93.1,255.0 L 93.9,254.3 L 94.8,254.7 L 93.7,256.3 L 93.9,257.3 L 94.3,255.6 L 95.7,255.3 L 95.8,256.1 L 95.9,255.4 L 95.8,256.9 L 96.5,254.3 L 98.7,254.8 L 99.2,252.7 L 101.4,252.6 L 101.3,249.8 L 99.7,250.0 L 99.7,249.3 L 100.7,249.7 L 101.5,248.9 L 101.6,249.5 L 103.1,247.9 L 104.1,250.5 L 104.8,250.8 L 105.0,249.9 L 107.3,252.4 L 109.2,249.7 L 107.3,248.9 L 109.4,249.3 L 109.5,246.3 L 110.1,246.6 L 109.6,249.1 L 111.7,249.6 L 113.5,248.3 L 114.3,249.0 L 114.3,247.0 L 115.6,245.6 L 117.0,246.6 L 116.3,244.6 L 118.5,244.2 L 118.1,243.7 L 121.1,243.2 L 120.9,243.9 L 121.9,242.5 L 124.7,243.6 L 129.4,243.2 L 131.3,241.3 L 131.4,239.3 L 134.2,236.5 L 133.9,235.6 L 134.8,234.7 L 133.9,234.1 L 134.9,233.9 L 134.8,232.2 L 136.2,232.4 L 137.8,230.8 L 137.7,229.5 L 139.9,226.7 L 140.9,223.9 L 142.8,221.6 L 145.1,220.2 L 149.3,211.6 L 146.0,212.3 L 143.8,214.3 L 142.6,216.3 L 143.4,216.4 L 142.9,219.3 L 140.5,220.3 L 138.1,219.1 L 136.4,219.2 L 133.9,217.4 L 133.2,218.2 L 131.5,216.2 L 130.8,216.7 L 131.5,216.5 L 132.8,218.8 L 129.3,219.6 L 127.0,218.5 L 128.8,214.3 L 126.3,217.8 L 127.2,219.4 L 126.2,219.0 L 125.6,219.6 L 125.0,219.0 L 125.6,219.9 L 126.2,219.2 L 127.9,219.7 L 127.5,220.7 L 121.5,222.4 L 119.3,222.0 L 115.7,222.6 L 113.8,224.2 L 111.5,223.8 L 111.2,224.7 L 110.7,224.1 L 107.4,225.1 L 104.6,227.0 L 101.7,232.6 L 101.8,231.8 L 99.1,230.8 L 99.4,229.6 L 99.0,230.8 L 98.0,230.3 L 97.4,228.5 L 97.9,230.2 L 95.4,230.7 L 93.2,229.8 L 92.7,228.7 L 88.4,228.9 L 89.0,229.3 L 87.5,229.8 L 82.7,227.4 L 80.4,227.1 L 80.6,226.5 L 75.3,226.8 L 72.9,225.7 L 70.7,225.7 L 49.2,213.5 L 47.9,212.1 L 44.6,211.3 L 38.5,207.1 L 36.9,205.4 L 39.9,207.6 L 34.5,203.2 L 34.1,202.0 L 34.9,201.6 L 35.1,202.9 L 36.8,203.3 L 37.4,202.7 L 36.1,202.9 L 35.2,201.5 L 37.4,201.4 L 39.3,199.8 L 37.4,200.0 L 36.8,198.3 L 40.8,197.6 L 42.5,198.3 L 43.2,197.5 L 43.9,197.8 L 44.5,196.2 L 43.9,197.7 L 42.5,198.2 L 41.5,197.1 L 38.5,197.8 L 39.1,196.5 L 38.0,197.8 L 36.5,195.7 L 37.2,195.2 L 35.9,194.5 L 35.3,193.1 L 34.7,193.1 L 35.1,194.4 L 33.8,192.6 L 33.1,192.7 L 33.8,193.4 L 32.5,192.8 L 32.6,190.8 L 31.1,190.7 L 29.9,187.4 L 30.3,189.2 L 29.1,188.0 L 29.7,188.0 L 29.1,186.4 L 30.1,186.6 L 28.9,186.3 L 29.2,185.6 L 28.5,185.9 L 28.9,185.0 L 28.0,183.0 L 28.8,183.1 L 28.1,180.3 L 28.8,176.7 L 31.2,176.2 L 30.2,176.6 L 30.4,174.4 L 37.0,170.4 L 39.0,167.3 L 43.6,165.6 L 42.4,165.9 L 43.3,165.2 L 42.8,164.5 L 44.7,163.3 L 42.0,164.4 L 38.6,164.3 L 39.0,164.7 L 37.2,165.6 L 35.3,165.5 L 35.2,164.8 L 31.1,170.4 L 30.5,170.3 L 29.9,168.7 L 31.2,166.9 L 30.5,167.7 L 29.9,166.3 L 31.8,165.7 L 33.3,162.9 L 35.8,161.6 L 37.3,162.1 L 38.8,160.7 L 36.2,161.4 L 36.3,160.1 L 34.7,159.3 L 34.3,160.4 L 32.5,160.3 L 31.2,159.0 L 31.8,158.0 L 44.0,158.0 L 45.4,138.0 L 48.7,137.1 L 49.9,143.2 L 52.3,143.9 L 54.4,140.1 L 56.0,139.0 L 57.4,141.4 L 59.2,142.1 L 64.8,139.5 L 71.2,141.5 L 77.9,139.0 L 81.0,139.7 L 85.2,139.2 L 89.4,140.3 L 95.4,139.0 L 102.9,145.2 L 119.6,145.7 L 123.1,144.1 L 126.7,138.2 L 141.9,134.4 L 154.2,130.4 L 156.5,131.6 L 154.1,134.9 L 155.0,137.0 L 154.1,138.0 L 155.0,138.5 L 154.2,140.5 L 159.1,142.2 L 168.2,142.3 L 173.5,140.2 L 173.0,138.2 L 177.5,134.8 L 179.8,134.0 L 180.7,134.8 L 182.8,134.8 L 187.9,131.5 L 187.1,129.7 L 180.4,129.0 L 180.8,124.2 L 179.8,123.1 L 179.9,119.6 L 181.2,117.7 L 186.4,114.6 L 197.9,119.0 L 199.3,117.1 L 201.1,116.3 L 203.0,118.2 L 209.4,115.1 L 212.3,114.7 L 215.1,114.9 L 216.0,115.7 L 217.2,115.2 L 219.9,117.5 L 228.2,115.3 L 229.1,116.2 L 228.9,118.2 L 231.8,119.3 L 232.8,115.0 L 235.5,115.4 L 235.4,116.7 L 236.9,117.9 L 239.9,116.3 L 240.4,114.5 L 243.5,113.1 L 245.5,113.7 L 245.4,116.3 L 246.5,116.9 Z" 
 fill="url(#gujarat-gradient)" 
 stroke="rgba(249,115,22,0.8)"
 strokeWidth="1"
 strokeLinejoin="round"
 />
 <defs>
 <linearGradient id="gujarat-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
 <stop offset="0%" stopColor="rgba(249,115,22,0.4)" />
 <stop offset="100%" stopColor="rgba(217,70,239,0.05)" />
 </linearGradient>
 </defs>
 
 {/* Pulsing Dot for Ahmedabad */}
 <circle cx="280" cy="150" r="4" fill="#f97316" className="shadow-[0_0_20px_#f97316]" />
 <circle cx="280" cy="150" r="10" fill="none" stroke="#f97316" strokeWidth="2" className="animate-ping opacity-80" />
 </svg>
 </div>

 {/* Foreground Content */}
 <div className="relative z-10 flex flex-col h-full justify-between">
 <div>
 <h3 className="text-xl font-semibold text-[var(--nira-text)] mb-2 tracking-tight">Origin</h3>
 <div className="text-[var(--nira-subtext)] font-medium">Designed & Engineered in India.</div>
 </div>
 
 <div className="mt-16 relative z-10">
 <div className="text-4xl md:text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-orange-500 via-rose-500 to-fuchsia-600 drop-shadow-lg">
 Built in Gujarat
 </div>
 <div className="flex items-center gap-2 mt-3 text-sm font-medium text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)] uppercase tracking-widest">
 <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse " />
 Ahmedabad HQ
 </div>
 </div>
 </div>
 </div>
 </div>
 </FadeIn>

 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-t border-[color-mix(in_srgb,var(--nira-border)_50%,transparent)] pt-8 mt-12">
 <div className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-500 flex items-center gap-3">
 <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-fuchsia-500 flex items-center justify-center text-white ">
 <NiraLogo size={20} />
 </div>
 NIRA Intelligence
 </div>
 <div className="flex flex-wrap gap-6 text-sm text-[color-mix(in_srgb,var(--nira-text)_70%,transparent)] font-semibold tracking-wide">
 <a href="#why-nira" onClick={(e) => { e.preventDefault(); document.getElementById('why-nira')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="hover:text-fuchsia-500 transition-colors cursor-pointer">Why NIRA</a>
 <a href="#technology" onClick={(e) => { e.preventDefault(); document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="hover:text-orange-500 transition-colors cursor-pointer">Technology</a>
 <a href="#capabilities" onClick={(e) => { e.preventDefault(); document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="hover:text-rose-500 transition-colors cursor-pointer">Capabilities</a>
 <a href="#roadmap" onClick={(e) => { e.preventDefault(); document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="hover:text-indigo-500 transition-colors cursor-pointer">Roadmap</a>
 <a href="#safety" onClick={(e) => { e.preventDefault(); document.getElementById('safety')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="hover:text-cyan-500 transition-colors cursor-pointer">Safety</a>
 <a href="#company" onClick={(e) => { e.preventDefault(); document.getElementById('company')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="hover:text-amber-500 transition-colors cursor-pointer">Company</a>
 </div>
 </div>

 <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-12 text-xs font-medium text-[color-mix(in_srgb,var(--nira-text)_40%,transparent)]">
 <div>© {new Date().getFullYear()} NIRA Intelligence. All rights reserved.</div>
 <div className="flex flex-wrap justify-center gap-6">
 <a href="/privacy" className="hover:text-[var(--nira-text)] transition-colors cursor-pointer">Privacy Policy</a>
 <a href="/terms" className="hover:text-[var(--nira-text)] transition-colors cursor-pointer">Terms of Service</a>
 <a href="/guidelines" className="hover:text-[var(--nira-text)] transition-colors cursor-pointer">User Guidelines</a>
 </div>
 </div>

 <div className="w-full flex justify-center mt-8 mb-4">
 <div className="text-xs font-medium text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] bg-[color-mix(in_srgb,var(--nira-text)_3%,transparent)] py-2 px-6 rounded-full border border-[color-mix(in_srgb,var(--nira-border)_50%,transparent)] backdrop-blur-sm shadow-sm text-center">
 NIRA Core may make mistakes. Please verify important information and report issues through feedback.
 </div>
 </div>
 </div>
 </footer>
 );
}

/* =========================================================
 MAIN EXPORT
========================================================= */

export default function NiraExplorerPage() {
 const [isReady] = useState(true);

 return (
 <div className="min-h-[100dvh] bg-[var(--nira-bg)] text-[var(--nira-text)] font-sans selection:bg-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] selection:text-[var(--nira-text)] overflow-x-hidden">
 <AnimatePresence>
 {!isReady && (
 <motion.div 
 initial={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
 className="fixed inset-0 z-[200] bg-[var(--nira-bg)] flex flex-col items-center justify-center pointer-events-none overflow-hidden"
 
 >
 {/* Subtle Premium Glow using color-mix for exact theme matching */}
 <div className="absolute w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--nira-text)_8%,transparent),transparent)] animate-[pulse_4s_ease-in-out_infinite]" />
 
 <motion.div
 initial={{ scale: 0.95, filter: "blur(10px)" }}
 animate={{ scale: 1, filter: "blur(0px)" }}
 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
 className="relative flex flex-col items-center gap-6 z-10 text-[var(--nira-text)]"
 >
 <motion.div
 animate={{ rotate: 360 }}
 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
 >
 <NiraLogo size={72} />
 </motion.div>
 
 <motion.div 
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
 className="text-lg font-semibold tracking-[0.25em] text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)] uppercase"
 >
 Nira
 </motion.div>
 </motion.div>

 {/* Grid Pattern Background for premium texture */}
 <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(color-mix(in_srgb,var(--nira-text)_100%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--nira-text)_100%,transparent)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />
 </motion.div>
 )}
 </AnimatePresence>

 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: isReady ? 1 : 0 }}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 >
 <Navigation />
 <Hero />
 <WhatIsNira />
 <WhyNira />
 <HowItWorks />
 <Technology />
 <Capabilities />
 <Roadmap />
 <Safety />
 <Ecosystem />
 <CompanyAndFooter />
 </motion.div>
 </div>
 );
}