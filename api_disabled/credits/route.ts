// TEMP SAFE ROUTE — build break na ho

export async function GET() {
  return new Response(
    JSON.stringify({ status: "ok", message: "Temporary route active" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}