type Settings = {
  theme: "dark" | "light" | "system";
  tone: "smart" | "friendly" | "professional";
  length: "short" | "medium" | "long";
  aiMode: "fast" | "balanced" | "deep";
  creativity: number;
  memory: "off" | "balanced" | "full";

  // GENERAL
  enter: boolean;
  sound: boolean;

  // APPEARANCE
  accent: string;
  density: "compact" | "comfortable" | "spacious";
  glass: boolean;
  anim: boolean;

  // AI BEHAVIOR
  personality: "smart" | "friendly" | "professional" | "creative";
  emoji: "off" | "auto" | "expressive";
  autoMode: boolean;

  // CHAT MEMORY
  saveChats: boolean;
  contextLength: "short" | "medium" | "long";
  autoLearn: boolean;
};

const defaultSettings: Settings = {
  theme: "dark",
  tone: "smart",
  length: "medium",
  aiMode: "balanced",
  creativity: 50,
  memory: "balanced",

  // GENERAL
  enter: true,
  sound: false,

  // APPEARANCE
  accent: "blue",
  density: "comfortable",
  glass: true,
  anim: true,

  // AI BEHAVIOR
  personality: "smart",
  emoji: "auto",
  autoMode: true,

  // CHAT MEMORY
  saveChats: true,
  contextLength: "medium",
  autoLearn: true,
};

export function getSettings(): Settings {
  if (typeof window === "undefined") return defaultSettings;

  try {
    const saved = localStorage.getItem("nira-settings");

    if (!saved) return defaultSettings;

    const parsed = JSON.parse(saved);

    return {
      ...defaultSettings,
      ...parsed, // 🔥 SAFE MERGE (IMPORTANT)
    };
  } catch (e) {
    console.warn("Settings load error:", e);
    return defaultSettings;
  }
}

export function saveSettings(settings: Settings) {
  try {
    localStorage.setItem("nira-settings", JSON.stringify(settings));
  } catch (e) {
    console.warn("Settings save error:", e);
  }
}