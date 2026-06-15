import fs from "fs/promises";
import path from "path";
import { MemoryItem } from "./memoryTypes";

const MEMORY_FILE_PATH = path.join(process.cwd(), ".nira_memory.json");

export async function loadMemories(): Promise<MemoryItem[]> {
  try {
    const data = await fs.readFile(MEMORY_FILE_PATH, "utf-8");
    return JSON.parse(data) as MemoryItem[];
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return [];
    }
    console.error("Failed to load memories:", error);
    return [];
  }
}

export async function saveMemories(memories: MemoryItem[]): Promise<void> {
  try {
    await fs.writeFile(MEMORY_FILE_PATH, JSON.stringify(memories, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to save memories:", error);
  }
}
