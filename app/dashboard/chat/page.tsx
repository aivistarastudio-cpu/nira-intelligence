"use client";

import { useState, useRef, useEffect } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import MessageArea from "./components/MessageArea";
import InputBar from "./components/InputBar";
import EmptyState from "./components/EmptyState";
import { startTypingAnimation } from "./components/typingEngine";
import { formatResponse } from "./lib/format/formatter";

import ShareModal from "./components/ShareModal";

/* ================== UTILS ================== */
const getCompressedThumbnail = async (file: File): Promise<string> => {
  if (!file.type.startsWith("image/")) return "";
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX = 400;
        let { width, height } = img;
        if (width > height) {
          if (width > MAX) { height *= MAX / width; width = MAX; }
        } else {
          if (height > MAX) { width *= MAX / height; height = MAX; }
        }
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.6));
      };
      img.onerror = () => resolve("");
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
};

/* ================== TYPE ================== */
export interface MessageType {
  role: "user" | "ai";
  text: string;
  isStreaming?: boolean;
  id?: number;
  files?: any[]; // 👈 ADDED
  blocks?: any[]; // 👈 V16 AST BLOCKS
  plan?: {
    type?: string;
    addNextStep?: boolean;
    nextStep?: string;
  };
}

export default function ChatPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [activeChatId, setActiveChatId] = useState<string>("");
  const [chats, setChats] = useState<any[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingText, setThinkingText] = useState("Thinking");
  const [shareOpen, setShareOpen] = useState(false);

  // 🌊 Scroll Indicator Overlays States (Apple/ChatGPT Visual Hints)
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const userScrolledUpRef = useRef(false);
  const prevMessageCountRef = useRef(0);
  const innerContentRef = useRef<HTMLDivElement>(null); // For Layout ResizeObserver

  const isThinkingRef = useRef(false);
  const isStreamingRef = useRef(false);
  const stopTypingRef = useRef<(() => void) | null>(null);

  // Sync state refs on active changes for zero-lag closure alignment
  useEffect(() => {
    isThinkingRef.current = isThinking;
    const lastMessage = messages[messages.length - 1];
    isStreamingRef.current = !!(lastMessage?.role === "ai" && lastMessage.isStreaming);
  }, [isThinking, messages]);

  const handleStop = () => {
    if (stopTypingRef.current) {
      stopTypingRef.current(); // Intercept the typing engine immediately
      stopTypingRef.current = null;
    }
    setIsThinking(false);
    setMessages((prev) => {
      const updated = [...prev];
      const lastIndex = updated.length - 1;
      if (updated[lastIndex]?.role === "ai" && updated[lastIndex].isStreaming) {
        updated[lastIndex] = {
          ...updated[lastIndex],
          isStreaming: false,
        };
      }
      return updated;
    });
  };

  const handleShare = async () => {
    // ALWAYS open the premium Nira Share Modal for a consistent, Steve Jobs level experience
    setShareOpen(true);
  };

  /* ================= USER SCROLL DETECT (INERTIAL LOCKS) ================= */
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    // Check if we can scroll in either direction to show top/bottom edge fades
    const scrollUp = el.scrollTop > 5;
    const scrollDown = el.scrollHeight - el.scrollTop - el.clientHeight > 15;
    
   setCanScrollUp(prev =>
  prev !== scrollUp ? scrollUp : prev
);

