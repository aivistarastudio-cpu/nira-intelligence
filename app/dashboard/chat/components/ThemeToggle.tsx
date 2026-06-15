"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Check } from "lucide-react";

const PremiumNiraIcon = ({ className, style }: any) => (
  <svg className={className} style={style} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="currentColor" strokeWidth="14" strokeLinecap="round">
      <ellipse cx="100" cy="100" rx="35" ry="80" />
      <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(60 100 100)" />
      <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(-60 100 100)" />
    </g>
    <circle cx="100" cy="100" r="15" fill="currentColor" />
  </svg>
);

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full" />;
  }

  const isDark = theme === "dark";
  const isRose = theme === "rose";
  
  const getBgColor = () => {
    if (isRose) return "#F472B6";
    if (isDark) return "#E5E7EB";
    return "#171717";
  };

  const themeOptions = [
    { id: "light", label: "Light", icon: Sun, color: "#f59e0b" },
    { id: "dark", label: "Dark", icon: Moon, color: "#8b5cf6" },
    { id: "rose", label: "Nira Premium", icon: PremiumNiraIcon, color: "#ec4899" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`relative w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 outline-none ${open ? 'bg-[var(--nira-text)]/[0.06]' : 'hover:bg-[var(--nira-text)]/[0.04]'}`}
        style={{ WebkitTapHighlightColor: "transparent" }}
        aria-label="Change Theme"
      >
        <div className="relative w-full h-full rounded-full flex items-center justify-center overflow-visible">
          {/* Core celestial body */}
          <motion.div
            animate={{
              scale: isDark ? 0.9 : isRose ? 0.95 : 1.1,
              backgroundColor: getBgColor(),
              boxShadow: isDark 
                ? "0 0 12px rgba(229, 231, 235, 0.4)" 
                : isRose 
                  ? "0 0 12px rgba(244, 114, 182, 0.5)"
                  : "0 0 10px rgba(0, 0, 0, 0.1), inset 1px 1px 3px rgba(255,255,255,0.4)"
            }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="absolute w-[11px] h-[11px] rounded-full z-10"
          />

          {/* The Eclipse Shadow */}
          <motion.div
            initial={false}
            animate={{
              x: isDark ? 2.5 : isRose ? -8 : 8,
              y: isDark ? -2.5 : isRose ? -8 : -8,
              scale: isDark ? 1 : 0.5,
              opacity: isDark ? 1 : 0
            }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className={`absolute w-[11px] h-[11px] rounded-full z-20 transition-colors duration-200 ${open ? 'bg-[#1C1E26] dark:bg-[#16181E] rose:bg-[#FCE7F3]' : 'bg-[var(--nira-bg)] group-hover:bg-[var(--nira-text)]/[0.04]'}`}
            style={{ mixBlendMode: isDark ? "normal" : "initial" }}
          />
          
          {/* Ambient Orbit Ring */}
          <motion.div
            animate={{
              rotate: isDark ? 180 : isRose ? 90 : 0,
              opacity: isDark ? 0.3 : isRose ? 0.6 : 0.4,
              scale: isDark ? 1.4 : isRose ? 1.25 : 1.1,
              borderColor: isDark ? "rgba(255,255,255,0.4)" : isRose ? "rgba(244,114,182,0.6)" : "rgba(0,0,0,0.3)"
            }}
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            className="absolute w-[18px] h-[18px] rounded-full border-[1.5px] border-dashed z-0"
          />
        </div>
      </button>

      {/* Premium Apple/Google Style Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2.5 w-[170px] p-1.5 rounded-[18px] bg-[var(--nira-surface)]/80 backdrop-blur-3xl border border-[var(--nira-border)] shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] z-[9999]"
          >
            {themeOptions.map((opt) => {
              const isActive = theme === opt.id || (opt.id === "light" && !isDark && !isRose);
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setTheme(opt.id);
                    setOpen(false);
                  }}
                  className={`relative w-full flex items-center justify-between px-3 py-2.5 rounded-[12px] text-[13.5px] font-medium transition-all duration-200 outline-none group
                    ${isActive 
                      ? 'bg-[var(--nira-text)]/[0.08] text-[var(--nira-text)]' 
                      : 'text-[var(--nira-subtext)] hover:bg-[var(--nira-text)]/[0.04] hover:text-[var(--nira-text)]'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-[16px] h-[16px] opacity-90 group-hover:opacity-100 transition-opacity" style={{ color: isActive ? opt.color : 'inherit' }} />
                    <span className="tracking-tight text-[14px]">{opt.label}</span>
                  </div>
                  {isActive && <Check className="w-[14px] h-[14px]" style={{ color: opt.color }} />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
