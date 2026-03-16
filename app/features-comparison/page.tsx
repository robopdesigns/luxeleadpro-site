'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function FeaturesComparison() {
  const comparison = [
    { feature: 'AI Lead Scoring', luxeleadpro: true, moxie: false, followup: false, realgeek: false },
    { feature: 'Daily AI Briefings', luxeleadpro: true, moxie: false, followup: false, realgeek: false },
    { feature: 'Luxury Market Intelligence', luxeleadpro: true, moxie: false, followup: false, realgeek: false },
    { feature: 'TCPA/DNC Compliance Automation', luxeleadpro: true, moxie: false, followup: false, realgeek: false },
    { feature: 'Lead Source ROI Tracking', luxeleadpro: true, moxie: false, followup: false, realgeek: false },
    { feature: 'Email/SMS Automation', luxeleadpro: true, moxie: true, followup: true, realgeek: true },
    { feature: 'Lead Management', luxeleadpro: true, moxie: true, followup: true, realgeek: true },
    { feature: 'CRM Dashboard', luxeleadpro: true, moxie: false, followup: true, realgeek: false },
    { feature: 'Team Leaderboards', luxeleadpro: true, moxie: false, followup: false, realgeek: false },
    { feature: 'White-Label Option', luxeleadpro: true, moxie: false, followup: false, realgeek: false },
    { feature: 'API Access', luxeleadpro: true, moxie: true, followup: true, realgeek: false },
    { feature: 'Legal Templates', luxeleadpro: true, moxie: false, followup: false, realgeek: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <Header />

      <main className="mx-auto max-w-7xl px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Why LuxeLeadPro Dominates the Market
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Compare our feature-rich platform with competitors. We offer more, smarter, and better.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900 border-b border-gray-700">
                  <th className="px-6 py-4 text-left font-semibold text-white">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold">
                    <div className="text-gold-500">LuxeLeadPro</div>
                    <div className="text-sm text-gray-400">Our Platform</div>
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    <div className="text-gray-300">Moxie</div>
                    <div className="text-sm text-gray-500">Competitor</div>
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    <div className="text-gray-300">Follow Up Boss</div>
                    <div className="text-sm text-gray-500">Competitor</div>
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    <div className="text-gray-300">Real Geek</div>
                    <div className="text-sm text-gray-500">Competitor</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-700 transition">
                    <td className="px-6 py-4 font-medium text-white">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={row.luxeleadpro ? 'text-green-500 text-lg' : 'text-gray-500'}>
                        {row.luxeleadpro ? '✓' : '✗'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={row.moxie ? 'text-green-500 text-lg' : 'text-gray-500'}>
                        {row.moxie ? '✓' : '✗'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={row.followup ? 'text-green-500 text-lg' : 'text-gray-500'}>
                        {row.followup ? '✓' : '✗'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={row.realgeek ? 'text-green-500 text-lg' : 'text-gray-500'}>
                        {row.realgeek ? '✓' : '✗'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-gold-500 mb-4">🤖 AI-Powered</h3>
            <p className="text-gray-300">
              Only platform with AI lead scoring, predictive analytics, and daily AI-generated briefings.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-gold-500 mb-4">🏆 Luxury-Focused</h3>
            <p className="text-gray-300">
              Purpose-built for $1M+ luxury markets with market intelligence, buyer profiles, and trends.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-gold-500 mb-4">⚖️ Compliance-First</h3>
            <p className="text-gray-300">
              Enterprise-grade TCPA/DNC automation with legal templates and compliance scoring.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">Ready to experience the future of real estate lead generation?</p>
          <button className="inline-block bg-gold-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gold-600 transition">
            Start Your Free Trial
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
