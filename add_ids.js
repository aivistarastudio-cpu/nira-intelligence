const fs = require('fs');

let page = fs.readFileSync('app/nira/page.tsx', 'utf-8');

// Helper to add ID to a function's main section
const addIdToSection = (funcName, id) => {
  const funcRegex = new RegExp(`function ${funcName}\\(\\) \\{[\\s\\S]*?<section([^>]*)>`, 'm');
  const match = page.match(funcRegex);
  if (match) {
    const fullMatch = match[0];
    const attributes = match[1];
    
    // Check if id already exists
    if (!attributes.includes('id=')) {
      const replaced = fullMatch.replace(/<section/, `<section id="${id}"`);
      page = page.replace(fullMatch, replaced);
    }
  }
};

addIdToSection('Technology', 'technology');
addIdToSection('WhyNira', 'why-nira');
addIdToSection('Safety', 'safety');
addIdToSection('Roadmap', 'roadmap');
addIdToSection('Capabilities', 'capabilities');
addIdToSection('CallToAction', 'company');

// Now update Navbar links
const oldNavbarLinks = `const links = ["Technology", "Why NIRA", "Safety", "Roadmap", "Capabilities", "Company"];`;
const newNavbarLinks = `const links = [
    { name: "Technology", id: "technology" },
    { name: "Why NIRA", id: "why-nira" },
    { name: "Safety", id: "safety" },
    { name: "Roadmap", id: "roadmap" },
    { name: "Capabilities", id: "capabilities" },
    { name: "Company", id: "company" }
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };`;

page = page.replace(oldNavbarLinks, newNavbarLinks);

// Replace desktop links
const oldDesktopLinks = `{links.map((link) => (
              <span
                key={link}
                className="hover:text-[var(--nira-text)] transition-colors cursor-pointer"
              >
                {link}
              </span>
            ))}`;
const newDesktopLinks = `{links.map((link) => (
              <span
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="hover:text-[var(--nira-text)] transition-colors cursor-pointer"
              >
                {link.name}
              </span>
            ))}`;
page = page.replace(oldDesktopLinks, newDesktopLinks);

// Replace mobile links
const oldMobileLinks = `{links.map((link) => (
                <span key={link} onClick={() => setMobileMenuOpen(false)} className="cursor-pointer hover:text-[var(--nira-text)]">
                  {link}
                </span>
              ))}`;
const newMobileLinks = `{links.map((link) => (
                <span 
                  key={link.name} 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setTimeout(() => scrollToSection(link.id), 100);
                  }} 
                  className="cursor-pointer hover:text-[var(--nira-text)]"
                >
                  {link.name}
                </span>
              ))}`;
page = page.replace(oldMobileLinks, newMobileLinks);

fs.writeFileSync('app/nira/page.tsx', page);
console.log('Success');
