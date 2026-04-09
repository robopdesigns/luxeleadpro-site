'use client';

import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Header />

      {/* HERO — Split 50/50, subtle ivory gradient */}
      <section className="relative px-4 pt-12 pb-20 sm:pt-24 sm:pb-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #FAFAF8 0%, #F0EDE6 50%, #FAF8F5 100%)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6" style={{ background: 'rgba(212,175,55,0.12)', color: '#C4A030', border: '1px solid rgba(212,175,55,0.25)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#D4AF37' }} />
              AI-Powered · Built for $1M+ Markets
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-6" style={{ color: '#0A192F' }}>
              Close <span className="italic" style={{ color: '#D4AF37' }}>2x More</span><br />Luxury Deals
            </h1>

            <p className="text-lg mb-8 leading-relaxed max-w-lg" style={{ color: '#4A5568' }}>
              The only AI lead-scoring platform built exclusively for luxury real estate. Know your best prospects every morning. Win deals before your competition even sees them.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="https://calendly.com/robopdesigns/strategy-call" className="inline-flex items-center px-6 py-3 rounded-md font-semibold text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200" style={{ background: '#D4AF37', color: '#0A192F' }}>
                Book a Strategy Call →
              </Link>
              <Link href="/pricing" className="inline-flex items-center px-6 py-3 rounded-md font-semibold text-sm border-2 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-200" style={{ borderColor: '#E2E8F0', color: '#0A192F' }}>
                See Pricing
              </Link>
            </div>

            <p className="text-sm" style={{ color: '#94A3B8' }}>
              No obligation · Personalized to your market · Setup in under 10 minutes
            </p>
          </div>

          {/* Right — AI Command Center Card */}
          <div className="rounded-2xl p-6 shadow-lg border" style={{ background: '#FFFFFF', borderColor: '#E2E8F0' }}>
            <div className="flex items-center justify-between mb-5">
              <span className="font-semibold text-sm" style={{ color: '#0A192F' }}>Your AI Command Center</span>
              <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#10B981' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10B981' }} /> Live
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: 'Hot Leads', value: '12', bg: '#F0FDF4', color: '#166534' },
                { label: 'Close Rate', value: '8.2%', bg: '#FFFBEB', color: '#92400E' },
                { label: 'Pipeline', value: '$2.8M', bg: '#FFF1F2', color: '#9F1239' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl p-3 text-center" style={{ background: s.bg }}>
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#94A3B8' }}>{s.label}</div>
                  <div className="text-xl font-bold" style={{ color: s.color, fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: '#94A3B8' }}>Today&apos;s Top Opportunities</div>

            {[
              { name: 'Sarah Johnson', detail: 'Lincoln Park · $3.2M', score: 92, badge: 'Hot', badgeBg: '#FEE2E2', badgeColor: '#DC2626' },
              { name: 'Michael Chen', detail: 'Gold Coast · $1.8M', score: 78, badge: 'Warm', badgeBg: '#FEF3C7', badgeColor: '#D97706' },
              { name: 'Elizabeth Brown', detail: 'River North · $2.4M', score: 65, badge: 'Active', badgeBg: '#DCFCE7', badgeColor: '#16A34A' },
            ].map((lead, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: '#F1F5F9' }}>
                <div>
                  <div className="font-semibold text-sm" style={{ color: '#0A192F' }}>{lead.name}</div>
                  <div className="text-xs" style={{ color: '#94A3B8' }}>{lead.detail}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium" style={{ color: '#64748B' }}>AI: {lead.score}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: lead.badgeBg, color: lead.badgeColor }}>{lead.badge}</span>
                </div>
              </div>
            ))}

            <Link href="/demo" className="block text-center mt-4 text-sm font-medium py-2 rounded-lg border transition-all hover:border-[#D4AF37]" style={{ color: '#94A3B8', borderColor: '#E2E8F0' }}>
              View Full Daily Briefing →
            </Link>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="px-4 py-12 border-y" style={{ background: '#0A192F', borderColor: '#1E293B' }}>
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { value: '40+', label: 'Data Signals Per Lead' },
            { value: '6 AM', label: 'Daily Briefing Delivered' },
            { value: '0-100', label: 'AI Lead Scoring' },
            { value: '100%', label: 'TCPA/DNC Compliance' },
            { value: '< 10 min', label: 'Setup Time' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold" style={{ color: '#D4AF37', fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</div>
              <div className="text-xs font-medium mt-1" style={{ color: '#94A3B8' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-4 py-20 sm:py-28" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[11px] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: '#D4AF37' }}>How It Works</div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4" style={{ color: '#0A192F' }}>Win Deals in 3 Simple Steps</h2>
            <p style={{ color: '#4A5568' }}>Set it up once. Our AI runs every morning while you sleep.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '🔗', title: 'Connect Your Leads', desc: 'Import from any source — your CRM, website, open houses, referrals. Setup takes under 10 minutes.' },
              { step: '02', icon: '🤖', title: 'AI Scores Overnight', desc: 'Our luxury-market AI scores every lead 0-100 while you sleep, factoring in 40+ data points.' },
              { step: '03', icon: '📊', title: 'Win Your Morning', desc: 'Wake up to your top 3 opportunities, talking points, and market intel. Move first. Win deals.' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl p-8 border transition-all duration-300 hover:shadow-lg hover:border-[#D4AF37]/30" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
                <div className="text-[11px] font-bold uppercase tracking-[0.15em] mb-3" style={{ color: '#D4AF37' }}>Step {s.step}</div>
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#0A192F' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#4A5568' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="px-4 py-20 sm:py-28" style={{ background: 'var(--bg-elevated)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[11px] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: '#D4AF37' }}>Pricing</div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4" style={{ color: '#0A192F' }}>Choose Your Competitive Edge</h2>
            <p style={{ color: '#4A5568' }}>Every tier is built for agents who close $1M+ deals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {[
              {
                name: 'Intelligence', price: '$249', features: ['AI Lead Scoring (40+ signals)', 'Daily 6AM Briefing', 'Market Analytics Dashboard', 'Import from Any CRM', 'Email & Phone Support'],
                featured: false, cta: 'Start with Intelligence', ctaLink: 'https://calendly.com/robopdesigns/strategy-call'
              },
              {
                name: 'Intelligence + Generation', price: '$749', features: ['Everything in Intelligence', '15–25 Verified Luxury Leads/mo', 'Targeted Ad Campaigns', 'Pre-scored Leads (60+ only)', 'AI Account Manager', 'Weekly Performance Reports'],
                featured: false, cta: 'Get Qualified Leads', ctaLink: 'https://calendly.com/robopdesigns/strategy-call'
              },
              {
                name: 'Exclusive Territory', price: '$1,499', badge: 'Most Exclusive',
                features: ['Everything in Generation', '30–50 Leads/mo', 'ZIP Code Exclusivity', 'AI Auto-outreach', 'White-Glove Onboarding', 'Priority Support', 'Quarterly Strategy Reviews', 'First Access to New Features'],
                featured: true, cta: 'Claim Your Territory →', ctaLink: '/territory'
              },
            ].map((tier, i) => (
              <div key={i} className={`relative rounded-xl p-8 border-2 transition-all duration-300 ${tier.featured ? 'scale-105 z-10 shadow-lg' : 'hover:shadow-md'}`} style={{
                background: 'var(--bg-surface)',
                borderColor: tier.featured ? '#D4AF37' : 'var(--border-default)',
                boxShadow: tier.featured ? '0 4px 24px rgba(212,175,55,0.15)' : undefined,
              }}>
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest" style={{ background: '#0A192F', color: '#D4AF37' }}>
                    {tier.badge}
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-1" style={{ color: '#4A5568' }}>{tier.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold" style={{ color: tier.featured ? '#D4AF37' : '#0A192F' }}>{tier.price}</span>
                    <span className="text-sm" style={{ color: '#94A3B8' }}>/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: '#4A5568' }}>
                      <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={tier.featured ? '#D4AF37' : '#0A192F'} strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={tier.ctaLink} className={`block w-full py-3 rounded-md font-semibold text-sm text-center transition-all duration-200 ${tier.featured ? 'hover:shadow-md hover:-translate-y-0.5' : 'hover:border-[#D4AF37] hover:text-[#D4AF37]'}`} style={{
                  background: tier.featured ? '#D4AF37' : 'transparent',
                  color: tier.featured ? '#0A192F' : '#0A192F',
                  border: tier.featured ? 'none' : '2px solid #E2E8F0',
                }}>
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-sm mt-8" style={{ color: '#94A3B8' }}>
            All plans include white-glove onboarding. No long-term contracts.{' '}
            <Link href="/pricing" className="font-medium hover:underline" style={{ color: '#D4AF37' }}>Compare all features →</Link>
          </p>
        </div>
      </section>

      {/* FOUNDING AGENT CTA */}
      <section className="px-4 py-20" style={{ background: '#0A192F' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: '#D4AF37' }}>Limited to 50 Agents</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Founding Agent Program</h2>
          <p className="text-lg mb-8" style={{ color: '#94A3B8' }}>Lock in your founding rate for life. When we raise prices — and we will — your rate stays the same. Forever.</p>
          <Link href="https://calendly.com/robopdesigns/strategy-call" className="inline-flex items-center px-8 py-4 rounded-md font-semibold text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200" style={{ background: '#D4AF37', color: '#0A192F' }}>
            Book Your Strategy Call →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
