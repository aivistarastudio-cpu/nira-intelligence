export function normalizeText(input: string): string {
  if (!input) return "";

  return input
    .replace(/\r\n/g, "\n")       // Windows line-breaks fix
    .replace(/\r/g, "\n")         // Old Mac/Stray line-breaks fix
    .replace(/\t/g, "  ")         // Tabs → 2 spaces (Markdown standard)
    .replace(/\u00A0/g, " ")      // Non-breaking spaces → Normal spaces
    .replace(/\n{3,}/g, "\n\n")   // 🔥 NIRA FIX: AI ke multiple excessive empty lines ko limit kare
    .trim();
}