import { buildHumanPrompt } from "./app/dashboard/chat/lib/brain/humanizer";

const context = `
- Role: friend
- Response Style: conversational
- Mode: explanation
- Primary Emotion: happy
`;

const res = buildHumanPrompt("hello", context);
console.log(res);
