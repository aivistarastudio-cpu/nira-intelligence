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
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.1] mix-blend-screen">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-12">
        
        {/* Header Section */}
        <div className="text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-[var(--nira-text)] mb-4">
            WHY CHOOSE NIRA?
          </h2>
          <p className="text-lg md:text-xl text-[color-mix(in_srgb,var(--nira-text)_70%,transparent)] font-medium max-w-3xl leading-relaxed">
            NIRA is not just an AI tool. It is an intelligent partner designed to understand you, 
            <strong className="text-[var(--nira-text)] font-semibold"> adapt to you</strong> and 
            <strong className="text-[var(--nira-text)] font-semibold"> help you achieve more.</strong>
          </p>
        </div>

        {/* CSS Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 auto-rows-auto">
          
          {/* Col 1, Row 1 */}
          <div className="col-span-1 rounded-2xl p-5 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] backdrop-blur-md flex gap-4 items-center hover:border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] transition-colors">
            <IconDataCore size={36} className="text-fuchsia-500 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-[var(--nira-text)] tracking-tight leading-tight">TRULY<br/>INTELLIGENT</h3>
              <p className="text-xs text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Advanced reasoning with contextual understanding</p>
            </div>
          </div>

          {/* Col 2, Row 1 */}
          <div className="col-span-1 rounded-2xl p-5 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] backdrop-blur-md flex gap-4 items-center hover:border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] transition-colors">
            <IconSearchFocus size={36} className="text-blue-500 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-[var(--nira-text)] tracking-tight leading-tight">HUMAN-LIKE<br/>EXPERIENCE</h3>
              <p className="text-xs text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Natural and emotion-aware interaction</p>
            </div>
          </div>

          {/* Col 3 & 4 (Span 2), Row 1 */}
          <div className="col-span-1 md:col-span-2 rounded-2xl p-5 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] backdrop-blur-md flex gap-4 items-center hover:border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] transition-colors">
            <IconSparkle size={36} className="text-green-500 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-green-500 tracking-tight leading-tight">FASTER &<br/>SMARTER</h3>
              <p className="text-xs text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Optimized for productivity and deep workflows</p>
            </div>
          </div>

          {/* Col 5, Row 1 */}
          <div className="col-span-1 rounded-2xl p-5 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] backdrop-blur-md flex gap-4 items-center hover:border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] transition-colors">
            <IconShield size={36} className="text-cyan-500 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-[var(--nira-text)] tracking-tight leading-tight">SECURE &<br/>PRIVATE</h3>
              <p className="text-xs text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Enterprise-grade privacy and security</p>
            </div>
          </div>

          {/* --- ROW 2 & 3 --- */}

          {/* Col 1, Row 2 */}
          <div className="col-span-1 rounded-2xl p-5 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] backdrop-blur-md flex gap-4 items-center hover:border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] transition-colors">
            <IconLayers size={36} className="text-orange-500 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-[var(--nira-text)] tracking-tight leading-tight">ALL-IN-ONE<br/>PLATFORM</h3>
              <p className="text-xs text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Chat, write, research, create and automate</p>
            </div>
          </div>

          {/* Col 2, Row 2 & 3 */}
          <div className="col-span-1 lg:row-span-2 rounded-2xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] backdrop-blur-md flex flex-col items-center justify-center text-center hover:border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] transition-colors lg:min-h-[220px]">
            <IconLayers size={48} className="text-purple-500 mb-4" />
            <h3 className="font-bold text-[var(--nira-text)] tracking-tight leading-tight mb-2">MULTI-LLM<br/>POWER</h3>
            <p className="text-xs text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] leading-tight">Smart routing across leading AI systems</p>
          </div>

          {/* Col 3, Row 2 & 3 */}
          <div className="col-span-1 lg:row-span-2 rounded-2xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] backdrop-blur-md flex flex-col items-center justify-center text-center hover:border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] transition-colors lg:min-h-[220px]">
            <IconNodes size={48} className="text-teal-500 mb-4" />
            <h3 className="font-bold text-[var(--nira-text)] tracking-tight leading-tight mb-2">DEEP<br/>REASONING</h3>
            <p className="text-xs text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] leading-tight">Step-by-step intelligent problem solving</p>
          </div>

          {/* Col 4, Row 2 & 3 */}
          <div className="col-span-1 lg:row-span-2 rounded-2xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] backdrop-blur-md flex flex-col items-center justify-center text-center hover:border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] transition-colors lg:min-h-[220px]">
            <IconServerMatrix size={48} className="text-rose-500 mb-4" />
            <h3 className="font-bold text-[var(--nira-text)] tracking-tight leading-tight mb-2">BUILT FOR<br/>GROWTH</h3>
            <p className="text-xs text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] leading-tight">Designed for creators, teams and enterprises</p>
          </div>

          {/* Col 5, Row 2 & 3 */}
          <div className="col-span-1 lg:row-span-2 rounded-2xl p-6 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] backdrop-blur-md flex flex-col items-center justify-center text-center hover:border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] transition-colors lg:min-h-[220px]">
            <h3 className="font-bold text-[var(--nira-text)] tracking-widest text-sm mb-4">MULTI-LLM</h3>
            <IconCycle size={56} className="text-emerald-500 mb-4" />
            <h3 className="font-bold text-[var(--nira-text)] tracking-tight leading-tight mb-2">ALWAYS<br/>EVOLVING</h3>
            <p className="text-xs text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] leading-tight">Continuously improving intelligence and capabilities</p>
          </div>

          {/* Col 1, Row 3 */}
          <div className="col-span-1 rounded-2xl p-5 border border-[var(--nira-border)] bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] backdrop-blur-md flex gap-4 items-center hover:border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] transition-colors">
            <IconDataCore size={36} className="text-amber-500 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-[var(--nira-text)] tracking-tight leading-tight">LONG-TERM<br/>MEMORY</h3>
              <p className="text-xs text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)] mt-1 leading-tight">Personalized understanding and continuity</p>
            </div>
          </div>
          
        </div>

        {/* Footer Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mt-4 pt-8 border-t border-[color-mix(in_srgb,var(--nira-border)_50%,transparent)] gap-8">
          <div className="max-w-2xl">
            <p className="text-2xl md:text-3xl font-medium tracking-tight text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)]">
              NIRA adapts to you, learns with you and grows with you.<br/>
              <span className="text-[var(--nira-text)]">It's more than AI — it's your intelligence partner.</span>
            </p>
          </div>
          <div className="flex gap-6 text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)]">
            <div className="flex flex-col items-center gap-2">
              <IconSearchFocus size={24} className="text-blue-400" />
              <span className="text-xs font-semibold">Understand<br/>Better</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <IconCycle size={24} className="text-rose-400" />
              <span className="text-xs font-semibold">Work<br/>Faster</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <IconSparkle size={24} className="text-orange-400" />
              <span className="text-xs font-semibold">Think<br/>Smarter</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <IconNodes size={24} className="text-green-400" />
              <span className="text-xs font-semibold">Achieve<br/>More</span>
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
