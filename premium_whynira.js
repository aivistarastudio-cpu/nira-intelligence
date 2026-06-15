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
          <div className="group col-span-1 rounded-3xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] flex gap-5 items-center hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-[0_8px_30px_-10px_rgba(168,85,247,0.15)] transition-all duration-300 backdrop-blur-md cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 flex-shrink-0 z-10">
              <IconDataCore size={22} />
            </div>
            <div className="z-10">
              <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[13px] leading-tight group-hover:text-purple-500 transition-colors">TRULY<br/>INTELLIGENT</h3>
              <p className="text-[11px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Advanced reasoning with context</p>
            </div>
          </div>

          <div className="group col-span-1 rounded-3xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] flex gap-5 items-center hover:-translate-y-1 hover:border-pink-500/30 hover:shadow-[0_8px_30px_-10px_rgba(236,72,153,0.15)] transition-all duration-300 backdrop-blur-md cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-pink-500/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/30 flex-shrink-0 z-10">
              <IconSearchFocus size={22} />
            </div>
            <div className="z-10">
              <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[13px] leading-tight group-hover:text-pink-500 transition-colors">HUMAN-LIKE<br/>EXPERIENCE</h3>
              <p className="text-[11px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Natural & emotion-aware</p>
            </div>
          </div>

          <div className="group col-span-1 md:col-span-2 rounded-3xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] flex gap-5 items-center hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_8px_30px_-10px_rgba(16,185,129,0.2)] transition-all duration-300 backdrop-blur-md cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 flex-shrink-0 z-10">
              <IconSparkle size={22} />
            </div>
            <div className="z-10">
              <h3 className="font-bold text-emerald-600 dark:text-emerald-400 tracking-tight text-[15px] leading-tight">FASTER &<br/>SMARTER</h3>
              <p className="text-[12px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Optimized for productivity and deep workflows</p>
            </div>
          </div>

          <div className="group col-span-1 rounded-3xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] flex gap-5 items-center hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_8px_30px_-10px_rgba(59,130,246,0.15)] transition-all duration-300 backdrop-blur-md cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 flex-shrink-0 z-10">
              <IconShield size={22} />
            </div>
            <div className="z-10">
              <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[13px] leading-tight group-hover:text-blue-500 transition-colors">SECURE &<br/>PRIVATE</h3>
              <p className="text-[11px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Enterprise-grade security</p>
            </div>
          </div>

          {/* Row 2 & 3 */}
          <div className="group col-span-1 rounded-3xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] flex gap-5 items-center hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-[0_8px_30px_-10px_rgba(249,115,22,0.15)] transition-all duration-300 backdrop-blur-md cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30 flex-shrink-0 z-10">
              <IconLayers size={22} />
            </div>
            <div className="z-10">
              <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[13px] leading-tight group-hover:text-orange-500 transition-colors">ALL-IN-ONE<br/>PLATFORM</h3>
              <p className="text-[11px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Chat, write & automate</p>
            </div>
          </div>

          <div className="group col-span-1 lg:row-span-2 rounded-3xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:border-fuchsia-500/30 hover:shadow-[0_15px_40px_-15px_rgba(217,70,239,0.2)] transition-all duration-300 lg:min-h-[220px] backdrop-blur-md cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-500/5 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-fuchsia-500/30 mb-5 z-10 transform group-hover:scale-110 transition-transform duration-500">
              <IconCycle size={30} />
            </div>
            <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[15px] leading-tight mb-2 z-10 group-hover:text-fuchsia-500 transition-colors">MULTI-LLM<br/>POWER</h3>
            <p className="text-[12px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] leading-tight z-10">Smart routing across leading AI systems</p>
          </div>

          <div className="group col-span-1 lg:row-span-2 rounded-3xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:border-teal-500/30 hover:shadow-[0_15px_40px_-15px_rgba(20,184,166,0.2)] transition-all duration-300 lg:min-h-[220px] backdrop-blur-md cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-teal-500/5 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center text-white shadow-xl shadow-teal-500/30 mb-5 z-10 transform group-hover:scale-110 transition-transform duration-500">
              <IconNodes size={30} />
            </div>
            <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[15px] leading-tight mb-2 z-10 group-hover:text-teal-500 transition-colors">DEEP<br/>REASONING</h3>
            <p className="text-[12px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] leading-tight z-10">Step-by-step intelligent problem solving</p>
          </div>

          <div className="group col-span-1 lg:row-span-2 rounded-3xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:border-rose-500/30 hover:shadow-[0_15px_40px_-15px_rgba(225,29,72,0.2)] transition-all duration-300 lg:min-h-[220px] backdrop-blur-md cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-rose-500/5 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-rose-400 to-red-600 flex items-center justify-center text-white shadow-xl shadow-rose-500/30 mb-5 z-10 transform group-hover:scale-110 transition-transform duration-500">
              <IconServerMatrix size={30} />
            </div>
            <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[15px] leading-tight mb-2 z-10 group-hover:text-rose-500 transition-colors">BUILT FOR<br/>GROWTH</h3>
            <p className="text-[12px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] leading-tight z-10">Designed for creators, teams and enterprises</p>
          </div>

          <div className="group col-span-1 lg:row-span-2 rounded-3xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-[0_15px_40px_-15px_rgba(99,102,241,0.2)] transition-all duration-300 lg:min-h-[220px] backdrop-blur-md cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
            <h3 className="font-bold text-[color-mix(in_srgb,var(--nira-text)_40%,transparent)] tracking-widest text-[11px] mb-4 z-10 uppercase">Multi-LLM</h3>
            
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/30 mb-4 z-10 transform group-hover:scale-110 transition-transform duration-500 group-hover:rotate-12">
              {/* Using a star icon here as an "evolving" premium icon since lucide Infinity isn't directly imported in page.tsx right now, or I'll use IconCycle again */}
              <IconSparkle size={30} />
            </div>
            
            <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[15px] leading-tight mb-2 z-10 group-hover:text-indigo-500 transition-colors">ALWAYS<br/>EVOLVING</h3>
            <p className="text-[12px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] leading-tight z-10">Continuously improving intelligence</p>
          </div>

          <div className="group col-span-1 rounded-3xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] flex gap-5 items-center hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-[0_8px_30px_-10px_rgba(245,158,11,0.15)] transition-all duration-300 backdrop-blur-md cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/30 flex-shrink-0 z-10">
              <IconServerMatrix size={22} />
            </div>
            <div className="z-10">
              <h3 className="font-bold text-[var(--nira-text)] tracking-tight text-[13px] leading-tight group-hover:text-amber-500 transition-colors">LONG-TERM<br/>MEMORY</h3>
              <p className="text-[11px] text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Personalized continuity</p>
            </div>
          </div>
          
        </div>

        {/* Footer Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mt-4 pt-8 border-t border-[color-mix(in_srgb,var(--nira-border)_50%,transparent)] gap-8">
          <div className="max-w-2xl">
            <p className="text-xl md:text-2xl font-normal tracking-tight text-[color-mix(in_srgb,var(--nira-text)_70%,transparent)]">
              NIRA adapts to you, learns with you and grows with you.<br/>
              <span className="text-[var(--nira-text)] font-semibold">It's more than AI — it's your intelligence partner.</span>
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
                <IconCycle size={18} />
              </div>
              <span className="text-[10px] font-bold text-center leading-tight uppercase tracking-wider group-hover:text-rose-500 transition-colors">Work<br/>Faster</span>
            </div>
            <div className="flex flex-col items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] flex items-center justify-center group-hover:bg-amber-500/10 group-hover:text-amber-500 transition-colors">
                <IconDataCore size={18} />
              </div>
              <span className="text-[10px] font-bold text-center leading-tight uppercase tracking-wider group-hover:text-amber-500 transition-colors">Think<br/>Smarter</span>
            </div>
            <div className="flex flex-col items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors">
                <IconSparkle size={18} />
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
`;

// To remove the custom SVGs I added previously:
const svgRegex = /\/\* Custom SVGs for Why Nira \*\/(.*?)(?=function WhyNira)/s;
if (svgRegex.test(page)) {
  page = page.replace(svgRegex, '');
}

page = page.replace(oldBlock, newBlock);
fs.writeFileSync('app/nira/page.tsx', page);
console.log("Success");
