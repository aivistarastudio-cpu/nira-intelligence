const fs = require('fs');
const path = './app/dashboard/chat/lib/brain/niraCore.ts';
let code = fs.readFileSync(path, 'utf8');

// 1. Remove buildPlan and mapIntentToMode
const buildPlanRegex = /\/\* ================================\n🧠 PLAN ENGINE\n================================ \*\/\nfunction buildPlan\(intent: string, input: string\): Plan \{[\s\S]*?\n\}/g;
const mapIntentRegex = /\/\* ================================\n🎯 MODE MAPPING\n================================ \*\/\nfunction mapIntentToMode\(intent: string\) \{[\s\S]*?\n\}/g;
code = code.replace(buildPlanRegex, '');
code = code.replace(mapIntentRegex, '');
// Fallback if comments are missing
const rawBuildPlan = /function buildPlan\(intent: string, input: string\): Plan \{[\s\S]*?return \{ type: isShort \? "casual" : "casual" \};\n\}/g;
const rawMapIntent = /function mapIntentToMode\(intent: string\) \{[\s\S]*?return "explanation";\n\}/g;
code = code.replace(rawBuildPlan, '');
code = code.replace(rawMapIntent, '');

// 2. Remove intentMap logic
const intentMapRegex = /const intentMap: Record<string, string> = \{[\s\S]*?normal: "casual",\n\s*\};\n\s*const intent = \(intentMap\[rawIntent\] \|\| rawIntent\) as string;/g;
code = code.replace(intentMapRegex, 'const intent = rawIntent;');
const intentMapFallback = /const intentMap[\s\S]*?const intent = \(intentMap\[rawIntent\] \|\| rawIntent\) as string;/g;
code = code.replace(intentMapFallback, 'const intent = rawIntent;');

// 3. Fix detectIntent and responseTypeEngine call
// We need to capture `domain` from detectIntent and pass it to detectResponseType
code = code.replace(
  'const { intent: rawIntent, responseMode } = detectIntent(cleanInput);',
  'const { intent: rawIntent, responseMode, domain } = detectIntent(cleanInput, primaryEmotion);'
);

code = code.replace(
  /const typeResult = detectResponseType\([\s\S]*?\);/,
  'const typeResult = detectResponseType(intent, domain, responseMode);'
);

// Fix buildPlan usages
code = code.replace(
  'const plan = buildPlan(intent, cleanInput);',
  '// Plan handled by responsePlanner'
);
code = code.replace(
  'const mode = mapIntentToMode(intent);',
  'const mode = responseMode;'
);

// Provide a mock userProfile that doesn't reset (or is fetched from memory)
// Right now it says `let userProfile = { ... }` at the top. We will mock a persistent one by storing it globally for the runtime.
code = code.replace(
  /let userProfile = \{[\s\S]*?tone: "friendly",\n\};/g,
  'if (!global.niraUserProfile) { global.niraUserProfile = { progressScore: 0, skillLevel: "unknown", topicsLearned: [], interest: [], language: "en", tone: "friendly" }; }\nlet userProfile = global.niraUserProfile;'
);

fs.writeFileSync(path, code);
