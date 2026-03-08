"use client";

import { FormEvent, useEffect, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      reset: (selector?: string) => void;
    };
    gtag?: (...args: unknown[]) => void;
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;

    const scriptId = "cf-turnstile-script";
    if (document.getElementById(scriptId)) return;

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
      timeline: String(formData.get("timeline") || ""),
      monthly_revenue: String(formData.get("monthly_revenue") || ""),
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
    window.gtag?.("event", "lead_form_submit", {
      event_category: "engagement",
      event_label: "profit_audit_form",
    });

    form.reset();
    if (TURNSTILE_SITE_KEY && window.turnstile) window.turnstile.reset();

    setTimeout(() => {
      window.gtag?.("event", "calendly_redirect", {
        event_category: "conversion",
        event_label: "profit_audit_redirect",
      });
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
          <a href="#lead-form" className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300">
            Book Profit Audit
          </a>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <p className="mb-4 inline-block rounded-full border border-yellow-400/40 bg-yellow-400/10 px-3 py-1 text-xs font-medium text-yellow-300">
          Built for Luxury Real Estate Agents
        </p>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
          Add 10-20 Qualified Luxury Leads Per Month Without Hiring More Staff
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/80">
          We install AI-driven nurture, follow-up, and pipeline systems that help high-end agents convert more opportunities into closings.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#lead-form" className="rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black hover:bg-yellow-300">
            Get My Free Profit Audit
          </a>
          <a href="#pricing" className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10">
            View Pricing
          </a>
        </div>

        <p className="mt-4 text-sm text-white/60">No long-term contracts. Implementation support included.</p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-14">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/50">Trusted workflow stack</p>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {[
            "Supabase Secure Data",
            "Calendly Scheduling",
            "Cloudflare Turnstile",
            "Vercel Global Hosting",
          ].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm text-white/80 transition hover:-translate-y-0.5 hover:border-yellow-400/40 hover:bg-white/[0.08]">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-6 pb-20 md:grid-cols-3">
        {["30–50% more consult/showing bookings", "20–40% more closings in 60–90 days", "Zero compliance-risk workflow setup"].map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/90 transition hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-white/[0.08]">
            {item}
          </div>
        ))}
      </section>

      <section className="border-y border-white/10 bg-white/5 py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-3xl font-bold md:text-4xl">Client Results</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              "\"Booked 14 qualified consults in the first month.\" — Luxury Team Lead, IL",
              "\"Pipeline follow-up is finally consistent, and our close rate jumped.\" — Broker Associate, FL",
              "\"The compliance-safe workflows saved us hours every week.\" — Independent Agent, CA",
            ].map((quote) => (
              <div key={quote} className="rounded-2xl border border-white/10 bg-black/40 p-6 text-white/85">
                {quote}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/5 py-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-3xl font-bold md:text-4xl">How It Works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 p-6"><p className="mb-2 text-sm text-yellow-300">Step 01</p><h3 className="text-xl font-semibold">Connect Your Pipeline</h3><p className="mt-2 text-white/75">We map your lead flow and bottlenecks.</p></div>
            <div className="rounded-2xl border border-white/10 p-6"><p className="mb-2 text-sm text-yellow-300">Step 02</p><h3 className="text-xl font-semibold">Activate AI Workflows</h3><p className="mt-2 text-white/75">Nurture, content, and compliance automation go live.</p></div>
            <div className="rounded-2xl border border-white/10 p-6"><p className="mb-2 text-sm text-yellow-300">Step 03</p><h3 className="text-xl font-semibold">Track + Close</h3><p className="mt-2 text-white/75">Convert more opportunities consistently.</p></div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-4">
        <div className="rounded-2xl border border-yellow-400/40 bg-yellow-400/10 p-6 text-sm text-yellow-100">
          <p className="font-semibold">Premium Positioning Promise</p>
          <p className="mt-1 text-yellow-100/90">You get a tailored, compliance-conscious system built around your market, brand voice, and follow-up style — not a generic template.</p>
        </div>
      </section>

      <section id="pricing" className="mx-auto w-full max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold md:text-4xl">Simple Pricing</h2>
        <div className="mt-8 max-w-xl rounded-3xl border border-yellow-400/40 bg-yellow-400/10 p-8">
          <p className="text-sm uppercase tracking-widest text-yellow-300">Pro Tier</p>
          <p className="mt-2 text-4xl font-bold">$249/mo</p>
          <p className="mt-2 text-white/80">+ one-time setup fee: $249</p>
          <ul className="mt-6 space-y-2 text-white/90">
            <li>• Onboarding + custom workflow config</li><li>• Lead nurture automation</li><li>• Compliance-first setup</li><li>• Pipeline visibility support</li>
          </ul>
          <a href="#lead-form" className="mt-8 inline-block rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black hover:bg-yellow-300">Start With Free Audit</a>
        </div>
      </section>

      <section id="lead-form" className="border-y border-white/10 bg-white/5 py-20">
        <div className="mx-auto w-full max-w-3xl px-6">
          <h2 className="text-3xl font-bold md:text-4xl">Request Your Free Profit Audit</h2>
          <p className="mt-3 text-white/75">Quick qualification helps us tailor your plan before the call.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input name="full_name" required placeholder="Full Name" className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 outline-none focus:border-yellow-400" />
            <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 outline-none focus:border-yellow-400" />
            <input name="phone" placeholder="Phone" className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 outline-none focus:border-yellow-400" />
            <input name="brokerage" placeholder="Brokerage / Team" className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 outline-none focus:border-yellow-400" />
            <input name="market_area" placeholder="Market / Area" className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 outline-none focus:border-yellow-400" />

            <select name="timeline" required className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 outline-none focus:border-yellow-400">
              <option value="">When do you want this live?</option>
              <option value="asap">ASAP (0-30 days)</option>
              <option value="30-60">30-60 days</option>
              <option value="60-plus">60+ days</option>
            </select>

            <select name="monthly_revenue" required className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 outline-none focus:border-yellow-400">
              <option value="">Current monthly GCI range?</option>
              <option value="under-10k">Under $10k</option>
              <option value="10k-25k">$10k-$25k</option>
              <option value="25k-50k">$25k-$50k</option>
              <option value="50k-plus">$50k+</option>
            </select>

            <textarea name="challenge" rows={4} placeholder="Biggest challenge right now" className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 outline-none focus:border-yellow-400" />
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            {TURNSTILE_SITE_KEY && <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-theme="dark" />}

            <button type="submit" disabled={loading} className="rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black hover:bg-yellow-300 disabled:opacity-60">
              {loading ? "Securing your audit slot..." : "Submit & Continue to Priority Booking"}
            </button>

            {message && <p className="text-sm text-yellow-300">{message}</p>}
            <p className="text-xs text-white/60">Takes 45 seconds. You’ll be redirected to choose your best call time.</p>
            <p className="text-xs text-white/60">By submitting, you agree to our <a href="/privacy" className="text-yellow-300 hover:text-yellow-200">Privacy Policy</a> and <a href="/terms" className="text-yellow-300 hover:text-yellow-200">Terms of Service</a>.</p>
          </form>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
        <p className="mt-3 max-w-3xl text-white/70">Straight answers before you book. No fluff, no pressure.</p>
        <div className="mt-8 grid gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">How fast can this go live?</h3>
            <p className="mt-2 text-white/75">Most agents are live in 7-14 days depending on CRM and workflow complexity.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">Will this work with my current process?</h3>
            <p className="mt-2 text-white/75">Yes. We adapt around your existing pipeline, scripts, and compliance requirements.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">What happens on the free audit call?</h3>
            <p className="mt-2 text-white/75">We identify pipeline leaks, estimate upside, and give you a clear implementation plan.</p>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/90 p-3 backdrop-blur md:hidden">
        <a
          href="#lead-form"
          className="block w-full rounded-xl bg-yellow-400 px-4 py-3 text-center text-sm font-semibold text-black"
        >
          Get My Free Profit Audit
        </a>
      </div>

      <footer className="border-t border-white/10 pb-20 md:pb-0">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Luxe Lead AI Pro. All rights reserved.</p>
          <div className="flex items-center gap-4"><a href="/privacy" className="hover:text-white">Privacy</a><a href="/terms" className="hover:text-white">Terms</a><a href="mailto:robopdesigns@gmail.com" className="hover:text-white">Contact</a></div>
        </div>
      </footer>
    </main>
  );
}
