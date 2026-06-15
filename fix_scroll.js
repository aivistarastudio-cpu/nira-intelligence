const fs = require('fs');
let page = fs.readFileSync('app/nira/page.tsx', 'utf-8');

// Replace scrollToSection logic
const newScroll = `const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };`;
  
page = page.replace(/const scrollToSection = \(id: string\) => \{[\s\S]*?\};\n/m, newScroll + '\n');

// Add scroll-mt-24 to sections with IDs so header doesn't cover them
page = page.replace(/<section id="([^"]+)" className="/g, '<section id="$1" className="scroll-mt-24 ');
page = page.replace(/<footer id="([^"]+)" className="/g, '<footer id="$1" className="scroll-mt-24 ');

fs.writeFileSync('app/nira/page.tsx', page);
console.log('Fixed');
