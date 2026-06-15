import { loadMemories, saveMemories } from './app/dashboard/chat/lib/brain/memoryStorage';
import { retrieveMemories } from './app/dashboard/chat/lib/brain/memoryRetrieval';
import { analyzeMemory, detectContradictionsAndMerge } from './app/dashboard/chat/lib/brain/memoryReasoner';

async function runTest() {
  console.log("=== PHASE 5: MEMORY STRESS TEST ===");
  
  // Clean start
  const fs = require('fs');
  if (fs.existsSync('.nira_memory.json')) {
    fs.unlinkSync('.nira_memory.json');
  }

  let allMemories = await loadMemories();
  console.log("Initial memories loaded:", allMemories.length);

  const testInputs = [
    "My name is Heena.",
    "I am working on the NIRA intelligence project. It is an AI agent.",
    "I hate Tailwind CSS.",
    "Actually, I changed my mind. I love Tailwind CSS.", // Contradiction test
    "My name is Heena Tewani.", // Update fact test
    "In this codebase, we use React and Next.js.", // Project fact test
  ];

  for (const input of testInputs) {
    console.log(`\nUser says: "${input}"`);
    const newMemoryResult = analyzeMemory(input, allMemories);
    
    if (newMemoryResult.shouldRemember) {
      const newMem = {
        id: Math.random().toString(36).substring(7),
        rawText: newMemoryResult.rawText,
        compressedText: newMemoryResult.compressedText,
        topic: newMemoryResult.primaryTopic,
        importance: newMemoryResult.importance,
        timestamp: Date.now(),
        priority: newMemoryResult.priority,
        memoryType: newMemoryResult.memoryType,
        projectId: undefined,
        decayRate: newMemoryResult.decayRate,
        memoryStrength: newMemoryResult.memoryStrength
      };
      
      const mergeResult = detectContradictionsAndMerge(newMem, allMemories);
      allMemories = mergeResult.memories;
      await saveMemories(allMemories);
      console.log(`Action: ${mergeResult.action} -> Compressed: ${newMem.compressedText}`);
    } else {
       console.log("Action: ignored");
    }
  }

  console.log("\n=== MEMORY RETRIEVAL (Context Injection Validation) ===");
  const retrievalResult = retrieveMemories("What CSS framework do I like?", allMemories, undefined, 10);
  console.log("Budget Used:", retrievalResult.budgetUsed);
  console.log("Injected Header:");
  console.log("[USER KNOWLEDGE BASE]");
  retrievalResult.memories.forEach(m => console.log(m.compressedText));

}

runTest();
