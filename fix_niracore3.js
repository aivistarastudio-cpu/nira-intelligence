const fs = require('fs');
const path = './app/dashboard/chat/lib/brain/niraCore.ts';
let code = fs.readFileSync(path, 'utf8');

// The exported object contains `plan,`. We need to change it to `plan: responsePlan,`
code = code.replace(
  '    intent,\n\n    plan,\n\n    responseMode: mode,',
  '    intent,\n\n    plan: responsePlan,\n\n    responseMode: mode,'
);
// In case the spacing is different
code = code.replace(
  '    intent,\n    plan,\n    responseMode: mode,',
  '    intent,\n    plan: responsePlan,\n    responseMode: mode,'
);

fs.writeFileSync(path, code);
