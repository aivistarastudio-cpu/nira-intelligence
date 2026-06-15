import { detectResponseType } from "./app/dashboard/chat/lib/brain/responseTypeEngine";
import { detectDepth } from "./app/dashboard/chat/lib/brain/depthEngine";
import { createResponsePlan, detectTeachingMode } from "./app/dashboard/chat/lib/brain/responsePlanner";
import { detectIntent } from "./app/dashboard/chat/lib/brain/intentEngine";

const tests = [
  // Math Cases
  { prompt: "2 + 2", expectedDepth: "short", expectedMode: "beginner" },
  { prompt: "How do I calculate the area of a circle?", expectedDepth: "medium", expectedMode: "intermediate" },
  { prompt: "Derive the quadratic formula step by step explaining the concept", expectedDepth: "expert", expectedMode: "advanced", requires: ["derivation"] },

  // Coding Cases
  { prompt: "How to run a node script?", expectedDepth: "short", expectedMode: "intermediate" },
  { prompt: "Explain how React useEffect works", expectedDepth: "medium", expectedMode: "intermediate" },
  { prompt: "My Next.js server actions are slow, how do I optimize the database calls?", expectedDepth: "expert", expectedMode: "advanced", requires: ["optimization", "root_cause"] },

  // History Cases
  { prompt: "When did World War 2 end?", expectedDepth: "short", expectedMode: "intermediate" },
  { prompt: "Explain the history of the Roman Empire and its impact on modern law", expectedDepth: "medium", expectedMode: "intermediate", requires: ["historical_impact"] },

  // Science Cases
  { prompt: "Explain gravity like I'm 5", expectedDepth: "short", expectedMode: "beginner" },
  { prompt: "Explain quantum mechanics principles and real world applications deeply", expectedDepth: "deep", expectedMode: "intermediate", requires: ["real_world_application"] },

  // Emotional
  { prompt: "I am feeling so sad today", expectedDepth: "short", expectedMode: "intermediate" },
  { prompt: "I am completely lost in life and don't know what to do, please advise me and help me fix this", expectedDepth: "expert", expectedMode: "intermediate", requires: ["action_steps"] },

  // Comparisons
  { prompt: "React vs Vue", expectedDepth: "short", expectedMode: "intermediate", prohibits: ["recommendation"] },
  { prompt: "Which is better to learn in 2026: React or Vue? I need advice", expectedDepth: "medium", expectedMode: "intermediate", requires: ["recommendation"] },
];

let passed = 0;

for (const t of tests) {
  const intentRes = detectIntent(t.prompt);
  const typeRes = detectResponseType(intentRes.intent, intentRes.responseMode, t.prompt, "normal");
  const depthRes = detectDepth(t.prompt, intentRes.intent);
  const teachingMode = detectTeachingMode(t.prompt, typeRes.domain || "general");
  
  const plan = createResponsePlan(typeRes.responseType, typeRes.domain || "general", depthRes.depth, t.prompt);

  console.log(`Prompt: "${t.prompt}"`);
  console.log(`  Domain: ${typeRes.domain} | Depth: ${depthRes.depth} | Mode: ${teachingMode}`);
  console.log(`  Blocks:`, plan.blocks);

  let ok = true;
  if (t.expectedMode && t.expectedMode !== teachingMode) {
    console.log(`  [FAIL] Expected mode ${t.expectedMode}, got ${teachingMode}`);
    ok = false;
  }
  
  if (t.requires) {
    for (const req of t.requires) {
      if (!plan.blocks.includes(req as any)) {
        console.log(`  [FAIL] Expected block ${req} was NOT generated.`);
        ok = false;
      }
    }
  }

  if (t.prohibits) {
    for (const pro of t.prohibits) {
      if (plan.blocks.includes(pro as any)) {
        console.log(`  [FAIL] Prohibited block ${pro} WAS generated.`);
        ok = false;
      }
    }
  }

  if (ok) passed++;
  console.log("---");
}

console.log(`\nTests Passed: ${passed}/${tests.length}`);
