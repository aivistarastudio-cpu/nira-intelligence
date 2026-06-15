import { buildNiraInput } from "./app/dashboard/chat/lib/brain/niraCore";

const testCases = [
  "hey what's up?", 
  "I've got a bug in my React code, it says undefined is not a function",
  "Can you explain the history of the Roman Empire?"
];

console.log("=== NIRA PIPELINE VALIDATION ===\n");

for (const text of testCases) {
   const res = buildNiraInput(text, []);
   console.log(`Input: "${text}"`);
   console.log(`Intent: ${res.intent}`);
   console.log(`Response Mode: ${res.responseMode}`);
   
   // Token check logic from router
   const inputLength = res.finalInput.length;
   let useOpenAI = true;
   if (inputLength < 1000 && (res.intent === "casual" || res.intent === "greeting")) {
       useOpenAI = false; 
   }
   console.log(`Routed To: ${useOpenAI ? 'OpenAI GPT-4o' : 'Gemini Flash'}`);
   console.log(`Final Input Length (bytes): ${inputLength}`);
   console.log("------------------------\n");
}
