export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    // ❌ API error handle
    if (!res.ok || data.error) {
      console.error("API Error:", data);
      return new Response(
        JSON.stringify({ error: data?.error?.message || "API failed" }),
        { status: res.status || 500 }
      );
    }

    // ✅ SAFE PARSE (IMPORTANT)
    let text = "⚠️ No response";

    if (data?.candidates?.length > 0) {
      const parts = data.candidates[0]?.content?.parts;

      if (Array.isArray(parts)) {
        text = parts.map((p: any) => p.text || "").join("");
      }
    }

    return new Response(JSON.stringify({ text }), { status: 200 });

  } catch (error) {
    console.error("Connection Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to connect to Gemini API" }),
      { status: 500 }
    );
  }
}