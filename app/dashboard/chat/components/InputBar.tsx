"use client";

import { useState, useRef } from "react";

// ================= Custom Minimalist SVGs =================
const NiraAttachIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="6" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const MicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="22" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const PauseStopIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="5" width="4" height="14" rx="1.5" />
    <rect x="14" y="5" width="4" height="14" rx="1.5" />
  </svg>
);

const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const FileTextIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default function InputBar({
  onSend,
  isTyping,
  onStop,
  onChange,
}: {
  onSend: (text: string, files: any[]) => void;
  isTyping?: boolean;
  onStop?: () => void;
  onChange?: (val: string) => void;
}) {
  const [value, setValue] = useState("");
  const [files, setFiles] = useState<any[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function playSendSound() {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(700, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.08);
    } catch (e) {
      // Ignore audio errors on non-interactive pages
    }
  }

  const handleFileUpload = (e: any) => {
    const newFiles = Array.from(e.target.files);
    const mapped = newFiles.map((file: any) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles((prev: any) => {
      const combined = [...prev, ...mapped];
      const unique = combined.filter((f, i, arr) => arr.findIndex((x) => x.file.name === f.file.name) === i);
      return unique.slice(0, 5);
    });

    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if (!value.trim() && files.length === 0) return;
    onSend(value, files);
    playSendSound();
    setValue("");
    setFiles([]);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setValue(val);
    if (onChange) onChange(val);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isTyping) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMicClick = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full animate-scaleIn origin-bottom">
        
        {/* 🔥 ANTIGRAVITY STYLE: Ultra sleek, 5% border, dark bg, small padding */}
        <div
          className="relative w-full max-w-[820px] mx-auto bg-[var(--nira-surface)] rounded-[20px] flex flex-col justify-center min-h-[52px] transition-all duration-300 ease-out border-none outline-none ring-0 shadow-none focus-within:bg-[var(--nira-surface)] focus-within:border-none focus-within:ring-0 focus-within:shadow-none"
        >
          {/* INLINE FILE/IMAGE PREVIEWS */}
          {files.length > 0 && (
            <div className="flex gap-3 overflow-x-auto px-4 pt-4 pb-1 scrollbar-hide">
              {files.map((f, i) => (
                <div
                  key={i}
                  className="relative flex-shrink-0 w-16 h-16 rounded-[12px] border border-[var(--nira-border)] bg-[var(--nira-bg)] flex items-center justify-center group transition-all"
                >
                  {f.file.type.startsWith("image") ? (
                    <img src={f.preview} className="w-full h-full object-cover rounded-[12px]" />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1">
                      <FileTextIcon />
                      <span className="text-[9px] text-[var(--nira-subtext)] font-medium truncate w-12 text-center">
                        {f.file.name.split('.')[0]}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => removeFile(i)}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--nira-soft)] border border-[var(--nira-border)] flex items-center justify-center text-[var(--nira-subtext)] hover:text-white hover:bg-rose-500 hover:border-rose-400 transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                  >
                    <XIcon />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ✍️ INPUT CONTROLS ROW */}
          <div className="flex items-end gap-2 w-full px-2 py-1.5">
            
            {/* 📎 ATTACH FILE BUTTON (Antigravity Plus Style) */}
            <input type="file" accept="image/*,.pdf,.txt,.js,.ts,.tsx,.css,.json" multiple onChange={handleFileUpload} className="hidden" id="fileUpload" />
            <label
              htmlFor="fileUpload"
              className="w-8 h-8 mb-[3px] flex items-center justify-center rounded-full bg-transparent hover:bg-[var(--nira-text)]/[0.04] cursor-pointer text-[var(--nira-subtext)] hover:text-[var(--nira-text)] transition-all shrink-0 ml-1"
              title="Add Context or Files"
            >
              <PlusIcon />
            </label>

            {/* TEXTAREA */}
            <textarea
              ref={textareaRef}
              value={value}
              onChange={handleChange}
              rows={1}
              placeholder="What would you like NIRA to solve?"
              className="
                flex-1 resize-none bg-transparent outline-none border-none ring-0 focus:outline-none focus:ring-0 focus:border-none shadow-none
                text-[14.5px] leading-[1.6] font-[400] text-[var(--nira-text)] placeholder:text-[var(--nira-subtext)]/80
                max-h-[200px] py-[8px] scrollbar-hide tracking-normal antialiased
              "
              style={{ whiteSpace: "pre-wrap" }}
              onKeyDown={handleKeyDown}
            />

            {/* DYNAMIC ACTION BUTTON */}
            <div className="mb-[3px] shrink-0 mr-1 flex items-center gap-1.5">
              

              {isTyping ? (
                <button
                  onClick={onStop}
                  title="Pause Generation"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--nira-text)]/[0.04] text-[var(--nira-text)] hover:bg-rose-500/10 hover:text-rose-500 transition-all outline-none"
                >
                  <PauseStopIcon />
                </button>
              ) : value.trim() || files.length > 0 ? (
                <button
                  onClick={handleSend}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-nira-accent text-white hover:opacity-90 active:scale-95 transition-all outline-none shadow-none border-none ring-0"
                >
                  <ArrowUpIcon />
                </button>
              ) : (
                <button
                  onClick={handleMicClick}
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-all outline-none ${
                    isRecording 
                      ? "bg-rose-500/10 text-rose-500" 
                      : "bg-transparent hover:bg-[var(--nira-text)]/[0.04] text-[var(--nira-subtext)] hover:text-[var(--nira-text)]"
                  }`}
                >
                  <MicIcon />
                </button>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}