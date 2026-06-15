"use client";

import UserPanel from "./UserPanel";
import ThemeToggle from "./ThemeToggle";

type TopbarProps = {
  onShareClick?: () => void;
  collapsed?: boolean;
  setCollapsed?: (val: boolean) => void;
};

export default function Topbar({ onShareClick, collapsed, setCollapsed }: TopbarProps) {
  return (
    <div className="relative z-50 h-[60px] px-4 md:px-6 flex items-center justify-between w-full bg-transparent transition-colors duration-300">
      {/* LEFT — MODEL SELECTOR BLOCK */}
      <div className="flex items-center gap-1.5 md:gap-2 flex-1">
        {/* MOBILE HAMBURGER MENU */}
        <button 
          onClick={() => setCollapsed?.(!collapsed)}
          className="lg:hidden flex items-center justify-center p-2 -ml-2 rounded-xl text-[var(--nira-text)]/70 hover:text-[var(--nira-text)] hover:bg-[var(--nira-text)]/[0.04] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <button className="flex items-center gap-1.5 group px-2.5 py-1.5 -ml-1 rounded-xl hover:bg-[var(--nira-text)]/[0.06] transition-all duration-200 outline-none active:scale-[0.98]">
          <span className="font-sans font-[600] text-[15px] md:text-[16px] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--nira-text)] via-[var(--nira-text)]/40 to-[var(--nira-text)] animate-ambient-shine opacity-90 group-hover:opacity-100 transition-opacity antialiased">
            Nira Core
          </span>
          <span className="font-sans font-[400] text-[14px] md:text-[15px] text-[var(--nira-subtext)] opacity-90">
            Beta
          </span>
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[var(--nira-subtext)] opacity-60 group-hover:opacity-100 transition-opacity ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* CENTER - Empty */}
      <div className="flex-shrink-0 flex items-center justify-center">
      </div>

      {/* RIGHT */}
      <div className="flex items-center flex-1 justify-end">
        
        {/* THE UNIFIED CONTROL PILL (STEVE JOBS LEVEL) */}
        <div className="relative group">
          <div className="relative flex items-center bg-[var(--nira-surface)] border border-[var(--nira-border)] rounded-full p-1 transition-all duration-300">
            
            {/* SHARE */}
            <button
              onClick={onShareClick}
              disabled={!onShareClick}
              className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--nira-text)]/[0.04] text-[var(--nira-subtext)] hover:text-[var(--nira-text)] transition-all duration-300 outline-none disabled:opacity-30 disabled:cursor-not-allowed group/share"
              aria-label="Share"
            >
              <svg className="w-[15px] h-[15px] transition-transform duration-300 group-hover/share:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" className="opacity-40 group-hover/share:opacity-100 transition-opacity duration-300" />
                <polyline points="16 6 12 2 8 6" className="group-hover/share:-translate-y-1 transition-transform duration-300" />
                <line x1="12" y1="2" x2="12" y2="15" className="group-hover/share:-translate-y-1 transition-transform duration-300" />
              </svg>
            </button>

            {/* DIVIDER */}
            <div className="w-px h-4 bg-[var(--nira-border)]/60 mx-0.5" />

            {/* THEME TOGGLE */}
            <ThemeToggle />

            {/* DIVIDER */}
            <div className="w-px h-4 bg-[var(--nira-border)]/60 mx-0.5" />

            {/* PROFILE */}
            <UserPanel />

          </div>
        </div>
      </div>
    </div>
  );
}