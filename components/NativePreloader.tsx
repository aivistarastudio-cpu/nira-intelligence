"use client";

import { useEffect, useState } from "react";

/**
 * Native preloader component.
 * Renders on server-side and immediately on initial HTML load,
 * but safely fades out and completely unmounts once React hydrates,
 * preventing any touch/scroll event blocking.
 */
export default function NativePreloader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const p = document.getElementById("nira-native-preloader");
    if (p) {
      // Smoothly fade out and disable pointer events instantly
      p.style.opacity = "0";
      p.style.pointerEvents = "none";
      
      const timer = setTimeout(() => {
        setMounted(true);
      }, 300); // Remove from DOM after fade-out transition completes
      
      return () => clearTimeout(timer);
    } else {
      setMounted(true);
    }
  }, []);

  if (mounted) return null;

  return (
    <div 
      id="nira-native-preloader" 
      suppressHydrationWarning={true}
      style={{
        position: "fixed", 
        inset: 0, 
        zIndex: 999999, 
        backgroundColor: "#000000",
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        transition: "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)", 
        opacity: 1,
        pointerEvents: "auto"
      }}
    >
      <svg 
        width="48" 
        height="48" 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        style={{ animation: "spin 20s linear infinite", color: "#ffffff", opacity: 0.95 }}
      >
        <g stroke="currentColor" strokeWidth="12" strokeLinecap="round">
          <ellipse cx="100" cy="100" rx="35" ry="80" />
          <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(60 100 100)" />
          <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(-60 100 100)" />
        </g>
      </svg>
      <div style={{ marginTop: "24px", color: "#ffffff", fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", opacity: 0.7, fontFamily: "sans-serif" }}>
        INITIALIZING NIRA...
      </div>
    </div>
  );
}
