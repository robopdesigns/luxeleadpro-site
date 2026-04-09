"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";

const tiers = [
  {
    name: "Intelligence",
    price: "$249",
    period: "/mo",
    description: "AI-powered lead scoring for agents who already have leads",
    popular: false,
    cta: "Start with Intelligence",
    features: [
      "AI lead scoring on 40+ signals",
      "Daily 6AM briefing — your hottest prospects",
      "Market analytics dashboard",
      "Lead behavior tracking & re-scoring",
      "Email & phone support",
      "Import from any CRM",
    ],
  },
  {
    name: "Intelligence + Generation",
    price: "$749",
    period: "/mo",
    description: "We find and score luxury leads for you — delivered to your dashboard",
    popular: false,
    cta: "Get Qualified Leads",
    features: [
      "Everything in Intelligence",
      "15–25 verified luxury leads/month",
      "Targeted ad campaigns in your market",
      "Pre-scored — only 60+ leads delivered",
      "Dedicated AI account manager",
      "Weekly performance reports",
      "Custom landing pages for your market",
    ],
  },
  {
    name: "Exclusive Territory",
    price: "$1,499",
    period: "/mo",
    description: "Own your ZIP code. No competition. Maximum exclusivity.",
    popular: true,
    cta: "Claim Your Territory",
    features: [
      "Everything in Intelligence + Generation",
      "30–50 leads per month",
      "ZIP code exclusivity — 1 agent per territory",
      "AI auto-outreach on new leads",
      "White-glove onboarding",
      "Priority support — direct line",
      "Quarterly strategy reviews",
      "First access to new features",
    ],
  },
];

