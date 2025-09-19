import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "loc-1";
  const data = {
    id,
    name: id === "loc-2" ? "Airport" : id === "loc-3" ? "Uptown" : "Downtown",
    avgSentiment: 0.58,
    avgRating: 4.2,
    reviews30d: 82,
    recent: [
      { id: "r1", author: "Nina", text: "Awesome place!", date: new Date().toISOString(), sentimentScore: 0.8 },
      { id: "r2", author: "Liam", text: "Not great this time.", date: new Date(Date.now() - 86400000).toISOString(), sentimentScore: -0.2 }
    ]
  };
  return NextResponse.json(data);
}
