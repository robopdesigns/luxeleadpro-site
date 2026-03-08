"use client";

import { FormEvent, useEffect, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      reset: (selector?: string) => void;
    };
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) {
      return;
    }

    const scriptId = "cf-turnstile-script";
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      full_name: String(formData.get("full_name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      brokerage: String(formData.get("brokerage") || ""),
      market_area: String(formData.get("market_area") || ""),
      challenge: String(formData.get("challenge") || ""),
      website: String(formData.get("website") || ""),
      turnstileToken: String(formData.get("cf-turnstile-response") || ""),
    };

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setMessage(data?.error || "Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setMessage("Thanks — redirecting you to book your audit now...");
    form.reset();
    if (TURNSTILE_SITE_KEY && window.turnstile) {
      window.turnstile.reset();
    }

    setTimeout(() => {
      window.location.href =
        process.env.NEXT_PUBLIC_CALENDLY_URL ||
        "https://calendly.com/robopdesigns/profit-audit";
    }, 800);

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-lg font-semibold tracking-wide">
            Luxe Lead <span className="text-yellow-400">AI Pro</span>
          </div>
          <a
            href="#lead-form"
            className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300"
          >
            Book Profit Audit
          </a>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <p className="mb-4 inline-block rounded-full border border-yellow-400/40 bg-yellow-400/10 px-3 py-1 text-xs font-medium text-yellow-300">
          Built for Luxury Real Estate Agents
        </p>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
          AI-Powered Lead Management That Helps You Close More High-End Deals
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/80">
          Luxe Lead AI Pro automates lead nurture, content creation, compliance
          checks, and pipeline follow-up so you can grow faster without hiring
          staff.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#lead-form"
            className="rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black hover:bg-yellow-300"
          >
            Book a 15-Minute Profit Audit
          </a>
          <a
            href="#pricing"
            className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10"
          >
            View Pricing
          </a>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-6 pb-20 md:grid-cols-3">
        {[
          "30–50% more consult/showing bookings",
          "20–40% more closings in 60–90 days",
          "Zero compliance-risk workflow setup",
        ].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/90"
          >
            {item}
          </div>
        ))}
      </section>

      <section className="border-y border-white/10 bg-white/5 py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-3xl font-bold md:text-4xl">How It Works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 p-6">
              <p className="mb-2 text-sm text-yellow-300">Step 01</p>
              <h3 className="text-xl font-semibold">Connect Your Pipeline</h3>
              <p className="mt-2 text-white/75">
                We map your lead flow and bottlenecks.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 p-6">
              <p className="mb-2 text-sm text-yellow-300">Step 02</p>
              <h3 className="text-xl font-semibold">Activate AI Workflows</h3>
              <p className="mt-2 text-white/75">
                Nurture, content, and compliance automation go live.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 p-6">
              <p className="mb-2 text-sm text-yellow-300">Step 03</p>
              <h3 className="text-xl font-semibold">Track + Close</h3>
              <p className="mt-2 text-white/75">
                Convert more opportunities consistently.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto w-full max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold md:text-4xl">Simple Pricing</h2>
        <div className="mt-8 max-w-xl rounded-3xl border border-yellow-400/40 bg-yellow-400/10 p-8">
          <p className="text-sm uppercase tracking-widest text-yellow-300">
            Pro Tier
          </p>
          <p className="mt-2 text-4xl font-bold">$249/mo</p>
          <p className="mt-2 text-white/80">+ one-time setup fee: $249</p>
          <ul className="mt-6 space-y-2 text-white/90">
            <li>• Onboarding + custom workflow config</li>
            <li>• Lead nurture automation</li>
            <li>• Compliance-first setup</li>
            <li>• Pipeline visibility support</li>
          </ul>
          <a
            href="#lead-form"
            className="mt-8 inline-block rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black hover:bg-yellow-300"
          >
            Start With Free Audit
          </a>
        </div>
      </section>

      <section id="lead-form" className="border-y border-white/10 bg-white/5 py-20">
        <div className="mx-auto w-full max-w-3xl px-6">
          <h2 className="text-3xl font-bold md:text-4xl">
            Request Your Free Profit Audit
          </h2>
          <p className="mt-3 text-white/75">
            Fill this out and we’ll contact you to map your lead leaks and growth
            plan.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              name="full_name"
              required
              placeholder="Full Name"
              className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 outline-none focus:border-yellow-400"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 outline-none focus:border-yellow-400"
            />
            <input
              name="phone"
              placeholder="Phone"
              className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 outline-none focus:border-yellow-400"
            />
            <input
              name="brokerage"
              placeholder="Brokerage / Team"
              className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 outline-none focus:border-yellow-400"
            />
            <input
              name="market_area"
              placeholder="Market / Area"
              className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 outline-none focus:border-yellow-400"
            />
            <textarea
              name="challenge"
              rows={4}
              placeholder="Biggest challenge right now"
              className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 outline-none focus:border-yellow-400"
            />

            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            {TURNSTILE_SITE_KEY && (
              <div
                className="cf-turnstile"
                data-sitekey={TURNSTILE_SITE_KEY}
                data-theme="dark"
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black hover:bg-yellow-300 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Submit & Continue to Booking"}
            </button>

            {message && <p className="text-sm text-yellow-300">{message}</p>}
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Luxe Lead AI Pro. All rights reserved.</p>
          <a href="mailto:robopdesigns@gmail.com" className="hover:text-white">
            Contact
          </a>
        </div>
      </footer>
    </main>
  );
}
