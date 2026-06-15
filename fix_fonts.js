const fs = require('fs');
const glob = require('glob');

const files = glob.sync('/Users/heenatewani/Desktop/nira-intelligence/nira-intelligence/app/dashboard/chat/lib/format/components/**/*.tsx');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the old specific string chunks that were making things broken or overriding
  content = content.replace(/text-\[16px\] md:text-\[17px\]/g, 'text-[17px]');
  content = content.replace(/leading-\[1\.85\]/g, 'leading-[1.6]');
  content = content.replace(/tracking-\[-0\.01em\]/g, 'tracking-[-0.018em]');
  
  // Replace in Message.tsx if needed
  
  fs.writeFileSync(file, content);
});

// Also fix Message.tsx
const msgPath = '/Users/heenatewani/Desktop/nira-intelligence/nira-intelligence/app/dashboard/chat/components/Message.tsx';
if (fs.existsSync(msgPath)) {
  let msgContent = fs.readFileSync(msgPath, 'utf8');
  msgContent = msgContent.replace(/text-\[15px\] md:text-\[16px\]/g, 'text-[17px]');
  msgContent = msgContent.replace(/leading-\[1\.6\] tracking-normal/g, 'leading-[1.6] tracking-[-0.018em]');
  fs.writeFileSync(msgPath, msgContent);
}

console.log("Fixed typography in all components.");
