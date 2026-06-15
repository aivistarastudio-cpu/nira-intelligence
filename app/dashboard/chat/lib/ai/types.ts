export type AIResponse =
  | {
      text: string;
      model: string;
      provider: "openai";
    }
  | {
      text: string;
      model: string;
      provider: "gemini";
    }
  | {
      text: string;
      model: "error";
      provider: "system";
    };
