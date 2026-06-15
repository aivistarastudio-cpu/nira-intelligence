export function generateSuggestions(intent: string): string[] {
  if (!intent || intent === "casual") return [];

  switch (intent) {
    case "code":
      return [
        "Run the code",
        "Explain this code",
        "Fix errors",
        "Optimize code",
      ];

    case "steps":
      return [
        "Start step 1",
        "Explain next step",
        "Simplify steps",
        "Give checklist",
      ];

    case "explain":
      return [
        "Give example",
        "Explain simply",
        "Real life example",
        "Short summary",
      ];

    case "compare":
      return [
        "Best option bata",
        "Use case explain",
        "Pros cons detail",
        "Final verdict de",
      ];

    case "business":
      return [
        "Validate idea",
        "Find first customer",
        "Create MVP",
        "Monetization bata",
      ];

    default:
      return []; // 💥 NO FORCE SUGGESTIONS
  }
}