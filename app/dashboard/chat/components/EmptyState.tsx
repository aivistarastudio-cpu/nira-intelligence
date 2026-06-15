"use client";

import { useState, useMemo } from "react";
import InputBar from "./InputBar";

// Official Nira Logo
const NiraLogo = ({ size = 48 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 200 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="animate-[spin_60s_linear_infinite]"
  >
    <g stroke="currentColor" strokeWidth="12" strokeLinecap="round" opacity="0.95">
      <ellipse cx="100" cy="100" rx="35" ry="80" />
      <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(60 100 100)" />
      <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(-60 100 100)" />
    </g>
  </svg>
);

// --- Custom "NIRA Level" Icon Pack ---
const IconChart = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>;
const IconQuantum = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" /></svg>;
const IconTerminal = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>;
const IconPen = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>;
const IconBug = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="6" width="8" height="14" rx="4" /><path d="m19 7-3 2" /><path d="m5 7 3 2" /><path d="m19 19-3-2" /><path d="m5 19 3-2" /><path d="M20 13h-4" /><path d="M4 13h4" /><path d="m10 4 1 2" /><path d="m14 4-1 2" /></svg>;
const IconComponent = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M9 3v18" /><path d="M9 12h12" /></svg>;
const IconOptimize = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>;
const IconDatabase = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>;
const IconMail = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
const IconBlog = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" /><polygon points="18 2 22 6 12 16 8 16 8 12 18 2" /></svg>;
const IconSocial = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>;
const IconDoc = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>;
const IconLightbulb = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>;
const IconMicroscope = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18h8" /><path d="M3 22h18" /><path d="M14 22a7 7 0 1 0 0-14h-1" /><path d="M9 14h2" /><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" /><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" /></svg>;
const IconHistory = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></svg>;
const IconMath = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="16" y1="14" x2="16" y2="18" /><path d="M8 10h.01" /><path d="M12 10h.01" /><path d="M16 10h.01" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /></svg>;

const suggestionDatabase = [
  // Default State
  { intent: "default", icon: <IconChart />, text: "Create a business plan", prompt: "Create a comprehensive Q4 strategic business plan for a tech startup." },
  { intent: "default", icon: <IconQuantum />, text: "Explain quantum physics", prompt: "Explain the concept of Quantum Entanglement using simple math and a real-world analogy." },
  { intent: "default", icon: <IconTerminal />, text: "Design a microservice", prompt: "Architect a scalable microservices backend in Node.js and PostgreSQL." },
  { intent: "default", icon: <IconPen />, text: "Write a script hook", prompt: "Write a highly engaging, viral 30-second script hook for a YouTube Short." },

  // Coding Intent
  { intent: "code", icon: <IconBug />, text: "Debug this error", prompt: "Help me debug a stack trace error I am getting in my code." },
  { intent: "code", icon: <IconComponent />, text: "Build a React component", prompt: "Write a responsive, accessible React component using Tailwind CSS." },
  { intent: "code", icon: <IconOptimize />, text: "Optimize performance", prompt: "How can I optimize the time complexity of my algorithm?" },
  { intent: "code", icon: <IconDatabase />, text: "Write a SQL query", prompt: "Write an advanced SQL query using window functions and joins." },

  // Writing Intent
  { intent: "write", icon: <IconMail />, text: "Draft a cold email", prompt: "Write a concise, high-converting B2B cold email to a prospective client." },
  { intent: "write", icon: <IconBlog />, text: "Write a blog post", prompt: "Write an SEO-optimized blog post about the future of AI." },
  { intent: "write", icon: <IconSocial />, text: "Create a Twitter thread", prompt: "Generate a viral 5-part Twitter thread about productivity." },
  { intent: "write", icon: <IconDoc />, text: "Summarize a document", prompt: "Summarize a long document into 5 key bullet points." },

  // Learning Intent
  { intent: "learn", icon: <IconLightbulb />, text: "Explain like I'm 5", prompt: "Explain a complex topic to me like I am 5 years old." },
  { intent: "learn", icon: <IconMicroscope />, text: "Teach me Science", prompt: "Explain how CRISPR gene editing works in simple terms." },
  { intent: "learn", icon: <IconHistory />, text: "Explain History", prompt: "Give me a brief summary of the Roman Empire's fall." },
  { intent: "learn", icon: <IconMath />, text: "Solve Math", prompt: "Help me solve a complex calculus equation." },
];

export default function EmptyState({
  onSend,
}: {
  onSend: (text: string, files: any[]) => void;
}) {
  const [inputText, setInputText] = useState("");

  const activeSuggestions = useMemo(() => {
    const text = inputText.trim().toLowerCase();
    
    // If input is completely empty, show the 4 default pillars
    if (!text) {
      return suggestionDatabase.filter(s => s.intent === "default");
    }

    // 1. Broad Category Intent Matching (if user types "code", show all code options)
    const isCode = ["code", "build", "react", "error", "bug", "sql", "func", "api"].some(k => text.includes(k));
    if (isCode) return suggestionDatabase.filter(s => s.intent === "code");

    const isWrite = ["write", "email", "blog", "post", "tweet", "draft", "letter", "script"].some(k => text.includes(k));
    if (isWrite) return suggestionDatabase.filter(s => s.intent === "write");

    const isLearn = ["learn", "explain", "what", "how", "math", "history", "teach", "solve"].some(k => text.includes(k));
    if (isLearn) return suggestionDatabase.filter(s => s.intent === "learn");

    // 2. Fuzzy Search: Filter the entire database if they type partial words (e.g. "bus" -> "Create a business plan")
    const matches = suggestionDatabase.filter(s => 
      s.text.toLowerCase().includes(text) || 
      s.prompt.toLowerCase().includes(text)
    );

    // Return up to 4 matches, or empty array if nothing matches (which cleanly hides the chips)
    return matches.slice(0, 4);
  }, [inputText]);

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden w-full h-full pb-[10vh] bg-[var(--nira-bg)]">
      
      <div className="relative z-10 w-full max-w-[820px] flex flex-col items-center">
        
        {/* Official Nira Logo - Clean & Minimal */}
        <div className="mb-6 text-[var(--nira-text)] animate-scaleIn">
          <NiraLogo size={52} />
        </div>

        {/* OpenAI Research Lab Greeting */}
        <h1 className="text-[28px] md:text-[32px] font-[500] font-sans tracking-tight antialiased text-[var(--nira-text)] leading-tight mb-8 animate-glide-in text-center [text-shadow:none_!important]" style={{ animationDelay: '50ms' }}>
          What would you like Nira to help with today?
        </h1>

        {/* The Input Bar */}
        <div className="w-full mb-6 animate-glide-in" style={{ animationDelay: '100ms' }}>
          <InputBar onSend={onSend} onChange={setInputText} />
        </div>

        {/* Dynamic Auto-Suggestion Engine Chips */}
        <div className="w-full flex flex-wrap justify-center gap-2.5 animate-glide-in min-h-[44px]" style={{ animationDelay: '150ms' }}>
          {activeSuggestions.map((item, i) => (
            <button
              key={item.text}
              onClick={() => onSend(item.prompt, [])}
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-[var(--nira-border)] bg-[var(--nira-surface)]/50 backdrop-blur-sm hover:bg-[var(--nira-text)]/[0.04] text-[13.5px] font-[500] text-[var(--nira-subtext)] hover:text-[var(--nira-text)] transition-all duration-200 outline-none animate-scaleIn hover:scale-[1.02] shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span className="flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity text-[var(--nira-text)]">
                {item.icon}
              </span>
              <span className="tracking-tight">{item.text}</span>
            </button>
          ))}
        </div>
        
        {/* Subtle Disclaimer Footer */}
        <div className="absolute -bottom-16 text-[11.5px] text-[var(--nira-subtext)]/60 mt-3 text-center font-medium tracking-wide select-none animate-glide-in" style={{ animationDelay: '200ms' }}>
          NiraCore Beta can make mistakes. Please verify important information and report issues through feedback.
        </div>

      </div>
    </div>
  );
}