const fs = require('fs');

let page = fs.readFileSync('app/nira/page.tsx', 'utf-8');

const startStr = 'function Roadmap() {';
const endStr = '/* =========================================================\n   9. SAFETY & PRIVACY'; // wait, what's next? "7. SAFETY" or "9. SAFETY & PRIVACY"

// Let's use a more robust regex or exact text replacement.
// The next section is: "/* =========================================================\n   9. SAFETY & PRIVACY"

const startIndex = page.indexOf(startStr);
const nextSectionMatch = page.substring(startIndex).match(/\/\* =========================================================\n   \d+\. SAFETY & PRIVACY/);
if (!nextSectionMatch) {
  console.log("Could not find next section");
  process.exit(1);
}
const endIndex = startIndex + nextSectionMatch.index;

const oldBlock = page.substring(startIndex, endIndex);

const newBlock = `function Roadmap() {
  const roadmap = [
    {
      num: "01",
      phase: "Phase 1: Intelligence Core",
      title: "Powerful Conversational Intelligence",
      description: "Building the world's most capable and reasoning-focused chat system. Our immediate priority is creating a conversational interface that understands deep context and executes complex tasks flawlessly.",
      status: "In Progress",
      active: true,
      icon: <IconBrain size={24} />,
      color: "from-fuchsia-500 to-purple-600",
      glow: "shadow-fuchsia-500/30",
      border: "hover:border-fuchsia-500/50"
    },
    {
      num: "02",
      phase: "Phase 2: Multimodal Genesis",
      title: "Image & Video Integration",
      description: "Expanding NIRA's perception and creation abilities. We will introduce native, high-fidelity image generation and cinematic video synthesis directly within the core workflow.",
      status: "Upcoming",
      active: false,
      icon: <IconSparkle size={24} />,
      color: "from-blue-400 to-cyan-500",
      glow: "shadow-cyan-500/30",
      border: "hover:border-cyan-500/50"
    },
    {
      num: "03",
      phase: "Phase 3: Autonomous Workspace",
      title: "Advanced Autonomous Automation",
      description: "Transforming NIRA from an assistant into an independent worker. By integrating advanced automation systems, NIRA will be able to spawn sub-agents and execute full-scale engineering tasks autonomously.",
      status: "In Development",
      active: false,
      icon: <IconServerMatrix size={24} />,
      color: "from-emerald-400 to-teal-500",
      glow: "shadow-teal-500/30",
      border: "hover:border-teal-500/50"
    },
    {
      num: "04",
      phase: "Phase 4: The Ultimate Milestone",
      title: "Achieving AGI by 2031",
      description: "The culmination of our efforts. Evolving NIRA's architecture step-by-step until we achieve Artificial General Intelligence—a system that matches or surpasses human cognitive abilities across every domain.",
      status: "Future Vision (2031)",
      active: false,
      icon: <IconNodes size={24} />,
      color: "from-orange-500 to-rose-600",
      glow: "shadow-orange-500/30",
      border: "hover:border-orange-500/50"
    }
  ];

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      
      {/* Deep Neural AGI Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.2] dark:opacity-[0.15] mix-blend-screen">
        <div className="absolute top-[10%] right-[10%] w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[200px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-rose-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-20 relative">
            {/* Glowing orb behind title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-fuchsia-500/20 blur-[50px] rounded-full pointer-events-none" />
            
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--nira-text)] mb-6 relative z-10">
              The Path to AGI
            </h2>
            <p className="text-lg md:text-xl text-[color-mix(in_srgb,var(--nira-text)_70%,transparent)] font-medium max-w-2xl mx-auto relative z-10">
              Our systematic approach to building the world's most advanced artificial intelligence ecosystem.
            </p>
          </div>
        </FadeIn>

        <div className="relative ml-4 md:ml-8 space-y-12 pb-8">
          
          {/* Main Neural Backbone (Glowing Line) */}
          <div className="absolute top-0 bottom-0 left-[3px] w-[2px] bg-gradient-to-b from-fuchsia-500 via-blue-500 to-orange-500 opacity-20" />

          {roadmap.map((step, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="relative pl-10 md:pl-20 group">
                
                {/* AGI Glowing Node / Dot */}
                <div className="absolute -left-[9px] md:-left-[9px] top-10 flex items-center justify-center">
                  <div className={\`w-6 h-6 rounded-full flex items-center justify-center bg-[var(--nira-bg)] z-10 border-2 \${step.active ? 'border-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.5)]' : 'border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)]'} transition-colors duration-300 group-hover:border-fuchsia-400\`}>
                    {step.active && <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />}
                  </div>
                  {/* Outer pulse ring for active */}
                  {step.active && <div className="absolute w-12 h-12 rounded-full border border-fuchsia-500/30 animate-ping" />}
                </div>

                {/* Active Progress Line */}
                {step.active && (
                  <div className="absolute left-[3px] top-16 w-[2px] h-[120%] bg-gradient-to-b from-fuchsia-500 to-transparent shadow-[0_0_10px_rgba(217,70,239,0.8)] z-0" />
                )}

                {/* Premium Glassmorphic Card */}
                <div className={\`relative p-8 md:p-10 rounded-[2rem] border transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-md \${step.border} group-hover:-translate-y-1 \${step.active ? "bg-[color-mix(in_srgb,var(--nira-text)_3%,transparent)] border-[color-mix(in_srgb,var(--nira-text)_15%,transparent)] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]" : "bg-[color-mix(in_srgb,var(--nira-text)_1%,transparent)] border-[var(--nira-border)]"}\`}>
                  
                  {/* Subtle Inner Glow on Hover */}
                  <div className={\`absolute inset-0 bg-gradient-to-br \${step.color} opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none\`} />
                  
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                      
                      {/* Step Badge with Icon */}
                      <div className="flex items-center gap-3">
                        <div className={\`w-10 h-10 rounded-xl bg-gradient-to-br \${step.color} text-white flex items-center justify-center shadow-lg \${step.glow}\`}>
                          {step.icon}
                        </div>
                        <span className={\`text-sm font-bold uppercase tracking-widest \${step.active ? "text-[var(--nira-text)]" : "text-[color-mix(in_srgb,var(--nira-text)_60%,transparent)]"}\`}>
                          {step.phase}
                        </span>
                      </div>

                      {/* Status Pill */}
                      <span className={\`w-fit px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-colors \${step.active ? "bg-[var(--nira-text)] text-[var(--nira-bg)] border-transparent shadow-lg" : "bg-transparent text-[color-mix(in_srgb,var(--nira-text)_40%,transparent)] border-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] group-hover:border-[color-mix(in_srgb,var(--nira-text)_40%,transparent)]"}\`}>
                        {step.status}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--nira-text)] mb-4 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-base md:text-lg text-[color-mix(in_srgb,var(--nira-text)_70%,transparent)] leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>

                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

page = page.replace(oldBlock, newBlock);
fs.writeFileSync('app/nira/page.tsx', page);
console.log("Success");
