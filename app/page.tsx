'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <Header />

      {/* Hero Section */}
      <section className="relative px-4 py-32 sm:py-48">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-block mb-6">
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  ✨ Built for $1M+ Luxury Markets
                </span>
              </div>

              <h1 className="text-6xl sm:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                Close More <span className="text-purple-600">Luxury</span> Deals
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                AI-powered lead generation and nurturing system built specifically for luxury real estate agents. Convert more prospects into clients with intelligent automation and market insights.
              </p>

              {/* Value Props */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-purple-600 text-2xl">✓</span>
                  <span className="text-gray-700">AI lead scoring that identifies your best prospects</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-purple-600 text-2xl">✓</span>
                  <span className="text-gray-700">Daily briefings with market intelligence and leads</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-purple-600 text-2xl">✓</span>
                  <span className="text-gray-700">TCPA/DNC compliance built-in - zero legal risk</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/agent/signup"
                  className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-600 transition shadow-lg"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/manager/login"
                  className="inline-block border-2 border-gray-300 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:border-purple-600 hover:text-purple-600 transition"
                >
                  Manager Login
                </Link>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                14-day free trial. No credit card required. Full feature access.
              </p>
            </div>

            {/* Right: Dashboard Preview (Mobile + Desktop) */}
            <div className="mt-8 lg:mt-0">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-purple-200 shadow-xl">
                <h3 className="font-serif text-lg sm:text-xl font-bold mb-6 text-gray-900">🤖 Your AI Command Center</h3>
                
                {/* Top Stats */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
                  <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-3 sm:p-4 text-white">
                    <div className="text-xs font-semibold opacity-90">Hot Leads</div>
                    <div className="text-2xl sm:text-3xl font-bold mt-2">12</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-3 sm:p-4 text-white">
                    <div className="text-xs font-semibold opacity-90">Close Rate</div>
                    <div className="text-2xl sm:text-3xl font-bold mt-2">8.2%</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg p-3 sm:p-4 text-white">
                    <div className="text-xs font-semibold opacity-90">This Month</div>
                    <div className="text-2xl sm:text-3xl font-bold mt-2">$2.8M</div>
                  </div>
                </div>

                {/* Lead List */}
                <div className="mb-6">
                  <div className="text-xs font-bold text-purple-600 mb-3 uppercase tracking-wider">TODAY'S TOP 3 OPPORTUNITIES</div>
                  <div className="space-y-3">
                    {[
                      { name: 'Sarah Johnson', score: 92, status: 'Hot' },
                      { name: 'Michael Chen', score: 78, status: 'Warm' },
                      { name: 'Elizabeth Brown', score: 65, status: 'Cool' },
                    ].map((lead, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-3 flex justify-between items-center border border-gray-200">
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-900">{lead.name}</div>
                          <div className="text-xs text-gray-500">Score: {lead.score}</div>
                        </div>
                        <span className={`text-xs font-bold px-2 sm:px-3 py-1 rounded ml-2 flex-shrink-0 ${
                          lead.status === 'Hot' ? 'bg-red-100 text-red-700' :
                          lead.status === 'Warm' ? 'bg-purple-100 text-purple-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {lead.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Briefing Button */}
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition shadow-md">
                  📊 View Daily AI Briefing
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:py-32 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-serif font-bold text-gray-900 mb-4">
              Why Top Luxury Agents Choose LuxeLeadPro
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Purpose-built for luxury real estate. Everything else is a compromise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🤖',
                title: 'AI Lead Scoring',
                desc: 'Automatically score leads 0-100 based on luxury market factors. Know which prospects convert.',
              },
              {
                icon: '📊',
                title: 'Market Intelligence',
                desc: 'Real-time luxury market data, buyer profiles, neighborhood trends - all automated daily.',
              },
              {
                icon: '⚖️',
                title: 'Compliance First',
                desc: 'Enterprise-grade TCPA/DNC automation. Zero compliance headaches. Legal templates included.',
              },
              {
                icon: '📧',
                title: 'Smart Automation',
                desc: 'Nurture sequences, email/SMS campaigns, follow-ups - all AI-powered and automated.',
              },
              {
                icon: '💰',
                title: 'ROI Tracking',
                desc: 'Know exactly which lead sources convert. Budget optimization recommendations included.',
              },
              {
                icon: '📈',
                title: 'Daily Briefings',
                desc: 'Personalized AI briefing each morning with top leads, market updates, and coaching tips.',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="px-4 py-20 sm:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-serif font-bold text-gray-900 mb-4">
              Simple, Premium Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start with any plan. Upgrade anytime. Cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { name: 'Per Agent', price: '$199', features: ['AI Lead Scoring', 'Daily Briefings', 'Automation', 'Market Intel', 'Email Support'] },
              { name: 'Team Plan', price: '$799', popular: true, features: ['Unlimited Agents', 'Manager Dashboard', 'Team Reports', 'Leaderboards', 'Priority Support', 'API Access'] },
              { name: 'Enterprise', price: 'Custom', features: ['White-Label', 'Dedicated Manager', 'Custom Dev', 'SLA Guarantee', 'Full API', '24/7 Support'] },
            ].map((tier, index) => (
              <div
                key={index}
                className={`rounded-lg p-8 border-2 transition ${
                  tier.popular
                    ? 'border-purple-600 bg-gradient-to-b from-purple-50 to-white shadow-lg'
                    : 'border-gray-200 bg-white hover:border-purple-300'
                }`}
              >
                {tier.popular && (
                  <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-4xl font-bold text-gray-900 mb-6">{tier.price}<span className="text-lg text-gray-600">/mo</span></p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <span className="text-purple-600 font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    tier.popular
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/pricing" className="text-purple-600 font-semibold hover:text-purple-700">
              See full pricing & compare features →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:py-32 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl sm:text-6xl font-serif font-bold mb-6 text-gray-900">
            Close 2x More Deals. Dominate Your Market.
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Luxury agents using LuxeLeadPro win deals before their competition even sees them.
          </p>
          <Link
            href="/agent/signup"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition shadow-lg"
          >
            Start Closing More Deals - Free Trial
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}


