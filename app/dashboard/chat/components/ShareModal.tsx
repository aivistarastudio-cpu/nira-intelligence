"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Copy, Link2 } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatId: string;
  chatTitle?: string;
  messageCount?: number;
}

export default function ShareModal({ isOpen, onClose, chatId, chatTitle = "New Conversation", messageCount = 0 }: ShareModalProps) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("https://www.niraintelligence.com");

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const shareUrl = `${origin}/share/c/${chatId || Math.random().toString(36).substring(2, 10)}`;
  const shareText = `Check out my conversation: "${chatTitle}" on NIRA Intelligence!`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  // Ultra-minimalist monochrome SVGs (World Class Linear/Vercel style)
  const socialLinks = [
    {
      name: "X",
      brandHover: "hover:text-[#000000] dark:hover:text-[#FFFFFF] hover:bg-[var(--nira-text)]/[0.04]",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "LinkedIn",
      brandHover: "hover:text-[#0A66C2] hover:bg-[#0A66C2]/10",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
    },
    {
      name: "WhatsApp",
      brandHover: "hover:text-[#25D366] hover:bg-[#25D366]/10",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
          <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
        </svg>
      ),
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
    },
    {
      name: "Facebook",
      brandHover: "hover:text-[#1877F2] hover:bg-[#1877F2]/10",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Reddit",
      brandHover: "hover:text-[#FF4500] hover:bg-[#FF4500]/10",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 8c2.648 0 5.028 .826 6.675 2.14a2.5 2.5 0 0 1 2.326 4.36c0 3.59 -4.03 6.5 -9 6.5c-4.875 0 -8.845 -2.8 -9 -6.294l-1 -.206a2.5 2.5 0 0 1 2.326 -4.36c1.646 -1.313 4.024 -2.14 6.674 -2.14z" />
          <path d="M12 8l1 -5l6 1" />
          <circle cx="19" cy="4" r="1" />
          <circle cx="9" cy="13" r=".5" fill="currentColor" />
          <circle cx="15" cy="13" r=".5" fill="currentColor" />
          <path d="M10 17c.5 .5 1.5 .5 2 .5s1.5 0 2 -.5" />
        </svg>
      ),
      url: `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
    },
    {
      name: "Email",
      brandHover: "hover:text-[#0B79E3] hover:bg-[#0B79E3]/10",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      url: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent("Check this out: " + shareUrl)}`,
    }
  ];

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Strong Apple Style Blur Overlay */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClose}
            className="fixed inset-0 z-[999998] bg-black/20 dark:bg-black/50"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[999999] flex flex-col items-center justify-center pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, y: -10, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[420px] bg-white/60 dark:bg-[#1a1a1a]/60 backdrop-blur-[60px] border border-white/50 dark:border-white/10 rounded-[32px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden pointer-events-auto flex flex-col relative"
            >
              
              {/* Close Button Top Right Floating */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 text-[var(--nira-text)] hover:bg-black/10 dark:hover:bg-white/20 transition-all outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              {/* The "Nira Level" Avant-Garde Preview Banner */}
              <div className="relative h-[200px] w-full overflow-hidden flex flex-col items-center justify-center">
                {/* Mesmerizing Liquid Gradient Background (Translucent so blur shows) */}
                <div className="absolute inset-0 opacity-50 mix-blend-screen">
                  <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_90deg_at_50%_50%,#ff0080,#7928ca,#ff0080)] animate-[spin_8s_linear_infinite] opacity-60 blur-3xl"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/30 blur-2xl rounded-full mix-blend-screen"></div>
                </div>
                
                {/* Noise texture overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

                {/* World Class Glowing N Icon */}
                <div className="relative z-10 w-20 h-20 rounded-[24px] bg-white/20 dark:bg-black/20 border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-md flex items-center justify-center">
                  <svg className="w-10 h-10 text-[var(--nira-text)] drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                
                <div className="relative z-10 mt-4 text-center">
                  <h3 className="text-[var(--nira-text)] font-semibold text-[18px] tracking-tight">{chatTitle}</h3>
                  <p className="text-[var(--nira-subtext)] text-[13px] font-medium tracking-wide">
                    {messageCount} {messageCount === 1 ? 'message' : 'messages'} • Secure Link
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col gap-4">
                
                {/* Hyper Minimal Social Dock */}
                <div className="flex items-center justify-between p-2">
                  {socialLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={(e) => {
                        e.preventDefault();
                        try {
                          if (link.url.startsWith('mailto:')) {
                            window.location.href = link.url;
                          } else {
                            const newWindow = window.open(link.url, '_blank', 'noopener,noreferrer');
                            if (!newWindow) {
                              window.location.href = link.url;
                            }
                          }
                        } catch (err) {
                          console.error("Failed to open link in Safari", err);
                        }
                      }}
                      className={`flex items-center justify-center w-12 h-12 rounded-full text-[var(--nira-subtext)] transition-all duration-300 outline-none ${link.brandHover}`}
                    >
                      <span className="scale-110">{link.icon}</span>
                    </button>
                  ))}
                </div>

                {/* One-Click Copy Surface */}
                <button
                  onClick={handleCopy}
                  className={`relative w-full h-[64px] rounded-[22px] border transition-all duration-400 outline-none flex items-center px-5 overflow-hidden group ${
                    copied 
                      ? "bg-emerald-500 border-emerald-500/20 text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)]" 
                      : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border-black/5 dark:border-white/5 text-[var(--nira-text)]"
                  }`}
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${copied ? "bg-white/20 text-white" : "bg-black/5 dark:bg-white/10 text-[var(--nira-text)]"}`}>
                      {copied ? (
                        <Check className="w-5 h-5" strokeWidth={2.5} />
                      ) : (
                        <Link2 className="w-5 h-5" strokeWidth={2} />
                      )}
                    </div>
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <span className="text-[15px] font-semibold tracking-tight">
                        {copied ? "Copied to Clipboard" : "Copy Shared Link"}
                      </span>
                      <span className={`text-[12px] truncate w-full ${copied ? "text-emerald-50" : "text-[var(--nira-subtext)]"}`}>
                        {shareUrl.replace('https://', '')}
                      </span>
                    </div>
                  </div>
                </button>

              </div>
              
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}