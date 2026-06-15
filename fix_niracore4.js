const fs = require('fs');
const path = './app/dashboard/chat/lib/brain/niraCore.ts';
let code = fs.readFileSync(path, 'utf8');

// Inside buildNiraInput, replace "// Plan handled by responsePlanner" with actual call
code = code.replace(
  '// Plan handled by responsePlanner',
  'const typeResult = detectResponseType(intent, domain, responseMode);\n  const responsePlan = createResponsePlan(typeResult.responseType, domain, "standard", cleanInput);'
);

fs.writeFileSync(path, code);
