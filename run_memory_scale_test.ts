import { retrieveMemories } from './app/dashboard/chat/lib/brain/memoryRetrieval';
import { MemoryItem } from './app/dashboard/chat/lib/brain/memoryTypes';

function generateMemories(count: number): MemoryItem[] {
  const memories: MemoryItem[] = [];
  
  // Seed the target memory
  memories.push({
    id: "target-123",
    rawText: "I am building a React Native application for e-commerce.",
    compressedText: "Building: React Native application for e-commerce.",
    topic: "project",
    importance: 85,
    timestamp: Date.now(),
    priority: "high",
    memoryType: "long_term",
    projectId: undefined,
    status: "active",
    decayRate: 0.01,
    memoryStrength: 85
  });

  const domains = ["Preference:", "Fact:", "Name:", "Dislikes:", "Goal:"];
  const nouns = ["Vue", "Angular", "Dogs", "Cats", "Python", "Data Science", "Machine Learning", "Space", "History"];

  for (let i = 1; i < count; i++) {
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    
    // Add 10% superseded memories
    const status = Math.random() < 0.1 ? "superseded" : "active";

    memories.push({
      id: `random-${i}`,
      rawText: `${domain} ${noun} test ${i}`,
      compressedText: `${domain} ${noun} test ${i}`,
      topic: "general",
      importance: 50,
      timestamp: Date.now() - (Math.random() * 100000000), // Random past time
      priority: "medium",
      memoryType: "short_term",
      projectId: undefined,
      status: status,
      decayRate: 0.05,
      memoryStrength: 50
    });
  }

  return memories;
}

function runScaleTest(count: number) {
  console.log(`\n--- SCALING TEST: ${count} MEMORIES ---`);
  const memories = generateMemories(count);
  
  const startTime = performance.now();
  
  const query = "What framework am I using for my e-commerce app?";
  const retrievalResult = retrieveMemories(query, memories, undefined, 10);
  
  const endTime = performance.now();
  
  console.log(`Latency: ${(endTime - startTime).toFixed(2)}ms`);
  console.log(`Budget Used: ${retrievalResult.budgetUsed} / 10`);
  
  let targetFound = false;
  retrievalResult.memories.forEach((m, idx) => {
    if (m.id === "target-123") {
      targetFound = true;
      console.log(`Target Memory Ranked: #${idx + 1}`);
    }
  });

  // Verify no superseded memories leaked
  const supersededLeak = retrievalResult.memories.filter(m => m.status === "superseded");
  console.log(`Superseded Facts Leaked: ${supersededLeak.length}`);
  
  if (targetFound) {
    console.log("Retrieval Accuracy: 100%");
  } else {
    console.log("Retrieval Accuracy: 0% (FAILED)");
  }
}

runScaleTest(100);
runScaleTest(500);
runScaleTest(1000);
