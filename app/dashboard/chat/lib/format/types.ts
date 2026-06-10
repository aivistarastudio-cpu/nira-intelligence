export type ListItem = {
  text: string;
  index?: number; // 🔥 ADDED: For tracking ordered list numbers correctly
  children?: ListItem[];
};

export type StepItem = {
  title: string;
  items: string[];
};

export type Block = { id?: string } & (
  | {
      type: "heading";
      content: string;
      level?: 1 | 2 | 3 | 4 | 5 | 6;
    }
  | {
      type: "paragraph";
      content: string;
    }
  | {
      type: "list";
      items: ListItem[];
      ordered?: boolean;
    }
  | {
      type: "code";
      content: string;
      lang?: string;
    }
  | {
      type: "quote";
      content: string;
    }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
    }
  | {
      type: "divider";
    }
  | {
      type: "warning";
      content: string;
    }
  | {
      type: "tip";
      content: string;
    }
  | {
      type: "info";
      content: string;
    }
  | {
      type: "success";
      content: string;
    }
  | {
      type: "highlight";
      content: string;
      variant?: "default" | "important" | "warning" | "success";
    }
  | {
      type: "summary";
      content: string;
    }
  | {
      type: "checklist";
      items: {
        text: string;
        checked: boolean;
      }[];
    }
  | {
      type: "steps";
      steps: StepItem[];
    }
  | {
      type: "faq";
      items: {
        question: string;
        answer: string;
      }[];
    }
  | {
      type: "math";
      content: string;
    }
  | {
      type: "emoji";
      emoji: string;
      content: string;
    }

  /* ==========================
     🚀 NIRA PREMIUM BLOCKS
  ========================== */

  | {
      type: "metric";
      title: string;
      value: string;
    }

  | {
      type: "stats";
      items: {
        label: string;
        value: string;
      }[];
    }

  | {
      type: "timeline";
      items: {
        year: string;
        label: string;
      }[];
    }

  | {
      type: "niraInsight";
      content: string;
    }

  | {
      type: "image";
      query: string;
    }

  /* ==========================
     🗺️ NIRA MAP BLOCK
  ========================== */

  | {
      type: "map";
      title: string;
      address: string;
      lat: number;
      lng: number;
      zoom?: number;
      placeId?: string;
    }

  /* ==========================
     🚀 PHASE 3.1 REUSABLE BLOCKS
  ========================== */

  | {
      type: "infoBlock";
      subType: "concept" | "explanation" | "background" | "principles" | "derivation" | "root_cause" | "optimization" | "historical_impact" | "real_world_application" | "acknowledgement" | "reflection" | "perspective" | "event" | "analysis" | "conversation";
      content: string;
    }
  | {
      type: "highlightListBlock";
      subType: "key_points" | "important_events" | "next_steps" | "action_steps" | "key_facts" | "causes" | "effects";
      content: string;
    }
  | {
      type: "calloutBlock";
      subType: "answer" | "recommendation" | "best_practice" | "fix" | "support";
      content: string;
    }
  | {
      type: "formulaBlock";
      subType: "formula";
      content: string;
    }
  | {
      type: "exampleBlock";
      subType: "example";
      content: string;
    }
  | {
      type: "problemBlock";
      subType: "problem";
      content: string;
    }
);