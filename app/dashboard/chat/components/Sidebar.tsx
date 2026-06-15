"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Chat = {
  id: string;
  title: string;
  messages: any[];
  createdAt: number;
};

type Props = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  chats: Chat[];
  activeChatId: string;
  setActiveChatId: (id: string) => void;
  setMessages: (messages: any[]) => void;
  setChats: any;
};

// ================= Custom Minimalist SVGs =================
const NiraLogo = ({ size = 22 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 200 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="currentColor" strokeWidth="10" strokeLinecap="round" opacity="0.9">
      <ellipse cx="100" cy="100" rx="35" ry="80" />
      <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(60 100 100)" />
      <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(-60 100 100)" />
    </g>
  </svg>
);

const PanelLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
    <line x1="9" y1="3" x2="9" y2="21" />
  </svg>
);

const PanelRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
    <line x1="15" y1="3" x2="15" y2="21" />
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ComposeIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

export default function Sidebar({
  collapsed,
  setCollapsed,
  chats,
  activeChatId,
  setActiveChatId,
  setMessages,
  setChats,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => setMounted(true), []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
        setCollapsed(true);
      } else {
        setIsMobile(false);
        setCollapsed(false);
      }
    }

    handleResize(); // first load check

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setCollapsed]);

  // ================================
  // NEW CHAT
  // ================================
  function newChat() {
    setActiveChatId("");
    setMessages([]);
    if (isMobile) setCollapsed(true);
  }

  // ================================
  // SELECT CHAT
  // ================================
  function selectChat(id: string) {
    setActiveChatId(id);
    const selected = chats.find((chat) => chat.id === id);
    if (selected) {
      setMessages(selected.messages || []);
    }
    if (isMobile) setCollapsed(true);
  }

  // ================================
  // DELETE CHAT
  // ================================
  function deleteChat(id: string) {
    const updated = chats.filter((c) => c.id !== id);
    setChats(updated);

    if (updated.length === 0) {
      localStorage.removeItem("NIRA_CHAT_HISTORY");
    }

    if (id === activeChatId) {
      const next = updated[0];
      if (next) {
        setActiveChatId(next.id);
        setMessages(next.messages || []);
      } else {
        setActiveChatId("");
        setMessages([]);
      }
    }
  }

  function clearAllChats() {
    localStorage.removeItem("NIRA_CHAT_HISTORY");
    setChats([]);
    setMessages([]);
    setActiveChatId("");
    setShowClearConfirm(false);
  }

  if (!mounted) return null;

  // ================================
  // SEARCH FILTER
  // ================================
  const filtered = chats.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  // ================================
  // GROUPING
  // ================================
  const grouped = { today: [], yesterday: [], older: [] } as any;

  const now = new Date();
  const yesterdayDate = new Date();
  yesterdayDate.setDate(now.getDate() - 1);

  filtered.forEach((chat) => {
    const d = new Date(chat.createdAt);

    if (d.toDateString() === now.toDateString()) grouped.today.push(chat);
    else if (d.toDateString() === yesterdayDate.toDateString())
      grouped.yesterday.push(chat);
    else grouped.older.push(chat);
  });

  // ================================
  // CHAT ITEM UI
  // ================================
  function renderChat(chat: Chat) {
    const isActive = activeChatId === chat.id;
    return (
      <div
        key={chat.id}
        onClick={() => selectChat(chat.id)}
        className={`group relative flex items-center px-2.5 py-2 cursor-pointer
          rounded-[8px] transition-all duration-200 ease-out select-none outline-none focus:outline-none focus-visible:outline-none mb-0.5
          ${isActive
            ? "text-[var(--nira-text)] bg-[var(--nira-text)]/[0.08] font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
            : "text-[var(--nira-subtext)] hover:text-[var(--nira-text)] hover:bg-[var(--nira-text)]/[0.04]"
          }`}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <div className={`w-6 h-6 rounded-[8px] flex items-center justify-center text-[10px] font-medium tracking-wider transition-all duration-200 shrink-0
          ${isActive
            ? "bg-[var(--nira-text)]/[0.12] text-[var(--nira-text)] border border-[var(--nira-text)]/[0.08]"
            : "bg-[var(--nira-text)]/[0.03] border border-[var(--nira-border)] text-[var(--nira-subtext)] group-hover:text-[var(--nira-text)]"
          }`}
        >
          {chat.title?.[0]?.toUpperCase() || "C"}
        </div>

        <span className={`font-sans text-[14px] truncate flex-1 transition-all duration-200 ease-in-out origin-left
          ${isActive ? "text-[var(--nira-text)] font-semibold" : "text-[var(--nira-text)]/90 font-medium"}
          ${collapsed && !isMobile ? "opacity-0 max-w-0 overflow-hidden pointer-events-none ml-0" : "opacity-100 ml-3"}`}
        >
          {chat.title}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteChat(chat.id);
          }}
          className={`p-1.5 rounded-[8px] hover:bg-rose-500/10 hover:text-rose-500 transition-all duration-150 text-[var(--nira-text)]/40 shrink-0 outline-none focus:outline-none
            ${collapsed && !isMobile ? "opacity-0 max-w-0 overflow-hidden pointer-events-none" : "opacity-100"}`}
        >
          <TrashIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  // ================================
  // MAIN ASIDE
  // ================================
  return (
    <>
      {/* MOBILE BACKDROP OVERLAY */}
      <AnimatePresence>
        {isMobile && !collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCollapsed(true)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        animate={
          isMobile
            ? { x: collapsed ? "-100%" : 0, width: 280 }
            : { width: collapsed ? 76 : 280, x: 0 }
        }
        transition={{ type: "tween", duration: 0.28, ease: [0.25, 0.1, 0.25, 1.0] }}
        className={`h-[100svh] flex flex-col font-sans text-[var(--nira-text)] bg-[var(--nira-sidebar)] dark:bg-[#1E1F20] border-none select-none
          ${isMobile ? "fixed top-0 left-0 z-50 shadow-2xl" : "relative z-40"}
        `}
      >
        {/* HEADER */}
        <div className={`flex items-center p-4 ${collapsed ? "justify-center" : "justify-between"}`}>
          {!collapsed && (
            <div className={`flex items-center gap-2.5 transition-all duration-200 ease-in-out truncate origin-left pl-1`}>
              <div className="text-[var(--nira-text)]">
                <NiraLogo size={24} />
              </div>
            </div>
          )}
          {collapsed && !isMobile ? (
            <button
              onClick={() => setCollapsed(false)}
              className="group w-10 h-10 rounded-[12px] bg-transparent hover:bg-[var(--nira-text)]/[0.06] flex items-center justify-center transition-all duration-200 text-[var(--nira-text)] outline-none focus:outline-none relative"
            >
              <div className="absolute flex items-center justify-center transition-opacity duration-200 opacity-100 group-hover:opacity-0">
                <NiraLogo size={26} />
              </div>
              <div className="absolute flex items-center justify-center transition-opacity duration-200 opacity-0 group-hover:opacity-100 text-[var(--nira-text)]/70 group-hover:text-[var(--nira-text)]">
                <PanelRightIcon />
              </div>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="w-9 h-9 rounded-[10px] bg-transparent hover:bg-[var(--nira-text)]/[0.06] items-center justify-center transition-all duration-200 text-[var(--nira-text)]/70 hover:text-[var(--nira-text)] outline-none focus:outline-none hidden lg:flex"
              >
                <PanelLeftIcon />
              </button>
              
              {/* MOBILE CLOSE BUTTON */}
              {isMobile && !collapsed && (
                <button
                  onClick={() => setCollapsed(true)}
                  className="w-9 h-9 rounded-[10px] bg-transparent hover:bg-[var(--nira-text)]/[0.06] flex items-center justify-center transition-all duration-200 text-[var(--nira-text)]/70 hover:text-[var(--nira-text)] outline-none focus:outline-none lg:hidden"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>

        {/* SEARCH BAR */}
        <div className="px-4 mt-2">
          <div className="flex items-center rounded-xl bg-transparent hover:bg-[var(--nira-text)]/[0.03] border border-[var(--nira-border)] transition-all duration-200 outline-none px-3 py-2 cursor-text focus-within:bg-[var(--nira-text)]/[0.04] focus-within:border-[var(--nira-text)]/[0.15]"
            onClick={() => collapsed && setCollapsed(false)}
          >
            <SearchIcon className="text-[var(--nira-text)]/60 shrink-0" />
            <input
              placeholder="Search threads"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`bg-transparent border-none outline-none text-[14px] font-medium w-full text-[var(--nira-text)] placeholder:text-[var(--nira-text)]/50 transition-all duration-200 ease-in-out
                ${collapsed && !isMobile ? "opacity-0 max-w-0 overflow-hidden ml-0 pointer-events-none" : "ml-2.5"}`}
            />
          </div>
        </div>

        {/* NEW CHAT BUTTON */}
        <div className="px-4 mt-4">
          <button
            onClick={newChat}
            className="group flex items-center justify-center rounded-xl text-[14px] font-medium transition-all duration-200 outline-none focus:outline-none w-full bg-transparent hover:bg-[var(--nira-text)]/[0.06] text-[var(--nira-text)] border border-[var(--nira-border)] px-3 py-2.5"
          >
            <ComposeIcon className="shrink-0 text-[var(--nira-text)]/70 group-hover:text-[var(--nira-text)]" />
            <span className={`transition-all duration-200 ease-in-out truncate origin-left
              ${collapsed ? "opacity-0 max-w-0 overflow-hidden ml-0 pointer-events-none" : "opacity-100 ml-2.5"}`}
            >
              New Chat
            </span>
          </button>
        </div>

        {/* THREAD LIST */}
        <div className="flex-1 overflow-y-auto px-3 space-y-1.5 mt-6 scrollbar-thin scrollbar-thumb-[var(--nira-text)]/10 hover:scrollbar-thumb-[var(--nira-text)]/20 scrollbar-track-transparent">
          {filtered.length === 0 ? (
            (!collapsed || isMobile) && (
              <div className="text-center py-8 opacity-40 select-none">
                <p className="text-[10px] uppercase font-medium tracking-wider text-[var(--nira-text)]">No active connections</p>
              </div>
            )
          ) : (
            <>
              {/* Group Section Headers */}
              {grouped.today.length > 0 && (
                <>
                  <div className="relative flex items-center px-2 mt-4 mb-1.5 min-h-[14px]">
                    <span className={`font-semibold text-[11px] tracking-wider uppercase text-[var(--nira-text)]/70 transition-all duration-200 ease-in-out truncate
                      ${collapsed && !isMobile ? "opacity-0 max-w-0 overflow-hidden pointer-events-none" : "opacity-100"}`}
                    >
                      Today
                    </span>
                    <div className={`h-[1px] flex-1 bg-[var(--nira-border)] transition-all duration-200 ${collapsed && !isMobile ? "ml-0" : "ml-2.5"}`} />
                  </div>
                  {grouped.today.map(renderChat)}
                </>
              )}

              {grouped.yesterday.length > 0 && (
                <>
                  <div className="relative flex items-center px-2 mt-4 mb-1.5 min-h-[14px]">
                    <span className={`font-semibold text-[11px] tracking-wider uppercase text-[var(--nira-text)]/70 transition-all duration-200 ease-in-out truncate
                      ${collapsed && !isMobile ? "opacity-0 max-w-0 overflow-hidden pointer-events-none" : "opacity-100"}`}
                    >
                      Yesterday
                    </span>
                    <div className={`h-[1px] flex-1 bg-[var(--nira-border)] transition-all duration-200 ${collapsed && !isMobile ? "ml-0" : "ml-2.5"}`} />
                  </div>
                  {grouped.yesterday.map(renderChat)}
                </>
              )}

              {grouped.older.length > 0 && (
                <>
                  <div className="relative flex items-center px-2 mt-4 mb-1.5 min-h-[14px]">
                    <span className={`font-semibold text-[11px] tracking-wider uppercase text-[var(--nira-text)]/70 transition-all duration-200 ease-in-out truncate
                      ${collapsed && !isMobile ? "opacity-0 max-w-0 overflow-hidden pointer-events-none" : "opacity-100"}`}
                    >
                      Earlier
                    </span>
                    <div className={`h-[1px] flex-1 bg-[var(--nira-border)] transition-all duration-200 ${collapsed && !isMobile ? "ml-0" : "ml-2.5"}`} />
                  </div>
                  {grouped.older.map(renderChat)}
                </>
              )}
            </>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-none bg-transparent">
          <button
            onClick={() => setShowClearConfirm(true)}
            className="flex items-center justify-center w-full h-[42px] rounded-xl text-[14px] font-medium transition-all duration-200 outline-none focus:outline-none border border-transparent hover:border-rose-500/20 text-[var(--nira-text)]/70 hover:text-rose-500 hover:bg-rose-500/[0.05] active:bg-rose-500/[0.1]"
          >
            <TrashIcon className="w-4 h-4 shrink-0 transition-colors" />
            <span className={`transition-all duration-200 ease-in-out truncate origin-left
              ${collapsed && !isMobile ? "opacity-0 max-w-0 overflow-hidden ml-0 pointer-events-none" : "opacity-100 ml-2.5"}`}
            >
              Clear History
            </span>
          </button>
        </div>
      </motion.aside>

      {/* PREMIUM CONFIRM MODAL */}
      <AnimatePresence>
        {showClearConfirm && (
          <div className="fixed inset-0 w-screen h-screen z-[999999] flex items-center justify-center">
            {/* Matte Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowClearConfirm(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="
                relative
                w-[90%]
                max-w-[360px]
                rounded-[20px]
                border border-[var(--nira-border)]
                bg-[var(--nira-bg)]
                p-6
                z-50
              "
            >
              <h2 className="text-[15px] font-medium text-[var(--nira-text)] tracking-wide">
                Clear Chat History?
              </h2>

              <p className="mt-2 text-xs text-[var(--nira-subtext)] leading-relaxed font-sans">
                This will permanently delete all conversations and messages. This action cannot be undone.
              </p>

              <div className="flex gap-2.5 mt-6">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="
                    flex-1 h-9 rounded-[10px]
                    bg-[var(--nira-text)]/[0.04] hover:bg-[var(--nira-text)]/[0.08]
                    border border-[var(--nira-border)]
                    text-[var(--nira-text)]
                    text-xs font-medium
                    transition-all duration-150
                    outline-none focus:outline-none
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={clearAllChats}
                  className="
                    flex-1 h-9 rounded-[10px]
                    bg-rose-500 hover:bg-rose-600
                    text-white
                    text-xs font-medium
                    transition-all duration-150
                    outline-none focus:outline-none
                  "
                >
                  Delete All
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}