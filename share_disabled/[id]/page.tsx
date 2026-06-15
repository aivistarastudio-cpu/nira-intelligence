"use client";

import { useEffect, useState, use } from "react";
import Renderer from "@/app/dashboard/chat/lib/format/renderer";
import { format } from "@/app/dashboard/chat/lib/format/formatter";

import { useRouter } from "next/navigation";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function SharePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // ================= FETCH =================
  useEffect(() => {
    if (!id) return;

    const loadChat = async () => {
      try {
        const res = await fetch(`/api/share?id=${id}`);
        if (!res.ok) throw new Error();

        const data = await res.json();
        if (data?.messages) setMessages(data.messages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadChat();
  }, [id]);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#02030a] text-white/40">
        <div className="animate-pulse text-sm tracking-wide">
          Preparing intelligence...
        </div>
      </div>
    );
  }

  // ================= EMPTY =================
  if (!messages.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#02030a] text-white/40">
        This shared conversation is not available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02030a] text-white antialiased">

      {/* ================= 🌌 BACKGROUND ================= */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#02030a]" />

        {/* soft radial light */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(120,170,255,0.08),transparent_60%)]" />

        {/* depth overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* ================= MAIN ================= */}
      <div className="relative max-w-[820px] mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="pt-24 pb-16 text-center">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-xs text-white/50 backdrop-blur-md">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Secure Share
          </div>

          <h1 className="mt-6 text-[24px] font-semibold tracking-tight text-white/90">
            NIRA Intelligence
          </h1>

          <p className="text-white/40 text-sm mt-2">
            Shared Conversation • Read-only
          </p>
        </div>

        {/* ================= CHAT ================= */}
        <div className="space-y-12">

          {messages.map((msg, i) => {
            const blocks = format(msg.text);

            

            // ================= USER =================
            if (msg.role === "user") {
              return (
                <div
                  key={i}
                  className="flex justify-end animate-[fadeUp_.4s_ease]"
                >
                  <div className="max-w-[60%] text-right">

                    <div className="
                      inline-block
                      px-4 py-2.5
                      rounded-full

                      bg-white/[0.07]
                      border border-white/[0.08]

                      text-[13.5px]
                      text-white/75

                      backdrop-blur-md
                      transition-all duration-300

                      hover:bg-white/[0.12]
                    ">
                      {msg.text}
                    </div>

                  </div>
                </div>
              );
            }

            // ================= AI =================
            return (
              <div
                key={i}
                className="flex justify-start animate-[fadeUp_.5s_ease]"
              >
                <div className="w-full">

                  <div className="
                    relative
                    px-7 py-6
                    rounded-[20px]

                    bg-white/[0.05]
                    border border-white/[0.05]

                    text-[15px]
                    leading-[1.9]

                    text-white/85

                    backdrop-blur-xl

                    shadow-[0_20px_60px_rgba(0,0,0,0.8)]
                    transition-all duration-300

                    hover:bg-white/[0.065]
                    hover:border-white/[0.1]
                  ">

                    {/* top glow */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                    {/* left accent */}
                    <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-gradient-to-b from-transparent via-white/25 to-transparent rounded-full opacity-70" />

                    <Renderer blocks={blocks} />

                  </div>

                </div>
              </div>
            );
          })}

        </div>

        {/* ================= CTA ================= */}
        <div className="mt-24 flex flex-col items-center gap-5">

          <p className="text-white/40 text-sm">
            Experience full intelligence inside NIRA
          </p>

          <button
  onClick={() => router.push("/dashboard/chat")}
  className="
    px-8 py-3.5
    rounded-xl

    bg-white text-black
    text-sm font-medium

    transition-all duration-300

    hover:scale-[1.05]
    active:scale-[0.98]

    hover:shadow-[0_10px_40px_rgba(255,255,255,0.3)]
  "
>
  Open NIRA →
</button>

        </div>

        {/* ================= FOOTER ================= */}
        <div className="text-center text-white/20 text-xs py-16">
          Powered by NIRA Intelligence • Secure View
        </div>

      </div>
    </div>
  );
}