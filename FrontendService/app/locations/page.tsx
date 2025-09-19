"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "@/lib/api";
import Link from "next/link";

export default function LocationsPage() {
  const { data } = useQuery({
    queryKey: ["locations"],
    queryFn: () => fetchJSON("/api/mock/locations")
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-4">
      <h1 className="text-xl font-semibold">Locations</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.items?.map((loc: any) => (
          <div key={loc.id} className="card space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{loc.name}</h3>
              <span className="badge bg-slate-700 text-slate-300">{loc.city}</span>
            </div>
            <div className="text-sm text-slate-300">
              Channels: {loc.channels.join(", ")}
            </div>
            <div className="text-sm text-slate-300">
              Last 30d Reviews: {loc.reviews30d}
            </div>
            <Link className="btn w-full" href={`/locations/${loc.id}`}>View details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
