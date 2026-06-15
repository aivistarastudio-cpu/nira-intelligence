const fs = require('fs');

let page = fs.readFileSync('app/nira/page.tsx', 'utf-8');

const startStr = 'function WhyNira() {';
const endStr = '/* =========================================================\n   5. HOW NIRA WORKS';

const startIndex = page.indexOf(startStr);
const endIndex = page.indexOf(endStr);

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find WhyNira block");
  process.exit(1);
}

const oldBlock = page.substring(startIndex, endIndex);

const newBlock = `function WhyNira() {
  return (
    <section className="relative py-20 md:py-32 px-6 overflow-hidden">
      
      {/* Ambient Background to match theme */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.1] mix-blend-multiply dark:mix-blend-screen">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-12">
        
        {/* Header Section */}
        <div className="text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--nira-text)] mb-4">
            WHY CHOOSE NIRA?
          </h2>
          <p className="text-base md:text-lg text-[color-mix(in_srgb,var(--nira-text)_70%,transparent)] font-normal max-w-3xl leading-relaxed">
            NIRA is not just an AI tool. It is an intelligent partner designed to understand you, 
            <strong className="text-[var(--nira-text)] font-semibold"> adapt to you</strong> and 
            <strong className="text-[var(--nira-text)] font-semibold"> help you achieve more.</strong>
          </p>
        </div>

        {/* CSS Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 auto-rows-auto">
          
          {/* Row 1 */}
          <div className="col-span-1 rounded-2xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] flex gap-4 items-center hover:border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] transition-colors backdrop-blur-sm">
            <SvgBrain className="w-10 h-10 text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)] flex-shrink-0" />
            <div>
              <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[13px] leading-tight">TRULY<br/>INTELLIGENT</h3>
              <p className="text-[11px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Advanced reasoning with contextual understanding</p>
            </div>
          </div>

          <div className="col-span-1 rounded-2xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] flex gap-4 items-center hover:border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] transition-colors backdrop-blur-sm">
            <SvgFace className="w-10 h-10 text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)] flex-shrink-0" />
            <div>
              <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[13px] leading-tight">HUMAN-LIKE<br/>EXPERIENCE</h3>
              <p className="text-[11px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Natural and emotion-aware interaction</p>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 rounded-2xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] flex gap-4 items-center hover:border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] transition-colors backdrop-blur-sm shadow-[0_0_30px_-10px_rgba(132,204,22,0.2)]">
            <SvgSpeed className="w-10 h-10 text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)] flex-shrink-0" />
            <div>
              <h3 className="font-bold text-emerald-600 dark:text-[#84cc16] tracking-tight text-[14px] leading-tight">FASTER &<br/>SMARTER</h3>
              <p className="text-[11px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Optimized for productivity and deep workflows</p>
            </div>
          </div>

          <div className="col-span-1 rounded-2xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] flex gap-4 items-center hover:border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] transition-colors backdrop-blur-sm">
            <SvgShield className="w-10 h-10 text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)] flex-shrink-0" />
            <div>
              <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[13px] leading-tight">SECURE &<br/>PRIVATE</h3>
              <p className="text-[11px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Enterprise-grade privacy and security</p>
            </div>
          </div>

          {/* Row 2 & 3 */}
          <div className="col-span-1 rounded-2xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] flex gap-4 items-center hover:border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] transition-colors backdrop-blur-sm">
            <SvgAllInOne className="w-10 h-10 text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)] flex-shrink-0" />
            <div>
              <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[13px] leading-tight">ALL-IN-ONE<br/>PLATFORM</h3>
              <p className="text-[11px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Chat, write, research, create and automate</p>
            </div>
          </div>

          <div className="col-span-1 lg:row-span-2 rounded-2xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] flex flex-col items-center justify-center text-center hover:border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] transition-colors lg:min-h-[200px] backdrop-blur-sm">
            <SvgLayers className="w-16 h-16 text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)] mb-6" />
            <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[14px] leading-tight mb-2">MULTI-LLM<br/>POWER</h3>
            <p className="text-[12px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] leading-tight">Smart routing across leading AI systems</p>
          </div>

          <div className="col-span-1 lg:row-span-2 rounded-2xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] flex flex-col items-center justify-center text-center hover:border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] transition-colors lg:min-h-[200px] backdrop-blur-sm">
            <SvgFlow className="w-16 h-16 text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)] mb-6" />
            <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[14px] leading-tight mb-2">DEEP<br/>REASONING</h3>
            <p className="text-[12px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] leading-tight">Step-by-step intelligent problem solving</p>
          </div>

          <div className="col-span-1 lg:row-span-2 rounded-2xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] flex flex-col items-center justify-center text-center hover:border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] transition-colors lg:min-h-[200px] backdrop-blur-sm">
            <SvgGrowth className="w-16 h-16 text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)] mb-6" />
            <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[14px] leading-tight mb-2">BUILT FOR<br/>GROWTH</h3>
            <p className="text-[12px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] leading-tight">Designed for creators, teams and enterprises</p>
          </div>

          <div className="col-span-1 lg:row-span-2 rounded-2xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] flex flex-col items-center justify-center text-center hover:border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] transition-colors lg:min-h-[200px] backdrop-blur-sm">
            <h3 className="font-bold text-[var(--nira-text)] tracking-widest text-[11px] mb-4">MULTI-LLM</h3>
            <SvgInfinity className="w-16 h-16 text-transparent mb-4" style={{ stroke: 'url(#infinityGradient)' }} />
            <svg width="0" height="0">
              <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </svg>
            <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[14px] leading-tight mb-2">ALWAYS<br/>EVOLVING</h3>
            <p className="text-[12px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] leading-tight">Continuously improving intelligence and capabilities</p>
          </div>

          <div className="col-span-1 rounded-2xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] flex gap-4 items-center hover:border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] transition-colors backdrop-blur-sm">
            <SvgMemory className="w-10 h-10 text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)] flex-shrink-0" />
            <div>
              <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[13px] leading-tight">LONG-TERM<br/>MEMORY</h3>
              <p className="text-[11px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Personalized understanding and continuity</p>
            </div>
          </div>
          
        </div>

        {/* Footer Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mt-4 gap-8">
          <div className="max-w-2xl">
            <p className="text-xl md:text-2xl font-normal tracking-tight text-[color-mix(in_srgb,var(--nira-text)_70%,transparent)]">
              NIRA adapts to you, learns with you and grows with you.<br/>
              <span className="text-[var(--nira-text)] font-medium">It's more than AI — it's your intelligence partner.</span>
            </p>
          </div>
          <div className="flex gap-6 text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)]">
            <div className="flex flex-col items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>
              <span className="text-[10px] font-semibold text-center leading-tight">Understand<br/>Better</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span className="text-[10px] font-semibold text-center leading-tight">Work<br/>Faster</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/></svg>
              <span className="text-[10px] font-semibold text-center leading-tight">Think<br/>Smarter</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-1 1H8v4h8v-4h-1c-.53-.02-1-.45-1-1v-2.34"/><path d="M8 2h8v7a4 4 0 0 1-8 0V2Z"/></svg>
              <span className="text-[10px] font-semibold text-center leading-tight">Achieve<br/>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`;

page = page.replace(oldBlock, newBlock);
fs.writeFileSync('app/nira/page.tsx', page);
console.log("Success");
