"use client";

import { MessageType } from "../page";
import Message from "./Message";
import ThinkingIndicator from "./ThinkingIndicator";
import { Inter } from "next/font/google"; 
import { motion, AnimatePresence } from "framer-motion";

// 💡 Premium sleek Inter font configuration
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function MessageArea({
  messages,
  isThinking,
  thinkingText,
}: {
  messages: MessageType[];
  isThinking: boolean;
  thinkingText: string;
}) {
  return (
    // 🎨 BASE PREMIUM TYPOGRAPHY: 16px, 1.8 leading, optimized legibility
    <div className={`w-full min-h-full ${inter.className} text-[16px] leading-[1.8] tracking-normal antialiased `}>
      <div className="mx-auto w-full max-w-none pt-[8vh] pb-[80vh] space-y-6 transition-all duration-500">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => {
            if (!m?.text && (!m.files || m.files.length === 0)) return null;

            return (
              <motion.div
                key={m.id ?? `msg-${i}`}
                data-role={m.role}
                initial={{ opacity: 0, y: 15, scale: 0.97, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, scale: 0.97, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: [0.2, 0.9, 0.1, 1] }}
                className="will-change-[opacity,transform,filter] origin-bottom"
              >
                <Message
                  role={m.role === "user" ? "user" : "ai"}
                  text={m.text}
                  files={m.files}
                  isStreaming={m.isStreaming}
                  blocks={m.blocks}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        <AnimatePresence>
          {isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.97, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, scale: 0.97, filter: "blur(4px)", transition: { duration: 0.3, ease: "easeIn" } }}
              transition={{ duration: 0.5, ease: [0.2, 0.9, 0.1, 1] }}
              className="pt-4 pb-2 flex items-center will-change-[opacity,transform,filter]"
            >
              <ThinkingIndicator thinkingText={thinkingText} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}