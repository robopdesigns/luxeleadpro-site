"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const checkIcon = (
  <svg className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
  </svg>
);

const plans = [
  {
    name: 'Per Agent',
    price: '$199',
    period: '/month',
    desc: 'Perfect for individual agents',
    popular: false,
    badge: null,
    features: [
      'AI Lead Scoring (0-100)',
      'Daily AI Briefing — top 3 leads',
      'Market intelligence reports',
      'TCPA/DNC compliance automation',
      'Lead management dashboard',
      'Mobile app access',
      'Email support',
    ],
    cta: 'Start Free Trial',
    href: '/agent/signup',
  },
  {
    name: 'Per Agent + Outreach',
    price: '$299',
    period: '/month',
    desc: 'AI scores AND emails your leads for you',
    popular: true,
    badge: '🔥 Best Value',
    features: [
      'Everything in Per Agent',
      '✉️ Automated cold email sequences',
      '🤖 AI writes personalized emails',
      '📬 Sends when lead scores 85+',
      '📊 Open & reply rate tracking',
      'A/B subject line testing',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    href: '/agent/signup',
  },
  {
    name: 'Team Plan',
    price: '$799',
    period: '/month',
    desc: 'For teams of 2-10 agents',
    popular: false,
    badge: null,
    features: [
      'Unlimited agents',
      'Manager dashboard',
      'Team performance reports',
      'Agent leaderboards',
      'Bulk lead import',
      'API access',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    href: '/agent/signup',
  },
  {
    name: 'Team + Outreach',
    price: '$999',
    period: '/month',
    desc: 'Full team with automated outreach for all',
    popular: false,
    badge: '⚡ Most Powerful',
    features: [
      'Everything in Team Plan',
      '✉️ Automated outreach for all agents',
      '🤖 AI email writer per agent',
      'Shared reply inbox',
      'Campaign analytics dashboard',
      'Dedicated account manager',
      '24/7 priority support',
    ],
    cta: 'Contact Us',
    href: '/agent/signup',
  },
];

export default function PricingPage() {
  const { user, profile } = useAuth();

  return (
    <>
      <Header />
      <main className="bg-white">

        {/* ─── HERO ─── */}
        <section className="px-4 py-16 sm:py-20 border-b border-gray-100 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block bg-purple-50 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Simple, Transparent Pricing
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              All plans include a 14-day free trial. No credit card required.
            </p>
            <p className="text-sm text-gray-500">
              Built for $1M+ luxury real estate markets.
            </p>
          </div>
        </section>

        {/* ─── OUTREACH BANNER ─── */}
        <section className="px-4 py-6 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-white text-center sm:text-left">
            <div>
              <p className="font-bold text-lg">🆕 New: Automated Cold Outreach Add-On</p>
              <p className="text-purple-100 text-sm">AI scores your leads AND emails them for you. Like Instantly — but built for luxury real estate.</p>
            </div>
            <Link href="/agent/signup" className="flex-shrink-0 bg-white text-purple-700 font-bold px-6 py-2.5 rounded-lg hover:bg-purple-50 transition text-sm whitespace-nowrap">
              Try It Free →
            </Link>
          </div>
        </section>

        {/* ─── PRICING CARDS ─── */}
        <section className="px-4 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-4">
              {plans.map((plan, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border-2 flex flex-col transition hover:shadow-lg relative ${
                    plan.popular
                      ? 'border-purple-500 shadow-xl shadow-purple-100'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  {plan.badge && (
                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap z-10 ${
                      plan.popular ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-gray-900 text-white'
                    }`}>
                      {plan.badge}
                    </div>
                  )}

                  <div className={`p-6 ${plan.badge ? 'pt-8' : 'pt-6'} ${plan.popular ? 'bg-gradient-to-b from-purple-50 to-white' : 'bg-white'} rounded-t-2xl`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h3>
                    <p className="text-xs text-gray-500 mb-4">{plan.desc}</p>
                    <div className="mb-5">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-sm text-gray-500">{plan.period}</span>
                    </div>
                    <Link
                      href={plan.href}
                      className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition ${
                        plan.popular
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-md'
                          : 'border-2 border-gray-200 text-gray-900 hover:border-purple-400 hover:text-purple-600'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>

                  <div className="p-6 pt-0 flex-1 bg-white">
                    <ul className="space-y-2.5">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                          {f.startsWith('✉️') || f.startsWith('🤖') || f.startsWith('📬') || f.startsWith('📊') || f.startsWith('🔥') || f.startsWith('⚡')
                            ? <span className="flex-shrink-0 mt-0.5">→</span>
                            : checkIcon
                          }
                          <span className={f.startsWith('Everything') ? 'font-semibold text-purple-700' : ''}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-gray-500 mt-8">
              All plans include 14-day free trial · No credit card required · Cancel anytime
            </p>
          </div>
        </section>

        {/* ─── COMPARE TABLE ─── */}
        <section className="px-4 py-16 bg-gray-50 border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-gray-900 text-center mb-10">Compare Plans</h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="text-left px-6 py-4 font-semibold">Feature</th>
                    <th className="text-center px-4 py-4 font-semibold">Per Agent<br/><span className="font-normal text-gray-300">$199/mo</span></th>
                    <th className="text-center px-4 py-4 font-semibold bg-purple-700">+ Outreach<br/><span className="font-normal text-purple-200">$299/mo</span></th>
                    <th className="text-center px-4 py-4 font-semibold">Team<br/><span className="font-normal text-gray-300">$799/mo</span></th>
                    <th className="text-center px-4 py-4 font-semibold">Team+<br/><span className="font-normal text-gray-300">$999/mo</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['AI Lead Scoring (0-100)', '✅', '✅', '✅', '✅'],
                    ['Daily AI Briefing', '✅', '✅', '✅', '✅'],
                    ['TCPA/DNC Compliance', '✅', '✅', '✅', '✅'],
                    ['Market Intelligence', '✅', '✅', '✅', '✅'],
                    ['Mobile App', '✅', '✅', '✅', '✅'],
                    ['Automated Email Sequences', '❌', '✅', '❌', '✅'],
                    ['AI Writes Emails Per Lead', '❌', '✅', '❌', '✅'],
                    ['Open & Reply Tracking', '❌', '✅', '❌', '✅'],
                    ['Unlimited Agents', '❌', '❌', '✅', '✅'],
                    ['Manager Dashboard', '❌', '❌', '✅', '✅'],
                    ['Team Reports', '❌', '❌', '✅', '✅'],
                    ['API Access', '❌', '❌', '✅', '✅'],
                    ['Dedicated Account Manager', '❌', '❌', '❌', '✅'],
                    ['24/7 Support', '❌', '❌', '❌', '✅'],
                  ].map(([feature, ...cols], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-3 text-gray-700 font-medium">{feature}</td>
                      {cols.map((val, j) => (
                        <td key={j} className={`text-center px-4 py-3 ${j === 1 ? 'bg-purple-50' : ''}`}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="px-4 py-16 border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'Can I switch plans anytime?', a: 'Yes! Upgrade or downgrade anytime. Changes take effect at the start of your next billing cycle.' },
                { q: 'Is there a free trial?', a: '14-day free trial on all plans. No credit card required. Full feature access from day one.' },
                { q: 'How does the Outreach add-on work?', a: 'When our AI scores a lead 85 or higher, it automatically sends a personalized 3-email sequence on your behalf. You wake up to replies in your inbox — not just a list of names to call.' },
                { q: 'Do I need my own email account for Outreach?', a: 'Yes — you connect your existing Gmail or Outlook account. Emails are sent from your address so replies come directly to you.' },
                { q: 'Is automated outreach TCPA compliant?', a: 'Yes. All outreach respects DNC registry, includes unsubscribe options, and maintains audit logs. We keep you fully protected.' },
                { q: 'Can I cancel anytime?', a: 'Absolutely. No long-term contracts. Cancel before your billing date for a full stop.' },
                { q: 'What support is available?', a: 'All plans include email support. Per Agent + Outreach and above get priority support. Team+ gets a dedicated account manager.' },
              ].map((faq, i) => (
                <details key={i} className="group bg-gray-50 border border-gray-200 rounded-xl p-5 cursor-pointer">
                  <summary className="flex justify-between items-center font-semibold text-gray-900 list-none">
                    {faq.q}
                    <svg className="w-5 h-5 text-gray-400 transition group-open:rotate-180 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </summary>
                  <p className="text-gray-600 mt-3 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="px-4 py-16 bg-white border-t border-gray-100">
          <div className="max-w-2xl mx-auto bg-white border-2 border-purple-200 rounded-2xl p-10 text-center shadow-lg">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">
              Ready to Close 2x More Deals?
            </h2>
            <p className="text-gray-600 mb-7">
              Start your free 14-day trial. No credit card required.
            </p>
            <Link
              href="/agent/signup"
              className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition shadow-md"
            >
              Start Free Trial
            </Link>
            <p className="text-xs text-gray-400 mt-4">14-day free trial · No credit card · Cancel anytime</p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
