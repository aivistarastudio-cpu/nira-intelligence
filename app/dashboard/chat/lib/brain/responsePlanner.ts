import { ResponseType } from "./responseTypeEngine";
import { DepthLevel } from "./depthEngine";

export type PlanBlock =
  | "heading" | "paragraph" | "list" | "code" | "table" | "quote" | "warning" | "tip" | "summary" | "steps" | "faq" | "math" | "example" | "key_points" | "explanation" | "best_practice" | "timeline" | "important_events" | "analysis" | "next_steps" | "acknowledgement" | "conversation"
  // New Domain-Aware blocks
  | "formula" | "derivation" | "answer"
  | "problem" | "fix" | "root_cause" | "optimization"
  | "event" | "key_facts" | "background" | "causes" | "effects" | "historical_impact"
  | "concept" | "principles" | "real_world_application"
  | "reflection" | "perspective" | "support" | "action_steps"
  | "recommendation"
  | "insight_evaluation" | "light_evaluation";

import { InsightState } from "./insightEngine";

export interface ResponsePlan {
  blocks: PlanBlock[];
}

export type TeachingMode = "beginner" | "intermediate" | "advanced";

export function detectTeachingMode(input: string, domain: string): TeachingMode {
  const text = input.toLowerCase();
  
  if (text.includes("like i'm 5") || text.includes("eli5") || text.includes("for a beginner") || text.includes("what is") || text.includes("basics") || text.includes("kya hota hai") || text.includes("samjhao") || text.includes("simple") || text.match(/like i'?m 5/i) || text.match(/^[0-9\s+\-*/=]+$/)) {
    return "beginner";
  }
  
  if (text.includes("advanced") || text.includes("architecture") || text.includes("under the hood") || text.includes("deep dive") || text.includes("optimize") || text.includes("scale") || text.includes("system design") || text.includes("memory layer") || text.includes("derive") || text.includes("derivation")) {
    return "advanced";
  }
  
  // By default
  return "intermediate";
}

export function createResponsePlan(
  responseType: ResponseType,
  domain: string,
  depth: DepthLevel,
  input: string,
  insightState?: InsightState
): ResponsePlan {
  
  const text = input.toLowerCase();

  let basePlan: ResponsePlan = (() => {
    switch (responseType) {
    case "math_solution":
      if (depth === "short") return { blocks: ["heading", "steps", "answer"] };
      if (depth === "expert" || depth === "deep") {
        const blocks: PlanBlock[] = ["heading", "concept", "formula"];
        if (text.includes("derive") || text.includes("proof") || text.includes("how did you get")) {
          blocks.push("derivation");
        }
        blocks.push("steps", "example", "summary");
        return { blocks };
      }
      return { blocks: ["heading", "formula", "steps", "example", "answer"] };

    case "code_solution":
      if (depth === "short") return { blocks: ["problem", "code", "fix"] };
      if (depth === "expert" || depth === "deep") {
        const blocks: PlanBlock[] = ["problem", "root_cause", "code"];
        if (text.includes("optimize") || text.includes("scale") || text.includes("slow") || text.includes("fast")) {
          blocks.push("optimization");
        }
        blocks.push("best_practice", "summary");
        return { blocks };
      }
      return { blocks: ["problem", "explanation", "code", "best_practice"] };

    case "history_explanation":
      if (depth === "short") return { blocks: ["event", "key_facts"] };
      if (depth === "expert" || depth === "deep") {
        const blocks: PlanBlock[] = ["background", "timeline", "causes", "effects"];
        if (text.includes("impact") || text.includes("today") || text.includes("future") || text.includes("change")) {
          blocks.push("historical_impact");
        }
        blocks.push("summary");
        return { blocks };
      }
      return { blocks: ["background", "timeline", "important_events", "summary"] };

    case "science_explanation":
    case "educational_lesson": // treating general learning similarly
      if (depth === "short") return { blocks: ["concept", "example"] };
      if (depth === "expert" || depth === "deep") {
        const blocks: PlanBlock[] = ["concept", "explanation", "principles", "example"];
        if (text.includes("real world") || text.includes("practical") || text.includes("use case") || text.includes("application")) {
          blocks.push("real_world_application");
        }
        blocks.push("summary");
        return { blocks };
      }
      return { blocks: ["concept", "explanation", "example", "key_points"] };

    case "emotional_support":
      if (depth === "short") return { blocks: ["acknowledgement", "support"] };
      if (depth === "expert" || depth === "deep") {
        const blocks: PlanBlock[] = ["acknowledgement", "reflection", "perspective", "support"];
        if (text.includes("what should i do") || text.includes("help me") || text.includes("advice") || text.includes("fix")) {
          blocks.push("action_steps");
        }
        return { blocks };
      }
      return { blocks: ["acknowledgement", "reflection", "support"] };

    case "business_strategy":
      if (depth === "short") return { blocks: ["heading", "analysis", "next_steps"] };
      return { blocks: ["heading", "analysis", "timeline", "next_steps"] };

    case "comparison":
      const compBlocks: PlanBlock[] = ["heading", "paragraph", "table"];
      if (text.includes("which is better") || text.includes("what should i choose") || text.includes("recommend") || text.includes("advice") || text.includes("best option")) {
        compBlocks.push("recommendation");
      }
      compBlocks.push("summary");
      return { blocks: compBlocks };

    case "step_by_step":
      return { blocks: ["heading", "steps", "tip", "summary"] };

    case "analytical_report":
      return { blocks: ["heading", "analysis", "list", "summary"] };

    case "creative_story":
      return { blocks: ["heading", "paragraph", "quote"] };

    case "conversational_acknowledgment":
      return { blocks: ["acknowledgement", "conversation", "next_steps"] };

    case "direct_answer":
    default:
      return { blocks: ["heading", "paragraph", "summary"] };
    }
  })();

  // Prepend Insight Blocks
  if (insightState) {
    if (insightState.activationMode === "FULL_INSIGHT") {
      basePlan.blocks.unshift("insight_evaluation");
    } else if (insightState.activationMode === "LIGHT_INSIGHT") {
      basePlan.blocks.unshift("light_evaluation");
    }
  }

  return basePlan;
}