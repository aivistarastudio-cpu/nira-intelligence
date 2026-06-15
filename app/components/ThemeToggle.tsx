"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle({ inline = false }: { inline?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Skeleton to prevent hydration flashes (matches exact container size)
  if (!mounted) {
    return (
      <div className={`${inline ? 'relative' : 'fixed bottom-6 right-6 md:bottom-8 md:right-8'} z-[9000] flex items-center gap-1 p-1 rounded-full bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] border border-[color-mix(in_srgb,var(--nira-border)_50%,transparent)] w-[112px] h-[40px] opacity-0`} aria-hidden="true" />
    );
  }

  return (
    <div className={`${inline ? 'relative' : 'fixed bottom-6 right-6 md:bottom-8 md:right-8'} z-[9000] flex items-center gap-1 p-1 rounded-full bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] border border-[color-mix(in_srgb,var(--nira-border)_50%,transparent)] backdrop-blur-2xl shadow-lg`}>
      <button
        onClick={() => setTheme('light')}
        className={`w-[32px] h-[32px] flex items-center justify-center rounded-full transition-all duration-300 ${theme === 'light' ? 'bg-white shadow-md text-black' : 'text-[color-mix(in_srgb,var(--nira-text)_50%,transparent)] hover:text-[var(--nira-text)] hover:bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)]'}`}
        aria-label="Light Theme"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>

      <button
        onClick={() => setTheme('dark')}
        className={`w-[32px] h-[32px] flex items-center justify-center rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-[#27272a] shadow-md text-white' : 'text-[color-mix(in_srgb,var(--nira-text)_50%,transparent)] hover:text-[var(--nira-text)] hover:bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)]'}`}
        aria-label="Dark Theme"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>

      <button
        onClick={() => setTheme('rose')}
        className={`w-[32px] h-[32px] flex items-center justify-center rounded-full transition-all duration-300 ${theme === 'rose' ? 'bg-[#F9F2F4] border border-[#EEDEE4] shadow-sm text-[#3B2A2F]' : 'text-[color-mix(in_srgb,var(--nira-text)_50%,transparent)] hover:text-[var(--nira-text)] hover:bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)]'}`}
        aria-label="Rose Gold Theme"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </button>
    </div>
  );
}
