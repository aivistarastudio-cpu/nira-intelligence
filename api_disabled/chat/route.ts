export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { callAI } from "@/app/dashboard/chat/lib/ai/router";
import { chunkDocument } from "@/app/dashboard/chat/lib/brain/rag/chunker";
import { vectorStore } from "@/app/dashboard/chat/lib/brain/rag/vectorStore";
import pdfParse from "pdf-parse";

/* ================================
🧠 TYPE SAFE RESULT
================================ */
type AIResult = {
  text?: string;
  provider?: string;
  model?: string;
  intent?: string;
  suggestions?: unknown;
  responseMode?: "solution" | "explanation";
};

export async function POST(req: Request) {
  try {
    /* -------------------------------
    🧠 FORM DATA
    -------------------------------- */
    const formData = await req.formData();

    const userInput = String(formData.get("message") || "").trim();
    const userId = String(formData.get("userId") || "00000000-0000-0000-0000-000000000000").trim();
    const projectId = formData.get("projectId") ? String(formData.get("projectId")) : undefined;

    let messages: any[] = [];
    try {
      messages = JSON.parse(
        (formData.get("messages") as string) || "[]"
      );
    } catch {
      messages = [];
    }

    const files = formData.getAll("files") as File[];

    console.log("📎 FILES RECEIVED:", files);

    /* -------------------------------
    ❌ VALIDATION
    -------------------------------- */
    if (!userInput && files.length === 0) {
      return NextResponse.json(
        { text: "Message missing ❌" },
        { status: 400 }
      );
    }

    /* -------------------------------
    🧠 ENHANCED INPUT (MULTI FILE)
    -------------------------------- */
    let enhancedInput =
      userInput || "User sent files. Analyze everything carefully.";

    if (files.length > 0) {
      let fileContext = "";

      for (const file of files) {
        const isTextFile =
          file.type.includes("text") ||
          file.type.includes("json") ||
          file.type.includes("javascript") ||
          file.type.includes("typescript") ||
          file.name.endsWith(".ts") ||
          file.name.endsWith(".tsx") ||
          file.name.endsWith(".js") ||
          file.name.endsWith(".json") ||
          file.name.endsWith(".css") ||
          file.name.endsWith(".html") ||
          file.name.endsWith(".d.ts");

        /* -------------------------------
        🖼️ IMAGE (SAFE VERSION)
        -------------------------------- */
        if (file.type.startsWith("image/")) {
          fileContext += `
[IMAGE: ${file.name}]
(User uploaded an image. Please analyze it visually as it is attached to your prompt).
`;
        }

        /* -------------------------------
        📄 TEXT / CODE FILE
        -------------------------------- */
        else if (isTextFile) {
          try {
            const text = await file.text();

            fileContext += `
[FILE: ${file.name}]
${text.slice(0, 3000)}
`;
          } catch {
            fileContext += `
[FILE: ${file.name}]
Could not read file content.
`;
          }
        }

        /* -------------------------------
        📄 PDF TEXT EXTRACTION
        -------------------------------- */
        else if (file.type === "application/pdf") {
          try {
            const arrayBuf = await file.arrayBuffer();
            const pdfData = await pdfParse(Buffer.from(arrayBuf));
            
            // Fix Next.js stream exhaustion: Replace the file with a memory-backed File
            // so router.ts can call .arrayBuffer() again for native Gemini forwarding.
            const idx = files.indexOf(file);
            if (idx !== -1) {
              files[idx] = new File([arrayBuf], file.name, { type: file.type });
            }
            
            let extractedText = pdfData.text ? pdfData.text : "No text found in PDF";
            
            // Phase 10: RAG Integration
            const chunks = chunkDocument(extractedText, file.name, file.name, 500, 50);
            await vectorStore.addChunks(chunks, userId, projectId);

            fileContext += `
[System Note: The user uploaded a document named '${file.name}'. Its extracted text has been provided to you in the RAG KNOWLEDGE BASE section of your system prompt. Do NOT say you cannot read PDFs. You MUST read the RAG KNOWLEDGE BASE to answer their question.]
`;
          } catch (err: any) {
            console.error("PDF Parsing Error:", err);
            fileContext += `
[PDF DOCUMENT: ${file.name}]
Note: Failed to extract text from this PDF.
Error Details: ${err?.message || String(err)}
`;
          }
        }
        /* -------------------------------
        📦 OTHER FILE
        -------------------------------- */
        else {
          fileContext += `
[FILE: ${file.name}]
Type: ${file.type}

User uploaded this file.

IMPORTANT:
- Unknown format
- Do NOT hallucinate
- Ask for clarification if needed
`;
        }
      }

      enhancedInput = `
User message:
${userInput || "User sent files"}

Files data:
${fileContext}

Instructions:
- Analyze ALL files carefully
- Combine with user message
- Give ONE clear smart answer
- If something is unclear, say it honestly
- NEVER assume missing data
- NEVER hallucinate
`;
    }

    console.log("🧠 FINAL INPUT:", enhancedInput.slice(0, 300));

    /* -------------------------------
    ⚡ CALL AI
    -------------------------------- */
   const result = (await callAI(
  enhancedInput,
  messages,
  files,
  userId,
  projectId
)) as AIResult;

    /* -------------------------------
    🧠 SAFE RESPONSE
    -------------------------------- */
    const rawText =
      typeof result.text === "string" && result.text.trim()
        ? result.text
        : "No response generated";

    const intent =
      typeof result.intent === "string"
        ? result.intent
        : "explain";

    const suggestions =
      Array.isArray(result.suggestions)
        ? result.suggestions.filter(
            (s: unknown): s is string => typeof s === "string"
          )
        : [];

    const responseMode: "solution" | "explanation" =
      result.responseMode === "solution"
        ? "solution"
        : "explanation";

    /* -------------------------------
    📦 FINAL RESPONSE
    -------------------------------- */
    return NextResponse.json({
      text: rawText,
      provider: result.provider ?? "unknown",
      model: result.model ?? "unknown",
      intent,
      suggestions,
      responseMode,
    });

  } catch (err: any) {
    console.error("❌ API ERROR:", err);

    return NextResponse.json(
      {
        text: "Thoda issue aa gaya… ek baar fir try kar 🙏",
        responseMode: "explanation",
      },
      { status: 500 }
    );
  }
}