"use client"

import { Download, Expand, FileText, Trash2, Heart } from "lucide-react"
import { useState } from "react"

import "../styles/viewer.css"

/* ---------- TYPES ---------- */

type Props = {
  id: string
  src: string
  size: string
  prompt: string
  onDelete: (id:string)=>void
  onOpen: (id:string)=>void
}

/* ---------- COMPONENT ---------- */

export default function ImageCard({
  id,
  src,
  size,
  prompt,
  onDelete,
  onOpen
}:Props){

  const [promptView,setPromptView] = useState(false)
  const [copied,setCopied] = useState(false)
  const [liked,setLiked] = useState(false)
  const [deleteOpen,setDeleteOpen] = useState(false)

  /* ---------- RATIO ---------- */

  let ratioClass="ratio-square"

  if(size.includes("16:9")) ratioClass="ratio-landscape"
  if(size.includes("9:16")) ratioClass="ratio-portrait"

  /* ---------- DOWNLOAD ---------- */

  const handleDownload = async()=>{

    if(!src) return

    try{

      const res = await fetch(src)
      const blob = await res.blob()

      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href=url
      link.download="nira-image.png"
      link.click()

      setTimeout(()=>{
        URL.revokeObjectURL(url)
      },100)

    }
    catch{
      console.log("download failed")
    }

  }

  /* ---------- COPY PROMPT ---------- */

  const copyPrompt = async()=>{

    try{

      await navigator.clipboard.writeText(prompt)

      setCopied(true)

      setTimeout(()=>{
        setCopied(false)
      },1500)

    }
    catch{
      console.log("copy failed")
    }

  }

  /* ---------- UI ---------- */

  return(

    <>

      <div className={`nira-card ${ratioClass}`}>

        <img
          src={src}
          alt={prompt}
          className="nira-card-img nira-img"
          onClick={()=>onOpen(id)}
          onLoad={(e)=>e.currentTarget.classList.add("loaded")}
        />

        {/* ---------- TOOL CAPSULE ---------- */}

        <div className="nira-tools">

          <button
          className="nira-tool-btn"
          onClick={handleDownload}
          title="Download"
          >
            <Download size={18}/>
          </button>

          <button
          className="nira-tool-btn"
          onClick={()=>onOpen(id)}
          title="Expand"
          >
            <Expand size={18}/>
          </button>

          <button
          className="nira-tool-btn"
          onClick={()=>setPromptView(true)}
          title="Prompt"
          >
            <FileText size={18}/>
          </button>

          <button
          className="nira-tool-btn"
          onClick={()=>setLiked(!liked)}
          title="Favorite"
          >
            <Heart
            size={18}
            fill={liked?"red":"none"}
            color={liked?"red":"white"}
            />
          </button>

          <button
          className="nira-tool-btn"
          onClick={()=>setDeleteOpen(true)}
          title="Delete"
          >
            <Trash2 size={18}/>
          </button>

        </div>

      </div>

      {/* ---------- PREMIUM PROMPT MODAL ---------- */}

      {promptView &&(

      <div
className="nira-viewer-prompt-overlay nira-card-prompt-overlay"
onClick={()=>setPromptView(false)}
>

<div
className="nira-viewer-prompt-box nira-card-prompt-box"
onClick={(e)=>e.stopPropagation()}
>

          <h3>Prompt</h3>

          <p className="nira-prompt-hint-highlight">
Prompt editing is available in the Image Viewer. Open the image and click the prompt icon to modify it.
</p>

          <p className="nira-viewer-prompt-text">
            {prompt}
          </p>

          <div className="nira-delete-actions">

            <button
            className="nira-regenerate-btn"
            onClick={copyPrompt}
            >
              {copied ? "Copied ✓" : "Copy Prompt"}
            </button>

            <button
            onClick={()=>setPromptView(false)}
            >
              Close
            </button>

          </div>

        </div>

      </div>

      )}

      {/* ---------- PREMIUM DELETE MODAL ---------- */}

      {deleteOpen &&(

      <div
      className="nira-viewer-delete-overlay"
      onClick={()=>setDeleteOpen(false)}
      >

        <div
        className="nira-viewer-delete-box"
        onClick={(e)=>e.stopPropagation()}
        >

          <h3>Delete Image?</h3>

          <p>This image will be permanently deleted.</p>

          <div className="nira-delete-actions">

            <button
            onClick={()=>setDeleteOpen(false)}
            >
              Cancel
            </button>

            <button
            className="delete"
            onClick={()=>{
              onDelete(id)
              setDeleteOpen(false)
            }}
            >
              Delete
            </button>

          </div>

        </div>

      </div>

      )}

    </>

  )

}