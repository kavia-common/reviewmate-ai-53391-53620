import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const channel = searchParams.get("channel") || "all";
  const location = searchParams.get("location") || "all";

  const sample = [
    {
      id: "r1",
      author: "Alice",
      text: "Great service and friendly staff!",
      channel: "google",
      date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      sentimentScore: 0.78
    },
    {
      id: "r2",
      author: "Bob",
      text: "Waited too long for my order.",
      channel: "yelp",
      date: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
      sentimentScore: -0.43
    },
    {
      id: "r3",
      author: "Carla",
      text: "Food was decent, could be better.",
      channel: "facebook",
      date: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
      sentimentScore: 0.1
    }
  ];

  const items = sample.filter(r => (channel === "all" || r.channel === channel) && (location === "all" || location));
  return NextResponse.json({ items });
}

export async function POST() {
  return NextResponse.json({ ok: true });
}
