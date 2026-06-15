import { detectResponseType } from './app/dashboard/chat/lib/brain/responseTypeEngine';
import { buildHumanPrompt } from './app/dashboard/chat/lib/brain/humanizer';

const testPrompts = [
  // Coding
  { input: "Explain how React State works under the hood", intent: "learn", primaryEmotion: "curious", mode: "teach", role: "engineer" },
  { input: "Teach me how to optimize SQL queries", intent: "learn", primaryEmotion: "curious", domainOverride: "engineering" },
  
  // Math
  { input: "Can you help me solve this quadratic equation?", intent: "math", primaryEmotion: "confused" },
  
  // History
  { input: "Why did the Roman Empire fall?", intent: "learn", primaryEmotion: "normal" },
  
  // Science
  { input: "How does photosynthesis work?", intent: "learn", primaryEmotion: "curious" },
  
  // Business
  { input: "Explain the best way to handle a PR crisis", intent: "learn", primaryEmotion: "normal", domainOverride: "business" },
  { input: "I want to start a startup", intent: "business", primaryEmotion: "excited" },
  
];

let socraticCount = 0;
let storyCount = 0;
let visualCount = 0;
let scenarioCount = 0;
let mentalCount = 0;
let analogyCount = 0;

testPrompts.forEach((t, index) => {
  const typeResult = detectResponseType(t.intent as any, "auto", t.input, t.primaryEmotion);
  const domain = t.domainOverride || typeResult.domain;
  const context = `Domain: ${domain}\nRequires Discovery: ${typeResult.requires_discovery ? "true" : "false"}\nPrimary Emotion: ${t.primaryEmotion}\nIntent: ${t.intent}\nRole: ${t.role || ""}`;
  const prompt = buildHumanPrompt(t.input, context);
  
  const hasSocratic = prompt.includes("SOCRATIC DISCOVERY ENGINE");
  const hasStory = prompt.includes("TEACHING MODE: STORY");
  const hasVisual = prompt.includes("TEACHING MODE: VISUALIZATION");
  const hasScenario = prompt.includes("TEACHING MODE: SCENARIO");
  const hasMental = prompt.includes("TEACHING MODE: MENTAL MODEL");
  const hasAnalogy = prompt.includes("TEACHING MODE: ANALOGY");
  
  if (hasSocratic) socraticCount++;
  if (hasStory) storyCount++;
  if (hasVisual) visualCount++;
  if (hasScenario) scenarioCount++;
  if (hasMental) mentalCount++;
  if (hasAnalogy) analogyCount++;
});

console.log(`\n=== ENGINE METRICS ===`);
console.log(`Socratic Triggers: ${socraticCount}`);
console.log(`Story (History): ${storyCount}`);
console.log(`Visualization (Science): ${visualCount}`);
console.log(`Scenario (Business): ${scenarioCount}`);
console.log(`Mental Model (Engineering): ${mentalCount}`);
console.log(`Analogy (General/Student): ${analogyCount}`);
