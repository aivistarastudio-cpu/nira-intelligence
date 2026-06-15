import { detectResponseType } from './app/dashboard/chat/lib/brain/responseTypeEngine';
import { buildHumanPrompt } from './app/dashboard/chat/lib/brain/humanizer';

const queries = [
  // Coding
  { input: "I'm getting a TypeError in my React component", intent: "code", primaryEmotion: "frustrated", role: "engineer" },
  { input: "How do I optimize this SQL query?", intent: "code", primaryEmotion: "curious", role: "engineer" },
  { input: "Explain how Redux works under the hood", intent: "learn", primaryEmotion: "normal", role: "engineer" },
  // Math
  { input: "Solve this quadratic equation", intent: "math", primaryEmotion: "confused", role: "teacher" },
  { input: "Explain the concept of an integral", intent: "learn", primaryEmotion: "curious", role: "teacher" },
  // History
  { input: "Why did the Roman Empire fall?", intent: "learn", primaryEmotion: "normal", role: "teacher" },
  { input: "History of World War II", intent: "history", primaryEmotion: "normal", role: "friend" },
  // Science
  { input: "How does photosynthesis work?", intent: "learn", primaryEmotion: "curious", role: "teacher" },
  { input: "Explain quantum entanglement", intent: "science", primaryEmotion: "confused", role: "teacher" },
  // Emotion
  { input: "I feel like I'm failing at everything right now.", intent: "casual", primaryEmotion: "sad", role: "friend" },
  { input: "I'm so angry at my boss", intent: "casual", primaryEmotion: "angry", role: "friend" },
  // Business
  { input: "How can I increase market share for my startup?", intent: "business", primaryEmotion: "urgent", role: "advisor" },
  { input: "I want to start a startup", intent: "business", primaryEmotion: "excited", role: "advisor" },
  // Casual
  { input: "Hi NIRA!", intent: "casual", primaryEmotion: "excited", role: "friend" }
];

console.log("=== LONG CONVERSATION STRESS TEST (100 MESSAGES) ===\n");

let socraticCount = 0;
let storyCount = 0;
let visualCount = 0;
let scenarioCount = 0;
let mentalCount = 0;
let analogyCount = 0;
const openers = new Map<string, number>();
const closings = new Map<string, number>();

for (let i = 1; i <= 100; i++) {
  const baseQuery = queries[Math.floor(Math.random() * queries.length)];
  // Add some random noise to change the string length and trigger Variability Engine
  const lengthNoise = " ".repeat(Math.floor(Math.random() * 20));
  const input = baseQuery.input + lengthNoise;
  
  const typeResult = detectResponseType(baseQuery.intent as any, "auto", input, baseQuery.primaryEmotion);
  const context = `Domain: ${typeResult.domain}\nRequires Discovery: ${typeResult.requires_discovery ? "true" : "false"}\nPrimary Emotion: ${baseQuery.primaryEmotion}\nIntent: ${baseQuery.intent}\nRole: ${baseQuery.role}`;
  const prompt = buildHumanPrompt(input, context);
  
  if (prompt.includes("SOCRATIC DISCOVERY ENGINE")) socraticCount++;
  if (prompt.includes("TEACHING MODE: STORY")) storyCount++;
  if (prompt.includes("TEACHING MODE: VISUALIZATION")) visualCount++;
  if (prompt.includes("TEACHING MODE: SCENARIO")) scenarioCount++;
  if (prompt.includes("TEACHING MODE: MENTAL MODEL")) mentalCount++;
  if (prompt.includes("TEACHING MODE: ANALOGY")) analogyCount++;
  
  const openerMatch = prompt.match(/- Emotion Context \[.*?\]: (.*?)\n/);
  if (openerMatch) {
    const op = openerMatch[1].trim();
    openers.set(op, (openers.get(op) || 0) + 1);
  }
  
  const closingMatch = prompt.match(/- Dynamic Closing: (.*?)\n/);
  if (closingMatch) {
    const cl = closingMatch[1].trim();
    closings.set(cl, (closings.get(cl) || 0) + 1);
  }
}

console.log(`\n=== METRICS ===`);
console.log(`Socratic Triggers: ${socraticCount}`);
console.log(`Story (History): ${storyCount}`);
console.log(`Visualization (Science): ${visualCount}`);
console.log(`Scenario (Business): ${scenarioCount}`);
console.log(`Mental Model (Engineering): ${mentalCount}`);
console.log(`Analogy (General/Student): ${analogyCount}`);
console.log(`\nUnique Emotion Openers Used: ${openers.size}`);
console.log(`Unique Dynamic Closings Used: ${closings.size}`);

// Print top 3 most used openers
const sortedOpeners = [...openers.entries()].sort((a, b) => b[1] - a[1]);
console.log("\nTop 3 Used Openers:");
sortedOpeners.slice(0, 3).forEach(([op, count]) => console.log(`${count}x: ${op}`));

