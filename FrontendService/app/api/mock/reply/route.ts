import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  // Simulate persistence
  return NextResponse.json({ ok: true, ...body });
}
