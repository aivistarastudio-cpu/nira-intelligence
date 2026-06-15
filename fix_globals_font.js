const fs = require('fs');
const path = '/Users/heenatewani/Desktop/nira-intelligence/nira-intelligence/app/globals.css';
let content = fs.readFileSync(path, 'utf8');

// Replace --font-sans with SF Pro Text 
content = content.replace(
  /--font-sans: "Geist", "SF Pro Display", "Inter"/g, 
  '--font-sans: "SF Pro Text", "Geist", -apple-system, BlinkMacSystemFont, "Inter"'
);

// We need to also add SF Pro Text at the body level to ensure it catches everything
content = content.replace(
  /font-family: var\(--font-sans\);/g,
  'font-family: "SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", sans-serif;'
);

fs.writeFileSync(path, content);
console.log("Fixed globals.css font stack");
