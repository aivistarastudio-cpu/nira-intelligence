"use client"

import ImageCard from "./ImageCard"
import GeneratingCard from "./GeneratingCard"

import "../styles/imageGridV2.css"
import "../styles/imageCardGenerate.css"

/* ========================= */
/* TYPES */
/* ========================= */

type ImageItem = {
  id: string
  url: string
  size: string
  prompt: string
}

type Props = {
  images: ImageItem[]
  onDelete: (id:string)=>void
  onOpen: (id:string)=>void
}

/* ========================= */
/* COMPONENT */
/* ========================= */

export default function ImageGrid({
  images,
  onDelete,
  onOpen
}:Props){

  if(!images || images.length===0){
    return null
  }

  return(

    <div className="nira-grid">

      {images.map((img)=>{

        if(!img) return null

        /* ---------- RATIO ---------- */

        let ratioClass="square"

        if(img.size==="9:16") ratioClass="portrait"
        else if(img.size==="16:9") ratioClass="landscape"

        const isGenerating=!img.url

        /* ========================= */
        /* GENERATING CARD */
        /* ========================= */

        if(isGenerating){

          return(

            <GeneratingCard
              key={`gen-${img.id}`}
              ratio={ratioClass}
            />

          )

        }

        /* ========================= */
        /* IMAGE CARD */
        /* ========================= */

        return(

          <ImageCard
            key={`img-${img.id}`}
            id={img.id}
            src={img.url}
            size={img.size}
            prompt={img.prompt}
            onDelete={onDelete}
            onOpen={onOpen}
          />

        )

      })}

    </div>

  )

}