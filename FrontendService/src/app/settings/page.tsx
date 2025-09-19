"use client";
import AppShell from "@/components/AppShell";
import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const session = useSession();

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold">Settings</h1>

        <section className="bg-white rounded-xl border p-4 space-y-3">
          <h3 className="font-medium">Profile</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="text-sm text-gray-600">Name</div>
              <div className="font-medium">{(session.data?.user as { name?: string })?.name || "—"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Email</div>
              <div className="font-medium">{(session.data?.user as { email?: string })?.email || "—"}</div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl border p-4">
          <h3 className="font-medium mb-2">Integrations</h3>
          <p className="text-sm text-gray-600">
            Manage your Google, Yelp, and Facebook connections in the backend. This UI assumes backend endpoints handle
            OAuth flows and tokens.
          </p>
        </section>
      </div>
    </AppShell>
  );
}