setCanScrollDown(prev =>
  prev !== scrollDown ? scrollDown : prev
);

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;

    // 🌟 ChatGPT-style smart scrolling:
    // 1. If user scrolls up by more than 50px, PAUSE auto-scroll
    if (distanceFromBottom > 50) {
      userScrolledUpRef.current = true;
    }
    // 2. If user returns near the bottom (within 20px), REACTIVATE auto-scroll smoothly!
    else if (distanceFromBottom <= 20) {
      userScrolledUpRef.current = false;
    }
  };

  // Run scroll visibility triggers on message updates
  useEffect(() => {
    handleScroll();
  }, [messages]);

  /* ================= DYNAMIC RESIZEOBSERVER HEIGHT ANCHOR ================= */
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const innerContent = innerContentRef.current;
    if (!scrollContainer || !innerContent) return;

    // Observers heights shifts directly in the paint cycle for zero-lag caret alignment
    // Only auto-scrolls down if the active typing cursor overflows the visible viewport
    const resizeObserver = new ResizeObserver((entries) => {
      for (let _entry of entries) {
        if (isStreamingRef.current && !isThinkingRef.current && !userScrolledUpRef.current) {
          requestAnimationFrame(() => {
            const containerHeight = scrollContainer.clientHeight;
            const scrollHeight = scrollContainer.scrollHeight;
            const scrollTop = scrollContainer.scrollTop;

            // 80vh dynamic bottom padding buffer inside MessageArea.tsx
            const paddingBuffer = Math.round(containerHeight * 0.80);
            const caretPosition = scrollHeight - paddingBuffer;
            const viewportBottom = scrollTop + containerHeight;

            // Only auto-scroll down if the active typing cursor overflows the visible viewport
            if (caretPosition > viewportBottom - 20) {
              scrollContainer.scrollTop = scrollHeight - containerHeight;
            }
          });
        }
      }
    });

    resizeObserver.observe(innerContent);
    return () => resizeObserver.disconnect();
  }, []);

  /* ================= AUTO SCROLL ON NEW USER MESSAGE ================= */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    if (messages.length === 0) return;

    // 🌟 Correctly detect a new user turn (since user sends message and AI placeholder is added in same tick)
    const lastMessage = messages[messages.length - 1];
    const secondLastMessage = messages[messages.length - 2];
    
    const isNewUserTurn = 
      (lastMessage?.role === "ai" && secondLastMessage?.role === "user") ||
      (messages.length === 1 && lastMessage?.role === "user");

    if (isNewUserTurn && prevMessageCountRef.current !== messages.length) {
      prevMessageCountRef.current = messages.length;
      userScrolledUpRef.current = false;

      // Safe micro-delay ensures React commits state to DOM and Framer Motion mounts the element
      setTimeout(() => {
        const userElements = container.querySelectorAll('[data-role="user"]');
        const latestUserElement = userElements[userElements.length - 1] as HTMLElement;

        if (latestUserElement) {
          const containerRect = container.getBoundingClientRect();
          const userRect = latestUserElement.getBoundingClientRect();
          
          // 🌟 OpenAI-style upper viewport anchoring (8% below container top)
          const offset = Math.round(containerRect.height * 0.08);
          const targetScroll = container.scrollTop + (userRect.top - containerRect.top) - offset;

          // Smooth premium conversation lift to the top zone
          container.scrollTo({
            top: Math.max(0, targetScroll),
            behavior: "smooth",
          });
        } else {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      prevMessageCountRef.current = messages.length;
    }
  }, [messages]);

  /* ================= LOCAL STORAGE HISTORY SYSTEM ================= */
  useEffect(() => {
    if (chats.length === 0) return;

    localStorage.setItem("NIRA_CHAT_HISTORY", JSON.stringify(chats));
    window.dispatchEvent(new Event("nira_update"));
  }, [chats]);

  useEffect(() => {
    const savedChats = localStorage.getItem("NIRA_CHAT_HISTORY");

    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      setChats(parsedChats);

      if (parsedChats.length > 0) {
        const firstChat = parsedChats[0];
        setActiveChatId(firstChat.id);
        setMessages(firstChat.messages || []);
      }
    }
  }, []);

  useEffect(() => {
    (window as any).clearNiraChats = () => {
      localStorage.removeItem("NIRA_CHAT_HISTORY");
      setChats([]);
      setMessages([]);
      setActiveChatId("");
    };

    return () => {
      delete (window as any).clearNiraChats;
    };
  }, []);

  /* ================== SEND / CORE CONTROLLER ================== */
  const handleSend = async (input: string, files: any[]) => {
    if (!input.trim() && files.length === 0) return;

    // 🌟 Process persistent URLs for local storage
    const persistentFiles = await Promise.all(
      files.map(async (f: any) => {
        const thumbnail = await getCompressedThumbnail(f.file);
        return {
          url: thumbnail || f.preview, // use thumbnail for images, fallback to preview for others
          type: f.file.type,
          name: f.file.name,
        };
      })
    );

    const userMessage: MessageType = {
      role: "user",
      text: input || "User sent a file",
      files: persistentFiles,
      id: Date.now(),
    };

    const aiPlaceholder: MessageType = {
      role: "ai",
      text: "",
      isStreaming: true,
      id: Date.now() + 1,
    };

    const updatedMessages = [...messages, userMessage, aiPlaceholder];
    setMessages(updatedMessages);

    const chatId = activeChatId || Date.now().toString();
    const existingChat = chats.find((c) => c.id === activeChatId);

    if (existingChat) {
      const updatedChats = chats.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              title:
                chat.title === "New Chat" || chat.title.startsWith("Show me")
                  ? input.slice(0, 30)
                  : chat.title,
              messages: updatedMessages,
            }
          : chat
      );
      setChats(updatedChats);
    } else {
      const newChat = {
        id: chatId,
        title: input.slice(0, 30),
        messages: updatedMessages,
        createdAt: Date.now(),
      };
      setChats([newChat, ...chats]);
      setActiveChatId(newChat.id);
    }

    // ⚡ COGNITIVE THINKING GRADIENT SEQUENCE START
    setIsThinking(true);
    setThinkingText("Thinking");

    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setThinkingText("Analyzing"), 350));
    timers.push(setTimeout(() => setThinkingText("Understanding"), 750));
    timers.push(setTimeout(() => setThinkingText("Formulating"), 1200));

    try {
      const formData = new FormData();
      formData.append("message", input);
      formData.append(
        "messages",
        JSON.stringify(
          updatedMessages.map((msg) => ({
            role: msg.role === "ai" ? "assistant" : "user",
            content: msg.text,
          }))
        )
      );

      files.forEach((f: any) => {
        if (f?.file) {
          formData.append("files", f.file);
        }
      });

      const res = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      timers.forEach(clearTimeout);
      setIsThinking(false);
      setThinkingText("Thinking");

      // Setup empty AI streaming structure
      const aiMessage: MessageType = {
        role: "ai",
        text: "",
        isStreaming: true,
        id: Date.now() + 2,
      };

      setMessages([...updatedMessages.filter((m) => m.id !== aiPlaceholder.id), aiMessage]);

      const fullText = data?.text || "";
      const fullBlocks = formatResponse(fullText);

      // 🚀 V16 AST-BASED STREAMING
      stopTypingRef.current = startTypingAnimation({
        fullText,
        fullBlocks,
        onUpdate: (currentBlocks, partialText) => {
          setMessages((prev) => {
            const updated = [...prev];
            const lastIndex = updated.length - 1;

            if (updated[lastIndex]?.role === "ai") {
              updated[lastIndex] = {
                ...updated[lastIndex],
                text: partialText,
                blocks: currentBlocks, // 🔥 IMMUTABLE BLOCK REFERENCES
                isStreaming: true,
              };
              return updated;
            }

            return prev;
          });
        },
        onComplete: () => {
          setMessages((prev) => {
            const updated = [...prev];
            const lastIndex = updated.length - 1;

            if (updated[lastIndex]?.role === "ai") {
              updated[lastIndex] = {
                ...updated[lastIndex],
                isStreaming: false,
              };
            }

            setChats((allChats) =>
              allChats.map((chat) =>
                chat.id === chatId
                  ? {
                      ...chat,
                      messages: updated,
                    }
                  : chat
              )
            );

            return updated;
          });
        },
      });
    } catch (err) {
      console.error(err);
      timers.forEach(clearTimeout);
      setIsThinking(false);
      setThinkingText("Thinking");

      setMessages((prev) => [
        ...prev.filter((m) => m.id !== aiPlaceholder.id),
        {
          role: "ai",
          text: "Bhai thoda issue aa gaya server me… ek baar fir try kar 🙏",
          isStreaming: false,
          id: Date.now() + 3,
        },
      ]);
    }
  };

  return (
    // 🎨 Deep Rich Premium bg & Premium Typography text
    <div className="fixed inset-0 h-[100svh] flex overflow-hidden overscroll-none font-sans text-[var(--nira-text)] antialiased bg-[var(--nira-bg)] selection:bg-[var(--nira-text)]/20 selection:text-[var(--nira-text)] transition-colors duration-300">


      {/* SIDEBAR WRAPPER */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        chats={chats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        setMessages={setMessages}
        setChats={setChats}
      />
      
      {/* MAIN CONTAINER */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        
        {/* Sticky Topbar with Premium Apple Glass Blur */}
        <header className="shrink-0 bg-[var(--nira-bg)]/60 backdrop-blur-[30px] border-b border-[var(--nira-border)]/60 z-20 transition-all duration-300">
          <Topbar 
            onShareClick={handleShare} 
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        </header>

        {/* CHAT VIEWPORT */}
        <section className="flex-1 flex flex-col min-h-0 relative">
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center px-6 text-[var(--nira-subtext)]">
              <EmptyState onSend={handleSend} />
            </div>
          ) : (
            <div className="flex-1 flex flex-col min-h-0 relative">
              
              {/* ================= SCROLL FADE-OUT INDICATOR HINTS ================= */}
              {/* Top fade gradient */}
              <div 
                className={`
                  absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[var(--nira-bg)] to-transparent 
                  pointer-events-none z-10 transition-opacity duration-500 ease-out
                  ${canScrollUp ? "opacity-100" : "opacity-0"}
                `} 
              />
              
              {/* Bottom fade gradient */}
              <div 
                className={`
                  absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[var(--nira-bg)] via-[var(--nira-bg)]/80 to-transparent 
                  pointer-events-none z-10 transition-opacity duration-500 ease-out
                  ${canScrollDown ? "opacity-100" : "opacity-0"}
                `} 
              />

              {/* MESSAGES PORT WITH INERTIAL SCROLL */}
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto min-h-0 relative scrollbar-custom scrollbar-hide select-text"
              >
                {/* 💡 RESTRICTED WIDTH TO max-w-[880px] FOR OPTIMAL READING */}
                <div ref={innerContentRef} className="w-full max-w-[880px] mx-auto px-4 md:px-8 pb-10">
                  <MessageArea
                    messages={messages}
                    isThinking={isThinking}
                    thinkingText={thinkingText}
                  />
                </div>
              </div>

              {/* FLOATING PROMPT INPUT BAR */}
              <div className="shrink-0 px-3 md:px-6 pb-2 md:pb-3 pt-2 flex flex-col items-center relative z-20">
                {/* 💡 COMMAND CENTER MAX WIDTH 880px */}
                <div className="w-full max-w-[880px] animate-glide-in">
                  <InputBar 
                    onSend={handleSend} 
                    isTyping={isThinking || !!(messages.length > 0 && messages[messages.length - 1]?.role === "ai" && messages[messages.length - 1]?.isStreaming)} 
                    onStop={handleStop} 
                  />
                </div>
                <div className="text-[11.5px] text-[var(--nira-subtext)]/70 mt-2.5 text-center font-medium tracking-wide select-none">
                  NiraCore Beta can make mistakes. Please verify important information and report issues through feedback.
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      
      {/* SHARE MODAL OVERLAY */}
      <ShareModal 
        isOpen={shareOpen} 
        onClose={() => setShareOpen(false)} 
        chatId={activeChatId} 
        chatTitle={chats.find((c: any) => c.id === activeChatId)?.title || "Strategic Discussion"}
        messageCount={messages.length}
      />
      
    </div>
  );
}