"use client";

import React, { useState, useEffect } from "react";
import { formatResponse } from "../lib/format/formatter";
import { RenderMessage } from "../lib/format/renderer";

type FileType = {
  url: string;
  type: string;
  name: string;
};

type Props = {
  text: string;
  role: "user" | "ai";
  files?: FileType[];
  isStreaming?: boolean;
  blocks?: any[]; // 🔥 V16 AST BLOCKS
};

// ================= Custom Minimalist SVGs =================
const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PencilIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const Message = React.memo(function Message({
  text,
  role,
  files,
  isStreaming = false,
  blocks: preParsedBlocks,
}: Props) {
  const isUser = role === "user";

  const [_formatted, setFormatted] = useState(false);

  useEffect(() => {
    if (!isStreaming && role === "ai") {
      const t = setTimeout(() => setFormatted(true), 120);
      return () => clearTimeout(t);
    } else {
      setFormatted(false);
    }
  }, [isStreaming, role]);

  // 🔥 AST STREAMING: Only parse if blocks were not provided (for historical messages or edge cases)
  const blocks = preParsedBlocks || (role === "ai" ? formatResponse(text) : []);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setValue(text);
  }, [text]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isLongMessage = value.length > 500 || (value.match(/\n/g) || []).length > 6;

  return (
    <div data-role={role} className="w-full flex flex-col gap-3 md:gap-4 mb-4">
      {/* ================= USER ================= */}
      {isUser && (
        <div className="w-full flex flex-col items-end px-2 md:px-4 group/userMsg">
          {/* USER BLOCK - Premium styling */}
          <div className="max-w-[92%] md:max-w-[75%] bg-[var(--nira-surface)] px-5 py-3 md:px-6 md:py-3.5 rounded-[22px] text-[var(--nira-text)] font-sans text-[17px] font-normal leading-[1.6] tracking-[-0.018em] break-words whitespace-pre-wrap antialiased border border-[var(--nira-border)] shadow-[0_2px_14px_rgba(0,0,0,0.02)] transition-all duration-300">
            {files && files.length > 0 && (
              <div
                className={`mb-4 grid gap-3 ${
                  files.length === 1
                    ? "grid-cols-1"
                    : files.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-2 md:grid-cols-3"
                }`}
              >
                {files.map((file, i) => (
                  <div
                    key={i}
                    className="relative group/image overflow-hidden rounded-xl bg-[var(--nira-bg)] border border-[var(--nira-border)] transition-all duration-300 ease-out will-change-transform"
                  >
                    {file?.type?.includes("image") ? (
                      <>
                        <img
                          src={file.url}
                          alt={file.name}
                          onError={(e: any) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/400x300?text=Image";
                          }}
                          onLoad={(e: any) => {
                            e.currentTarget.style.opacity = "1";
                          }}
                          className="w-full h-full max-h-52 object-cover opacity-0 transition-all duration-500 ease-out group-hover/image:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </>
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-3 text-[13.5px] text-[var(--nira-subtext)] font-medium">
                        <span className="text-xl">📄</span> {file.name}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {isEditing ? (
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-[var(--nira-soft)] rounded-xl p-4 outline-none resize-none text-[var(--nira-text)] border border-[var(--nira-border)] transition-colors custom-scrollbar"
                rows={Math.min(12, value.split("\n").length || 1)}
              />
            ) : (
              <div className="relative w-full">
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isLongMessage && !isExpanded ? "max-h-[160px] opacity-95" : "max-h-[5000px] opacity-100"
                  }`}
                >
                  {value}
                </div>

                {isLongMessage && !isExpanded && (
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
                    style={{ background: "linear-gradient(to top, var(--nira-surface) 10%, transparent)" }}
                  />
                )}
              </div>
            )}

            {isLongMessage && !isEditing && (
              <div className={`flex relative z-10 transition-all duration-500 ${!isExpanded ? '-mt-10 justify-center' : 'mt-4 justify-start'}`}>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--nira-surface)] border border-[var(--nira-border)] text-[13px] font-medium text-[var(--nira-text)] shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:bg-[var(--nira-text)]/[0.04] transition-all duration-300 active:scale-95"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUpIcon />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDownIcon />
                      Read Full Prompt
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-1.5 mt-2 opacity-0 group-hover/userMsg:opacity-100 transition-all duration-300 translate-y-[-4px] group-hover/userMsg:translate-y-0 mr-4">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center p-2 hover:bg-[var(--nira-text)]/[0.06] bg-transparent rounded-full transition-all duration-200 active:scale-95 text-[var(--nira-subtext)] hover:text-[var(--nira-text)]"
              title="Copy message"
            >
              {copied ? <CheckIcon className="text-emerald-500" /> : <CopyIcon />}
            </button>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center justify-center p-2 hover:bg-[var(--nira-text)]/[0.06] bg-transparent rounded-full transition-all duration-200 active:scale-95 text-[var(--nira-subtext)] hover:text-[var(--nira-text)]"
              title="Edit message"
            >
              {isEditing ? <CheckIcon className="text-emerald-500" /> : <PencilIcon />}
            </button>
          </div>
        </div>
      )}

      {/* ================= AI ================= */}
      {!isUser && (
        <div className="w-full flex justify-start px-2 md:px-4 group/aiMsg">
          <div className="w-full max-w-none text-[var(--nira-text)] relative">
            {/* AI Text rendered here */}
            <div className={`w-full ${isStreaming ? 'animate-materialize' : ''}`}>
              <RenderMessage blocks={blocks} />
            </div>

            {!isStreaming && (
              <div className="flex justify-start mt-4 opacity-0 group-hover/aiMsg:opacity-100 transition-all duration-300 translate-y-[-4px] group-hover/aiMsg:translate-y-0">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-[var(--nira-text)]/[0.04] bg-transparent border border-[var(--nira-border)] rounded-lg transition-all duration-200 active:scale-95 text-[var(--nira-subtext)] hover:text-[var(--nira-text)]"
                  title="Copy AI Response"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="text-emerald-500" />
                      <span className="text-[12px] font-medium text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon />
                      <span className="text-[12px] font-medium">Copy</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default Message;