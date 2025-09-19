"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "@/lib/api";

export default function TeamPage() {
  const { data } = useQuery({
    queryKey: ["team"],
    queryFn: () => fetchJSON("/api/mock/team")
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Team & Roles</h1>
        <button className="btn">Invite Member</button>
      </div>
      <div className="card">
        <table className="w-full text-left">
          <thead className="text-slate-400 text-sm">
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Role</th>
              <th className="py-2">Locations</th>
            </tr>
          </thead>
          <tbody>
            {data?.items?.map((m: any) => (
              <tr key={m.id} className="border-t border-slate-700">
                <td className="py-2">{m.name}</td>
                <td className="py-2">{m.email}</td>
                <td className="py-2">
                  <span className="badge bg-slate-700 text-slate-200">{m.role}</span>
                </td>
                <td className="py-2 text-slate-300">{m.locations?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
