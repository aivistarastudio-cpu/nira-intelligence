const fs = require('fs');

let file = fs.readFileSync('app/components/PremiumIcons.tsx', 'utf-8');

// Replace IconBrain
const brainRegex = /export const IconBrain = \(\{\s*size\s*=\s*24,\s*className\s*=\s*""\s*\}\) => \([\s\S]*?<\/svg>\n\);/g;
file = file.replace(brainRegex, `import { BrainCircuit } from 'lucide-react';\nexport const IconBrain = ({ size = 24, className = "" }) => <BrainCircuit size={size} className={className} strokeWidth={1.5} />;`);

// Replace IconSparkle
const sparkleRegex = /export const IconSparkle = \(\{\s*size\s*=\s*24,\s*className\s*=\s*""\s*\}\) => \([\s\S]*?<\/svg>\n\);/g;
file = file.replace(sparkleRegex, `import { Sparkles } from 'lucide-react';\nexport const IconSparkle = ({ size = 24, className = "" }) => <Sparkles size={size} className={className} strokeWidth={1.5} />;`);

// Consolidate imports
if (file.match(/import \{/g).length > 1) {
  // Just let it be multiple imports, or we can clean it up:
  file = `import { BrainCircuit, Sparkles } from 'lucide-react';\n` + file.replace(/import \{ BrainCircuit \} from 'lucide-react';\n/g, '').replace(/import \{ Sparkles \} from 'lucide-react';\n/g, '');
}

fs.writeFileSync('app/components/PremiumIcons.tsx', file);
console.log('Success');
