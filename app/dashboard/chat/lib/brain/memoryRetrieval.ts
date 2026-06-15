import { MemoryItem } from "./memoryTypes";

export interface RetrievalResult {
  memories: MemoryItem[];
  budgetUsed: number;
}

export function retrieveMemories(
  query: string,
  allMemories: MemoryItem[],
  activeProjectId?: string,
  maxBudget: number = 10
): RetrievalResult {
  const result: MemoryItem[] = [];
  const queryLower = query.toLowerCase();

  // 0. Filter active only
  const activeMemories = allMemories.filter(m => m.status !== "superseded");

  // 1. ACTIVE PROJECT OVERRIDE (Budget bypass/priority)
  if (activeProjectId) {
    const projectMemories = activeMemories.filter(m => m.projectId === activeProjectId && m.memoryType === "project");
    // Add all project memories first, up to half the budget
    for (const pm of projectMemories) {
      if (result.length < maxBudget * 0.5) {
        result.push(pm);
      }
    }
  }

  // 2. ALLOCATE BUDGET LAYER
  const remainingMemories = activeMemories.filter(m => !result.includes(m));
  
  // Score remaining memories
  const scored = remainingMemories.map(mem => {
    let similarity = calculateSimilarity(queryLower, mem.compressedText.toLowerCase());
    
    // Boost similarity if it's a permanent fact globally relevant
    if (mem.memoryType === "permanent") {
       similarity += 0.4;
    } else if (mem.memoryType === "long_term_context") {
       similarity += 0.2;
    }

    const ageHours = (Date.now() - mem.timestamp) / (1000 * 60 * 60);
    const decay = (mem.decayRate || 0) * ageHours;
    
    const finalScore = (similarity * 0.5) + ((mem.importance / 100) * 0.3) - (decay * 0.2);
    
    return { mem, score: finalScore };
  });

  // Sort descending
  scored.sort((a, b) => b.score - a.score);

  // 3. FILL BUDGET (Project, Permanent, Long-Term, Session)
  let budgetLeft = maxBudget - result.length;
  
  for (const { mem, score } of scored) {
    if (budgetLeft <= 0) break;
    if (score > 0.1) { // Threshold
      result.push(mem);
      budgetLeft--;
    }
  }

  return {
    memories: result,
    budgetUsed: result.length
  };
}

function calculateSimilarity(str1: string, str2: string): number {
  const words1 = new Set(str1.split(/\s+/).filter(w => w.length > 2));
  const words2 = str2.split(/\s+/).filter(w => w.length > 2);
  if (words1.size === 0 || words2.length === 0) return 0;
  let matches = 0;
  for (const w of words2) {
    if (words1.has(w)) matches++;
  }
  return matches / Math.max(words1.size, words2.length);
}
