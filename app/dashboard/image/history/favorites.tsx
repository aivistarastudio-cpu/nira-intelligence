"use client"

import { useEffect, useState } from "react"
import HistoryStack from "./HistoryStack"
import Viewer from "./Viewer"

/* ---------- TYPES ---------- */

type ImageItem = {
  id?: string
  url: string
  prompt?: string
  model?: string
  size?: string
  createdAt?: string
}

/* ---------- PAGE ---------- */

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<ImageItem[]>([])
  const [loading, setLoading] = useState(true)

  const [viewerOpen, setViewerOpen] = useState(false)
  const [viewerImages, setViewerImages] = useState<ImageItem[]>([])
  const [refreshKey, setRefreshKey] = useState(0) // 🔥 ADD THIS

  useEffect(() => {

    const loadFavorites = () => {
      try {
        const favIds: string[] = JSON.parse(
          localStorage.getItem("nira_favorites") || "[]"
        )

        const allImages: ImageItem[] = JSON.parse(
          localStorage.getItem("nira_images") || "[]"
        )

        const favImages = allImages.filter((img) =>
          favIds.includes(img.id || img.url)
        )

        // ✅ FORCE SAFE RE-RENDER
        setFavorites(JSON.parse(JSON.stringify(favImages)))

      } catch (err) {
        console.error("Favorites load error", err)
      } finally {
        setLoading(false)
      }
    }

    // first load
    loadFavorites()

    const handleUpdate = (e: any) => {
  if (e?.detail) {
    setFavorites(e.detail) // 🔥 DIRECT DATA
    setLoading(false)
  } else {
    loadFavorites()
  }
}

    // ✅ ALL EVENTS (IMPORTANT FIX)
    window.addEventListener("nira:favorites:update", handleUpdate)
    window.addEventListener("historyUpdated", handleUpdate) // 🔥 FIX
    window.addEventListener("storage", handleUpdate)

    return () => {
      window.removeEventListener("nira:favorites:update", handleUpdate)
      window.removeEventListener("historyUpdated", handleUpdate) // 🔥 FIX
      window.removeEventListener("storage", handleUpdate)
    }

  }, [])

  /* ---------- UI ---------- */

  if (loading) {
    return <div className="p-6 text-white/60">Loading favorites...</div>
  }

  if (favorites.length === 0) {
    return <div className="p-6 text-white/40">No favorites yet</div>
  }

  return (
    <div className="p-4 md:p-6">

      {/* STACK */}
      <HistoryStack
  key={refreshKey}
        group={{
          date: "Favorites",
          items: favorites
        }}
        onOpen={(imgs) => {
          setViewerImages(imgs)
          setViewerOpen(true)
        }}
      />

      {/* VIEWER */}
      {viewerOpen && (
        <Viewer
          images={viewerImages}
          onClose={() => setViewerOpen(false)}
          onDelete={(id: string) => {
            const all = JSON.parse(localStorage.getItem("nira_images") || "[]")

            const updated = all.filter(
              (img: ImageItem) => (img.id || img.url) !== id
            )

            localStorage.setItem("nira_images", JSON.stringify(updated))

            // ✅ EVENTS (FIXED)
            window.dispatchEvent(new Event("historyUpdated"))
            window.dispatchEvent(new Event("nira:favorites:update"))

            setViewerImages((prev) =>
              prev.filter((img) => (img.id || img.url) !== id)
            )
          }}
        />
      )}

    </div>
  )
}