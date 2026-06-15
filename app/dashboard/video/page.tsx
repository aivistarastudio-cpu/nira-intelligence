"use client"

import { useState, useEffect } from "react"
import TopBarVideo from "./components/TopBarVideo"
import VideoStage from "./components/VideoStage"
import PromptBar from "./components/PromptBar"
import VideoHistory from "./components/VideoHistory"

export default function VideoPage() {
  const [selectedModel, setSelectedModel] = useState("veo3-fast")

  // 🎬 video system
  const [videos, setVideos] = useState<string[]>([])
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // 🧠 prompt
  const [activePrompt, setActivePrompt] = useState("")

  // 🧭 mode
  const [mode, setMode] = useState<"generate" | "history">("generate")

  // 🎥 demo videos
  const randomVideos = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  ]

  // 🧠 LIMIT
  const MAX_VIDEOS = 20

  // 💾 LOAD (ONLY videos — NO auto play)
  useEffect(() => {
    const saved = localStorage.getItem("nira_v14_videos")
    if (saved) {
      const parsed = JSON.parse(saved)
      setVideos(parsed)
    }
  }, [])

  // 💾 SAVE
  useEffect(() => {
    localStorage.setItem("nira_v14_videos", JSON.stringify(videos))
  }, [videos])

  // 🚀 GENERATE
  const handleGenerate = (prompt: string) => {
    const cleanPrompt = prompt.trim()
    if (!cleanPrompt || isGenerating) return

    setActivePrompt(cleanPrompt)
    setIsGenerating(true)
    setActiveVideo(null)

    setTimeout(() => {
      const newVideo =
        randomVideos[Math.floor(Math.random() * randomVideos.length)]

      setVideos((prev) => {
        const updated = [newVideo, ...prev]
        return updated.slice(0, MAX_VIDEOS)
      })

      setActiveVideo(newVideo)

      setTimeout(() => {
        setIsGenerating(false)
      }, 300)

    }, 3000)
  }

  // 🔥 NEW: DELETE VIDEO
  const handleDelete = (url: string) => {
    setVideos((prev) => prev.filter((v) => v !== url))

    if (activeVideo === url) {
      setActiveVideo(null)
    }
  }

  // ⭐ NEW: FAVORITE
  const handleFavorite = (url: string) => {
    let fav = JSON.parse(localStorage.getItem("nira_favorites") || "[]")

    if (fav.includes(url)) {
      fav = fav.filter((f: string) => f !== url)
    } else {
      fav.push(url)
    }

    localStorage.setItem("nira_favorites", JSON.stringify(fav))
  }

  // 🔁 NEW: REGENERATE
  const handleRegenerate = () => {
    handleGenerate(activePrompt)
  }

  return (
    <div className="w-full h-full flex flex-col">

      {mode === "generate" ? (
        <>
          {/* 🔝 TOPBAR */}
          <TopBarVideo
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            openHistory={() => setMode("history")}
          />

          {/* 🎬 VIDEO */}
          <VideoStage
            videoUrl={activeVideo}
            isGenerating={isGenerating}
            prompt={activePrompt}

            // 🔥 NEW PROPS
            onDelete={handleDelete}
            onFavorite={handleFavorite}
            onRegenerate={handleRegenerate}
          />

          {/* ✍️ PROMPT */}
          <PromptBar
            selectedModel={selectedModel}
            onGenerate={handleGenerate}
          />
        </>
      ) : (
        <div className="transition-all duration-300 ease-in-out">
          <VideoHistory
            videos={videos}
            onBack={() => setMode("generate")}
            onSelect={(video) => {
              setActiveVideo(video)
              setMode("generate")
            }}
          />
        </div>
      )}

    </div>
  )
}