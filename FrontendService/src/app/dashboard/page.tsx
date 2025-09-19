"use client";
import AppShell from "@/components/AppShell";
import { useDashboard } from "@/hooks/useApi";
import { useOrgStore } from "@/store/org";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell,
} from "recharts";

const COLORS = ["#22c55e", "#eab308", "#ef4444", "#3b82f6", "#8b5cf6", "#06b6d4"];

export default function DashboardPage() {
  const orgId = useOrgStore((s) => s.currentOrgId);
  const locationId = useOrgStore((s) => s.currentLocationId);
  const { data } = useDashboard(orgId, locationId);

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold">Overview</h1>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card title="Total Reviews" value={data?.totals.reviews ?? 0} />
          <Card title="Average Rating" value={(data?.totals.avgRating ?? 0).toFixed(2)} />
          <Card title="Response Rate" value={`${Math.round((data?.totals.responseRate ?? 0) * 100)}%`} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border p-4 lg:col-span-2">
            <h3 className="font-medium mb-2">Trend</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data?.trend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="reviews" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="rating" stroke="#22c55e" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-xl border p-4">
            <h3 className="font-medium mb-2">Sentiment</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={[
                      { name: "Positive", value: data?.sentiments.positive ?? 0 },
                      { name: "Neutral", value: data?.sentiments.neutral ?? 0 },
                      { name: "Negative", value: data?.sentiments.negative ?? 0 },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {[0, 1, 2].map((i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border p-4">
            <h3 className="font-medium mb-2">Sources</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.sources || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="source" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl border p-4">
            <h3 className="font-medium mb-2">Recent Reviews</h3>
            <div className="space-y-3 max-h-72 overflow-auto pr-1">
              {data?.recent?.map((r) => (
                <div key={r.id} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{r.author}</div>
                    <div className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{r.text}</div>
                  <div className="text-xs text-gray-500 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < r.rating ? "★" : "☆"}</span>
                    ))} · {r.source}
                  </div>
                </div>
              )) || <div className="text-sm text-gray-500">No recent reviews</div>}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}
