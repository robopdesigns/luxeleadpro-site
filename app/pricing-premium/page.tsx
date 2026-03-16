'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export default function PricingPage() {
  const tiers = [
    {
      name: 'Per Agent',
      price: 199,
      period: '/month',
      description: 'Perfect for individual luxury agents',
      features: [
        '✓ AI Lead Scoring (0-100)',
        '✓ Daily AI Briefing Reports',
        '✓ Email/SMS Automation',
        '✓ Luxury Market Intelligence',
        '✓ TCPA/DNC Compliance Tracking',
        '✓ Lead Source ROI Analysis',
        '✓ Nurture Sequence Library',
        '✓ Performance Dashboard',
        '✓ Email Support',
      ],
      cta: 'Start Free Trial',
      highlighted: false,
    },
    {
      name: 'Team Plan',
      price: 799,
      period: '/month',
      description: 'Unlimited agents + team management',
      features: [
        '✓ Everything in Per Agent',
        '✓ Unlimited Team Members',
        '✓ Team Leaderboards & Gamification',
        '✓ White-Label Branding',
        '✓ Custom Nurture Sequences',
        '✓ Advanced Compliance Reports',
        '✓ Commission Tracking & Payouts',
        '✓ Priority Support',
        '✓ API Access (read-only)',
        '✓ Custom Integrations',
      ],
      cta: 'Schedule Demo',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: null,
      period: 'Custom',
      description: 'White-label, full API, dedicated support',
      features: [
        '✓ Everything in Team Plan',
        '✓ Full White-Label Solution',
        '✓ Dedicated Account Manager',
        '✓ Custom Development',
        '✓ Full API Access',
        '✓ Custom Integrations',
        '✓ SLA Guarantee',
        '✓ Training for Your Team',
        '✓ Priority 24/7 Support',
        '✓ Co-Marketing Opportunities',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <Header />

      <main className="mx-auto max-w-7xl px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Luxury Pricing for Luxury Results
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built for luxury real estate agents ($1M+ markets). Premium features at transparent pricing.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 border-2 transition-all ${
                tier.highlighted
                  ? 'border-gold-500 bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl scale-105'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              }`}
            >
              {/* Badge */}
              {tier.highlighted && (
                <div className="bg-gold-500 text-gray-900 px-4 py-1 rounded-full inline-block mb-4 font-semibold text-sm">
                  Most Popular
                </div>
              )}

              {/* Tier Name */}
              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{tier.description}</p>

              {/* Price */}
              <div className="mb-6">
                {tier.price ? (
                  <>
                    <span className="text-5xl font-bold text-white">${tier.price}</span>
                    <span className="text-gray-400">{tier.period}</span>
                  </>
                ) : (
                  <div>
                    <span className="text-4xl font-bold text-gold-500">Custom Pricing</span>
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-gray-300 text-sm flex items-start">
                    <span className="text-gold-500 mr-3">✓</span>
                    <span>{feature.replace('✓ ', '')}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  tier.highlighted
                    ? 'bg-gold-500 text-gray-900 hover:bg-gold-600'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gold-500 mb-2">Can I switch plans?</h3>
              <p className="text-gray-400">
                Yes! Upgrade or downgrade anytime. Changes take effect on your next billing cycle. No long-term contracts.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gold-500 mb-2">Is there a free trial?</h3>
              <p className="text-gray-400">
                Yes. 14-day free trial on Per Agent plan. No credit card required. Full feature access.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gold-500 mb-2">What about setup fees?</h3>
              <p className="text-gray-400">
                Zero setup fees. Zero onboarding charges. Start immediately. Per Agent plan includes 4-hour training.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gold-500 mb-2">Do you offer refunds?</h3>
              <p className="text-gray-400">
                Yes. 30-day money-back guarantee if you're not satisfied. No questions asked.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gold-500 mb-2">Is there a discount for annual billing?</h3>
              <p className="text-gray-400">
                Yes. Pay annually and get 2 months free. Billed once per year instead of monthly.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gold-500 mb-2">Can I add more agents later?</h3>
              <p className="text-gray-400">
                Team Plan includes unlimited agents. Per Agent plan scales as you add agents. No minimum commitment.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">Ready to transform your lead generation?</p>
          <Link
            href="/agent/signup"
            className="inline-block bg-gold-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gold-600 transition"
          >
            Start Your Free Trial
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
