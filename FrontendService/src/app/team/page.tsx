"use client";
import AppShell from "@/components/AppShell";
import { useOrgStore } from "@/store/org";
import { useInviteMember, useRemoveMember, useTeam } from "@/hooks/useApi";
import { FormEvent, useState } from "react";

export default function TeamPage() {
  const orgId = useOrgStore((s) => s.currentOrgId);
  const { data } = useTeam(orgId);
  const invite = useInviteMember();
  const remove = useRemoveMember();

  const [form, setForm] = useState({ name: "", email: "", role: "member" });

  const onInvite = (e: FormEvent) => {
    e.preventDefault();
    invite.mutate(form, { onSuccess: () => setForm({ name: "", email: "", role: "member" }) });
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold">Team</h1>

        <section className="bg-white rounded-xl border p-4">
          <h3 className="font-medium mb-2">Invite Member</h3>
          <form onSubmit={onInvite} className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            <input
              className="rounded-md border px-3 py-2"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.currentTarget.value }))}
              required
            />
            <input
              className="rounded-md border px-3 py-2"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.currentTarget.value }))}
              required
            />
            <select
              className="rounded-md border px-3 py-2"
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.currentTarget.value }))}
            >
              <option value="member">Member</option>
              <option value="manager">Manager</option>
              <option value="owner">Owner</option>
            </select>
            <button
              className="rounded-md bg-blue-600 text-white px-3 py-2 hover:bg-blue-700 disabled:opacity-50"
              disabled={invite.isPending}
            >
              {invite.isPending ? "Inviting..." : "Invite"}
            </button>
          </form>
        </section>

        <section className="bg-white rounded-xl border">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left font-medium px-4 py-2">Name</th>
                  <th className="text-left font-medium px-4 py-2">Email</th>
                  <th className="text-left font-medium px-4 py-2">Role</th>
                  <th className="text-left font-medium px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{m.name}</td>
                    <td className="px-4 py-2">{m.email}</td>
                    <td className="px-4 py-2 capitalize">{m.role}</td>
                    <td className="px-4 py-2">
                      <button
                        className="px-3 py-1.5 rounded-md border hover:bg-gray-50"
                        onClick={() => remove.mutate({ memberId: m.id })}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                )) || (
                  <tr>
                    <td className="px-4 py-8 text-center text-gray-500" colSpan={4}>
                      No team members
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
