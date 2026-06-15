"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const NiraLogo = ({ size = 48 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 200 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="currentColor" strokeWidth="12" strokeLinecap="round" opacity="0.95">
      <ellipse cx="100" cy="100" rx="35" ry="80" />
      <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(60 100 100)" />
      <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(-60 100 100)" />
    </g>
  </svg>
)

function TransitionTracker() {
  const [isNavigating, setIsNavigating] = useState(false);
  const [navStartState, setNavStartState] = useState<string | null>(null);
  
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Exit logic: if we've navigated away from the start path, hide loader
  useEffect(() => {
    if (isNavigating && navStartState !== null) {
      const currentPath = window.location.pathname + window.location.search;
      if (currentPath !== navStartState) {
        // Route has changed (or redirected)! Hide loader smoothly
        const timer = setTimeout(() => {
          setIsNavigating(false);
          setNavStartState(null);
        }, 200); // 200ms for extremely snappy Apple-like transition
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, searchParams, isNavigating, navStartState]);

  // Safety fallback: never trap the user forever
  useEffect(() => {
    if (isNavigating) {
      const fallback = setTimeout(() => {
        setIsNavigating(false);
        setNavStartState(null);
      }, 5000); // 5s absolute max duration
      return () => clearTimeout(fallback);
    }
  }, [isNavigating]);

  // Intercept Next.js client-side navigation
  useEffect(() => {
    const handleStart = (url: string) => {
      const targetUrl = new URL(url, window.location.origin);
      const targetPath = targetUrl.pathname + targetUrl.search;
      const currentPath = window.location.pathname + window.location.search;
      
      // Ignore hash links or same-page clicks
      if (targetPath === currentPath) return;
      if (url.includes("#") && targetUrl.pathname === window.location.pathname) return;

      // Capture old path SYNCHRONOUSLY before Next.js changes it
      const oldPath = currentPath;

      // Wrap in setTimeout to prevent React 'useInsertionEffect' scheduling errors
      setTimeout(() => {
        setNavStartState(oldPath);
        setIsNavigating(true);
      }, 0);
    };

    // Patch pushState
    const originalPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      const url = args[2] as string;
      if (url) handleStart(url);
      return originalPushState.apply(this, args);
    };

    // Patch replaceState
    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = function (...args) {
      const url = args[2] as string;
      if (url) handleStart(url);
      return originalReplaceState.apply(this, args);
    };

    // Also catch anchor clicks directly to show loader instantly before network request
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest("a");
      if (target && target.href && target.target !== "_blank") {
        const url = new URL(target.href);
        if (url.origin === window.location.origin) {
          handleStart(url.pathname + url.search);
        }
      }
    };
    // Use capture phase to ensure we intercept it first
    document.addEventListener("click", handleClick, true);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  if (!isNavigating) return null;

  return (
    <div className="fixed inset-0 z-[100000] bg-[var(--nira-bg)] flex flex-col items-center justify-center overflow-hidden animate-[fadeIn_0.3s_ease-out_forwards]">
      {/* Subtle Premium Glow using color-mix for exact theme matching */}
      <div className="absolute w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] blur-[120px] rounded-full animate-pulse" />
      
      <div className="relative flex flex-col items-center gap-6 z-10 text-[var(--nira-text)]">
        <div className="animate-[spin_20s_linear_infinite]">
          <NiraLogo size={72} />
        </div>
        
        <div className="text-lg font-semibold tracking-[0.25em] text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)] uppercase animate-fadeIn">
          INITIALIZING NIRA...
        </div>
      </div>

      {/* Grid Pattern Background for premium texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(color-mix(in_srgb,var(--nira-text)_100%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--nira-text)_100%,transparent)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />
    </div>
  );
}

export default function RouteTransitionLoader() {
  return (
    <Suspense fallback={null}>
      <TransitionTracker />
    </Suspense>
  );
}
