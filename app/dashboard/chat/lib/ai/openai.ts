import OpenAI from "openai";
import { AIResponse } from "./types";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type Message = {
  role: "user" | "assistant";
  content: string;
};

export async function callOpenAI(
  input: string | any[],
  history: Message[] = []
): Promise<AIResponse> {
  try {
    const formattedMessages: any[] = [];
    
    // Support multimodal vision array vs simple text
    if (Array.isArray(input)) {
      formattedMessages.push({ role: "user", content: input });
    } else {
      formattedMessages.push({ role: "system", content: input });
    }

    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",

      messages: [
        ...formattedMessages,
        ...history,
      ],

      temperature: 0.7,
    });

    let text = res.choices[0]?.message?.content || "";

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
      model: "gpt-4o-mini",
      provider: "openai",
    };

  } catch (err) {
    console.error("OpenAI Error:", err);
    throw new Error("OpenAI failed");
  }
}
