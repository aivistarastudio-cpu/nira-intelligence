const fs = require('fs');

let page = fs.readFileSync('app/nira/page.tsx', 'utf-8');

// The start of the card content:
const cardStart = `{/* Animated Map Background */}`;
const cardEnd = `{/* Foreground Content */}`;

// Let's replace the wrapper div between cardStart and the <svg ...> tag
// Actually, it's easier to just do a string replacement on the wrapper.

page = page.replace(
  /<div className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none flex justify-end items-center pr-4">/g,
  `<div className="absolute right-[-20%] bottom-[-20%] w-[140%] md:w-[90%] h-[140%] md:h-[150%] opacity-15 md:opacity-20 group-hover:opacity-40 transition-all duration-1000 pointer-events-none flex justify-end items-end z-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-fuchsia-500/20 blur-[80px] rounded-full mix-blend-screen animate-pulse" />`
);

page = page.replace(
  /<svg viewBox="0 0 400 400" className="w-auto h-\[90%\] md:h-\[120%\] drop-shadow-\[0_0_15px_rgba\(249,115,22,0\.5\)\] max-w-\[60%\]" fill="none" preserveAspectRatio="xMaxYMid meet">/g,
  `<svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_0_30px_rgba(249,115,22,0.8)] relative z-10" fill="none" preserveAspectRatio="xMaxYMax meet">`
);

page = page.replace(
  /strokeWidth="2.5"/g,
  `strokeWidth="1"`
);

// Close the extra div we opened for the glow
page = page.replace(
  /<\/svg>\n              <\/div>/g,
  `</svg>\n              </div>\n              </div>`
);

// Update Foreground Content
page = page.replace(
  /<div className="mt-12">/g,
  `<div className="mt-16 relative z-10">`
);

page = page.replace(
  /<div className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-fuchsia-500 drop-shadow-sm">/g,
  `<div className="text-4xl md:text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-orange-500 via-rose-500 to-fuchsia-600 drop-shadow-lg">`
);

fs.writeFileSync('app/nira/page.tsx', page);
console.log("Updated to Premium Apple Level Layout");
