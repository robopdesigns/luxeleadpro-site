"use client";

import { FormEvent, useState } from "react";

export default function DashboardLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/dashboard-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.href = "/dashboard";
      return;
    }

    setError("Invalid password. Please try again.");
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        <h1 className="text-2xl font-bold">Dashboard Access</h1>
        <p className="text-sm text-white/70">Enter your password to continue.</p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 outline-none focus:border-purple-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-purple-400 px-6 py-3 font-semibold text-black hover:bg-purple-300 disabled:opacity-60"
        >
          {loading ? "Checking..." : "Unlock Dashboard"}
        </button>

        {error && <p className="text-sm text-red-300">{error}</p>}
      </form>
    </main>
  );
}

