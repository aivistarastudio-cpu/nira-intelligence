import { formatResponse } from "./app/dashboard/chat/lib/format/formatter";

const tests = {
  roadmap: `**Roadmap:**
- 2024 - MVP Launch
- 2025 - Series A`,

  reactVue: `| Feature | React | Vue |
|---|---|---|
| Creator | Meta | Evan You |
| Type | Library | Framework |`,

  pricing: `| Plan | Price | Features |
|---|---|---|
| Starter | $0 | Basic |
| Pro | $20 | Advanced |`,

  checklist: `- [ ] Set up DB
- [x] Configure Auth
- [ ] Deploy`,

  quantum: `Quantum computing uses qubits.
⚠️ **Warning**: It is complex.`,

  supabase: `| Pros | Cons |
|---|---|
| Open Source | Less Ecosystem |
| PostgreSQL | Steep Learning |`
};

for (const [name, text] of Object.entries(tests)) {
  console.log(`\n\n--- TEST: ${name} ---`);
  console.log("RAW LLM:");
  console.log(text);
  console.log("AST:");
  console.log(JSON.stringify(formatResponse(text), null, 2));
}
