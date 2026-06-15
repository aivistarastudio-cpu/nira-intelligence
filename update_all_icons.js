const fs = require('fs');

// 1. Rewrite PremiumIcons.tsx
const premiumIconsContent = `import React from "react";
import { 
  BrainCircuit, 
  Fingerprint, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Network, 
  Rocket, 
  Infinity as InfinityIcon, 
  Database,
  Aperture,
  Bot,
  Hexagon,
  Search,
  CheckCircle2,
  MapPin,
  Menu,
  X,
  ArrowUpRight,
  ArrowRight
} from "lucide-react";

export const IconBrain = ({ size = 24, className = "" }) => <BrainCircuit size={size} className={className} strokeWidth={1.5} />;
export const IconFingerprint = ({ size = 24, className = "" }) => <Fingerprint size={size} className={className} strokeWidth={1.5} />;
export const IconZap = ({ size = 24, className = "" }) => <Zap size={size} className={className} strokeWidth={1.5} />;
export const IconShield = ({ size = 24, className = "" }) => <ShieldCheck size={size} className={className} strokeWidth={1.5} />;
export const IconLayers = ({ size = 24, className = "" }) => <Layers size={size} className={className} strokeWidth={1.5} />;
export const IconCpu = ({ size = 24, className = "" }) => <Cpu size={size} className={className} strokeWidth={1.5} />;
export const IconNetwork = ({ size = 24, className = "" }) => <Network size={size} className={className} strokeWidth={1.5} />;
export const IconRocket = ({ size = 24, className = "" }) => <Rocket size={size} className={className} strokeWidth={1.5} />;
export const IconInfinity = ({ size = 24, className = "" }) => <InfinityIcon size={size} className={className} strokeWidth={1.5} />;
export const IconDatabase = ({ size = 24, className = "" }) => <Database size={size} className={className} strokeWidth={1.5} />;
export const IconAperture = ({ size = 24, className = "" }) => <Aperture size={size} className={className} strokeWidth={1.5} />;
export const IconBot = ({ size = 24, className = "" }) => <Bot size={size} className={className} strokeWidth={1.5} />;
export const IconHexagon = ({ size = 24, className = "" }) => <Hexagon size={size} className={className} strokeWidth={1.5} />;
export const IconSearchFocus = ({ size = 24, className = "" }) => <Search size={size} className={className} strokeWidth={1.5} />;
export const IconCheckDot = ({ size = 24, className = "" }) => <CheckCircle2 size={size} className={className} strokeWidth={1.5} />;
export const IconLocationNode = ({ size = 24, className = "" }) => <MapPin size={size} className={className} strokeWidth={1.5} />;
export const IconMenuBars = ({ size = 24, className = "" }) => <Menu size={size} className={className} strokeWidth={1.5} />;
export const IconCloseX = ({ size = 24, className = "" }) => <X size={size} className={className} strokeWidth={1.5} />;
export const IconArrowSlant = ({ size = 24, className = "" }) => <ArrowUpRight size={size} className={className} strokeWidth={1.5} />;
export const IconArrowRightLine = ({ size = 24, className = "" }) => <ArrowRight size={size} className={className} strokeWidth={1.5} />;
`;

fs.writeFileSync('app/components/PremiumIcons.tsx', premiumIconsContent);

// 2. Update page.tsx to use the new icons
let page = fs.readFileSync('app/nira/page.tsx', 'utf-8');

// Update imports
const importRegex = /import \{([^}]+)\} from "\.\.\/components\/PremiumIcons";/;
page = page.replace(importRegex, `import {
  IconBrain,
  IconFingerprint,
  IconZap,
  IconShield,
  IconLayers,
  IconCpu,
  IconNetwork,
  IconRocket,
  IconInfinity,
  IconDatabase,
  IconAperture,
  IconBot,
  IconHexagon,
  IconSearchFocus,
  IconCheckDot,
  IconLocationNode,
  IconMenuBars,
  IconCloseX,
  IconArrowSlant,
  IconArrowRightLine
} from "../components/PremiumIcons";`);

// Why NIRA Section Replacements
page = page.replace(/<IconDataCore size=\{22\} \/>/g, '<IconBrain size={22} />'); // Truly Intelligent
page = page.replace(/<IconSearchFocus size=\{22\} \/>/g, '<IconFingerprint size={22} />'); // Human-Like Experience
page = page.replace(/<IconSparkle size=\{22\} \/>/g, '<IconZap size={22} />'); // Faster & Smarter
page = page.replace(/<IconShield size=\{22\} \/>/g, '<IconShield size={22} />'); // Secure & Private
page = page.replace(/<IconLayers size=\{22\} \/>/g, '<IconLayers size={22} />'); // All-In-One Platform
page = page.replace(/<IconCycle size=\{30\} \/>/g, '<IconCpu size={30} />'); // Multi-LLM Power
page = page.replace(/<IconNodes size=\{30\} \/>/g, '<IconNetwork size={30} />'); // Deep Reasoning
page = page.replace(/<IconServerMatrix size=\{30\} \/>/g, '<IconRocket size={30} />'); // Built for Growth
page = page.replace(/<IconSparkle size=\{30\} \/>/g, '<IconInfinity size={30} />'); // Always Evolving
page = page.replace(/<IconServerMatrix size=\{22\} \/>/g, '<IconDatabase size={22} />'); // Long-Term Memory

// Why NIRA Footer Replacements
page = page.replace(/<IconSearchFocus size=\{18\} \/>/g, '<IconSearchFocus size={18} />'); // Understand Better
page = page.replace(/<IconCycle size=\{18\} \/>/g, '<IconCpu size={18} />'); // Work Faster
page = page.replace(/<IconDataCore size=\{18\} \/>/g, '<IconBrain size={18} />'); // Think Smarter
page = page.replace(/<IconSparkle size=\{18\} \/>/g, '<IconRocket size={18} />'); // Achieve More

// Technology Section Replacements
page = page.replace(/<IconNodes size=\{24\} \/>/g, '<IconNetwork size={24} />'); // Cognitive Planning
page = page.replace(/<IconSearchFocus size=\{24\} \/>/g, '<IconSearchFocus size={24} />'); // Dynamic Context
page = page.replace(/<IconDataCore size=\{24\} \/>/g, '<IconDatabase size={24} />'); // Secure Persistent Memory
page = page.replace(/<IconServerMatrix size=\{24\} \/>/g, '<IconCpu size={24} />'); // Neural Routing
page = page.replace(/<IconSphere size=\{24\} \/>/g, '<IconHexagon size={24} />'); // Extensible AI

// Roadmap Replacements
page = page.replace(/<IconSparkle size=\{24\} \/>/g, '<IconAperture size={24} />'); // Phase 2: Multimodal
page = page.replace(/<IconServerMatrix size=\{24\} \/>/g, '<IconBot size={24} />'); // Phase 3: Autonomous
page = page.replace(/<IconNodes size=\{24\} \/>/g, '<IconHexagon size={24} />'); // Phase 4: AGI

// Safety Section
page = page.replace(/<IconShield size=\{32\} \/>/g, '<IconShield size={32} />'); 

fs.writeFileSync('app/nira/page.tsx', page);
console.log('Success');
