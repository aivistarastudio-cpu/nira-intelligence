"use client"

type Props = {
  prompt:string
  size:string
  disabled?:boolean
  onSizeChange:(s:string)=>void
  onGenerate:()=>void
}

export default function PromptControls({
  prompt,
  size,
  disabled,
  onSizeChange,
  onGenerate
}:Props){

  return(

    <div className="nira-prompt-controls">

      {/* IMAGE SIZE */}

      <select
        className="nira-size-select"
        value={size}
        disabled={disabled}
        onChange={(e)=>onSizeChange(e.target.value)}
      >

        <option value="1:1">Square (1:1)</option>
        <option value="16:9">Landscape (16:9)</option>
        <option value="9:16">Portrait (9:16)</option>

      </select>

      {/* GENERATE BUTTON */}

      <button
        className="nira-generate-btn"
        onClick={onGenerate}
        disabled={disabled || !prompt.trim()}
      >

        {disabled ? "Generating..." : "Create"}

      </button>

    </div>

  )

}