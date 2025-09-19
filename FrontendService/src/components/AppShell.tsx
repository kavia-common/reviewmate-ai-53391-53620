"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/store/ui";
import { cn } from "@/lib/utils";
import { useOrganizations, useLocations } from "@/hooks/useApi";
import { useOrgStore } from "@/store/org";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/reviews", label: "Reviews" },
  { href: "/analytics", label: "Analytics" },
  { href: "/team", label: "Team" },
  { href: "/settings", label: "Settings" },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);

  const { data: orgs } = useOrganizations();
  const currentOrgId = useOrgStore((s) => s.currentOrgId);
  const switchOrg = useOrgStore((s) => s.switchOrg);
  const setOrganizations = useOrgStore((s) => s.setOrganizations);

  const { data: locations } = useLocations(currentOrgId);
  const currentLocationId = useOrgStore((s) => s.currentLocationId);
  const switchLocation = useOrgStore((s) => s.switchLocation);
  const setLocations = useOrgStore((s) => s.setLocations);

  const session = useSession();

  useEffect(() => {
    if (orgs) setOrganizations(orgs);
  }, [orgs, setOrganizations]);

  useEffect(() => {
    if (locations) setLocations(locations);
  }, [locations, setLocations]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-40 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              aria-label="Toggle Sidebar"
              className="p-2 rounded-md border hover:bg-gray-50"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <Link href="/dashboard" className="font-semibold">
              ReviewMate AI
            </Link>

            <div className="h-6 w-px bg-gray-200 mx-2" />

            {/* Organization Switcher */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="px-3 py-1.5 rounded-md border bg-white hover:bg-gray-50">
                  {orgs?.find((o) => o.id === currentOrgId)?.name || "Organization"}
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="bg-white border rounded-md shadow-md p-1">
                {orgs?.map((o) => (
                  <DropdownMenu.Item
                    key={o.id}
                    className={cn(
                      "px-3 py-1.5 rounded hover:bg-gray-100 cursor-pointer",
                      currentOrgId === o.id && "bg-gray-100"
                    )}
                    onSelect={() => switchOrg(o.id)}
                  >
                    {o.name}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>

            {/* Location Switcher */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="px-3 py-1.5 rounded-md border bg-white hover:bg-gray-50 ml-2">
                  {locations?.find((l) => l.id === currentLocationId)?.name || "Location"}
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="bg-white border rounded-md shadow-md p-1">
                {locations?.map((l) => (
                  <DropdownMenu.Item
                    key={l.id}
                    className={cn(
                      "px-3 py-1.5 rounded hover:bg-gray-100 cursor-pointer",
                      currentLocationId === l.id && "bg-gray-100"
                    )}
                    onSelect={() => switchLocation(l.id)}
                  >
                    {l.name}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-gray-600">
              {session.data?.user?.name || session.data?.user?.email}
            </span>
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="avatar" />
              <AvatarFallback>{(session.data?.user?.name || "U").slice(0, 1)}</AvatarFallback>
            </Avatar>
            <button
              className="px-3 py-1.5 rounded-md border bg-white hover:bg-gray-50"
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 flex">
        <aside
          className={cn(
            "hidden md:block w-60 shrink-0 border-r bg-white py-6 pr-4",
            sidebarOpen ? "md:block" : "md:hidden"
          )}
        >
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-3 py-2 rounded-md hover:bg-gray-100",
                  pathname.startsWith(item.href) && "bg-gray-100 font-medium"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 py-6">{children}</main>
      </div>
    </div>
  );
}
