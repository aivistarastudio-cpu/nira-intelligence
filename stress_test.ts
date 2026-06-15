import { formatResponse } from "./app/dashboard/chat/lib/format/formatter";
import { performance } from "perf_hooks";

const prompts: { category: string; expectedAST: string; text: string }[] = [];

// Helper to add prompts
function add(category: string, expectedAST: string, text: string) {
  prompts.push({ category, expectedAST, text });
}

// 1-5: Casual Chat
add("Casual Chat", "paragraph", "Hey! How is your day going?");
add("Casual Chat", "paragraph", "That sounds like a great idea! Let's do it.");
add("Casual Chat", "paragraph", "I'm not sure what you mean, can you clarify?");
add("Casual Chat", "paragraph", "Haha, yeah I totally agree with you on that.");
add("Casual Chat", "paragraph", "Good morning! Ready to tackle some tasks?");

// 6-10: Emotional Chat
add("Emotional Chat", "paragraph", "I understand how frustrating that can be. I'm here for you.");
add("Emotional Chat", "paragraph", "That is so exciting! I'm really happy for you!");
add("Emotional Chat", "paragraph", "I'm sorry you are feeling down. Take a deep breath.");
add("Emotional Chat", "paragraph", "Wow, that must have been a very stressful situation.");
add("Emotional Chat", "paragraph", "You've got this! Don't let the anxiety take over.");

// 11-15: Startup Planning
add("Startup Planning", "list", "Here are 3 ideas:\n- AI Tool\n- SaaS App\n- Marketplace");
add("Startup Planning", "stats", "Stats:\nUsers: 10K\nMRR: $5K\nChurn: 2%");
add("Startup Planning", "metric", "Metric:\nCAC | $150");
add("Startup Planning", "list", "1. Define MVP\n2. Get Funding\n3. Launch");
add("Startup Planning", "paragraph", "Focusing on customer retention is key for your startup.");

// 16-20: Roadmaps
add("Roadmaps", "timeline", "Roadmap:\n2024 - Beta\n2025 - Global Launch");
add("Roadmaps", "timeline", "### Roadmap:\nQ1 - Design\nQ2 - Build\nQ3 - Launch");
add("Roadmaps", "timeline", "**Timeline:**\nPhase 1 - Discovery\nPhase 2 - Execution");
add("Roadmaps", "timeline", "Step-by-Step Progression:\nStep 1 - Idea\nStep 2 - MVP");
add("Roadmaps", "timeline", "Timeline:\n2023 - Seed\n2024 - Series A");

// 21-25: Checklists
add("Checklists", "checklist", "- [ ] Review Code\n- [ ] Run Tests");
add("Checklists", "checklist", "- [x] Fix Bug\n- [ ] Deploy");
add("Checklists", "checklist", "- [v] Write Docs\n- [ ] Update README");
add("Checklists", "checklist", "- [ ] Setup CI\n- [ ] Configure DB");
add("Checklists", "checklist", "Here is your task list:\n- [ ] Task 1\n- [ ] Task 2");

// 26-30: Comparisons
add("Comparisons", "table", "| React | Vue |\n|---|---|\n| JSX | Templates |");
add("Comparisons", "table", "| Pros | Cons |\n|---|---|\n| Fast | Complex |");
add("Comparisons", "table", "### React vs Angular\n| Feature | React | Angular |\n|---|---|---|\n| Binding | 1-way | 2-way |");
add("Comparisons", "table", "| Advantages | Disadvantages |\n|---|---|\n| Cheap | Slow |");
add("Comparisons", "table", "| Next.js | Remix |\n|---|---|\n| RSC | Loaders |");

// 31-35: Pricing Tables
add("Pricing Tables", "table", "| Plan | Price | Features |\n|---|---|---|\n| Pro | $10 | All |");
add("Pricing Tables", "table", "| Tier | Cost | Support |\n|---|---|---|\n| Basic | Free | Community |");
add("Pricing Tables", "table", "| Starter | Growth | Enterprise |\n|---|---|---|\n| $0 | $49 | Custom |");
add("Pricing Tables", "table", "| Feature | Free | Paid |\n|---|---|---|\n| API | No | Yes |");
add("Pricing Tables", "table", "| Monthly | Annual |\n|---|---|\n| $10 | $100 |");

// 36-40: Code Generation
add("Code Generation", "code", "```javascript\nconsole.log('Hello');\n```");
add("Code Generation", "code", "Here is the code:\n```python\nprint('Hi')\n```");
add("Code Generation", "code", "```rust\nfn main() {}\n```\nDone.");
add("Code Generation", "code", "Try this snippet:\n```bash\nnpm install\n```");
add("Code Generation", "code", "```html\n<div>Test</div>\n```");

// 41-45: Technical Explanations
add("Technical Explanations", "warning", "⚠️ **Warning**: Memory leaks can occur here.");
add("Technical Explanations", "tip", "💡 **Tip**: Use memoization.");
add("Technical Explanations", "faq", "### FAQ\nQ: What is closure?\nA: Function + scope.");
add("Technical Explanations", "math", "Formula:\n$$E=mc^2$$");
add("Technical Explanations", "paragraph", "A pure function always returns the same output for the same input.");

// 46-50: Long-form Educational Content
add("Long-form Educational Content", "heading", "## Chapter 1: Introduction\nWelcome to the course.");
add("Long-form Educational Content", "quote", "> Knowledge is power.");
add("Long-form Educational Content", "highlight", "👉 Important: Read this twice.");
add("Long-form Educational Content", "summary", "Summary:\nThis covers the basics of physics.");
add("Long-form Educational Content", "niraInsight", "NIRA Insight: The universe is expanding.");


let successCount = 0;
let fallbackCount = 0;
let incorrectCount = 0;
let errorCount = 0;
const startTotal = performance.now();

for (let i = 0; i < prompts.length; i++) {
  const p = prompts[i];
  let blocks;
  try {
    const start = performance.now();
    blocks = formatResponse(p.text);
    const end = performance.now();
    
    // Check what AST blocks were generated
    const hasExpected = blocks.some(b => b.type === p.expectedAST);
    const allParagraphs = blocks.every(b => b.type === "paragraph");

    if (hasExpected) {
      successCount++;
    } else if (allParagraphs && p.expectedAST !== "paragraph") {
      fallbackCount++;
      console.log(`Fallback at #${i+1}: expected ${p.expectedAST}, got paragraphs.`);
    } else {
      incorrectCount++;
      console.log(`Incorrect at #${i+1}: expected ${p.expectedAST}, got ${blocks.map(b => b.type).join(", ")}`);
    }
  } catch (err) {
    errorCount++;
    console.error(`Error at #${i+1}`, err);
  }
}

const endTotal = performance.now();
const timeTaken = endTotal - startTotal;

console.log("\n--- STRESS TEST REPORT ---");
console.log(`1. Total prompts tested: ${prompts.length}`);
console.log(`2. Successful formatter detections: ${successCount}`);
console.log(`3. Fallback-to-paragraph count: ${fallbackCount}`);
console.log(`4. Incorrect block detections: ${incorrectCount}`);
console.log(`5. Rendering failures: (Measured AST consistency: ${errorCount} crashes)`);
console.log(`6. Console errors: ${errorCount}`);
console.log(`7. Performance impact: ${timeTaken.toFixed(2)}ms total (${(timeTaken/prompts.length).toFixed(2)}ms per prompt average)`);
console.log(`Success Rate: ${((successCount / prompts.length) * 100).toFixed(1)}%`);

