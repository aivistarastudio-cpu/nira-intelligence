export async function generateNanoImage(prompt: string, model: string) {

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateImage?key=${process.env.GOOGLE_AI_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt
      })
    }
  )

  const data = await response.json()

  return data?.image || null

}