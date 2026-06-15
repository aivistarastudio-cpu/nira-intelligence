"use client"

import { History } from "lucide-react"
import "../styles/video.css"

export default function TopBarVideo({
  selectedModel,
  setSelectedModel,
  openHistory, // ✅ ADD THIS
}: any) {

  const models = [
    { id: "veo2", label: "VEO 2" },
    { id: "veo3-fast", label: "VEO 3.1 Fast" },
    { id: "veo3", label: "VEO 3.1" },
  ]

  return (
    <div className="topbar">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* GREEN DOT */}
        <div className="relative w-4 h-4 flex items-center justify-center">
          <span className="absolute w-4 h-4 rounded-full bg-green-500 opacity-20 animate-ping"></span>
          <span className="relative w-2 h-2 rounded-full bg-green-500 z-10"></span>
        </div>

        <span className="text-[15px] font-semibold text-white tracking-wide">
          NIRA Intelligence
        </span>

      </div>

      {/* CENTER (MODEL SWITCH) */}
      <div className="model-switch">

        {models.map((m) => {
          const active = selectedModel === m.id

          return (
            <button
              key={m.id}
              onClick={() => setSelectedModel(m.id)}
              className={`model-btn ${active ? "active" : ""}`}
            >
              {m.label}
            </button>
          )
        })}

      </div>

      {/* RIGHT */}
      <div className="topbar-right">

        <div className="text-xs text-white/70">
          10 Credits
        </div>

        {/* 📚 HISTORY BUTTON */}
        <button
          onClick={openHistory} // 🔥 CONNECTED
          className="p-2 text-white/70 hover:text-white transition hover:scale-110"
        >
          <History size={16} />
        </button>

        {/* PROFILE */}
        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-sm font-medium">
          N
        </div>

      </div>

    </div>
  )
}