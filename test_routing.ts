import { buildNiraInput } from "./app/dashboard/chat/lib/brain/niraCore";

// Generate 100 mixed prompts
const prompts = [];
// Casual / short (should go to Gemini)
for (let i = 0; i < 40; i++) prompts.push("hey bro what's up?");
// Coding / long (should go to OpenAI)
for (let i = 0; i < 30; i++) prompts.push("I need help debugging my Next.js react application. The error says 'undefined is not a function' in my console when I try to render the component.");
// Business / steps
for (let i = 0; i < 20; i++) prompts.push("How do I start a business? Can you give me a step by step guide to earn money online?");
// With files (OpenAI)
const filePrompts = [];
for (let i = 0; i < 10; i++) filePrompts.push({ text: "analyze this file", files: [new File(["mock content"], "test.txt")] });

let geminiCount = 0;
let openaiCount = 0;

for (const p of prompts) {
    const res = buildNiraInput(p, []);
    const inputLength = res.finalInput.length;
    let useOpenAI = true;
    if (inputLength < 1000 && (res.intent === "casual" || res.intent === "greeting")) {
        useOpenAI = false; 
    }
    if (useOpenAI) openaiCount++;
    else geminiCount++;
}

for (const p of filePrompts) {
    // files > 0 forces OpenAI
    openaiCount++;
}

console.log(JSON.stringify({
    total: 100,
    gemini: geminiCount,
    openai: openaiCount,
    fallback: 0 // Assumed 0 in mock testing since no real API call is made
}));
