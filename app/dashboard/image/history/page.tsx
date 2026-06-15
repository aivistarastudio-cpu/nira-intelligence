"use client"

import { ArrowLeft } from "lucide-react"
import HistoryStack from "./HistoryStack"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import "./history.css"
import Viewer from "./Viewer"

export default function Page() {
  const router = useRouter()

  const [viewerOpen, setViewerOpen] = useState(false)
  const [viewerImages, setViewerImages] = useState<any[]>([])

  const [historyData, setHistoryData] = useState<any[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [search, setSearch] = useState("")

  const [deleteAllOpen, setDeleteAllOpen] = useState(false)

  // ✅ NEW (LOADING STATE)
  const [loading, setLoading] = useState(true)

  /* ---------- 🧠 SMART LABEL ---------- */
  const getLabel = (dateStr: string) => {
    const d = new Date(dateStr)
    const now = new Date()

    const diff = Math.floor(
      (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (diff === 0) return "Today"
    if (diff === 1) return "Yesterday"
    if (diff < 7) return "This Week"

    return dateStr
  }

  /* ---------- LOAD HISTORY ---------- */
  const loadHistory = () => {
    setLoading(true) // ✅ ADD

    const data = JSON.parse(localStorage.getItem("nira_images") || "[]")

    const grouped: any = {}

    data.forEach((img: any) => {
      const date = img.time || "Unknown"

      if (!grouped[date]) grouped[date] = []
      grouped[date].push(img)
    })

    const finalData = Object.keys(grouped)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .map(date => ({
        date: getLabel(date),
        items: grouped[date]
      }))

    setHistoryData(finalData)

    // ✅ SMOOTH DELAY (IMPORTANT)
    setTimeout(() => {
      setLoading(false)
    }, 120)
  }

  /* ---------- LOAD FAVORITES ---------- */
  const loadFavorites = () => {
    const fav = JSON.parse(localStorage.getItem("nira_favorites") || "[]")
    setFavorites(fav)
  }

  /* ---------- DELETE SINGLE ---------- */
  const handleDelete = (id: string) => {
    const stored = JSON.parse(localStorage.getItem("nira_images") || "[]")

    const updated = stored.filter((img: any) => img.id !== id)

    localStorage.setItem("nira_images", JSON.stringify(updated))

    loadHistory()
    window.dispatchEvent(new Event("historyUpdated"))
  }

  /* ---------- DELETE ALL ---------- */
  const handleDeleteAll = () => {
    localStorage.removeItem("nira_images")
    setDeleteAllOpen(false)
    loadHistory()
    window.dispatchEvent(new Event("historyUpdated"))
  }

  /* ---------- EFFECT ---------- */
  useEffect(() => {
    loadHistory()
    loadFavorites()

    window.addEventListener("historyUpdated", loadHistory)
    window.addEventListener("storage", loadHistory)
    window.addEventListener("nira:favorites:update", loadFavorites)

    return () => {
      window.removeEventListener("historyUpdated", loadHistory)
      window.removeEventListener("storage", loadHistory)
      window.removeEventListener("nira:favorites:update", loadFavorites)
    }
  }, [])

  /* ---------- SEARCH FILTER ---------- */
  const filteredData = historyData
    .map(group => {
      const filteredItems = group.items.filter((img: any) =>
        img.prompt?.toLowerCase().includes(search.toLowerCase())
      )

      return { ...group, items: filteredItems }
    })
    .filter(group => group.items.length > 0)

  return (
    <div>

      {/* 🔥 TOP BAR */}
      <div className="history-topbar">

        <button
          className="history-back"
          onClick={() => router.push("/dashboard/image")}
        >
          <ArrowLeft size={18} />
        </button>

        <div className="history-search-wrapper">
          <input
            placeholder="Search images..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="history-search"
          />
        </div>

        <button
          onClick={() => setDeleteAllOpen(true)}
          style={{
            position: "absolute",
            right: "20px",
            height: "42px",
            padding: "0 14px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "white",
            cursor: "pointer"
          }}
        >
          Clear
        </button>

      </div>

      {/* ✅ CONTENT WITH FADE CONTROL */}
      <div className={`history-content ${loading ? "loading" : "loaded"}`}>

        {/* ⭐ FAVORITES */}
        {!loading && favorites.length > 0 && (
          <div style={{ marginBottom: "40px" }}>

            <div className="history-header">
              <h2 className="history-date">Favorites</h2>
              <span className="history-count">
                {favorites.length} saved
              </span>
            </div>

            <div className="history-grid">

              {favorites.map((favId, i) => {
                const all = JSON.parse(localStorage.getItem("nira_images") || "[]")
                const img = all.find((x:any) => x.id === favId)

                if (!img) return null

                return (
                  <div
                    key={i}
                    className="stack-card"
                    onClick={() => {
                      setViewerImages([img])
                      setViewerOpen(true)
                    }}
                  >
                    <img
  src={img.url}
  className="stack-img front blur-load"
  loading="lazy"
  onLoad={(e) => e.currentTarget.classList.add("loaded")}
/>

                    <div style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px"
                    }}>
                      ⭐
                    </div>
                  </div>
                )
              })}

            </div>

          </div>
        )}

        {/* ❌ EMPTY STATE FIX */}
        {!loading && filteredData.length === 0 && (
          <div style={{
            textAlign: "center",
            opacity: 0.5,
            marginTop: "80px"
          }}>
            No images found
          </div>
        )}

        {/* 🔥 SKELETON LOADER */}
{loading && (
  <div className="history-grid">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="stack-skeleton" />
    ))}
  </div>
)}

        {/* STACK */}
        {!loading && filteredData.map((group, i) => (
          <div key={i}>
            <HistoryStack
              group={group}
              onOpen={(imgs: any[]) => {

                const fullImages = JSON.parse(localStorage.getItem("nira_images") || "[]")

                const matched = imgs.map((h: any) =>
                  fullImages.find((f: any) => f.id === h.id) || h
                )

                setViewerImages(matched)
                setViewerOpen(true)
              }}
            />
          </div>
        ))}

        {/* VIEWER */}
        {viewerOpen && (
          <Viewer
            images={viewerImages}
            onClose={() => setViewerOpen(false)}
            onDelete={handleDelete}
          />
        )}

      </div>

      {/* DELETE ALL MODAL */}
      {deleteAllOpen && (
        <div
          className="confirm-overlay"
          onClick={() => setDeleteAllOpen(false)}
        >
          <div
            className="confirm-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Clear All History?</h3>
            <p>This will permanently remove all images.</p>

            <div className="confirm-actions">
              <button
                className="confirm-btn"
                onClick={() => setDeleteAllOpen(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-btn delete"
                onClick={handleDeleteAll}
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