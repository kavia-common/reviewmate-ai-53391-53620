"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">ReviewMate AI</h1>
          <div className="flex items-center gap-3">
            {status === "authenticated" ? (
              <>
                <span className="text-sm text-slate-300">Signed in as {session?.user?.email || session?.user?.name}</span>
                <button className="btn-secondary" onClick={() => signOut()}>Sign out</button>
              </>
            ) : (
              <button className="btn" onClick={() => signIn()}>Sign in</button>
            )}
          </div>
        </header>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          <FeatureCard title="Reviews Inbox" desc="Unified queue from Google, Yelp, Facebook with filters and AI responses." href="/reviews" />
          <FeatureCard title="Analytics" desc="Sentiment over time, ratings, response SLAs and channel breakdown." href="/analytics" />
          <FeatureCard title="Locations" desc="Manage multi-location organizations and assign teams/permissions." href="/locations" />
          <FeatureCard title="Team & Roles" desc="Collaborate with role-based permissions and workflows." href="/team" />
          <FeatureCard title="White-label" desc="Export branded reports and share live links for agencies." href="/whitelabel" />
          <FeatureCard title="Settings" desc="Connections, alerts, AI tuning and preferences." href="/settings" />
        </section>
      </div>
    </main>
  );
}

function FeatureCard({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link href={href} className="card hover:bg-slate-800 transition group">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-slate-300 mt-1">{desc}</p>
        </div>
        <span className="text-sky-400 group-hover:translate-x-1 transition">→</span>
      </div>
    </Link>
  );
}
