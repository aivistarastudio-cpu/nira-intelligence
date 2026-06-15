"use client"

import { useState } from "react"

export default function PromptBar({
  selectedModel,
  onGenerate,
  isGenerating
}: any) {

  const [prompt, setPrompt] = useState("")

  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) return

    console.log("Model:", selectedModel)
    console.log("Prompt:", prompt)

    // 🚀 INSTANT CALL (NO DELAY)
    onGenerate?.(prompt)

    setPrompt("")
  }

  return (
    <div className="w-full flex justify-center px-4 pb-6">

      <div className="w-full max-w-2xl">

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-2 backdrop-blur-md">

          {/* INPUT */}
          <input
            type="text"
            placeholder="Describe your video idea..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}

            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleGenerate()
              }
            }}

            className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/40 px-2"
          />

          {/* BUTTON */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              isGenerating
                ? "bg-white/10 text-white/40 cursor-not-allowed"
                : "bg-white text-black hover:scale-105"
            }`}
          >
            {isGenerating ? "Generating..." : "Generate"}
          </button>

        </div>

      </div>

    </div>
  )
}