import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const suggestion = `Hi there, thanks for your feedback on review ${id}. We appreciate your time and are here to help.`;
  return NextResponse.json({ suggestion });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const suggestion = `Thanks for sharing. We value your input and will pass this to our team. (${body?.tone || "professional"})`;
  return NextResponse.json({ suggestion });
}
