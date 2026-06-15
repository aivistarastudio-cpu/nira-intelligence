"use client"

import JSZip from "jszip"
import { saveAs } from "file-saver"
import { useState, useEffect } from "react"
import { Star, Check } from "lucide-react"

/* ===============================
🧠 TYPES
=============================== */

type ImageItem = {
  id: string
  url: string
  prompt?: string
  model?: string
  size?: string
  createdAt?: string
  time?: string
}

type Props = {
  group: {
    date: string
    items: ImageItem[]
  }
  onOpen: (images: ImageItem[]) => void
}

/* ===============================
🔥 COMPONENT
=============================== */

export default function HistoryStack({ group, onOpen }: Props) {

  const images = [...(group?.items || [])].sort((a, b) => {
    const dateA = new Date(a.createdAt || a.time || "").getTime()
    const dateB = new Date(b.createdAt || b.time || "").getTime()
    return dateB - dateA
  })

  if (!images?.length) return null

  const topImage = images[0]
  const midImage = images[1]
  const backImage = images[2]

  /* ===============================
  ⭐ FAVORITES
  ============================== */

  const [favorites, setFavorites] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const loadFav = () => {
      const fav = JSON.parse(localStorage.getItem("nira_favorites") || "[]")
      setFavorites(fav)
    }

    loadFav()

    window.addEventListener("storage", loadFav)
    window.addEventListener("nira:favorites:update", loadFav)

    return () => {
      window.removeEventListener("storage", loadFav)
      window.removeEventListener("nira:favorites:update", loadFav)
    }
  }, [])

  /* ===============================
  ⭐ FAVORITES LOGIC
  ============================== */

  const toggleFavorite = (key: string, image: ImageItem) => {
    if (!key) return

    let fav: string[] = JSON.parse(localStorage.getItem("nira_favorites") || "[]")
    let allImages: ImageItem[] = JSON.parse(localStorage.getItem("nira_images") || "[]")

    fav = Array.from(new Set(fav.filter(Boolean)))

    if (fav.includes(key)) {
      fav = fav.filter((f) => f !== key)
    } else {
      fav.push(key)

      if (!allImages.find((img) => (img.id || img.url) === key)) {
        allImages.push(image)
        localStorage.setItem("nira_images", JSON.stringify(allImages))
      }
    }

    localStorage.setItem("nira_favorites", JSON.stringify(fav))
    setFavorites([...fav])

    const updatedFavImages = allImages.filter((img) =>
      fav.includes(img.id || img.url)
    )

    window.dispatchEvent(
      new CustomEvent("nira:favorites:update", {
        detail: updatedFavImages
      })
    )
  }

  /* ===============================
  🔥 ZIP DOWNLOAD
  ============================== */

  const handleDownloadAll = async (imgs: ImageItem[]) => {
    try {
      const zip = new JSZip()
      const folder = zip.folder("nira_images")

      await Promise.all(
        imgs.map(async (img, index) => {
          if (!img?.url) return
          const res = await fetch(img.url)
          const blob = await res.blob()
          folder?.file(`nira_${index + 1}.png`, blob)
        })
      )

      const content = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE"
      })

      saveAs(content, `nira_${group?.date || "images"}.zip`)

    } catch (error) {
      console.error("ZIP DOWNLOAD ERROR:", error)
    }
  }

  /* ===============================
  🔥 DELETE GROUP
  ============================== */

  const handleDeleteGroup = () => {
    const stored = JSON.parse(localStorage.getItem("nira_images") || "[]")
    const ids = images.map(img => img.id)

    const updated = stored.filter((img: any) => !ids.includes(img.id))

    localStorage.setItem("nira_images", JSON.stringify(updated))

    window.dispatchEvent(new Event("nira:favorites:update"))
    window.dispatchEvent(new Event("historyUpdated"))
  }

  /* ===============================
  🎨 UI
  ============================== */

  const key = topImage?.id || topImage?.url
  const isFav = favorites.includes(key)

  return (
    <div className="history-group">

      <div className="history-header">
        <h2 className="history-date">
          {group?.date || "No Date"}
        </h2>

        <span className="history-count">
          {images.length} images
        </span>
      </div>

      <div
        className="stack-card cursor-pointer"
        onClick={() => onOpen(images)}
      >

        {images.length >= 3 && backImage?.url && (
          <img
            src={backImage.url}
            className="stack-img back opacity-0"
            loading="lazy"
            onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
          />
        )}

        {images.length >= 2 && midImage?.url && (
          <img
            src={midImage.url}
            className="stack-img mid opacity-0"
            loading="lazy"
            onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
          />
        )}

        {topImage?.url && (
          <img
  src={topImage.url}
  className="stack-img front blur-load"
  loading="lazy"
  onLoad={(e) => e.currentTarget.classList.add("loaded")}
/>
        )}

        <div className="stack-preview">
          {images.slice(0, 9).map((img) => (
            <img
              key={img.id || img.url}
              src={img.url}
              className="preview-img opacity-0"
              loading="lazy"
              onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
            />
          ))}

          {images.length > 9 && (
            <div className="preview-more">
              +{images.length - 9}
            </div>
          )}
        </div>

        <div
          className="stack-actions"
          onClick={(e) => e.stopPropagation()}
        >

          <button
            className="stack-btn"
            onClick={() => toggleFavorite(key, topImage)}
          >
            <Star
              size={16}
              strokeWidth={1.8}
              fill={isFav ? "currentColor" : "transparent"}
              className={isFav ? "text-yellow-400" : ""}
            />
          </button>

          <button
            className="stack-btn"
            onClick={() => handleDownloadAll(images)}
          >
            ⬇
          </button>

          <button
            className="stack-btn"
            onClick={() => {
              if (topImage?.prompt) {
                navigator.clipboard.writeText(topImage.prompt)
                setCopied(true)
                setTimeout(() => setCopied(false), 1500)
              }
            }}
          >
            {copied ? <Check size={16} /> : "⧉"}
          </button>

          <button
            className="stack-btn"
            onClick={handleDeleteGroup}
          >
            🗑
          </button>

        </div>

        <div className="stack-count">
          {images.length}
        </div>

        <div className="stack-meta">
          <div className="stack-meta-text">
            <span className="stack-model">
              {topImage?.model || "NIRA"}
            </span>

            {topImage?.size && (
              <span className="stack-size">
                {topImage.size}
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}