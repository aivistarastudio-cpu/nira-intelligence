import { IntentType, ResponseMode, DomainType } from "./intentEngine";

export type ResponseType =
  | "direct_answer"
  | "step_by_step"
  | "comparison"
  | "analytical_report"
  | "creative_story"
  | "code_solution"
  | "educational_lesson"
  | "math_solution"
  | "science_explanation"
  | "history_explanation"
  | "business_strategy"
  | "emotional_support"
  | "conversational_acknowledgment";

export interface ResponseTypeResult {
  responseType: ResponseType;
  domain: DomainType;
  requires_discovery?: boolean;
}

export function detectResponseType(
  intent: IntentType,
  domain: DomainType,
  responseMode: ResponseMode
): ResponseTypeResult {
  
  // Directly map from Intent and Domain without re-parsing raw strings.
  let responseType: ResponseType = "direct_answer";
  let requires_discovery = false;

  if (domain === "psychology") {
     return { responseType: "emotional_support", domain };
  }

  if (intent === "acknowledgment") {
     return { responseType: "conversational_acknowledgment", domain };
  }

  if (intent === "code") {
     return { responseType: "code_solution", domain };
  }

  if (intent === "compare") {
     return { responseType: "comparison", domain };
  }

  if (intent === "steps") {
     return { responseType: "step_by_step", domain };
  }

  if (intent === "story") {
     return { responseType: "creative_story", domain };
  }

  if (intent === "business") {
     return { responseType: "business_strategy", domain, requires_discovery: true };
  }

  if (domain === "math") {
     return { responseType: "math_solution", domain };
  }

  if (domain === "history") {
     return { responseType: "history_explanation", domain };
  }

  if (domain === "science") {
     return { responseType: "science_explanation", domain };
  }

  if (intent === "learn" || intent === "explain") {
     return { responseType: "educational_lesson", domain };
  }

  if (intent === "thinking") {
     return { responseType: "analytical_report", domain };
  }

  return { responseType, domain, requires_discovery };
}
