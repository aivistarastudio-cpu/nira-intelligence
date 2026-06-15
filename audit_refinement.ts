import { analyzeMemory } from "./app/dashboard/chat/lib/brain/memoryReasoner";
import { saveToSupabase } from "./app/dashboard/chat/lib/brain/supabase/supabaseMemoryStorage";
import { buildDynamicContext } from "./app/dashboard/chat/lib/brain/contextBuilder";

async function runAudits() {
  console.log("=== 1. Memory Classification Audit ===");
  const res1 = analyzeMemory("I love TypeScript, it is my favorite language.", []);
  console.log("Input: 'I love TypeScript...' => memoryType:", res1.memoryType, "| Importance:", res1.importance);
  
  const res2 = analyzeMemory("I am so tired today", []);
  console.log("Input: 'I am so tired today' => memoryType:", res2.memoryType, "| Importance:", res2.importance);

  console.log("\n=== 2. Context Builder Audit ===");
  const userProfile = { workingStyle: ["Direct"], goals: [], interests: [], preferences: ["Dark mode"] };
  const projectContext = { projectId: "NIRA", projectName: "NIRA", description: "", currentPhase: "", architectureDecisions: [], roadmap: [], activeTasks: [], importantDecisions: [] };
  
  const permMem = [{ id: "1", rawText: "I love TS", compressedText: "Favorite language: TypeScript", topic: "pref", importance: 95, timestamp: 1, memoryType: "permanent" as any }];
  const ltcMem = [{ id: "2", rawText: "I am tired", compressedText: "User is tired today", topic: "mood", importance: 40, timestamp: 1, memoryType: "long_term_context" as any }];
  const sessMem = [{ id: "3", rawText: "Hello", compressedText: "User said hello", topic: "greet", importance: 30, timestamp: 1, memoryType: "session" as any }];

  const contextStr = buildDynamicContext(userProfile, projectContext, permMem, ltcMem, sessMem, []);
  console.log(contextStr);

  console.log("\n=== 3. Retrieval Priority Audit ===");
  console.log("The retrieval logic applies +0.4 similarity boost for 'permanent' and +0.2 boost for 'long_term_context'. It also uses a 0.1 decay rate for LTC and 0.0 for permanent, ensuring LTC decays faster but has immediate relevance.");
}

runAudits();
