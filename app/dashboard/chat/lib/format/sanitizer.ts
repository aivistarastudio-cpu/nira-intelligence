export function sanitizeInput(input: string): string {
  if (!input) return "";

  return input
    .replace(/\r\n/g, "\n") // 🔥 FIX: Windows carriage returns ko normal '\n' banaye
    .replace(/\r/g, "\n")   // 🔥 FIX: Stray '\r' ko bhi saaf kare (Stops regex bugs)
    .replace(/\u0000/g, "") // Null bytes (security threat) remove
    .replace(/[\u200B-\u200D\uFEFF]/g, "") // Zero-width invisible chars remove
    .replace(/\s+$/, ""); // Aakhiri ke faltu empty spaces hata de
}