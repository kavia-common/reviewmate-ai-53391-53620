"use client";
import AppShell from "@/components/AppShell";
import { useReviews, useReviewDetail, useReplyToReview } from "@/hooks/useApi";
import { useOrgStore } from "@/store/org";
import { useReviewsStore } from "@/store/reviews";
import { useMemo, useState } from "react";

export default function ReviewsPage() {
  const orgId = useOrgStore((s) => s.currentOrgId);
  const locationId = useOrgStore((s) => s.currentLocationId);
  const { search, source, sentiment, rating, setSearch, setSource, setSentiment, setRating } =
    useReviewsStore();

  const [page, setPage] = useState(1);

  const { data, isLoading } = useReviews({
    orgId,
    locationId,
    search,
    source: source === "all" ? undefined : source,
    sentiment: sentiment === "all" ? undefined : sentiment,
    rating: rating || undefined,
    page,
    pageSize: 20,
  });

  const totalPages = useMemo(() => {
    if (!data) return 1;
    return Math.max(1, Math.ceil(data.total / data.pageSize));
  }, [data]);

  const [selected, setSelected] = useState<string | null>(null);
  const detail = useReviewDetail(selected || undefined);
  const replyMutation = useReplyToReview();
  const [replyText, setReplyText] = useState("");

  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Reviews</h1>
        {/* Filters */}
        <div className="bg-white rounded-xl border p-3 flex flex-wrap items-center gap-2">
          <input
            className="rounded-md border px-3 py-2"
            placeholder="Search text or author"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <select className="rounded-md border px-3 py-2" value={source} onChange={(e) => setSource(e.currentTarget.value as "all" | "google" | "yelp" | "facebook")}>
            <option value="all">All Sources</option>
            <option value="google">Google</option>
            <option value="yelp">Yelp</option>
            <option value="facebook">Facebook</option>
          </select>
          <select className="rounded-md border px-3 py-2" value={sentiment} onChange={(e) => setSentiment(e.currentTarget.value as "all" | "positive" | "neutral" | "negative")}>
            <option value="all">All Sentiments</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
          <select
            className="rounded-md border px-3 py-2"
            value={rating ?? ""}
            onChange={(e) => setRating(e.currentTarget.value ? Number(e.currentTarget.value) : null)}
          >
            <option value="">Any Rating</option>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} stars
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left font-medium px-4 py-2">Author</th>
                  <th className="text-left font-medium px-4 py-2">Rating</th>
                  <th className="text-left font-medium px-4 py-2">Source</th>
                  <th className="text-left font-medium px-4 py-2">Snippet</th>
                  <th className="text-left font-medium px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      Loading reviews...
                    </td>
                  </tr>
                )}
                {data?.items?.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelected(r.id)}
                  >
                    <td className="px-4 py-2">{r.author}</td>
                    <td className="px-4 py-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < r.rating ? "★" : "☆"}</span>
                      ))}
                    </td>
                    <td className="px-4 py-2 capitalize">{r.source}</td>
                    <td className="px-4 py-2 text-gray-600">{r.text.slice(0, 80)}...</td>
                    <td className="px-4 py-2 text-gray-600">{new Date(r.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
                {!isLoading && (data?.items?.length ?? 0) === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      No reviews found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <div className="text-xs text-gray-600">
              Page {data?.page ?? page} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1.5 rounded-md border bg-white disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                Previous
              </button>
              <button
                className="px-3 py-1.5 rounded-md border bg-white disabled:opacity-50"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      {selected && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-end" onClick={() => setSelected(null)}>
          <div className="w-full max-w-xl bg-white h-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-medium">Review Detail</h3>
              <button className="px-3 py-1.5 rounded-md border" onClick={() => setSelected(null)}>
                Close
              </button>
            </div>
            <div className="p-4 space-y-3">
              {detail.isLoading ? (
                <div className="text-gray-500">Loading...</div>
              ) : detail.data ? (
                <>
                  <div className="text-sm text-gray-600">{new Date(detail.data.createdAt).toLocaleString()}</div>
                  <div className="font-medium">{detail.data.author}</div>
                  <div className="text-sm text-gray-700">{detail.data.text}</div>
                  <div className="text-xs text-gray-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < detail.data.rating ? "★" : "☆"}</span>
                    ))} · {detail.data.source} · {detail.data.sentiment}
                  </div>

                  <div className="pt-3">
                    <h4 className="font-medium mb-1">AI Suggestions</h4>
                    <div className="space-y-2">
                      {detail.data.suggestions?.map((sugg, i) => (
                        <button
                          key={i}
                          className="w-full text-left rounded-md border p-2 hover:bg-gray-50"
                          onClick={() => setReplyText(sugg)}
                        >
                          {sugg}
                        </button>
                      )) || <div className="text-sm text-gray-500">No suggestions available</div>}
                    </div>
                  </div>

                  <div className="pt-3">
                    <h4 className="font-medium mb-1">Respond</h4>
                    <textarea
                      className="w-full rounded-md border p-2 h-28"
                      placeholder="Write a response..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.currentTarget.value)}
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                        disabled={replyMutation.isPending || !replyText.trim()}
                        onClick={() =>
                          replyMutation.mutate(
                            { reviewId: detail.data!.id, message: replyText },
                            { onSuccess: () => setReplyText("") }
                          )
                        }
                      >
                        {replyMutation.isPending ? "Sending..." : "Send Reply"}
                      </button>
                    </div>
                  </div>

                  <div className="pt-3">
                    <h4 className="font-medium mb-1">Thread</h4>
                    <div className="space-y-2">
                      {detail.data.thread?.map((m) => (
                        <div key={m.id} className="text-sm rounded-md border p-2">
                          <div className="text-xs text-gray-500 mb-1">
                            {m.role} • {new Date(m.createdAt).toLocaleString()}
                          </div>
                          <div>{m.content}</div>
                        </div>
                      )) || <div className="text-sm text-gray-500">No conversation yet</div>}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-gray-500">Not found</div>
              )}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
