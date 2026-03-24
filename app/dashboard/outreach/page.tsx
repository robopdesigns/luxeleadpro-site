"use client";

import Link from "next/link";

const sampleEmail = {
  subject: "Quick question about Lincoln Park properties",
  preview: `Hi Sarah,

I hope this finds you well. My name is James Keller, and I specialize in luxury real estate in the Lincoln Park area — specifically in the $2.5M–$3.2M range.

I noticed you've been exploring opportunities in Lincoln Park and wanted to reach out personally. This market moves fast, and a few exceptional properties have come across my desk that aren't listed publicly yet.

Do you have 10 minutes this week for a quick call? I'd love to share what I'm seeing and find out if any of it lines up with what you're looking for.

Looking forward to connecting,
James Keller
james@luxerealty.com

P.S. No pressure at all — just want to make sure you have access to everything the market has to offer in Lincoln Park.`,
};

const steps = [
  {
    number: "1",
    icon: "🎯",
    title: "Lead Scored 85+",
    description:
      "Our AI identifies your highest-intent leads — buyers showing strong signals in your target neighborhoods.",
  },
  {
    number: "2",
    icon: "✍️",
    title: "AI Writes the Email",
    description:
      "A personalized 3-email sequence is generated in seconds, tailored to the neighborhood, price range, and lead profile.",
  },
  {
    number: "3",
    icon: "🚀",
    title: "Sent Automatically",
    description:
      "Emails go out on Day 1, Day 3, and Day 7 — perfectly timed so you stay top of mind without lifting a finger.",
  },
];

export default function OutreachPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero Header ─────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-fuchsia-600 px-6 py-16 text-center text-white">
        <div className="max-w-3xl mx-auto">
          {/* Coming Soon badge */}
          <span className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-white/30">
            <span className="w-2 h-2 rounded-full bg-fuchsia-300 animate-pulse" />
            Coming Soon — Launching April 2026
          </span>

          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Automated Outreach
          </h1>
          <p className="text-xl text-purple-100 leading-relaxed">
            AI sends personalized emails to your top leads automatically.
            <br />
            Like having Instantly built right into your dashboard.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">

        {/* ── How It Works ────────────────────────────────────────────────── */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              How It Works
            </h2>
            <p className="text-gray-500 text-lg">
              Three steps. Zero effort. More deals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Step number */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white font-bold text-sm flex items-center justify-center mb-4 shadow-sm">
                  {step.number}
                </div>
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Sample Email Preview ─────────────────────────────────────────── */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              What the AI Writes For You
            </h2>
            <p className="text-gray-500 text-lg">
              Every email is personalized to the lead, neighborhood, and price range.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Email chrome */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-gray-400 font-medium ml-2">
                Email 1 of 3 · Day 1
              </span>
              <span className="ml-auto text-xs text-gray-400">
                AI-Generated ✨
              </span>
            </div>

            {/* Email header */}
            <div className="bg-white border-b border-gray-100 px-6 py-4 space-y-1">
              <div className="flex gap-2">
                <span className="text-xs text-gray-400 w-14">From:</span>
                <span className="text-xs text-gray-700 font-medium">
                  James Keller &lt;james@luxerealty.com&gt;
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-xs text-gray-400 w-14">To:</span>
                <span className="text-xs text-gray-700">Sarah M. &lt;sarah@example.com&gt;</span>
              </div>
              <div className="flex gap-2">
                <span className="text-xs text-gray-400 w-14">Subject:</span>
                <span className="text-xs font-bold text-gray-900">
                  {sampleEmail.subject}
                </span>
              </div>
            </div>

            {/* Email body */}
            <div className="px-6 py-6">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-sans">
                {sampleEmail.preview}
              </pre>
            </div>
          </div>

          {/* Email sequence timeline */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { day: "Day 1", subject: "Quick question about [neighborhood] properties", active: true },
              { day: "Day 3", subject: "Re: [neighborhood]", active: false },
              { day: "Day 7", subject: "Last thought on [neighborhood]", active: false },
            ].map((item) => (
              <div
                key={item.day}
                className={`rounded-xl p-4 border text-sm ${
                  item.active
                    ? "bg-purple-50 border-purple-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <span
                  className={`text-xs font-bold uppercase tracking-wide ${
                    item.active ? "text-purple-600" : "text-gray-400"
                  }`}
                >
                  {item.day}
                </span>
                <p className="text-gray-700 font-medium mt-1 text-xs leading-snug">
                  {item.subject}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Value Props ──────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-gray-900 to-purple-950 rounded-3xl p-10 text-white">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">
              Like Having Instantly Built Into Your Dashboard
            </h2>
            <p className="text-purple-300 text-lg">
              Professional cold email infrastructure — no tech required.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: "🧠", title: "AI-Personalized", desc: "Every email references the neighborhood, price range, and lead profile. Not a generic blast." },
              { icon: "⏱️", title: "Perfectly Timed", desc: "Day 1, Day 3, Day 7 sequences proven to maximize reply rates." },
              { icon: "📈", title: "More Pipeline", desc: "Never let a hot lead go cold. AI follows up so you don't have to." },
              { icon: "🔒", title: "Compliance Built-In", desc: "Unsubscribe links, DNC checks, and audit logs — every email." },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 bg-white/10 rounded-2xl p-5 border border-white/10"
              >
                <span className="text-3xl shrink-0">{item.icon}</span>
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-purple-200 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="text-center py-4">
          <div className="inline-block bg-gradient-to-r from-purple-50 to-fuchsia-50 border border-purple-200 rounded-3xl px-12 py-10">
            <span className="inline-block bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              Launching April 2026
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Ready to Automate Your Outreach?
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Upgrade to the Outreach Plan and let AI handle your cold email pipeline
              while you focus on closing.
            </p>
            <Link
              href="/pricing"
              className="inline-block bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-bold px-10 py-4 rounded-xl hover:opacity-90 transition shadow-lg text-lg"
            >
              Upgrade to Outreach Plan →
            </Link>
            <p className="text-gray-400 text-sm mt-4">
              $299/month · 3-email AI sequences · Fully automated
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
