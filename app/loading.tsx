"use client";

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

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[10000] bg-[var(--nira-bg)] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Subtle Premium Glow using color-mix for exact theme matching */}
      <div className="absolute w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] blur-[120px] rounded-full animate-pulse" />
      
      <div className="relative flex flex-col items-center gap-6 z-10 text-[var(--nira-text)] animate-fadeIn">
        <div className="animate-[spin_20s_linear_infinite]">
          <NiraLogo size={72} />
        </div>
        
        <div className="text-lg font-semibold tracking-[0.25em] text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)] uppercase animate-fadeIn delay-200">
          INITIALIZING NIRA...
        </div>
      </div>

      {/* Grid Pattern Background for premium texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(color-mix(in_srgb,var(--nira-text)_100%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--nira-text)_100%,transparent)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />
    </div>
  );
}
