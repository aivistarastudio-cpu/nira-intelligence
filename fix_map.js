const fs = require('fs');

const page = fs.readFileSync('app/nira/page.tsx', 'utf-8');
const newPath = fs.readFileSync('gujarat_path_complete.txt', 'utf-8');

// Find the start of the Animated Map Background
const startMarker = '{/* Animated Map Background */}';
const endMarker = '</svg>\n              </div>';

const startIndex = page.indexOf(startMarker);
const endIndex = page.indexOf(endMarker, startIndex) + endMarker.length;

if (startIndex === -1 || endIndex < startMarker.length) {
  console.log("Could not find markers");
  process.exit(1);
}

const newContent = `${startMarker}
              <div className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none flex justify-end items-center pr-4">
                <svg viewBox="0 0 400 400" className="w-auto h-[90%] md:h-[120%] drop-shadow-[0_0_15px_rgba(249,115,22,0.5)] max-w-[60%]" fill="none" preserveAspectRatio="xMaxYMid meet">
                  <path 
                    d="${newPath}" 
                    fill="url(#gujarat-gradient)" 
                    stroke="rgba(249,115,22,0.8)"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="gujarat-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(249,115,22,0.4)" />
                      <stop offset="100%" stopColor="rgba(217,70,239,0.05)" />
                    </linearGradient>
                  </defs>
                  
                  {/* Pulsing Dot for Ahmedabad */}
                  <circle cx="280" cy="150" r="4" fill="#f97316" className="shadow-[0_0_20px_#f97316]" />
                  <circle cx="280" cy="150" r="10" fill="none" stroke="#f97316" strokeWidth="2" className="animate-ping opacity-80" />
                </svg>
              </div>`;

const updatedPage = page.substring(0, startIndex) + newContent + page.substring(endIndex);

fs.writeFileSync('app/nira/page.tsx', updatedPage);
console.log('Fixed page.tsx!');
