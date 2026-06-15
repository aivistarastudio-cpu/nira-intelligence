const fs = require('fs');
const path = './app/dashboard/chat/lib/brain/niraCore.ts';
let code = fs.readFileSync(path, 'utf8');

// The bug is on line 660 where detectIntent uses primaryEmotion before it's declared
// The easy fix is to just move emotions up, or pass nothing to detectIntent there since it's an optional param.
code = code.replace(
  'const { intent: rawIntent, responseMode, domain } = detectIntent(cleanInput, primaryEmotion);',
  'const emotions = detectEmotion(cleanInput);\n  const primaryEmotion = emotions[0] || "normal";\n  const { intent: rawIntent, responseMode, domain } = detectIntent(cleanInput, primaryEmotion);'
);

// We need to remove the later duplicate emotion detection
code = code.replace(
  'const emotions = detectEmotion(cleanInput);\n  const primaryEmotion = emotions[0] || "normal";\n  const emoji = getEmotionEmoji(emotions) || "";',
  'const emoji = getEmotionEmoji(emotions) || "";'
);

// Also we need to make sure typeResult uses the domain.
code = code.replace(
  'const typeResult = detectResponseType(cleanInput);',
  'const typeResult = detectResponseType(intent, domain, responseMode);'
);

fs.writeFileSync(path, code);
