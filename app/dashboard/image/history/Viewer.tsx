"use client"

import { useState, useEffect } from "react"
import { Star, Check, MessageSquare } from "lucide-react"

export default function Viewer({
  images,
  onClose,
  onDelete
}: any) {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const current = images?.[currentIndex] || images?.[0]
  const key = current?.id || current?.url

  /* ===============================
  🔥 KEYBOARD CONTROLS (IMPROVED)
  ============================== */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {

      if (e.key === "Escape") {
        if (confirmOpen) setConfirmOpen(false)
        else onClose()
      }

      if (e.key === "ArrowRight") {
        setLoaded(false)
        setCurrentIndex(prev =>
          prev === images.length - 1 ? 0 : prev + 1
        )
      }

      if (e.key === "ArrowLeft") {
        setLoaded(false)
        setCurrentIndex(prev =>
          prev === 0 ? images.length - 1 : prev - 1
        )
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [images, onClose, confirmOpen])

  /* ===============================
  ⭐ FAVORITES SYNC
  ============================== */
  useEffect(() => {
    const loadFav = () => {
      const fav = JSON.parse(localStorage.getItem("nira_favorites") || "[]")
      setFavorites(fav)
    }

    loadFav()

    window.addEventListener("nira:favorites:update", loadFav)

    return () => {
      window.removeEventListener("nira:favorites:update", loadFav)
    }
  }, [])

  /* INDEX SAFETY */
  useEffect(() => {
    if (!images?.length) return
    if (currentIndex >= images.length) setCurrentIndex(0)
  }, [images])

  if (!images?.length) return null

  /* ===============================
  ⭐ FAVORITE TOGGLE
  ============================== */

  const toggleFavorite = () => {
    if (!key) return

    let fav: string[] = JSON.parse(localStorage.getItem("nira_favorites") || "[]")
    let allImages: any[] = JSON.parse(localStorage.getItem("nira_images") || "[]")

    fav = Array.from(new Set(fav.filter(Boolean)))

    if (fav.includes(key)) {
      fav = fav.filter((f) => f !== key)
    } else {
      fav.push(key)

      if (!allImages.find((img) => (img.id || img.url) === key)) {
        allImages.push(current)
        localStorage.setItem("nira_images", JSON.stringify(allImages))
      }
    }

    localStorage.setItem("nira_favorites", JSON.stringify(fav))
    setFavorites([...fav])

    window.dispatchEvent(new Event("nira:favorites:update"))
    window.dispatchEvent(new Event("historyUpdated"))
  }

  /* ===============================
  🔥 DOWNLOAD
  ============================== */
  const handleDownload = () => {
    const url = current?.url
    if (!url) return

    const link = document.createElement("a")
    link.href = url
    link.download = `nira_${currentIndex + 1}.png`
    link.click()
  }

  /* ===============================
  🔥 DELETE
  ============================== */
  const confirmDelete = () => {
    const id = current?.id
    if (!id) return

    onDelete(id)
    setConfirmOpen(false)

    if (images.length <= 1) {
      onClose()
    } else {
      setCurrentIndex(prev =>
        prev === images.length - 1 ? prev - 1 : prev
      )
    }
  }

  return (
    <div
      className="viewer-overlay"
      onClick={() => !confirmOpen && onClose()}
    >

      <div onClick={(e) => e.stopPropagation()}>

        {/* ===============================
        🔥 ACTION BAR
        ============================== */}
        <div className="viewer-actions">

          <button
            className="viewer-btn"
            onClick={toggleFavorite}
          >
            <Star
              size={16}
              strokeWidth={1.8}
              fill={key && favorites.includes(key) ? "currentColor" : "transparent"}
              className={favorites.includes(key) ? "text-yellow-400" : ""}
            />
          </button>

          <button
            className="viewer-btn delete"
            onClick={() => setConfirmOpen(true)}
          >
            🗑
          </button>

          <button
            className={`viewer-btn ${copied ? "copied" : ""}`}
            onClick={() => {
              if (current?.prompt) {
                navigator.clipboard.writeText(current.prompt)
                setCopied(true)
                setTimeout(() => setCopied(false), 1500)
              }
            }}
          >
            {copied
              ? <Check size={16} />
              : <MessageSquare size={16} />}

            <span className="tooltip">
              {copied ? "Copied" : "Copy prompt"}
            </span>
          </button>

          <button
            className="viewer-btn"
            onClick={handleDownload}
          >
            ⬇
          </button>

          <button
            className="viewer-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        {/* INDEX */}
        <div className="viewer-index">
          {currentIndex + 1} / {images.length}
        </div>

        {/* LEFT */}
        <button
          className="viewer-arrow left"
          onClick={() => {
            setLoaded(false)
            setCurrentIndex(prev =>
              prev === 0 ? images.length - 1 : prev - 1
            )
          }}
        >
          ‹
        </button>

        {/* IMAGE */}
        <img
          key={currentIndex}
          src={current?.url}
          className={`viewer-image ${loaded ? "loaded" : "loading"}`}
          onLoad={() => setLoaded(true)}
        />

        {/* PROMPT */}
        {current?.prompt && (
          <div className="viewer-prompt">
            {current.prompt}
          </div>
        )}

        {/* RIGHT */}
        <button
          className="viewer-arrow right"
          onClick={() => {
            setLoaded(false)
            setCurrentIndex(prev =>
              prev === images.length - 1 ? 0 : prev + 1
            )
          }}
        >
          ›
        </button>

      </div>

      {/* ===============================
      🔥 CONFIRM MODAL
      ============================== */}
      {confirmOpen && (
        <div
          className="confirm-overlay"
          onClick={() => setConfirmOpen(false)}
        >
          <div
            className="confirm-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Delete Image?</h3>
            <p>This action cannot be undone.</p>

            <div className="confirm-actions">
              <button
                className="confirm-btn"
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-btn delete"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}