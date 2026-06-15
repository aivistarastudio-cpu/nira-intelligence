const fs = require('fs');

let page = fs.readFileSync('app/nira/page.tsx', 'utf-8');

// Replace top menu links
page = page.replace(
  'const links = ["Technology", "Why NIRA", "Safety", "Roadmap", "Pricing", "Company"];',
  'const links = ["Technology", "Why NIRA", "Safety", "Roadmap", "Capabilities", "Company"];'
);

// Replace Footer link
page = page.replace(
  '<span className="hover:text-rose-500 transition-colors cursor-pointer">Pricing</span>',
  '<span className="hover:text-rose-500 transition-colors cursor-pointer">Capabilities</span>'
);

// Replace Component rendering
page = page.replace('<Pricing />', '<Ecosystem />');

// Replace Component definition
const startBlock = '/* =========================================================\n   10. PRICING\n========================================================= */\n\nfunction Pricing() {';
const endBlock = '  );\n}\n';

const startIndex = page.indexOf(startBlock);
const endIndex = page.indexOf(endBlock, startIndex) + endBlock.length;

if(startIndex !== -1 && endIndex !== -1) {
  const oldBlock = page.substring(startIndex, endIndex);

  const newBlock = `/* =========================================================
   10. AGI ECOSYSTEM (Replaces Pricing)
========================================================= */

function Ecosystem() {
  const capabilities = [
    {
      title: "Autonomous Agent Swarm",
      desc: "Deploy independent sub-agents that work in the background. While you focus on strategy, they execute complex coding, research, and analysis tasks autonomously.",
      icon: <IconNodes size={24} />,
      gradient: "from-orange-500 to-rose-500"
    },
    {
      title: "Local Workspace Execution",
      desc: "NIRA reads, writes, and executes code directly in your local environment. It runs terminal commands, checks logs, and fixes issues just like a senior engineer.",
      icon: <IconDataCore size={24} />,
      gradient: "from-fuchsia-500 to-purple-500"
    },
    {
      title: "Self-Healing Workflows",
      desc: "When errors occur, NIRA doesn't just crash. It analyzes the stack trace, searches the web for solutions, and autonomously patches the bugs in real-time.",
      icon: <IconShield size={24} />,
      gradient: "from-rose-500 to-pink-500"
    },
    {
      title: "Multimodal Perception",
      desc: "Upload screenshots, architectures, or wireframes. NIRA has native vision capabilities to instantly turn your images and designs into functioning code.",
      icon: <IconSearchFocus size={24} />,
      gradient: "from-orange-400 to-orange-600"
    }
  ];

  return (
    <section className="relative py-20 md:py-32 px-6 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.1] mix-blend-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-orange-500 via-rose-500 to-fuchsia-500 rounded-full blur-[150px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-500 mb-6 drop-shadow-sm">
              AGI Capabilities
            </h2>
            <p className="text-lg md:text-xl text-[color-mix(in_srgb,var(--nira-text)_70%,transparent)] font-medium max-w-2xl mx-auto leading-relaxed">
              We aren't just building another chatbot. NIRA is a fully autonomous reasoning engine designed to architect, execute, and heal entire systems.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {capabilities.map((cap, i) => (
            <FadeIn key={i} delay={i * 0.1} className="h-full">
              <div className="relative h-full rounded-[2rem] p-[1px] group overflow-hidden bg-gradient-to-br from-[color-mix(in_srgb,var(--nira-text)_10%,transparent)] to-transparent hover:from-orange-500 hover:to-fuchsia-500 transition-all duration-700 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-fuchsia-500/0 group-hover:from-orange-500/20 group-hover:to-fuchsia-500/20 transition-all duration-700 blur-xl" />
                
                <div className="relative h-full bg-[var(--nira-bg)] rounded-[calc(2rem-1px)] p-8 md:p-10 flex flex-col justify-start">
                  <div className={\`w-14 h-14 rounded-2xl bg-gradient-to-br \${cap.gradient} flex items-center justify-center text-white mb-6 shadow-[0_10px_20px_-10px_rgba(249,115,22,0.6)] group-hover:scale-110 transition-transform duration-500\`}>
                    {cap.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold tracking-tight text-[var(--nira-text)] mb-4">
                    {cap.title}
                  </h3>
                  
                  <p className="text-[color-mix(in_srgb,var(--nira-text)_70%,transparent)] font-medium leading-relaxed">
                    {cap.desc}
                  </p>
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
} else {
  console.log("Could not find block");
}
