import { NextResponse } from "next/server";

export async function GET() {
  const sentimentTrend = Array.from({ length: 12 }).map((_, i) => ({
    date: `M${i + 1}`,
    sentiment: Math.round((Math.sin(i / 2) * 0.5 + 0.5) * 100) / 100
  }));

  const channelSplit = [
    { name: "Google", value: 120 },
    { name: "Yelp", value: 70 },
    { name: "Facebook", value: 45 }
  ];

  const ratingDist = [1, 2, 3, 4, 5].map((stars) => ({
    stars,
    count: Math.floor(Math.random() * 80 + 10)
  }));

  const kpis = {
    avgSentiment: 0.63,
    avgRating: 4.3,
    reviews30d: 225,
    medianResponseHrs: 7.5
  };

  return NextResponse.json({ sentimentTrend, channelSplit, ratingDist, kpis });
}
