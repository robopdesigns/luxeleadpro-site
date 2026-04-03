'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative px-4 pt-8 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32 overflow-hidden">
        {/* Subtle gradient background blob */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-100 rounded-full opacity-30 blur-3xl translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-100 rounded-full opacity-20 blur-3xl -translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                AI-Powered · Built for $1M+ Luxury Markets
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-gray-900 mb-4 sm:mb-6 leading-[1.05]">
                Close <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">2x More</span><br />Luxury Deals
              </h1>

              <p className="text-base sm:text-xl text-gray-600 mb-5 sm:mb-8 leading-relaxed max-w-lg">
                The only AI lead-scoring platform built exclusively for luxury real estate. Know your best prospects every morning. Win deals before your competition even sees them.
              </p>

              {/* Founding cohort badge */}
              <div className="flex items-center gap-3 mb-5 sm:mb-8">
                <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Founding Agent Cohort — Limited Availability
                </div>
              </div>

              {/* Value Props - hidden on smallest screens to keep CTA visible */}
              <div className="hidden sm:block space-y-3 mb-8">
                {[
                  'AI scoring identifies your top buyers before competitors',
                  'Daily market briefing — your 3 best deals every morning',
                  'TCPA/DNC compliance built-in — zero legal risk ever',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-0">
                <a href="https://calendly.com/robopdesigns/profit-audit" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition shadow-lg shadow-purple-200">
                  Book a Strategy Call
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                </a>
                <Link href="/pricing" className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:border-purple-400 hover:text-purple-700 transition">
                  See Pricing
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-4">No obligation · Personalized to your market · Setup in under 10 minutes</p>
            </div>

            {/* Right: AI Command Center */}
            <div className="mt-4 lg:mt-0">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-2xl shadow-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900">🤖 Your AI Command Center</h3>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">● Live</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: 'Hot Leads', value: '12', color: 'from-purple-600 to-purple-700' },
                    { label: 'Close Rate', value: '8.2%', color: 'from-green-500 to-green-600' },
                    { label: 'Pipeline', value: '$2.8M', color: 'from-pink-500 to-pink-600' },
                  ].map((stat, i) => (
                    <div key={i} className={`bg-gradient-to-br ${stat.color} rounded-xl p-3 text-white`}>
                      <div className="text-xs font-medium opacity-80">{stat.label}</div>
                      <div className="text-2xl font-bold mt-1">{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Top leads */}
                <div className="mb-5">
                  <p className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">Today's Top Opportunities</p>
                  <div className="space-y-2">
                    {[
                      { name: 'Sarah Johnson', detail: 'Lincoln Park · $3.2M', score: 92, badge: 'Hot', color: 'bg-red-100 text-red-700' },
                      { name: 'Michael Chen', detail: 'Gold Coast · $1.8M', score: 78, badge: 'Warm', color: 'bg-purple-100 text-purple-700' },
                      { name: 'Elizabeth Brown', detail: 'River North · $2.4M', score: 65, badge: 'Active', color: 'bg-blue-100 text-blue-700' },
                    ].map((lead, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{lead.name}</div>
                          <div className="text-xs text-gray-500">{lead.detail}</div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs font-bold text-gray-700">AI: {lead.score}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${lead.color}`}>{lead.badge}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition text-sm">
                  View Full Daily Briefing →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF BAR ─────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-gray-50 py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm text-gray-500 font-medium mb-4 uppercase tracking-wider">Built exclusively for luxury real estate</p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { value: '40+', label: 'Data Signals Per Lead' },
              { value: '6 AM', label: 'Daily Briefing Delivered' },
              { value: '0-100', label: 'AI Lead Scoring' },
              { value: '100%', label: 'TCPA/DNC Compliance' },
              { value: '< 10 min', label: 'Setup Time' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="px-4 py-20 sm:py-28 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mt-2 mb-4">Win Deals in 3 Simple Steps</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">Set it up once. Our AI runs every morning while you sleep.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-purple-300 to-pink-300 z-0" />
            {[
              {
                step: '01',
                icon: '🔗',
                title: 'Connect Your Leads',
                desc: 'Import from any source — your CRM, website, open houses, referrals. Setup takes under 10 minutes.',
              },
              {
                step: '02',
                icon: '🤖',
                title: 'AI Scores Overnight',
                desc: 'Our luxury-market AI scores every lead 0-100 while you sleep, factoring in 40+ data points.',
              },
              {
                step: '03',
                icon: '📊',
                title: 'Win Your Morning',
                desc: 'Wake up to your top 3 opportunities, talking points, and market intel. Move first. Win deals.',
              },
            ].map((step, i) => (
              <div key={i} className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto mb-5 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100 rounded-2xl flex items-center justify-center text-4xl shadow-sm">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-purple-400 tracking-widest mb-2">STEP {step.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ──────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:py-28 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Features</span>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mt-2 mb-4">
              Everything a Luxury Agent Needs to Dominate
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built from the ground up for the luxury market. Not retrofitted from generic tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🎯',
                title: 'AI Lead Scoring',
                desc: 'Score every lead 0-100 using 40+ luxury market signals. Know exactly who to call first.',
                highlight: true,
              },
              {
                icon: '🌅',
                title: 'Daily AI Briefing',
                desc: 'Wake up to personalized intelligence: top leads, market shifts, and ready-to-use talking points.',
                highlight: false,
              },
              {
                icon: '🛡️',
                title: 'Compliance Automation',
                desc: 'Real-time TCPA/DNC checking. Zero violations. Enterprise-grade audit logs for every contact.',
                highlight: false,
              },
              {
                icon: '📡',
                title: 'Market Intelligence',
                desc: 'Luxury market trends, buyer psychology profiles, and neighborhood data — refreshed daily.',
                highlight: false,
              },
              {
                icon: '⚡',
                title: 'Smart Automation',
                desc: 'Personalized follow-up sequences that feel handwritten. AI adapts tone to each prospect.',
                highlight: false,
              },
              {
                icon: '📈',
                title: 'ROI Dashboard',
                desc: 'See exact revenue per lead source, cost per close, and your projected earnings in real time.',
                highlight: false,
              },
            ].map((f, i) => (
              <div key={i} className={`rounded-2xl p-7 border transition hover:shadow-md ${f.highlight ? 'bg-gradient-to-br from-purple-600 to-pink-600 border-transparent text-white' : 'bg-white border-gray-200 hover:border-purple-200'}`}>
                <div className={`text-4xl mb-4`}>{f.icon}</div>
                <h3 className={`text-lg font-bold mb-2 ${f.highlight ? 'text-white' : 'text-gray-900'}`}>{f.title}</h3>
                <p className={`text-sm leading-relaxed ${f.highlight ? 'text-purple-100' : 'text-gray-600'}`}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOUNDING AGENT PROGRAM ──────────────────────────── */}
      <section className="px-4 py-20 sm:py-28 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Limited to 50 Agents</span>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mt-2 mb-4">
              Founding Agent Program
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">We&apos;re onboarding our first cohort of luxury agents at a special introductory rate. Lock in your founding pricing for life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { badge: 'For Life', title: 'Locked Pricing', desc: 'Your founding rate stays the same as long as you\'re a member — even after we raise prices for new agents.' },
              { badge: 'White Glove', title: 'Direct Team Access', desc: 'Work directly with our team. Priority support, feature requests, and a dedicated onboarding specialist.' },
              { badge: 'VIP Access', title: 'Shape the Product', desc: 'Your feedback drives what we build next. Founding agents have a direct line to our product roadmap.' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-7 border border-gray-200 flex flex-col">
                <div className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">{item.badge}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING PREVIEW ───────────────────────────────────── */}
      <section className="px-4 py-20 sm:py-28 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Pricing</span>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mt-2 mb-4">Founding Agent Pricing</h2>
            <p className="text-lg text-gray-600">Lock in your introductory rate today. Pricing increases after our first 50 agents.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 mt-4">
            {[
              {
                name: 'Signature',
                price: '$249',
                sub: '/month',
                features: ['AI Lead Scoring (0-100)', 'Daily AI Briefing', 'Market Intelligence', 'TCPA/DNC Compliance', 'White-Glove Onboarding'],
                popular: false,
                badge: null,
                cta: 'Book a Strategy Call',
              },
              {
                name: 'Signature + Outreach',
                price: '$349',
                sub: '/month',
                features: ['Everything in Signature', '✉️ Automated email sequences', '🤖 AI writes emails per lead', '📊 Open & reply tracking', 'Priority Support'],
                popular: true,
                badge: 'Most Popular',
                cta: 'Book a Strategy Call',
              },
              {
                name: 'Team + Outreach',
                price: '$999',
                sub: '/month',
                features: ['Unlimited Agents', 'Outreach for all agents', 'Manager Dashboard', 'Team Analytics', 'Dedicated Support'],
                popular: false,
                badge: null,
                cta: 'Contact Us',
              },
            ].map((tier, i) => (
              <div key={i} className={`rounded-2xl border-2 transition relative flex flex-col ${tier.popular ? 'border-purple-500 bg-white shadow-xl shadow-purple-100' : 'border-gray-200 bg-white hover:border-purple-200'}`}>
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap z-10">
                    {tier.badge}
                  </div>
                )}
                <div className={`p-7 ${tier.badge ? 'pt-10' : 'pt-7'} flex-1 flex flex-col`}>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{tier.name}</h3>
                <div className="mb-5">
                  <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                  <span className="text-sm text-gray-500 ml-1">{tier.sub}</span>
                </div>
                <ul className="space-y-2 mb-7">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="https://calendly.com/robopdesigns/profit-audit" target="_blank" rel="noopener noreferrer" className={`block w-full text-center py-3 rounded-xl font-semibold transition text-sm mt-auto ${tier.popular ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-md' : 'border-2 border-gray-200 text-gray-900 hover:border-purple-400 hover:text-purple-600'}`}>
                  {tier.cta}
                </a>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500">
            All plans include white-glove onboarding. No long-term contracts.{' '}
            <Link href="/pricing" className="text-purple-600 font-medium hover:underline">Compare all features →</Link>
          </p>
        </div>
      </section>

      {/* ─── TRUST SIGNALS ─────────────────────────────────────── */}
      <section className="px-4 py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-8">Enterprise-Grade Security & Compliance</p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
            {[
              { icon: '🔒', label: 'TCPA Compliant' },
              { icon: '📋', label: 'DNC Registered' },
              { icon: '🛡️', label: 'Data Encrypted' },
              { icon: '✅', label: 'Audit Logs' },
              { icon: '🔐', label: 'Enterprise Security' },
            ].map((t, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="text-3xl">{t.icon}</div>
                <span className="text-xs font-semibold text-gray-600">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:py-28 bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
            Ready to Close 2x More Deals?
          </h2>
          <p className="text-lg text-purple-100 mb-10 max-w-xl mx-auto">
            Join our founding cohort of luxury agents who wake up every morning knowing exactly who to call and why. Limited spots available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://calendly.com/robopdesigns/profit-audit" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white text-purple-700 font-bold px-8 py-4 rounded-xl hover:bg-purple-50 transition shadow-lg">
              Book a Strategy Call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </a>
            <Link href="/pricing" className="inline-flex items-center justify-center gap-2 border-2 border-purple-300 text-white font-semibold px-8 py-4 rounded-xl hover:border-white transition">
              View Pricing
            </Link>
          </div>
          <p className="text-sm text-purple-200 mt-6">No obligation · Personalized to your market · Setup in under 10 minutes</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
