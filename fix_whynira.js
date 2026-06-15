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

const newBlock = `
/* Custom SVGs for Why Nira */
const SvgBrain = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>;
const SvgFace = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8.52 7.11a5.98 5.98 0 0 1 8.98 2.5 6 6 0 0 1 1.1 5.5l-.7 2.4c-.2.7-.1 1.5.3 2.1l.3.4c.5.6.8 1.4.8 2.2V22H3"/><path d="M8.5 7.1a6 6 0 0 0-6.2 3.9"/><path d="M16 14v.01"/><path d="M16 10v.01"/><path d="M17 18a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/></svg>;
const SvgSpeed = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>;
const SvgShield = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>;
const SvgAllInOne = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>;
const SvgLayers = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const SvgFlow = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>;
const SvgGrowth = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>;
const SvgInfinity = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z"/></svg>;
const SvgMemory = ({className}) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;

function WhyNira() {
  return (
    <section className="relative py-20 md:py-32 px-6 overflow-hidden bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-12">
        
        {/* Header Section */}
        <div className="text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            WHY CHOOSE NIRA?
          </h2>
          <p className="text-base md:text-lg text-gray-400 font-normal max-w-3xl leading-relaxed">
            NIRA is not just an AI tool. It is an intelligent partner designed to understand you, 
            <strong className="text-gray-200 font-semibold"> adapt to you</strong> and 
            <strong className="text-gray-200 font-semibold"> help you achieve more.</strong>
          </p>
        </div>

        {/* CSS Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 auto-rows-auto">
          
          {/* Row 1 */}
          <div className="col-span-1 rounded-2xl p-6 border border-gray-800 bg-[#121212] flex gap-4 items-center hover:border-gray-600 transition-colors">
            <SvgBrain className="w-10 h-10 text-gray-300 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-white tracking-tight text-[13px] leading-tight">TRULY<br/>INTELLIGENT</h3>
              <p className="text-[11px] text-gray-500 mt-1 leading-tight">Advanced reasoning with contextual understanding</p>
            </div>
          </div>

          <div className="col-span-1 rounded-2xl p-6 border border-gray-800 bg-[#121212] flex gap-4 items-center hover:border-gray-600 transition-colors">
            <SvgFace className="w-10 h-10 text-gray-300 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-white tracking-tight text-[13px] leading-tight">HUMAN-LIKE<br/>EXPERIENCE</h3>
              <p className="text-[11px] text-gray-500 mt-1 leading-tight">Natural and emotion-aware interaction</p>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 rounded-2xl p-6 border border-gray-800 bg-[#121212] flex gap-4 items-center hover:border-gray-600 transition-colors">
            <SvgSpeed className="w-10 h-10 text-gray-300 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-[#84cc16] tracking-tight text-[14px] leading-tight">FASTER &<br/>SMARTER</h3>
              <p className="text-[11px] text-gray-500 mt-1 leading-tight">Optimized for productivity and deep workflows</p>
            </div>
          </div>

          <div className="col-span-1 rounded-2xl p-6 border border-gray-800 bg-[#121212] flex gap-4 items-center hover:border-gray-600 transition-colors">
            <SvgShield className="w-10 h-10 text-gray-300 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-white tracking-tight text-[13px] leading-tight">SECURE &<br/>PRIVATE</h3>
              <p className="text-[11px] text-gray-500 mt-1 leading-tight">Enterprise-grade privacy and security</p>
            </div>
          </div>

          {/* Row 2 & 3 */}
          <div className="col-span-1 rounded-2xl p-6 border border-gray-800 bg-[#121212] flex gap-4 items-center hover:border-gray-600 transition-colors">
            <SvgAllInOne className="w-10 h-10 text-gray-300 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-white tracking-tight text-[13px] leading-tight">ALL-IN-ONE<br/>PLATFORM</h3>
              <p className="text-[11px] text-gray-500 mt-1 leading-tight">Chat, write, research, create and automate</p>
            </div>
          </div>

          <div className="col-span-1 lg:row-span-2 rounded-2xl p-6 border border-gray-800 bg-[#121212] flex flex-col items-center justify-center text-center hover:border-gray-600 transition-colors lg:min-h-[200px]">
            <SvgLayers className="w-16 h-16 text-gray-300 mb-6" />
            <h3 className="font-bold text-white tracking-tight text-[14px] leading-tight mb-2">MULTI-LLM<br/>POWER</h3>
            <p className="text-[12px] text-gray-500 leading-tight">Smart routing across leading AI systems</p>
          </div>

          <div className="col-span-1 lg:row-span-2 rounded-2xl p-6 border border-gray-800 bg-[#121212] flex flex-col items-center justify-center text-center hover:border-gray-600 transition-colors lg:min-h-[200px]">
            <SvgFlow className="w-16 h-16 text-gray-300 mb-6" />
            <h3 className="font-bold text-white tracking-tight text-[14px] leading-tight mb-2">DEEP<br/>REASONING</h3>
            <p className="text-[12px] text-gray-500 leading-tight">Step-by-step intelligent problem solving</p>
          </div>

          <div className="col-span-1 lg:row-span-2 rounded-2xl p-6 border border-gray-800 bg-[#121212] flex flex-col items-center justify-center text-center hover:border-gray-600 transition-colors lg:min-h-[200px]">
            <SvgGrowth className="w-16 h-16 text-gray-300 mb-6" />
            <h3 className="font-bold text-white tracking-tight text-[14px] leading-tight mb-2">BUILT FOR<br/>GROWTH</h3>
            <p className="text-[12px] text-gray-500 leading-tight">Designed for creators, teams and enterprises</p>
          </div>

          <div className="col-span-1 lg:row-span-2 rounded-2xl p-6 border border-gray-800 bg-[#121212] flex flex-col items-center justify-center text-center hover:border-gray-600 transition-colors lg:min-h-[200px]">
            <h3 className="font-bold text-white tracking-widest text-[11px] mb-4">MULTI-LLM</h3>
            <SvgInfinity className="w-16 h-16 text-transparent mb-4" style={{ stroke: 'url(#infinityGradient)' }} />
            <svg width="0" height="0">
              <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </svg>
            <h3 className="font-bold text-white tracking-tight text-[14px] leading-tight mb-2">ALWAYS<br/>EVOLVING</h3>
            <p className="text-[12px] text-gray-500 leading-tight">Continuously improving intelligence and capabilities</p>
          </div>

          <div className="col-span-1 rounded-2xl p-6 border border-gray-800 bg-[#121212] flex gap-4 items-center hover:border-gray-600 transition-colors">
            <SvgMemory className="w-10 h-10 text-gray-300 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-white tracking-tight text-[13px] leading-tight">LONG-TERM<br/>MEMORY</h3>
              <p className="text-[11px] text-gray-500 mt-1 leading-tight">Personalized understanding and continuity</p>
            </div>
          </div>
          
        </div>

        {/* Footer Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mt-4 gap-8">
          <div className="max-w-2xl">
            <p className="text-xl md:text-2xl font-normal tracking-tight text-gray-400">
              NIRA adapts to you, learns with you and grows with you.<br/>
              <span className="text-gray-200">It's more than AI — it's your intelligence partner.</span>
            </p>
          </div>
          <div className="flex gap-6 text-gray-300">
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
