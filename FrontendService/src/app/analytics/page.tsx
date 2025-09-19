"use client";
import AppShell from "@/components/AppShell";
import { useAnalytics } from "@/hooks/useApi";
import { useOrgStore } from "@/store/org";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import { useState } from "react";

const COLORS = ["#22c55e", "#eab308", "#ef4444", "#3b82f6", "#8b5cf6", "#06b6d4"];

export default function AnalyticsPage() {
  const orgId = useOrgStore((s) => s.currentOrgId);
  const locationId = useOrgStore((s) => s.currentLocationId);
  const [range, setRange] = useState("30d");
  const { data } = useAnalytics(orgId, locationId, range);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Analytics</h1>
          <select
            className="rounded-md border px-3 py-2 bg-white"
            value={range}
            onChange={(e) => setRange(e.currentTarget.value)}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="365d">Last 12 months</option>
          </select>
        </div>

        <section className="bg-white rounded-xl border p-4">
          <h3 className="font-medium mb-2">Review & Rating Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.trend || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="reviews" stroke="#3b82f6" />
                <Line type="monotone" dataKey="avgRating" stroke="#22c55e" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border p-4">
            <h3 className="font-medium mb-2">Rating Distribution</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.distribution || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rating" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-xl border p-4">
            <h3 className="font-medium mb-2">Sources</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie dataKey="count" data={data?.sources || []} outerRadius={100} label>
                    {(data?.sources || []).map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-xl border p-4">
            <h3 className="font-medium mb-2">Sentiments</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.sentiments || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-xl border p-4">
            <h3 className="font-medium mb-2">Average Response Time</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.responseTime || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bucket" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#06b6d4" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
