"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchJSON } from "@/lib/api";

type Props = {
  selectedId: string | null;
  onClose: () => void;
  onSend: (id: string, reply: string) => void;
};

/**
 * PUBLIC_INTERFACE
 * Side panel that fetches AI suggestions for selected review ID.
 */
export default function AISuggestionPanel({ selectedId, onClose, onSend }: Props) {
  const [reply, setReply] = useState("");
  const enabled = !!selectedId;

  const { data, isFetching } = useQuery({
      queryKey: ["ai", selectedId],
      queryFn: () => fetchJSON(`/api/mock/ai-suggest?id=${selectedId}`),
      enabled
  });

  useEffect(() => {
    if (data?.suggestion) setReply(data.suggestion);
  }, [data]);

  const regenerate = useMutation({
    mutationFn: async () => {
      // Replace with backend AI endpoint, e.g. POST /ai/suggest
      const res = await fetchJSON("/api/mock/ai-suggest", { method: "POST", body: { id: selectedId, tone: "professional" } });
      return res;
    },
    onSuccess: (res) => setReply(res?.suggestion || "")
  });

  if (!enabled) {
    return <div className="card"><div className="text-slate-400">Select a review to generate a response.</div></div>;
  }

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">AI Response</h3>
        <button className="btn-secondary" onClick={onClose}>Close</button>
      </div>
      {isFetching ? <div>Generating...</div> : null}
      <textarea className="input w-full h-44" value={reply} onChange={(e) => setReply(e.target.value)} />
      <div className="flex items-center gap-2">
        <button className="btn-secondary" onClick={() => regenerate.mutate()}>Regenerate</button>
        <button className="btn" onClick={() => selectedId && onSend(selectedId, reply)}>Send Reply</button>
      </div>
      <p className="text-xs text-slate-400">
        Note: Connect to backend AI endpoint /ai/suggest and /reviews/{`{id}`}/reply for production.
      </p>
    </div>
  );
}
