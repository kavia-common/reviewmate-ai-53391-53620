"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "@/lib/api";
import SentimentBadge from "@/components/ui/SentimentBadge";

export default function LocationDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data } = useQuery({
    queryKey: ["location", id],
    queryFn: () => fetchJSON(`/api/mock/location?id=${id}`)
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-semibold">{data?.name || "Location"}</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card">
          <div className="text-slate-400 text-sm">Avg Sentiment</div>
          <div className="text-2xl font-semibold">{(data?.avgSentiment ?? 0).toFixed(2)}</div>
        </div>
        <div className="card">
          <div className="text-slate-400 text-sm">Avg Rating</div>
          <div className="text-2xl font-semibold">{(data?.avgRating ?? 0).toFixed(2)}</div>
        </div>
        <div className="card">
          <div className="text-slate-400 text-sm">Reviews (30d)</div>
          <div className="text-2xl font-semibold">{data?.reviews30d ?? 0}</div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-medium mb-2">Recent Reviews</h3>
        <ul className="divide-y divide-slate-700">
          {data?.recent?.map((r: any) => (
            <li key={r.id} className="py-3">
              <div className="flex items-center gap-2">
                <span className="font-medium">{r.author}</span>
                <SentimentBadge score={r.sentimentScore} />
                <span className="text-xs text-slate-400">{new Date(r.date).toLocaleString()}</span>
              </div>
              <p className="text-slate-200">{r.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
