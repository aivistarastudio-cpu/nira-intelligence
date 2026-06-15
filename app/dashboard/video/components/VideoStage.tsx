"use client";

import React, { useEffect, useState } from "react";
import { Download, RefreshCw, Film } from "lucide-react";

interface VideoStageProps {
  videoUrl: string | null;
  isGenerating: boolean;
  prompt: string;
}

export default function VideoStage({
  videoUrl,
  isGenerating,
  prompt,
}: VideoStageProps) {

  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  // 🧠 STAGE LOOP
  useEffect(() => {
    if (!isGenerating) {
      setStageIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % 5);
    }, 1200);

    return () => clearInterval(interval);
  }, [isGenerating]);

  // 🔥 SMART PROGRESS ENGINE
  useEffect(() => {
    if (!isGenerating) {
      setProgress(0);
      return;
    }

    let value = 0;

    const interval = setInterval(() => {
      value += Math.random() * 6;

      if (value > 95) value = 95;

      setProgress(value);
    }, 300);

    return () => clearInterval(interval);
  }, [isGenerating]);

  // ⏱ REAL TIME REMAINING ENGINE
  useEffect(() => {
    if (!isGenerating) {
      setTimeLeft(0);
      return;
    }

    let totalTime = 3; // seconds
    let start = Date.now();

    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const remaining = Math.max(totalTime - elapsed, 0);

      setTimeLeft(remaining);
    }, 100);

    return () => clearInterval(interval);
  }, [isGenerating]);

  const stages = [
    "analyzing prompt",
    "building scene",
    "adding motion",
    "rendering depth",
    "finalizing output",
  ];

  const words = (prompt?.trim() || "scene motion light depth")
    .split(" ")
    .filter(Boolean)
    .slice(0, 6);

  return (
    <div className="flex-1 flex justify-center px-6 pt-6 pb-24 bg-[#050505]">

      <div className="relative w-full max-w-4xl">

        {/* 🌌 OUTER GLOW */}
        <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent blur-3xl opacity-40" />

        <div className="
          relative aspect-video w-full 
          rounded-2xl overflow-hidden 
          border border-white/10 
          bg-black 
          shadow-[0_0_80px_rgba(255,255,255,0.06)]
        ">

          {/* =========================
              🧠 GENERATING STATE
          ========================= */}
          {isGenerating && (
            <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">

              {/* GRID */}
              <div className="absolute inset-0 opacity-20 grid-bg" />

              {/* CENTER GLOW */}
              <div className="absolute w-[300px] h-[300px] rounded-full bg-white/5 blur-3xl opacity-20" />

              {/* WORDS */}
              <div className="relative flex flex-wrap justify-center gap-3 max-w-md mb-6">

                {words.map((word, i) => (
                  <span
                    key={i}
                    className="animate-word-glow text-white/70 text-sm"
                    style={{
                      animationDelay: `${i * 0.25}s`,
                      textShadow: "0 0 25px rgba(255,255,255,0.15)",
                    }}
                  >
                    {word}
                  </span>
                ))}

              </div>

              {/* PROGRESS BAR */}
              <div className="
                w-[300px] h-[10px] 
                bg-white/5 
                rounded-full 
                overflow-hidden 
                backdrop-blur-xl 
                border border-white/10 
                shadow-inner
              ">

                <div
                  className="
                    h-full relative 
                    bg-gradient-to-r from-white via-white to-white
                    shadow-[0_0_20px_rgba(255,255,255,0.6)]
                  "
                  style={{
                    width: `${progress}%`,
                    transition: "width 0.35s ease-out",
                  }}
                >
                  <div className="absolute inset-0 bg-white/40 blur-sm opacity-40" />
                  <div className="absolute inset-0 animate-shimmer opacity-60" />
                </div>

              </div>

              {/* 🔥 % + TIME */}
              <div className="mt-3 flex flex-col items-center gap-1">

                <p className="text-white/50 text-xs tracking-widest">
                  {Math.floor(progress)}%
                </p>

                <p className="text-white/30 text-[11px] tracking-wide">
                  {timeLeft > 0
                    ? `${timeLeft.toFixed(1)}s remaining`
                    : "finalizing..."}
                </p>

              </div>

              {/* ENERGY LINE */}
              <div className="absolute w-[220px] h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent animate-energy" />

              {/* STAGE TEXT */}
              <p className="mt-4 text-white/30 text-xs tracking-widest animate-fade">
                {stages[stageIndex]}
              </p>

            </div>
          )}

          {/* =========================
              🎥 VIDEO
          ========================= */}
          {videoUrl && !isGenerating && (
            <video
              key={videoUrl}
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover animate-fadeIn brightness-110 contrast-110"
            />
          )}

          {/* =========================
              ⚫ EMPTY
          ========================= */}
          {!videoUrl && !isGenerating && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Film className="w-10 h-10 text-white/20 mb-3" />
              <p className="text-white/50 text-sm">No video yet</p>
            </div>
          )}

          {/* =========================
              🎛 OVERLAY
          ========================= */}
          {videoUrl && !isGenerating && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">

              <div className="flex items-end justify-between">

                <div>
                  <span className="text-white/60 text-xs">
                    Generated • Auto
                  </span>
                  <h3 className="text-white font-semibold text-lg">
                    Cinematic Output
                  </h3>
                </div>

                <div className="flex gap-3">

                  <button className="flex items-center gap-2 px-4 py-2 text-sm bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white transition duration-200">
                    <Download size={16} />
                    Download
                  </button>

                  <button className="flex items-center gap-2 px-4 py-2 text-sm bg-white text-black hover:bg-gray-200 rounded-xl transition duration-200">
                    <RefreshCw size={16} />
                    Regenerate
                  </button>

                </div>

              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}