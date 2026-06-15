"use client"

import { useRef, useEffect, useState } from "react"

type Props = {
  images: File[]
  index: number

  onClose: ()=>void
  onDelete: (index:number)=>void
  onReplace: (index:number,file:File)=>void
  onNavigate: (index:number)=>void
}

export default function ReferenceViewer({
  images,
  index,
  onClose,
  onDelete,
  onReplace,
  onNavigate
}:Props){

  const fileRef = useRef<HTMLInputElement>(null)

  const image = images[index]

  if(!image) return null

  const [url,setUrl] = useState<string | null>(null)

useEffect(()=>{

  const objectUrl = URL.createObjectURL(image)

  setUrl(objectUrl)

  return ()=>URL.revokeObjectURL(objectUrl)

},[image])

  /* ESC CLOSE */

  useEffect(()=>{

  function handleKey(e:KeyboardEvent){

    if(e.key === "Escape"){
      onClose()
    }

    if(e.key === "ArrowRight"){
      next()
    }

    if(e.key === "ArrowLeft"){
      prev()
    }

  }

  window.addEventListener("keydown",handleKey)

  return ()=>{
    window.removeEventListener("keydown",handleKey)
  }

},[index,image])

  /* REPLACE */

  function openReplace(){
    fileRef.current?.click()
  }

  function handleReplace(
    e:React.ChangeEvent<HTMLInputElement>
  ){

    const file = e.target.files?.[0]
    if(!file) return

    onReplace(index,file)

    /* reset input */
    e.target.value = ""

  }

  /* NAVIGATION */

  function next(){
    if(index < images.length-1){
      onNavigate(index+1)
    }
  }

  function prev(){
    if(index > 0){
      onNavigate(index-1)
    }
  }

  /* DELETE */

  function handleDelete(){

    onDelete(index)

    if(images.length <= 1){
      onClose()
    }

  }

  return(

    <div
      className="nira-ref-viewer"
      onClick={onClose}
    >

      {/* IMAGE STAGE */}

      <div
        className="nira-view-stage"
        onClick={(e)=>e.stopPropagation()}
      >

        {url && (

<img
key={url}
className="nira-view-img"
src={url}
alt="reference"
/>

)}

      </div>

      {/* NAVIGATION */}

      {index > 0 && (

        <button
          className="nira-view-prev"
          onClick={(e)=>{
            e.stopPropagation()
            prev()
          }}
        >
          ‹
        </button>

      )}

      {index < images.length-1 && (

        <button
          className="nira-view-next"
          onClick={(e)=>{
            e.stopPropagation()
            next()
          }}
        >
          ›
        </button>

      )}

      {/* ACTIONS */}

      <div
        className="nira-ref-actions"
        onClick={(e)=>e.stopPropagation()}
      >

        <button
          className="nira-ref-delete"
          onClick={handleDelete}
        >
          Delete
        </button>

        <button
          className="nira-ref-replace"
          onClick={openReplace}
        >
          Replace
        </button>

        <button
          className="nira-ref-close"
          onClick={onClose}
        >
          Close
        </button>

      </div>

      {/* HIDDEN INPUT */}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{display:"none"}}
        onChange={handleReplace}
      />

    </div>

  )

}