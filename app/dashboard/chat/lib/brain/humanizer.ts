import { identityRules } from "./promptSections/identityRules";
import { formattingRules } from "./promptSections/formattingRules";
import { toneAndLanguage } from "./promptSections/toneAndLanguage";
import { emotionAndFlow } from "./promptSections/emotionAndFlow";
import { teachingAndLogic } from "./promptSections/teachingAndLogic";

// Advanced Premium NIRA Modules (Phase 1)
import { responsePlanning } from "./promptSections/responsePlanning";
import { structureRules } from "./promptSections/structureRules";
import { readabilityRules } from "./promptSections/readabilityRules";
import { reasoningRules } from "./promptSections/reasoningRules";
import { decisionMakingRules } from "./promptSections/decisionMakingRules";
import { summaryRules } from "./promptSections/summaryRules";
import { recommendationRules } from "./promptSections/recommendationRules";
import { comparisonRules } from "./promptSections/comparisonRules";

// Advanced Premium NIRA Modules (Phase 2)
import { contextRules } from "./promptSections/contextRules";
import { memoryRules } from "./promptSections/memoryRules";
import { personalizationRules } from "./promptSections/personalizationRules";
import { behaviorRules } from "./promptSections/behaviorRules";
import { explanationRules } from "./promptSections/explanationRules";
import { criticalThinkingRules } from "./promptSections/criticalThinkingRules";
import { tradeoffRules } from "./promptSections/tradeoffRules";
import { responseValidationRules } from "./promptSections/responseValidationRules";

// Advanced Premium NIRA Modules (Phase 2.5 - Advanced Intelligence)
import { factCheckRules } from "./promptSections/factCheckRules";
import { confidenceRules } from "./promptSections/confidenceRules";
import { hallucinationRules } from "./promptSections/hallucinationRules";
import { nextStepRules } from "./promptSections/nextStepRules";
import { actionStepRules } from "./promptSections/actionStepRules";
import { niraInsightRules } from "./promptSections/niraInsightRules";
import { niraAnalysisRules } from "./promptSections/niraAnalysisRules";
import { niraStrategyRules } from "./promptSections/niraStrategyRules";

function extractContextValue(context: string, key: string): string {
  const regex = new RegExp(`(?:-|\\*|\\s|^)${key}\\s*:\\s*([^\\n\\r]+)`, "i");
  const match = context.match(regex);
  return match ? match[1].trim() : "";
}

