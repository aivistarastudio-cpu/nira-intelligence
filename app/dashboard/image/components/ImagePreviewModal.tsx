"use client"

import { X, ChevronLeft, ChevronRight, Download, FileText, Trash2 } from "lucide-react"
import { useState, useEffect, useRef } from "react"

import "../styles/viewer.css"

type ImageItem = {
  id: string
  url: string
  size: string
  prompt: string
}

type Props = {
  images: ImageItem[]
  index: number
  onClose: ()=>void
  onDelete: (id:string)=>void
  onNavigate: (i:number)=>void
  onRegenerate: (prompt:string,size:string)=>void
}

export default function ImagePreviewModal({
  images,
  index,
  onClose,
  onDelete,
  onNavigate,
  onRegenerate
}:Props){

  const [promptOpen,setPromptOpen] = useState(false)
  const [deleteConfirm,setDeleteConfirm] = useState(false)
  const [editedPrompt,setEditedPrompt] = useState("")

  const img = images[index]

  if(!img) return null

  useEffect(()=>{
    setEditedPrompt(img.prompt || "")
  },[img])

  /* ========================= */
  /* ZOOM SYSTEM */
  /* ========================= */

  const [zoom,setZoom] = useState(1)
  const [pos,setPos] = useState({x:0,y:0})

  const dragging = useRef(false)
  const start = useRef({x:0,y:0})
  const [slide,setSlide] = useState("")

  useEffect(()=>{
    setZoom(1)
    setPos({x:0,y:0})
  },[index])

  useEffect(()=>{
    setSlide("")
  },[index])

  /* ========================= */
  /* KEYBOARD NAV */
  /* ========================= */

  useEffect(()=>{

    const handleKey=(e:KeyboardEvent)=>{

      if(e.key==="Escape") onClose()

      if(e.key==="ArrowLeft" && index>0){

        setSlide("nira-slide-prev")

        setTimeout(()=>{
          onNavigate(index-1)
        },40)

      }

      if(e.key==="ArrowRight" && index<images.length-1){

        setSlide("nira-slide-next")

        setTimeout(()=>{
          onNavigate(index+1)
        },40)

      }

    }

    window.addEventListener("keydown",handleKey)

    return ()=>{
      window.removeEventListener("keydown",handleKey)
    }

  },[index,images.length,onClose,onNavigate])

  /* ========================= */
  /* ZOOM SCROLL */
  /* ========================= */

  const handleWheel=(e:React.WheelEvent)=>{

    e.preventDefault()

    let newZoom = zoom - e.deltaY * 0.002

    if(newZoom<1) newZoom=1
    if(newZoom>4) newZoom=4

    setZoom(newZoom)

  }

  /* ========================= */
  /* DRAG */
  /* ========================= */

  const onMouseDown=(e:React.MouseEvent)=>{

    if(zoom<=1) return

    dragging.current=true

    start.current={
      x:e.clientX-pos.x,
      y:e.clientY-pos.y
    }

  }

  const onMouseMove=(e:React.MouseEvent)=>{

    if(!dragging.current) return

    setPos({
      x:e.clientX-start.current.x,
      y:e.clientY-start.current.y
    })

  }

  const onMouseUp=()=>{
    dragging.current=false
  }

  const resetZoom=()=>{
    setZoom(1)
    setPos({x:0,y:0})
  }

  /* ========================= */
  /* DOWNLOAD */
  /* ========================= */

  const handleDownload = async () => {

  try {

    const response = await fetch(img.url)
    const blob = await response.blob()

    const prompt = img.prompt?.trim()

    const cleanPrompt =
      prompt && prompt.length > 0
        ? prompt
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .slice(0,40)
        : `image-${Date.now()}`

    const filename = `nira-${cleanPrompt}-${img.size}.png`

    const blobUrl = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = blobUrl
    link.download = filename

    document.body.appendChild(link)
    link.click()
    link.remove()

    URL.revokeObjectURL(blobUrl)

  } catch (err) {

    console.log("download error", err)

  }

}
  
  
  /* ========================= */
  /* NAVIGATION */
  /* ========================= */

  const prev = ()=>{

    if(index>0){

      setSlide("nira-slide-prev")

      setTimeout(()=>{
        onNavigate(index-1)
      },40)

    }

  }

  const next = ()=>{

    if(index<images.length-1){

      setSlide("nira-slide-next")

      setTimeout(()=>{
        onNavigate(index+1)
      },40)

    }

  }

  /* ========================= */
  /* REGENERATE */
  /* ========================= */

  const regenerate = ()=>{

  if(!editedPrompt.trim()) return

  setPromptOpen(false)

  onClose()

  setTimeout(()=>{
    onRegenerate(editedPrompt, img.size)
  },150)

}

  return(

    <div className="nira-viewer">

      {/* CLOSE */}

      <button
      className="nira-viewer-close"
      onClick={onClose}
      >
        <X size={22}/>
      </button>

      {/* IMAGE */}

      <div
      className="nira-viewer-stage"
      onWheel={handleWheel}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      >

        <img
        src={img.url || undefined}
        alt={img.prompt}
        className={`nira-viewer-img ${slide}`}
        onMouseDown={onMouseDown}
        onDoubleClick={resetZoom}
        style={{
          transform:`translate(${pos.x}px,${pos.y}px) scale(${zoom})`,
          cursor: zoom>1 ? "grab":"default"
        }}
        />

      </div>

      {/* LEFT NAV */}

      {index > 0 && (
      <button
      className="nira-viewer-nav left"
      onClick={prev}
      >
      <ChevronLeft size={34}/>
      </button>
      )}

      {/* RIGHT NAV */}

      {index < images.length-1 && (
      <button
      className="nira-viewer-nav right"
      onClick={next}
      >
      <ChevronRight size={34}/>
      </button>
      )}

      {/* TOOLBAR */}

      <div className="nira-viewer-toolbar">

        <button onClick={handleDownload}>
          <Download size={20}/>
        </button>

        <button
        onClick={()=>{
          setEditedPrompt(img.prompt || "")
          setPromptOpen(true)
        }}
        >
        <FileText size={20}/>
        </button>

        <button onClick={()=>setDeleteConfirm(true)}>
          <Trash2 size={20}/>
        </button>

      </div>

      {/* PROMPT MODAL */}

      {promptOpen &&(

      <div
      className="nira-viewer-prompt-overlay"
      onClick={()=>setPromptOpen(false)}
      >

        <div
        className="nira-viewer-prompt-box"
        onClick={(e)=>e.stopPropagation()}
        >

          <h3>Edit Prompt</h3>

          <textarea
          className="nira-prompt-editor"
          value={editedPrompt}
          onChange={(e)=>setEditedPrompt(e.target.value)}
          />

          <div className="nira-prompt-actions">

            <button
            className="nira-regenerate-btn"
            onClick={regenerate}
            >
              Regenerate Image
            </button>

            <button
            onClick={()=>setPromptOpen(false)}
            >
              Close
            </button>

          </div>

        </div>

      </div>

      )}

      {/* DELETE MODAL */}

      {deleteConfirm &&(

      <div
      className="nira-viewer-delete-overlay"
      onClick={()=>setDeleteConfirm(false)}
      >

        <div
        className="nira-viewer-delete-box"
        onClick={(e)=>e.stopPropagation()}
        >

          <h3>Delete Image?</h3>

          <p>This image will be permanently deleted.</p>

          <div className="nira-delete-actions">

            <button
            onClick={()=>setDeleteConfirm(false)}
            >
              Cancel
            </button>

            <button
            className="delete"
            onClick={()=>{
              onDelete(img.id)
              setDeleteConfirm(false)
            }}
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