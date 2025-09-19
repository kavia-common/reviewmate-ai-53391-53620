"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const links = [
  { href: "/", label: "Home" },
  { href: "/reviews", label: "Reviews" },
  { href: "/analytics", label: "Analytics" },
  { href: "/locations", label: "Locations" },
  { href: "/team", label: "Team" },
  { href: "/whitelabel", label: "White-label" },
  { href: "/settings", label: "Settings" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { status } = useSession();
  return (
    <div className="border-b border-slate-800/80 bg-slate-900/30 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="font-semibold text-sky-400">ReviewMate AI</div>
          <nav className="hidden md:flex items-center gap-4 text-sm">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`hover:text-white ${pathname === l.href ? "text-white" : "text-slate-300"}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {status === "authenticated" ? (
            <button className="btn-secondary" onClick={() => signOut()}>Sign out</button>
          ) : (
            <Link className="btn" href="/auth/signin">Sign in</Link>
          )}
        </div>
      </div>
    </div>
  );
}
