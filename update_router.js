const fs = require('fs');
const path = './app/dashboard/chat/lib/ai/router.ts';
let code = fs.readFileSync(path, 'utf8');

// Add imports for Memory V2
if (!code.includes('import { loadMemories, saveMemories }')) {
  code = code.replace(
    'import { Buffer } from "buffer";',
    'import { Buffer } from "buffer";\nimport { loadMemories, saveMemories } from "../brain/memoryStorage";\nimport { retrieveMemories } from "../brain/memoryRetrieval";\nimport { analyzeMemory, detectContradictionsAndMerge } from "../brain/memoryReasoner";'
  );
}

// Inside callAI, before calling niraCore
const insertPoint = '/* =============================\n     🧠 NIRA BRAIN\n  ============================= */';
const newLogic = `/* =============================
     🧠 MEMORY V2 (RETRIEVAL & INJECTION)
  ============================= */
  
  // 1. Load memories
  const allMemories = await loadMemories();
  
  // 2. Active Project ID (Extracted manually or mocked for now)
  const activeProjectId = undefined; 
  
  // 3. Retrieve Memory
  const retrievalResult = retrieveMemories(input, allMemories, activeProjectId, 10);
  const memoryContext = retrievalResult.memories.map(m => m.compressedText).join("\\n");
  
  // 4. Inject into finalInput payload boundary
  let memoryHeader = "";
  if (memoryContext) {
     memoryHeader = \`[USER KNOWLEDGE BASE]\\n\${memoryContext}\\n\\n\`;
  }
  
  // 5. Analyze new memory and save
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
        projectId: activeProjectId,
        decayRate: newMemoryResult.decayRate,
        memoryStrength: newMemoryResult.memoryStrength
     };
     const mergeResult = detectContradictionsAndMerge(newMem, allMemories);
     await saveMemories(mergeResult.memories);
  }

  /* =============================
     🧠 NIRA BRAIN
  ============================= */`;

if (!code.includes('MEMORY V2')) {
  code = code.replace(insertPoint, newLogic);
}

// Inject memoryHeader into finalInput
code = code.replace(
  'const {\n    finalInput,\n    intent,',
  'let {\n    finalInput,\n    intent,'
);
code = code.replace(
  'responseMode,\n  } = nira;',
  'responseMode,\n  } = nira;\n\n  finalInput = memoryHeader + finalInput;'
);

fs.writeFileSync(path, code);
