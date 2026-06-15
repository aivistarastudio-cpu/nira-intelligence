const fs = require('fs');
const path = '/Users/heenatewani/Desktop/nira-intelligence/nira-intelligence/app/globals.css';
let content = fs.readFileSync(path, 'utf8');

const replacement = `/* =====================================================
💎 NIRA V16 TYPOGRAPHY SYSTEM
===================================================== */

@layer utilities {
  .text-display {
    font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, var(--font-inter), ui-sans-serif, system-ui, sans-serif;
    font-size: 48px;
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 1.1;
  }
  .text-h1 {
    font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, var(--font-inter), ui-sans-serif, system-ui, sans-serif;
    font-size: 30px;
    font-weight: 600;
    letter-spacing: -0.022em;
    line-height: 1.2;
  }
  .text-h2 {
    font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, var(--font-inter), ui-sans-serif, system-ui, sans-serif;
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -0.015em;
    line-height: 1.3;
  }
  .text-h3 {
    font-family: "SF Pro Text", "SF Pro Display", -apple-system, BlinkMacSystemFont, var(--font-inter), ui-sans-serif, system-ui, sans-serif;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.4;
  }
  .text-body-lg {
    font-family: "SF Pro Text", -apple-system, BlinkMacSystemFont, var(--font-inter), ui-sans-serif, system-ui, sans-serif;
    font-size: 18px;
    line-height: 1.6;
    font-weight: 400;
    letter-spacing: -0.014em;
  }
  .text-body {
    font-family: "SF Pro Text", -apple-system, BlinkMacSystemFont, var(--font-inter), ui-sans-serif, system-ui, sans-serif;
    font-size: 17px;
    line-height: 1.6;
    font-weight: 400;
    letter-spacing: -0.018em;
  }
  .text-label {
    font-family: "SF Pro Text", -apple-system, BlinkMacSystemFont, var(--font-inter), ui-sans-serif, system-ui, sans-serif;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: 0.08em;
  }
  .text-caption {
    font-family: "SF Pro Text", -apple-system, BlinkMacSystemFont, var(--font-inter), ui-sans-serif, system-ui, sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.5;
  }
  .text-code {
    font-family: "JetBrains Mono", var(--font-mono), monospace;
    font-size: 14px;
    line-height: 1.65;
    font-weight: 400;
  }
  .prose-nira p {
    margin-bottom: 1.5em;
  }
  .prose-nira ul, .prose-nira ol {
    margin-bottom: 1.5em;
  }
  .prose-nira li {
    margin-bottom: 0.5em;
    line-height: 1.6;
  }
}
  .font-display {
    font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  }
`;

const startIndex = content.indexOf('/* =====================================================\n💎 NIRA V16 TYPOGRAPHY SYSTEM');
if (startIndex !== -1) {
    content = content.substring(0, startIndex) + replacement;
    fs.writeFileSync(path, content);
    console.log("Updated globals.css");
} else {
    console.log("Could not find start index");
}
