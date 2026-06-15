"use client"

import { useState, useEffect, useRef } from "react"

import "./styles/imageStudio.css"

import BackgroundFX from "./components/BackgroundFX"
import TopSystemBar from "./components/TopSystemBar"
import ImageGrid from "./components/ImageGrid"
import PromptBar from "./components/PromptBar"
import ModelCommandPalette from "./components/ModelCommandPalette"
import ImagePreviewModal from "./components/ImagePreviewModal"

import ImageStudioLayout from "./layout/ImageStudioLayout"

import SettingsPanel from "./components/SettingsPanel"
import ProfilePanel from "./components/ProfilePanel"

/* ---------- SMART COMPRESS ---------- */

const compressImage = (base64: string, quality = 0.7): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = base64

    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      const maxWidth = 1024
      const scale = img.width > maxWidth ? maxWidth / img.width : 1

      canvas.width = img.width * scale
      canvas.height = img.height * scale

      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)

      const compressed = canvas.toDataURL("image/jpeg", quality)
      resolve(compressed)
    }
  })
}

/* ---------- TYPES ---------- */

type Mode = "studio" | "settings" | "profile"

type ImageItem = {
  id: string
  url: string
  prompt: string
  model: string
  size: string
  time: string
}

/* ---------- SAFE PARSE ---------- */

const safeParse = (data: string | null): ImageItem[] => {
  try {
    if (!data) return []
    const parsed = JSON.parse(data)

    if (!Array.isArray(parsed)) return []

    return parsed.filter((item) => item && item.id && item.url)
  } catch {
    return []
  }
}

/* ---------- PAGE ---------- */

export default function Page() {
  useEffect(() => {
  window.location.replace("/dashboard");
}, []);

 
  const [mode, setMode] = useState<Mode>("studio")
  const [images, setImages] = useState<ImageItem[]>([])
  const [model, setModel] = useState("Nano Banana")

  const [paletteOpen, setPaletteOpen] = useState(false)
  const [viewerOpen, setViewerOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  const [isGenerating, setIsGenerating] = useState(false)
  const [mounted, setMounted] = useState(false)

  const workspaceRef = useRef<HTMLDivElement>(null)

  const [aiActive, setAiActive] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  /* ---------- INIT ---------- */

  useEffect(() => {
    setMounted(true)

    const saved = localStorage.getItem("nira_images")
    setImages(safeParse(saved))

    const savedMode = localStorage.getItem("nira_mode")
    if (savedMode) setMode(savedMode as Mode)
  }, [])

  useEffect(() => {
  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }
}, [])

  /* ---------- GENERATE ---------- */

  const handleGenerate = async (prompt: string, size: string) => {
  if (!prompt.trim()) return

  setAiActive(true)
  setIsGenerating(true)

  const id = crypto.randomUUID()

  // 🔥 instant feedback card
  setImages((prev) => [
    {
      id,
      url: "",
      prompt,
      model,
      size,
      time: "generating",
    },
    ...prev,
  ])

  try {
    const res = await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, size, model }),
    })

    const data = await res.json()

    const compressedUrl = await compressImage(data.url)

    const now = new Date().toISOString().split("T")[0]

    const newItem: ImageItem = {
      id,
      url: compressedUrl,
      prompt,
      model,
      size,
      time: now,
    }

    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id)
      const updated = [newItem, ...filtered]

      localStorage.setItem("nira_images", JSON.stringify(updated))
      return updated
    })

    window.dispatchEvent(new Event("historyUpdated"))

    // ✅ FIXED TIMEOUT SYSTEM
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setAiActive(false)
      setIsGenerating(false)
    }, 200)

  } catch {
    setImages((prev) => prev.filter((img) => img.id !== id))

    setAiActive(false)
    setIsGenerating(false)
  }
}
  /* ---------- DELETE ---------- */

  const deleteImage = (id: string) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id)
      localStorage.setItem("nira_images", JSON.stringify(updated))
      return updated
    })

    if (activeId === id) setViewerOpen(false)
  }

  /* ---------- VIEWER ---------- */

  const activeIndex = activeId
    ? images.findIndex((i) => i.id === activeId)
    : -1

  /* ---------- UI ---------- */

  let workspace: React.ReactNode = null
  let promptUI: React.ReactNode = null

  if (mode === "studio") {
    workspace = (
      <div ref={workspaceRef} className="nira-workspace-scroll nira-fade-in">
        {images.length === 0 ? (
          <div className="nira-empty-state">
            <h2 className="nira-empty-title">
  Imagine anything… NIRA will create it.
</h2>
<p className="nira-empty-sub">
  Your creations will appear here
</p>
          </div>
        ) : (
          <ImageGrid
            images={images}
            onDelete={deleteImage}
            onOpen={(id) => {
              setActiveId(id)
              setViewerOpen(true)
            }}
          />
        )}
        <div className="nira-scroll-spacer" />
      </div>
    )

    promptUI = (
      <div className={`nira-prompt-wrap ${isGenerating ? "generating" : ""}`}>
        <PromptBar onGenerate={handleGenerate} disabled={isGenerating} />
      </div>
    )
  }

  if (mode === "settings") {
    workspace = (
      <div className="nira-workspace-scroll nira-fade-in">
        <SettingsPanel />
      </div>
    )
  }

  if (mode === "profile") {
    workspace = (
      <div className="nira-workspace-scroll nira-fade-in">
        <ProfilePanel />
      </div>
    )
  }

  if (!mounted) return null

  /* ---------- RENDER ---------- */

  return (
    <main className={`nira-image-page nira-page-enter ${aiActive ? "ai-active" : ""}`}>
      <BackgroundFX />

      <ImageStudioLayout
        topbar={
          mode === "studio" ? (
            <TopSystemBar
              model={model}
              openPalette={() => setPaletteOpen(true)}
              mode={mode}
              setMode={setMode}
              isGenerating={isGenerating}
            />
          ) : null
        }
        workspace={workspace}
        prompt={mode === "studio" ? promptUI : null}
        thinking={null}
      />

      {paletteOpen && (
        <ModelCommandPalette
          model={model}
          setModel={setModel}
          closePalette={() => setPaletteOpen(false)}
        />
      )}

      {viewerOpen && activeIndex !== -1 && (
        <ImagePreviewModal
          images={images}
          index={activeIndex}
          onClose={() => setViewerOpen(false)}
          onDelete={deleteImage}
          onNavigate={(i) => setActiveId(images[i].id)}
          onRegenerate={(prompt, size) => {
            handleGenerate(prompt, size)
          }}
        />
      )}
    </main>
  )
}