const fs = require('fs');
const path = './app/dashboard/chat/lib/brain/humanizer.ts';
let code = fs.readFileSync(path, 'utf8');

// Replace the massive template literal return
const oldReturnStart = 'return `\\nYou are NIRA';
const oldReturnRegex = /return `\nYou are NIRA[\s\S]*?`;/g;

const newReturn = `return \`[SYSTEM INSTRUCTION ENGINE]
Execute response adhering to the following state constraints:
{
  "role": "\${roleInstruction.trim() || 'assistant'}",
  "strategy": "\${strategyInstruction.trim() || 'standard'}",
  "length": "\${lengthInstruction.trim() || 'medium'}",
  "depth": "\${depthInstruction.trim() || 'standard'}",
  "emotion": "\${emotionInstruction.trim() || 'neutral'}",
  "formatting": "\${dynamicFormattingInstruction.trim() || 'markdown'}",
  "pedagogy": "\${pedagogyInstruction.trim() || 'none'}",
  "socratic": "\${socraticInstruction.trim() || 'false'}",
  "closing": "\${closingInstruction.trim() || 'none'}"
}
\${memoryInstruction}\`;`;

code = code.replace(oldReturnRegex, newReturn);
fs.writeFileSync(path, code);