const faqs = [
  {
    q: "Where do the leads come from?",
    a: "For Generation and Territory tiers, we run targeted Facebook, Instagram, and Google ad campaigns specifically in your luxury market. Leads fill out qualification forms on custom landing pages, get scored by our AI, and only leads scoring 60+ are delivered to your dashboard.",
  },
  {
    q: "What does ZIP code exclusivity mean?",
    a: "On the Exclusive Territory plan, we guarantee that no other LuxeLeadPro agent receives leads in your designated ZIP codes. You own that territory completely — every luxury lead in your area comes to you.",
  },
  {
    q: "What are Founding Agent rates?",
    a: "The first 50 agents to sign up lock in current pricing for life — even as we raise prices. This is a limited offer that won't come back once all spots are filled.",
  },
  {
    q: "Can I upgrade between tiers?",
    a: "Absolutely. You can upgrade at any time and your new plan takes effect immediately. If you're on Intelligence and want leads delivered, just upgrade to Generation — we'll have campaigns running within 48 hours.",
  },
  {
    q: "How is this different from Zillow Premier Agent or BoldLeads?",
    a: "Those platforms sell the same leads to multiple agents. LuxeLeadPro's AI scores leads before you see them, so you only spend time on qualified prospects. Our Territory plan guarantees exclusivity — something no other platform offers in luxury markets.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  async function handleCheckout(plan: string) {
    setCheckoutLoading(plan);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        // Fallback to Calendly if Stripe isn't configured
        window.location.href = 'https://calendly.com/robopdesigns/strategy-call';
      }
    } catch {
      window.location.href = 'https://calendly.com/robopdesigns/strategy-call';
    }
    setCheckoutLoading(null);
  }

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero */}
        <section className="pt-24 pb-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-full text-[#D4AF37] text-sm font-semibold mb-6">
              <span></span> Founding Agent Pricing — Limited to 50 Agents
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Choose Your Competitive Edge
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From AI-powered lead intelligence to exclusive territory ownership.
              Every tier is built for agents who close $1M+ deals.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-20 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border-2 p-8 transition-all ${
                  tier.popular
                    ? "border-[#D4AF37] shadow-xl shadow-[#D4AF37]/10 scale-[1.02] bg-white"
                    : "border-gray-200 bg-white hover:border-[#D4AF37]/20 hover:shadow-lg"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#0A192F] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{tier.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{tier.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-gray-500 text-sm">{tier.period}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCheckout(tier.name === 'Intelligence' ? 'intelligence' : tier.name === 'Intelligence + Generation' ? 'generation' : 'territory')}
                  disabled={checkoutLoading !== null}
                  className={`block w-full py-3 px-6 rounded-xl font-semibold text-center transition mb-4 ${
                    tier.popular
                      ? "bg-[#0A192F] text-white hover:opacity-90 shadow-md"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  } disabled:opacity-50`}
                >
                  {checkoutLoading === (tier.name === 'Intelligence' ? 'intelligence' : tier.name === 'Intelligence + Generation' ? 'generation' : 'territory') ? 'Processing...' : tier.cta}
                </button>
                <a
                  href="https://calendly.com/robopdesigns/strategy-call"
                  className="block w-full py-2 text-center text-sm text-gray-500 hover:text-[#D4AF37] transition mb-4"
                >
                  Or book a strategy call first →
                </a>

                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <svg
                        className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Founding Agent Banner */}
        <section className="py-16 px-4 bg-[#0A192F]">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
               Founding Agent Program
            </h2>
            <p className="text-lg opacity-90 mb-2">
              The first 50 agents lock in these rates <strong>for life</strong>.
            </p>
            <p className="text-sm opacity-75 mb-8">
              When we raise prices (and we will), Founding Agents keep their original rate. Forever.
              No contracts. Cancel anytime. But your rate? Locked.
            </p>
            <a
              href="https://calendly.com/robopdesigns/strategy-call"
              className="inline-block px-8 py-4 bg-white text-[#D4AF37] font-bold rounded-xl hover:bg-[#FDFBF7] transition shadow-lg"
            >
              Book a Strategy Call →
            </a>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
              Compare Plans
            </h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#FDFBF7] border-b border-gray-200">
                    <th className="text-left px-6 py-4 font-semibold text-gray-900">Feature</th>
                    <th className="text-center px-4 py-4 font-semibold text-gray-900">Intelligence</th>
                    <th className="text-center px-4 py-4 font-semibold text-[#D4AF37] bg-[#D4AF37]/10">Generation</th>
                    <th className="text-center px-4 py-4 font-semibold text-gray-900">Territory</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["AI Lead Scoring", true, true, true],
                    ["Daily 6AM Briefing", true, true, true],
                    ["Market Analytics", true, true, true],
                    ["Leads Delivered/Month", "—", "15–25", "30–50"],
                    ["Targeted Ad Campaigns", false, true, true],
                    ["Pre-scored Leads (60+)", false, true, true],
                    ["AI Account Manager", false, true, true],
                    ["ZIP Code Exclusivity", false, false, true],
                    ["AI Auto-outreach", false, false, true],
                    ["White-glove Onboarding", false, false, true],
                    ["Priority Support", false, false, true],
                  ].map(([feature, t1, t2, t3], i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="px-6 py-3 text-gray-700 font-medium">{feature as string}</td>
                      {[t1, t2, t3].map((val, j) => (
                        <td
                          key={j}
                          className={`px-4 py-3 text-center ${j === 1 ? "bg-[#D4AF37]/10/50" : ""}`}
                        >
                          {val === true ? (
                            <span className="text-[#D4AF37] font-bold">✓</span>
                          ) : val === false ? (
                            <span className="text-gray-300">—</span>
                          ) : (
                            <span className="font-semibold text-gray-900">{val as string}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 bg-[#FDFBF7]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-semibold text-gray-900">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Close More Luxury Deals?
            </h2>
            <p className="text-gray-600 mb-8">
              Book a 15-minute strategy call. We&apos;ll show you exactly how
              LuxeLeadPro works for your market.
            </p>
            <a
              href="https://calendly.com/robopdesigns/strategy-call"
              className="inline-block px-8 py-4 bg-[#0A192F] text-white font-bold rounded-xl hover:opacity-90 transition shadow-lg"
            >
              Book Your Strategy Call →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
