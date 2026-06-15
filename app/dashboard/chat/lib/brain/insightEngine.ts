import { IntentType, DomainType } from "./intentEngine";

export type InsightMode = "FULL_INSIGHT" | "LIGHT_INSIGHT" | "BYPASS";

export interface InsightState {
  activationMode: InsightMode;
}

export function detectInsight(input: string, intent: IntentType, domain: DomainType): InsightState {
  const text = input.toLowerCase().trim();
  const wordCount = text.split(/\s+/).length;

  // BYPASS logic
  if (
    intent === "casual" ||
    intent === "acknowledgment" ||
    (wordCount < 5 && !["review", "audit", "plan"].some(w => text.includes(w)))
  ) {
    return { activationMode: "BYPASS" };
  }

  // FULL_INSIGHT logic
  const fullInsightTriggers = [
    "architecture", "audit", "business decision", "product plan", 
    "technical review", "strategic", "evaluate", "review", "refactor"
  ];

  if (
    intent === "business" ||
    intent === "design" ||
    domain === "engineering" && wordCount > 20 ||
    fullInsightTriggers.some(w => text.includes(w))
  ) {
    return { activationMode: "FULL_INSIGHT" };
  }

  // Default to LIGHT_INSIGHT
  return { activationMode: "LIGHT_INSIGHT" };
}
