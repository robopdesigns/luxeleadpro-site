"use client";

import { FormEvent, useState } from "react";

export default function RepLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/rep-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      window.location.href = "/rep";
      return;
    }

    setError("Invalid email or password.");
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0A192F] px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Sales Rep Portal</h1>
          <p className="text-sm text-gray-500">LuxeLeadPro</p>
        </div>

        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]/50" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]/50" />

        <button type="submit" disabled={loading} className="w-full rounded-xl bg-[#0A192F] px-6 py-3 font-semibold text-white hover:bg-[#1a2940] disabled:opacity-60 transition">
          {loading ? "Logging in..." : "Log In"}
        </button>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
      </form>
    </main>
  );
}
