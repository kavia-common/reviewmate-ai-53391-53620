"use client";

import { useState } from "react";

export default function WhiteLabelPage() {
  const [brand, setBrand] = useState("Acme Agency");
  const [color, setColor] = useState("#0EA5E9");

  const handleExport = () => {
    alert(`Export scheduled with brand "${brand}" and accent ${color}. Connect backend /reports/export to implement.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-semibold">White-label Reporting</h1>
      <div className="card space-y-3">
        <div className="space-y-1">
          <label className="text-sm text-slate-300">Brand Name</label>
          <input className="input w-full" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-300">Accent Color</label>
          <input className="input w-36" type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <button className="btn" onClick={handleExport}>Export PDF</button>
      </div>
      <div className="card">
        <h3 className="font-medium mb-2">Share Link</h3>
        <div className="flex gap-2">
          <input className="input flex-1" readOnly value="https://reports.reviewmate.ai/demo/123" />
          <button className="btn-secondary" onClick={() => navigator.clipboard.writeText("https://reports.reviewmate.ai/demo/123")}>Copy</button>
        </div>
      </div>
    </div>
  );
}
