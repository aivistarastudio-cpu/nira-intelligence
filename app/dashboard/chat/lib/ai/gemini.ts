import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { AIResponse } from "./types";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

type Message = {
  role: "user" | "assistant";
  content: string;
};

export async function callGemini(
  input: string | (string | Part)[],
  history: Message[] = []
): Promise<AIResponse> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    let result;
    if (Array.isArray(input)) {
      const contents = [...input];
      if (history && history.length > 0) {
        const safeHistory = history.slice(-10);
        const historyText = safeHistory
          .map((msg) => `${msg.role}: ${msg.content}`)
          .join("\n");
        contents.push(`\n---------------------\n\nConversation:\n${historyText}`);
      }
      result = await model.generateContent(contents);
    } else {
      // 🧠 LIMIT HISTORY
      const safeHistory = history.slice(-10);

      // 📜 CONTEXT STRING
      const historyText = safeHistory
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n");

      // 🧠 FINAL PROMPT (NIRA CORE DIRECT 🔥)
      const prompt = `
${input}

---------------------

Conversation:
${historyText}
`;

      result = await model.generateContent(prompt);
    }

    const response = await result.response;
    let text = response.text() || "";

    // 🔧 CLEANUP
    text = text
      .replace(/^\s*\*\s+/gm, "- ")
      .replace(/^\s*[•]\s+/gm, "- ")
      .replace(/^\s*(\d+)\)\s+/gm, "$1. ")
      .replace(/\|\|+/g, "|")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    return {
      text,
      model: "gemini-1.5-flash",
      provider: "gemini",
    };

  } catch (err) {
    console.error("Gemini Error:", err);
    throw new Error("Gemini failed");
  }
}