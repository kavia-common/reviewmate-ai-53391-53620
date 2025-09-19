"use client";

import { FormEvent, Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function SignInInner() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const res = await signIn("credentials", { redirect: false, email, password, callbackUrl });
    if (!res?.error) router.push(callbackUrl);
    else alert("Invalid credentials");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="card w-full max-w-md space-y-4">
        <h1 className="text-xl font-semibold">Sign in</h1>
        <div className="space-y-1">
          <label className="text-sm text-slate-300">Email</label>
          <input className="input w-full" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-300">Password</label>
          <input className="input w-full" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button className="btn w-full" type="submit">Sign in</button>
      </form>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center px-4"><div className="text-slate-300">Loading…</div></div>}>
      <SignInInner />
    </Suspense>
  );
}
