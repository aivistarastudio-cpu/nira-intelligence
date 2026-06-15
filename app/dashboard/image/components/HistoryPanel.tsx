"use client"

type ImageItem = {
  id: string
  url: string
  prompt: string
}

export default function HistoryPanel({
  images
}: {
  images: ImageItem[]
}) {

  if (!images.length) {
    return <div className="empty">No history yet</div>
  }

  return (
    <div className="grid">

      {images.map(img => (
        <div key={img.id} className="card">

          <img src={img.url} alt="" />

          <div className="overlay">
            {img.prompt}
          </div>

        </div>
      ))}

    </div>
  )
}