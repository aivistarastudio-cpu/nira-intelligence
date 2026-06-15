let extractedText = "A".repeat(26000);
if (extractedText.length > 4000) {
  extractedText = extractedText.slice(0, 4000) + "\n\n[FILE TRUNCATED FOR REASONING EFFICIENCY]";
}
console.log(`Final size: ${extractedText.length}`);
console.log(`Ends with: ${extractedText.substring(extractedText.length - 50)}`);
