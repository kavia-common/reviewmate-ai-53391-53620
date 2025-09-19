"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "@/lib/api";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar
} from "recharts";

const COLORS = ["#0EA5E9", "#22c55e", "#f59e0b", "#ef4444"];

export default function AnalyticsPage() {
  const { data } = useQuery({
    queryKey: ["analytics"],
    queryFn: () => fetchJSON("/api/mock/analytics")
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-semibold">Analytics</h1>

      <div className="grid md:grid-cols-4 gap-4">
        <MetricCard label="Avg Sentiment" value={(data?.kpis?.avgSentiment ?? 0).toFixed(2)} />
        <MetricCard label="Avg Rating" value={(data?.kpis?.avgRating ?? 0).toFixed(2)} />
        <MetricCard label="Reviews (30d)" value={data?.kpis?.reviews30d ?? 0} />
        <MetricCard label="Median Response Time" value={`${data?.kpis?.medianResponseHrs ?? 0}h`} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <h3 className="font-medium mb-2">Sentiment Over Time</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.sentimentTrend || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="sentiment" stroke="#0EA5E9" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h3 className="font-medium mb-2">Channel Split</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data?.channelSplit || []} dataKey="value" nameKey="name" outerRadius={90}>
                  {data?.channelSplit?.map((_: any, i: number) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-medium mb-2">Ratings Distribution</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.ratingDist || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="stars" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="count" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card">
      <div className="text-slate-400 text-sm">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}
