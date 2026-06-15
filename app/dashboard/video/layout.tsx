"use client"

import "../video/styles/video.css" // ✅ ADD THIS LINE

export default function VideoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full h-screen bg-[#05060b] text-white flex flex-col overflow-hidden">

      {/* 🌌 GLOBAL BACKGROUND ENGINE */}
      <div className="absolute inset-0 -z-10">

        {/* soft radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]" />

        {/* subtle vignette (premium feel) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

      </div>

      {/* CONTENT */}
      {children}

    </div>
  )
}