export function buildHumanPrompt(
  userInput: string,
  systemContext: string = ""
) {
  const role = extractContextValue(systemContext, "Role");
  const responseStyle = extractContextValue(systemContext, "Response Style");
  const responseLength = extractContextValue(systemContext, "Response Length");
  const reasoningDepth = extractContextValue(systemContext, "Reasoning Depth");
  const answerStrategy = extractContextValue(systemContext, "Answer Strategy");
  const primaryEmotion = extractContextValue(systemContext, "Primary Emotion");
  const mode = extractContextValue(systemContext, "Mode");
  const intent = extractContextValue(systemContext, "Intent");
  const complexity = extractContextValue(systemContext, "Complexity");
  const domain = extractContextValue(systemContext, "Domain") || "general";
  const requiresDiscovery = extractContextValue(systemContext, "Requires Discovery") === "true";
  const activationMode = extractContextValue(systemContext, "Activation Mode");

  // --- Phase 8.5: Insight Engine Evaluation Layer ---
  let insightInstruction = "";
  if (activationMode === "FULL_INSIGHT") {
    insightInstruction = `
━━━━━━━━━━━━━━━━━━━
🧠 INSIGHT ENGINE (FULL EVALUATION ACTIVE)
━━━━━━━━━━━━━━━━━━━
CRITICAL RULE: You MUST begin your response with an "Insight Evaluation" block. 
It must be formatted exactly as follows at the very top of your output:

Observation: [1-2 sentences on what is actually happening or being asked]
Significance: [Why does this matter?]
Risk: [Identify 1-2 potential risks, blockers, or regressions]
Recommendation: [What should the user do strategically?]
Verdict: [Final ruling or next step]
Confidence: [Percentage]

Do not use markdown headers for these fields, just the bold text (e.g., **Observation:**). 
After this block, proceed with the rest of the Response Plan.
`;
  } else if (activationMode === "LIGHT_INSIGHT") {
    insightInstruction = `
━━━━━━━━━━━━━━━━━━━
🧠 INSIGHT ENGINE (LIGHT EVALUATION ACTIVE)
━━━━━━━━━━━━━━━━━━━
Before answering the main question, provide a brief 1-2 sentence analytical observation of the situation.
`;
  }

  // --- Phase 4.1: Variability Engine ---
  let roleInstruction = "";
  if (role) {
    const roleDetails: Record<string, string[]> = {
      friend: [
        "Speak like a warm, supportive teammate. Use friendly, informal Hinglish.",
        "Act as an empathetic friend. Start with a grounding, validating statement before offering advice.",
        "Use a highly conversational, relaxed tone. Validate their feelings immediately."
      ],
      teacher: [
        "Act as an educational mentor. Break down concepts patiently.",
        "Assume the role of an inspiring teacher. Focus on 'why' before 'how'.",
        "Be an encouraging guide. Use clear structure and pedagogical steps."
      ],
      engineer: [
        "Act as a senior software architect. Focus on scalable code and direct technical details. Skip introductory chat.",
        "Be a precise technical lead. Provide code-first solutions with minimal fluff.",
        "Adopt an engineering mindset: trade-offs, architecture, and exact syntax."
      ],
      analyst: [
        "Act as a structured analyst. Use data-driven comparison and precise logic.",
        "Be a highly analytical consultant. Weigh pros and cons objectively."
      ],
      researcher: [
        "Act as an evidence-based researcher. Focus on literature context.",
        "Adopt an academic tone. Prioritize empirical evidence and conceptual depth."
      ],
      planner: [
        "Act as a roadmap planner. Organize around clear progressive milestones.",
        "Be a strategic project manager. Focus on actionable phases and checklists."
      ],
      creator: [
        "Act as a UI/UX creator. Focus on aesthetics and design patterns.",
        "Be a creative director. Emphasize layout, user experience, and visual balance."
      ],
      advisor: [
        "Act as a strategic advisor. Deliver practical business suggestions and ROI metrics.",
        "Be a pragmatic executive coach. Focus on high-level tradeoffs and actionable decisions."
      ]
    };
    const options = roleDetails[role.toLowerCase()] || ["Support the user logically and calmly."];
    // Deterministic random based on user input length to ensure stable streaming
    const rIndex = userInput.length % options.length;
    roleInstruction = `- Active Persona [${role}]: ${options[rIndex]}`;
  }

  let emotionInstruction = "";
  if (primaryEmotion) {
    const emotionDetails: Record<string, string[]> = {
      frustrated: [
        "Acknowledge frustration calmly (e.g., 'Tension mat lo, isko clear karte hain...') and jump directly to a reliable fix.",
        "Validate their annoyance briefly, then immediately provide the solution.",
        "Keep empathy short and solution-focused to respect their urgency."
      ],
      confused: [
        "Simplify concepts. Use step-by-step spacing, lots of clear paragraphs, and avoid advanced jargon.",
        "Reassure them that this is a common point of confusion. Break it down gently.",
        "Take a slow, pedagogical pace to rebuild their understanding from first principles."
      ],
      excited: [
        "Match their positive energy with slight enthusiasm and positive connectors.",
        "Reflect their excitement. Use an upbeat, energetic tone."
      ],
      sad: [
        "Use supportive, soft phrasing. Avoid cold technical jargon.",
        "Validate their sadness warmly. Do not rush to 'fix' it if they just need to be heard.",
        "Adopt a highly empathetic, gentle tone. Ground them emotionally first."
      ],
      urgent: [
        "Skip empathy and intros entirely. Deliver the most probable direct fix in the first sentence.",
        "Immediate action required. Zero fluff, maximum directness."
      ],
      curious: [
        "Encourage exploration, pointing out deeper aspects they can investigate.",
        "Foster their curiosity by hinting at advanced edge cases they might find interesting."
      ]
    };
    const options = emotionDetails[primaryEmotion.toLowerCase()] || ["Respond naturally."];
    const rIndex = (userInput.length + 1) % options.length;
    emotionInstruction = `- Emotion Context [${primaryEmotion}]: ${options[rIndex]}`;
  }

  // --- Phase 4.2: Targeted Socratic Engine ---
  let socraticInstruction = "";
  if (requiresDiscovery) {
    socraticInstruction = `
━━━━━━━━━━━━━━━━━━━
❓ SOCRATIC DISCOVERY ENGINE (ACTIVE)
━━━━━━━━━━━━━━━━━━━
The user's query represents a broad or ambiguous goal.
DO NOT provide a full, exhaustive solution or generic roadmap yet.
Instead:
1. Acknowledge the ambition warmly.
2. Provide exactly 1-2 intelligent discovery questions to narrow down their specific context (e.g., budget, industry, constraints, background).
3. Offer a brief, high-level overview.
`;
  }

  // --- Phase 4.3: Context-Aware Teaching Style Engine ---
  let pedagogyInstruction = "";
  if (!requiresDiscovery && (primaryEmotion === "confused" || mode === "teach" || intent === "learn")) {
    let teachingMode = "Analogy";
    // Context-Aware Selection
    if (domain === "history") teachingMode = "Story";
    else if (domain === "science") teachingMode = "Visualization";
    else if (domain === "business") teachingMode = "Scenario";
    else if (role === "engineer" || domain === "engineering") teachingMode = "Mental Model";
    else if (role === "teacher" || intent === "learn") teachingMode = "Analogy";

    if (teachingMode === "Analogy") {
      pedagogyInstruction = `
━━━━━━━━━━━━━━━━━━━
🧩 TEACHING MODE: ANALOGY
━━━━━━━━━━━━━━━━━━━
Introduce a simple, intuitive real-world analogy to clarify complex concepts (e.g., API ➔ Waiter). Ensure it is concise (1-2 sentences), then transition smoothly.
`;
    } else if (teachingMode === "Story") {
      pedagogyInstruction = `
━━━━━━━━━━━━━━━━━━━
📜 TEACHING MODE: STORY
━━━━━━━━━━━━━━━━━━━
Frame the explanation as an engaging historical or chronological narrative. Describe the events sequentially like a storyteller rather than an encyclopedia.
`;
    } else if (teachingMode === "Visualization") {
      pedagogyInstruction = `
━━━━━━━━━━━━━━━━━━━
👁️ TEACHING MODE: VISUALIZATION
━━━━━━━━━━━━━━━━━━━
Ask the user to mentally picture a physical structure, grid, or specific visual scene that explains the mechanics before providing the technical details.
`;
    } else if (teachingMode === "Scenario") {
      pedagogyInstruction = `
━━━━━━━━━━━━━━━━━━━
🏢 TEACHING MODE: SCENARIO
━━━━━━━━━━━━━━━━━━━
Create a brief, practical scenario (e.g., "Imagine you are running a coffee shop...") to contextualize abstract ideas into a real-world business or usage case.
`;
    } else if (teachingMode === "Mental Model") {
      pedagogyInstruction = `
━━━━━━━━━━━━━━━━━━━
🧠 TEACHING MODE: MENTAL MODEL
━━━━━━━━━━━━━━━━━━━
Apply advanced cognitive models (e.g., 80/20 rule, systems thinking, first principles) to frame the solution cleanly for an advanced mindset.
`;
    }
  }

  // --- Phase 4.4: Dynamic Closing & Memory Hook ---
  let closingInstruction = "";
  // Priority 2: Emotional Support
  const hasEmotionalWords = ["sad", "angry", "frustrated", "anxious", "scared", "lost in life"].some(w => userInput.includes(w));
  if (!userInput.includes("math") && !userInput.includes("error") && !userInput.includes("bug")) {
    if (hasEmotionalWords || (primaryEmotion && ["sad", "angry", "frustrated", "anxious", "scared"].includes(primaryEmotion))) {
      closingInstruction = "- Dynamic Closing: End with a grounding, supportive statement that reinforces the user's progress and potential.";
    }
  }

  // Default closings for educational, strategic, or long-form
  if (!closingInstruction && !requiresDiscovery && (intent === "learn" || intent === "business" || responseLength === "long")) {
    const closings = [
      "End by asking if they want to see an advanced edge-case or example.",
      "End by asking a thought-provoking follow-up question related to their goal.",
      "End by asking if they want to dive deeper into a specific step.",
      "End by offering a real-world case study or practice scenario."
    ];
    const rIndex = (userInput.length + 2) % closings.length;
    closingInstruction = `- Dynamic Closing: ${closings[rIndex]} (Optional, do not force it if it feels unnatural)`;
  }

  let memoryInstruction = "";
  if (userInput && userInput.includes("Conversation:\n")) {
    memoryInstruction = `
━━━━━━━━━━━━━━━━━━━
🔄 CONVERSATION MEMORY HOOK
━━━━━━━━━━━━━━━━━━━
Prior context detected. Reference it naturally. Do not repeat known information. Pick up right where the conversation left off.
`;
  }

  let strategyInstruction = "";
  if (answerStrategy) {
    const strategyDetails: Record<string, string> = {
      direct: "Deliver the direct answer or solution immediately at the top without any introductory remarks.",
      explain_first: "Explain the background context and reasoning first before delivering the final answer or summary.",
      solution_first: "Provide the executable code or direct fix FIRST. Add conceptual details and explanation below.",
      compare_first: "Start by comparing the options (using tables or structured bullets) before diving into details.",
      research_first: "Present empirical evidence or research context first, followed by key lessons and conclusions.",
      plan_first: "Show the roadmap or step-by-step checklist first, then discuss details of each step."
    };
    strategyInstruction = `- Answer Strategy [${answerStrategy}]: ${strategyDetails[answerStrategy.toLowerCase()] || ""}`;
  }

  // --- Phase 4.5: Conversation Understanding Layer ---
  let understandingInstruction = "";
  if (intent === "acknowledgment") {
    understandingInstruction = `
━━━━━━━━━━━━━━━━━━━
🤝 CONVERSATION UNDERSTANDING LAYER (ACTIVE)
━━━━━━━━━━━━━━━━━━━
The user has provided a short conversational reply (e.g., ha, yes, ok, hmm). 
CRITICAL RULE: NEVER answer with a rapid-fire interview-style question.
Instead, strictly follow this flow:
1. REACTION: Start with a natural, human-like reaction validating their input.
2. UNDERSTANDING: Naturally reference the previous context to show you understand what they are agreeing/reacting to.
3. GUIDANCE: Briefly offer the next step or reassurance without an overwhelming explanation.
4. QUESTION: End with a gentle check-in (e.g., "Aage badhein?", "Should we try this?", "Does that sound good?")
`;
  }


  let lengthInstruction = "";
  if (responseLength) {
    const lengthDetails: Record<string, string> = {
      short: "Keep the output highly concise, limiting it to a single direct block or 2-4 lines.",
      medium: "Provide a balanced, structured response with short paragraphs and bullet points.",
      long: "Provide a detailed, complete explanation with deep architecture details, code snippets, and edge cases."
    };
    lengthInstruction = `- Length Restriction [${responseLength}]: ${lengthDetails[responseLength.toLowerCase()] || ""}`;
  }

  let depthInstruction = "";
  if (reasoningDepth) {
    const depthDetails: Record<string, string> = {
      short: "Keep reasoning minimal. Deliver the answer quickly and directly.",
      medium: "Provide balanced reasoning with key explanations and practical insights.",
      deep: "Explain internal mechanics, trade-offs, edge cases, and implementation details.",
      expert: "Provide architecture-level reasoning, scalability concerns, production guidance, optimization opportunities, trade-offs, and advanced engineering insights."
    };
    depthInstruction = `- Reasoning Depth [${reasoningDepth}]: ${depthDetails[reasoningDepth.toLowerCase()] || ""}`;
  }

  const dynamicFormattingInstruction = `
FORMATTING RULES:
- Use headings for major sections.
- Use bullet points instead of long walls of text.
- Use Step 1, Step 2 format for tutorials.
- Use markdown tables for comparisons.
- Use Summary: for final takeaways.

When relevant:
Metric: Name = Value

Stats:
Users: 5000
Revenue: ₹10L

Timeline:
2025 - Launch
2026 - Growth

NIRA Insight:
Short expert recommendation.

Avoid giant paragraphs.
`;

  return `[SYSTEM INSTRUCTION ENGINE]
Execute response adhering to the following state constraints:
{
  "role": "${roleInstruction.trim() || 'assistant'}",
  "strategy": "${strategyInstruction.trim() || 'standard'}",
  "length": "${lengthInstruction.trim() || 'medium'}",
  "depth": "${depthInstruction.trim() || 'standard'}",
  "emotion": "${emotionInstruction.trim() || 'neutral'}",
  "formatting": "${dynamicFormattingInstruction.trim() || 'markdown'}",
  "pedagogy": "${pedagogyInstruction.trim() || 'none'}",
  "socratic": "${socraticInstruction.trim() || 'false'}",
  "closing": "${closingInstruction.trim() || 'none'}"
}
${understandingInstruction}
${insightInstruction}
${memoryInstruction}`;
}