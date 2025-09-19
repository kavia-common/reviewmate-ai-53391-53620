"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useAppStore } from "@/store/app";
import { fetchJSON } from "@/lib/api";
import SentimentBadge from "@/components/ui/SentimentBadge";
import AISuggestionPanel from "@/components/reviews/AISuggestionPanel";

export default function ReviewsPage() {
  useSession({ required: true });
  const [channel, setChannel] = useState<string>("all");
  const [location, setLocation] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const locations = useAppStore(s => s.locations);

  const { data, isLoading, error } = useQuery({
    queryKey: ["reviews", { channel, location }],
    queryFn: () => fetchJSON(`/api/mock/reviews?channel=${channel}&location=${location}`),
  });

  const replyMutation = useMutation({
    mutationFn: async (payload: { id: string; reply: string }) => {
      // Replace with backend endpoint e.g. POST /reviews/{id}/reply
      return fetchJSON("/api/mock/reply", { method: "POST", body: payload });
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Reviews Inbox</h1>
        <div className="flex items-center gap-3">
          <select className="input" value={channel} onChange={(e) => setChannel(e.target.value)}>
            <option value="all">All Channels</option>
            <option value="google">Google</option>
            <option value="yelp">Yelp</option>
            <option value="facebook">Facebook</option>
          </select>
          <select className="input" value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="all">All Locations</option>
            {locations.map((l) => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 card">
          {isLoading ? (
            <div>Loading reviews...</div>
          ) : error ? (
            <div className="text-red-300">Failed to load reviews. Please try again. {(error as Error)?.message}</div>
          ) : (
            <ul className="divide-y divide-slate-700">
              {data?.items?.map((r: any) => (
                <li key={r.id} className="py-4 flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">{r.author[0]}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{r.author}</span>
                        <SentimentBadge score={r.sentimentScore} />
                        <span className="badge bg-slate-700 text-slate-300">{r.channel}</span>
                        <span className="text-xs text-slate-400">{new Date(r.date).toLocaleString()}</span>
                      </div>
                      <button className="btn-secondary" onClick={() => setSelectedId(r.id)}>Respond</button>
                    </div>
                    <p className="text-slate-200 mt-1">{r.text}</p>
                    {r.reply && (
                      <div className="mt-2 text-sm text-slate-300">
                        <span className="badge bg-sky-600/20 text-sky-300 mr-2">Our reply</span>
                        {r.reply}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="lg:col-span-1">
          <AISuggestionPanel
            selectedId={selectedId}
            onClose={() => setSelectedId(null)}
            onSend={(id, reply) => replyMutation.mutate({ id, reply })}
          />
        </div>
      </div>
    </div>
  );
}
