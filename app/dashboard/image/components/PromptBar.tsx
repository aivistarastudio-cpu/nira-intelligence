"use client"

import { useState, useRef, useEffect } from "react"
import ReferenceViewer from "./ReferenceViewer"

type PromptBarProps = {
  onGenerate: (
    prompt: string,
    size: string,
    referenceImages?: File[]
  ) => void
  disabled?: boolean
}

export default function PromptBar({ onGenerate, disabled }: PromptBarProps) {

  const [referenceImages, setReferenceImages] = useState<string[]>([])
  const [prompt, setPrompt] = useState("")
  const [size, setSize] = useState("1:1")

  const [images, setImages] = useState<File[]>([])
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const MAX_IMAGES = 10
  const MAX_LENGTH = 4000

  /* AUTO FOCUS */

  useEffect(()=>{
    inputRef.current?.focus()
  },[])

  /* GLOBAL SHORTCUT */

  useEffect(()=>{

    function handleShortcut(e:KeyboardEvent){

      if((e.ctrlKey || e.metaKey) && e.key==="k"){
        e.preventDefault()
        inputRef.current?.focus()
      }

    }

    window.addEventListener("keydown",handleShortcut)

    return ()=>window.removeEventListener("keydown",handleShortcut)

  },[])

  /* FILE PICKER */

  function openFilePicker(){
    fileRef.current?.click()
  }

  /* BASE64 CONVERT */

  function handleReferenceUpload(file:File){

    const reader = new FileReader()

    reader.onloadend = ()=>{

      const base64 = reader.result as string
      const clean = base64.split(",")[1]

      setReferenceImages(prev => [...prev, clean])

    }

    reader.readAsDataURL(file)

  }

  /* FILE CHANGE */

  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ){

    const files = e.target.files
    if(!files) return

    const arr = [...images]

    for(const f of files){

  if(arr.length >= MAX_IMAGES) break

  /* IMAGE SIZE LIMIT */

  if(f.size > 10 * 1024 * 1024){
    alert("Image must be under 10MB")
    continue
  }

  /* DUPLICATE IMAGE BLOCK */

  if(arr.some(img => img.name === f.name)){
    continue
  }

  arr.push(f)

  handleReferenceUpload(f)

}

    setImages(arr)

    e.target.value = ""

  }

  /* REMOVE IMAGE */

  function removeImage(index:number){

    const arr = [...images]
    const base64Arr = [...referenceImages]

    arr.splice(index,1)
    base64Arr.splice(index,1)

    setImages(arr)
    setReferenceImages(base64Arr)

    if(viewerIndex !== null && viewerIndex >= arr.length){
      setViewerIndex(arr.length - 1)
    }

  }

  /* REPLACE IMAGE */

  function replaceImage(index:number,file:File){

  const arr = [...images]
  arr[index] = file
  setImages(arr)

  const reader = new FileReader()

  reader.onloadend = ()=>{
    const base64 = reader.result as string
    const clean = base64.split(",")[1]

    const refs = [...referenceImages]
    refs[index] = clean
    setReferenceImages(refs)
  }

  reader.readAsDataURL(file)

}

  /* SUBMIT */

  function handleSubmit(){

    if(disabled) return

    const cleanPrompt = prompt.trim()

    if(!cleanPrompt) return

    onGenerate(cleanPrompt, size, images)

    setPrompt("")
    setImages([])
    setReferenceImages([])

    if(inputRef.current){
      inputRef.current.style.height="auto"
    }

    setTimeout(()=>{
      inputRef.current?.focus()
    },120)

  }

  /* KEYBOARD */

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ){

    if(e.key==="Enter" && !e.shiftKey){
      e.preventDefault()
      handleSubmit()
    }

    if((e.ctrlKey || e.metaKey) && e.key === "Enter"){
  e.preventDefault()
  handleSubmit()
}

    if(e.key==="Escape"){
  setPrompt("")
  setImages([])
  setReferenceImages([])
}

  }

  /* AUTO EXPAND */

  function handleChange(
  e: React.ChangeEvent<HTMLTextAreaElement>
){
  const el = e.target
  const value = el.value

  if (value.length > MAX_LENGTH) return

  setPrompt(value)

  // RESET HEIGHT
  el.style.height = "auto"

  const maxHeight = 160
  const newHeight = Math.min(el.scrollHeight, maxHeight)

  el.style.height = newHeight + "px"

  // FORCE SCROLL WHEN LIMIT REACHED
  if (el.scrollHeight > maxHeight) {
    el.style.overflowY = "auto"
  } else {
    el.style.overflowY = "hidden"
  }
}
  /* PREVIEW URL */

  const [previewURL,setPreviewURL] = useState<string | null>(null)

useEffect(()=>{

  if(images.length===0){
    setPreviewURL(null)
    return
  }

  const url = URL.createObjectURL(images[0])
  setPreviewURL(url)

  return ()=>URL.revokeObjectURL(url)

},[images])

  useEffect(()=>{
    return ()=>{
      if(previewURL) URL.revokeObjectURL(previewURL)
    }
  },[previewURL])

  return(

    <>

    <div className="nira-prompt-capsule">

      {/* IMAGE STACK PREVIEW */}

      {images.length > 0 && previewURL && (

        <div
        className="nira-ref-preview-stack"
        onClick={()=>setViewerIndex(0)}
        >

          <img
          className="nira-ref-thumb"
          src={previewURL}
          alt="reference"
          />

          {images.length > 1 && (
          <span className="nira-ref-count">
            +{images.length - 1}
          </span>
          )}

        </div>

      )}

      {/* FILE INPUT */}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        style={{display:"none"}}
        onChange={handleFileChange}
      />

      {/* ATTACH */}

      <button
        className="nira-attach-btn"
        disabled={disabled || images.length >= MAX_IMAGES}
        onClick={openFilePicker}
      >
        +
      </button>

      {/* PROMPT */}

      <textarea
        ref={inputRef}
        className="nira-prompt-input"
        placeholder={
  disabled
    ? "Generating..."
    : "Describe anything in detail..."
}
        value={prompt}
        rows={1}
        spellCheck
        disabled={disabled}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {/* SIZE */}

      <select
        className="nira-size-select"
        value={size}
        disabled={disabled}
        onChange={(e)=>setSize(e.target.value)}
      >

        <option value="1:1">Square (1:1)</option>
        <option value="16:9">Landscape (16:9)</option>
        <option value="9:16">Portrait (9:16)</option>

      </select>

      {/* CREATE */}

      <button
        className="nira-generate-btn"
        onClick={handleSubmit}
        disabled={disabled || !prompt.trim()}
      >

        {disabled ? "Generating..." : "Create"}

      </button>

    </div>

    {/* VIEWER */}

    {viewerIndex !== null && images.length > 0 && (

      <ReferenceViewer
        images={images}
        index={viewerIndex}
        onClose={()=>setViewerIndex(null)}
        onDelete={removeImage}
        onReplace={replaceImage}
        onNavigate={(i)=>setViewerIndex(i)}
      />

    )}

    </>

  )

}