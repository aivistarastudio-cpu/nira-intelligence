import { NextResponse } from "next/server"

export const maxDuration = 30
export const dynamic = "force-dynamic"

/* ---------- MODEL MAP ---------- */

const MODEL_MAP:any = {

  "Nano Banana": "gemini-2.5-flash-image",
  "Nano Banana Pro": "gemini-3-pro-image-preview",
  "Nano Banana 2": "gemini-2.5-flash-image",

  "Imagen 4": "gemini-2.5-flash-image",
  "Imagen 4 Ultra": "gemini-3-pro-image-preview",
  "Imagen 4 Fast": "gemini-2.5-flash-image"

}

/* ---------- RETRY SYSTEM ---------- */

async function fetchWithRetry(
  url:string,
  options:any,
  retries=2
):Promise<Response>{

  try{

    const res = await fetch(url,options)

    if(!res.ok && retries > 0){
      return fetchWithRetry(url,options,retries-1)
    }

    return res

  }catch(err){

    if(retries > 0){
      return fetchWithRetry(url,options,retries-1)
    }

    throw err

  }

}

/* ---------- API ---------- */

export async function POST(req:Request){

  try{

    const body = await req.json()

    const { prompt, model, referenceImage, size } = body || {}

    const apiKey = process.env.GOOGLE_API_KEY

    if(!prompt){
      return NextResponse.json({ error:"Prompt missing" })
    }

    if(!apiKey){
      return NextResponse.json({ error:"Missing GOOGLE_API_KEY" })
    }

    const apiModel =
      MODEL_MAP[model] || "gemini-2.5-flash-image"

    /* ---------- SIZE PROMPT ---------- */

    let ratioInstruction = ""
    let aspectRatio = "1:1"

    if(size === "16:9"){
      ratioInstruction = "Generate a wide cinematic landscape image."
      aspectRatio = "16:9"
    }

    else if(size === "9:16"){
      ratioInstruction = "Generate a tall vertical portrait image."
      aspectRatio = "9:16"
    }

    else{
      ratioInstruction = "Generate a square image."
      aspectRatio = "1:1"
    }

    const finalPrompt =
      `${prompt}. ${ratioInstruction}`

    /* ---------- PARTS ---------- */

    const parts:any = [
      { text: finalPrompt }
    ]

    /* ---------- REFERENCE IMAGE ---------- */

    if(referenceImage?.data){

      parts.push({
        inlineData:{
          mimeType: referenceImage.mimeType || "image/png",
          data: referenceImage.data
        }
      })

    }

    /* ---------- API CALL ---------- */

    const res = await fetchWithRetry(

      `https://generativelanguage.googleapis.com/v1beta/models/${apiModel}:generateContent?key=${apiKey}`,

      {

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          contents:[
            {
              parts:parts
            }
          ],

          generationConfig:{

            responseModalities:["IMAGE"],

            imageConfig:{
              aspectRatio:aspectRatio
            },

            temperature:0.8,
            topK:32,
            topP:0.95

          }

        })

      }

    )

    const data = await res.json()

    const partsResponse =
      data?.candidates?.[0]?.content?.parts || []

    const imagePart =
      partsResponse.find((p:any)=>p.inlineData)

    const base64 =
      imagePart?.inlineData?.data

    if(!base64){

      console.error("IMAGE GENERATION FAILED",data)

      return NextResponse.json({
        error:"Image generation failed"
      })

    }

    const imageUrl =
      `data:image/png;base64,${base64}`

    /* ---------- RETURN ---------- */

    return NextResponse.json({
      url:imageUrl
    })

  }

  catch(e){

    console.error("GENERATION ERROR:",e)

    return NextResponse.json({
      error:"generation failed"
    })

  }

}