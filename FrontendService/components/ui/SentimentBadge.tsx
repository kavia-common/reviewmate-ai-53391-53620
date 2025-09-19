"use client";

export default function SentimentBadge({ score }: { score: number }) {
  let color = "bg-slate-700 text-slate-200";
  if (score > 0.25) color = "bg-green-500/20 text-green-300";
  if (score < -0.25) color = "bg-red-500/20 text-red-300";
  return <span className={`badge ${color}`}>Sentiment {score.toFixed(2)}</span>;
}
