import { MemoryItem } from "./memoryTypes";

export interface ProjectContext {
  projectId: string;
  projectName: string;
  description: string;
  architectureDecisions: string[];
  roadmap: string[];
  currentPhase: string;
  activeTasks: string[];
  importantDecisions: string[];
}

export function buildProjectContext(projectId: string, projectMemories: MemoryItem[]): ProjectContext {
  const context: ProjectContext = {
    projectId,
    projectName: projectId, // Fallback, could be overridden by memory
    description: "",
    architectureDecisions: [],
    roadmap: [],
    currentPhase: "Unknown",
    activeTasks: [],
    importantDecisions: [],
  };

  // Process only project memories
  for (const mem of projectMemories) {
    if (mem.projectId !== projectId) continue;

    const lower = mem.rawText.toLowerCase() || mem.content?.toLowerCase() || "";
    const text = mem.compressedText;

    if (lower.includes("name is") || lower.includes("project name")) {
      context.projectName = text;
    } else if (lower.includes("description") || lower.includes("about the project")) {
      context.description = text;
    } else if (lower.includes("architecture") || lower.includes("tech stack") || lower.includes("framework")) {
      context.architectureDecisions.push(text);
    } else if (lower.includes("roadmap") || lower.includes("milestone") || lower.includes("plan")) {
      context.roadmap.push(text);
    } else if (lower.includes("phase") || lower.includes("current stage")) {
      context.currentPhase = text;
    } else if (lower.includes("task") || lower.includes("todo") || lower.includes("working on")) {
      context.activeTasks.push(text);
    } else if (lower.includes("decided") || lower.includes("locked") || lower.includes("approved")) {
      context.importantDecisions.push(text);
    } else {
      // Fallback
      context.importantDecisions.push(text);
    }
  }

  // Deduplicate
  context.architectureDecisions = Array.from(new Set(context.architectureDecisions));
  context.roadmap = Array.from(new Set(context.roadmap));
  context.activeTasks = Array.from(new Set(context.activeTasks));
  context.importantDecisions = Array.from(new Set(context.importantDecisions));

  return context;
}
