"use client";

import { ArrowLeft } from "lucide-react";

export default function VideoHistory({
  videos,
  onSelect,
  onBack,
}: {
  videos: string[];
  onSelect: (url: string) => void;
  onBack: () => void;
}) {
  return (
    <div className="w-full h-full flex flex-col">

      {/* 🔝 HEADER */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 backdrop-blur-md">

        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/70 hover:text-white transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h2 className="text-sm text-white/60 tracking-wide">
          Video History
        </h2>

        <div />

      </div>

      {/* 📚 GRID */}
      <div className="flex-1 overflow-y-auto p-6">

        {videos.length === 0 ? (
          <div className="text-center text-white/40 mt-20">
            No videos yet
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            {videos.map((video, i) => (
              <div
                key={`${video}-${i}`} // ✅ FINAL FIX
                onClick={() => onSelect(video)}
                className="
                  relative cursor-pointer rounded-xl overflow-hidden 
                  border border-white/10 
                  hover:scale-[1.03] 
                  transition duration-300
                  group
                "
              >

                {/* 🎥 VIDEO */}
                <video
                  src={video}
                  className="w-full h-full object-cover"
                  muted
                />

                {/* 🌫 HOVER OVERLAY */}
                <div className="
                  absolute inset-0 
                  bg-black/40 opacity-0 
                  group-hover:opacity-100 
                  transition duration-300
                  flex items-center justify-center
                ">
                  <span className="text-white text-xs tracking-wide">
                    View
                  </span>
                </div>

                {/* 🆕 TAG */}
                {i === 0 && (
                  <div className="absolute top-2 left-2 text-[10px] bg-white text-black px-2 py-0.5 rounded-full">
                    NEW
                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}