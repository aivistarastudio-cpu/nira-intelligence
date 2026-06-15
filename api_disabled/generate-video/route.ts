import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { prompt, model } = await req.json()

    // 🔐 API KEY (from .env)
    const API_KEY = process.env.GOOGLE_API_KEY

    if (!API_KEY) {
      return NextResponse.json(
        { error: "Missing API Key" },
        { status: 500 }
      )
    }

    if (!prompt || !model) {
      return NextResponse.json(
        { error: "Prompt or model missing" },
        { status: 400 }
      )
    }

    // 🔥 Google API Endpoint (dynamic model)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`

    // 📦 Request Body (basic structure)
    const body = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    }

    // 🚀 API Call
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    const data = await res.json()

    // ❌ Error handling
    if (!res.ok) {
      return NextResponse.json(
        { error: data },
        { status: 500 }
      )
    }

    // ✅ SUCCESS RESPONSE
    return NextResponse.json({
      success: true,
      data
    })

  } catch (error) {
    return NextResponse.json(
      { error: "Server Error", details: error },
      { status: 500 }
    )
  }
}