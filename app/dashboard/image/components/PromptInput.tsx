"use client"

import { useRef, useEffect } from "react"

type Props = {
  value: string
  disabled?: boolean
  onChange: (v: string) => void
  onEnter: () => void
}

export default function PromptInput({
  value,
  disabled,
  onChange,
  onEnter
}: Props){

  const ref = useRef<HTMLTextAreaElement>(null)

  /* autofocus */

  useEffect(()=>{
    ref.current?.focus()
  },[])

  /* global shortcut */

  useEffect(()=>{

    function handleShortcut(e:KeyboardEvent){

      if((e.ctrlKey || e.metaKey) && e.key==="k"){

        e.preventDefault()
        ref.current?.focus()

      }

    }

    window.addEventListener("keydown",handleShortcut)

    return ()=>window.removeEventListener("keydown",handleShortcut)

  },[])

  function handleKeyDown(
    e:React.KeyboardEvent<HTMLTextAreaElement>
  ){

    if(e.key==="Enter" && !e.shiftKey){
      e.preventDefault()
      onEnter()
    }

    if(e.key==="Escape"){
      onChange("")

      if(ref.current){
        ref.current.style.height="auto"
      }

    }

  }

  function handleChange(
    e:React.ChangeEvent<HTMLTextAreaElement>
  ){

    const el = e.target

    onChange(el.value)

    /* auto expand */

    el.style.height="auto"

    const maxHeight = 160

    if(el.scrollHeight < maxHeight){

      el.style.height = el.scrollHeight + "px"

    }else{

      el.style.height = maxHeight + "px"
      el.style.overflowY = "auto"

    }

  }

  return(

    <textarea
      ref={ref}
      className="nira-prompt-input"
      placeholder="Describe the image you want to create..."
      value={value}
      rows={1}
      spellCheck
      maxLength={600}
      disabled={disabled}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />

  )

}