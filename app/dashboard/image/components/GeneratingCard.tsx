"use client"

import ThinkingAnimation from "./ThinkingAnimation"

type Props = {
  ratio: string
}

export default function GeneratingCard({ ratio }: Props){

  const ratioClass = ratio ? `nira-gen-${ratio}` : "nira-gen-1-1"

  return(

    <div className={`nira-generating-card ${ratioClass}`}>

      {/* generation stage */}

      <div className="nira-gen-stage">

        <div className="nira-gen-center">
          <ThinkingAnimation/>
        </div>

      </div>

    </div>

  )

}