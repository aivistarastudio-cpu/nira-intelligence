import { MemoryItem } from "./memoryTypes";

export interface UserProfile {
  preferences: string[];
  goals: string[];
  workingStyle: string[];
  interests: string[];
}

export function buildUserProfile(permanentMemories: MemoryItem[]): UserProfile {
  const profile: UserProfile = {
    preferences: [],
    goals: [],
    workingStyle: [],
    interests: [],
  };

  // Process only permanent memories that define the user core traits
  for (const mem of permanentMemories) {
    if (mem.memoryType !== "permanent") continue;

    const lower = mem.rawText.toLowerCase() || mem.content?.toLowerCase() || "";
    const compressed = mem.compressedText.toLowerCase();

    // 1. Working Style
    if (lower.includes("i am a builder") || lower.includes("developer") || lower.includes("designer") || lower.includes("entrepreneur") || lower.includes("founder")) {
      profile.workingStyle.push(mem.compressedText);
    }
    
    // 2. Goals
    else if (lower.includes("goal") || lower.includes("want to build") || lower.includes("learning") || lower.includes("roadmap") || lower.includes("achieve")) {
      profile.goals.push(mem.compressedText);
    }
    
    // 3. Interests
    else if (lower.includes("interested in") || lower.includes("love") || lower.includes("fascinated by") || lower.includes("hobby")) {
      profile.interests.push(mem.compressedText);
    }
    
    // 4. Preferences (Default / Catch-all for permanent rules like language or UI)
    else if (compressed.startsWith("preference:") || compressed.startsWith("dislikes:") || lower.includes("prefer") || lower.includes("always use") || lower.includes("language")) {
      profile.preferences.push(mem.compressedText);
    } 
    // Fallback classification
    else {
      profile.preferences.push(mem.compressedText); 
    }
  }

  // Deduplicate
  profile.preferences = Array.from(new Set(profile.preferences));
  profile.goals = Array.from(new Set(profile.goals));
  profile.workingStyle = Array.from(new Set(profile.workingStyle));
  profile.interests = Array.from(new Set(profile.interests));

  return profile;
}
