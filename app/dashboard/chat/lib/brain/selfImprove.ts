export function improveResponse(aiText: string): string {
  let improved = aiText.trim();
  const lower = improved.toLowerCase();

  /* -------------------------------
   ⚠️ GENERIC RESPONSE FIX (STRONG)
  -------------------------------- */
  improved = improved.replace(
    /it depends\.?|there are many ways\.?|you can\.?/gi,
    ""
  );

  /* -------------------------------
   ⚠️ TOO SHORT (SMART)
  -------------------------------- */
  if (improved.length < 60) {
    if (!/example|for example/i.test(lower)) {
      improved += "\n\nExample: ek simple case me samjho…";
    }
  }

  /* -------------------------------
   ⚠️ GUIDANCE CHECK (SMART)
  -------------------------------- */
  const hasSteps =
    /step|steps|process|👇|1\.|2\.|•|- /i.test(lower);

  if (!hasSteps && improved.length > 120) {
    improved +=
      "\n\nBreakdown 👇\n1. Core idea\n2. Kaise kaam karta hai\n3. Real use";
  }

  /* -------------------------------
   ⚠️ HUMAN TONE (CONTROLLED)
  -------------------------------- */
  const isAlreadyHuman =
    /samajh|dekho|simple|easy|socho/i.test(lower);

  if (!isAlreadyHuman && improved.length > 80) {
    improved = "simple tareeke se samajhte hain 👇\n\n" + improved;
  }

  /* -------------------------------
   ⚠️ REPETITION GUARD (NEW 🔥)
  -------------------------------- */
  if (improved.includes("Example:") && improved.includes("real example")) {
    improved = improved.replace(/real example/gi, "example");
  }

  /* -------------------------------
   ⚠️ CLEANUP (IMPORTANT)
  -------------------------------- */
  improved = improved
    .replace(/\n{3,}/g, "\n\n")   // extra spacing fix
    .replace(/\s{2,}/g, " ");     // double space fix

  return improved.trim();
}