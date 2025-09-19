"use client";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-semibold">Settings</h1>

      <div className="card space-y-3">
        <h3 className="font-medium">Channel Connections</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <ConnectCard name="Google" status="Connected" />
          <ConnectCard name="Yelp" status="Not connected" />
          <ConnectCard name="Facebook" status="Connected" />
        </div>
      </div>

      <div className="card space-y-3">
        <h3 className="font-medium">AI Preferences</h3>
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Tone</label>
          <select className="input w-60">
            <option>Professional</option>
            <option>Friendly</option>
            <option>Empathetic</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Max Length</label>
          <input className="input w-60" type="number" min={80} max={600} defaultValue={240} />
        </div>
        <button className="btn">Save</button>
      </div>
    </div>
  );
}

function ConnectCard({ name, status }: { name: string; status: string }) {
  const connected = status.toLowerCase().includes("connected");
  return (
    <div className="p-4 rounded-lg border border-slate-700 bg-slate-800">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">{name}</div>
          <div className={`text-sm ${connected ? "text-green-400" : "text-slate-400"}`}>{status}</div>
        </div>
        <button className={connected ? "btn-secondary" : "btn"}>{connected ? "Manage" : "Connect"}</button>
      </div>
    </div>
  );
}
