const fs = require('fs');
let content = fs.readFileSync('app/dashboard/chat/lib/brain/niraCore.ts', 'utf8');

const target = `  const typeResult = detectResponseType(
    rawIntent,
    responseMode,
    cleanInput,
    primaryEmotion
  );
  typeResult.responseType,
  userProfile.skillLevel
);`;

const replacement = `  const typeResult = detectResponseType(
    rawIntent,
    responseMode,
    cleanInput,
    primaryEmotion
  );

  const responsePlan = createResponsePlan(
    typeResult.responseType,
    userProfile.skillLevel
  );`;

content = content.replace(target, replacement);
fs.writeFileSync('app/dashboard/chat/lib/brain/niraCore.ts', content);
