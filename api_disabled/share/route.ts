import { NextResponse } from "next/server";

let db: any = {};

export async function POST(req: Request) {
  const body = await req.json();

  const id = Date.now().toString();

  db[id] = body.messages;

  return NextResponse.json({ id });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id || !db[id]) {
    return NextResponse.json({ error: "Not found" });
  }

  return NextResponse.json({ messages: db[id] });
}