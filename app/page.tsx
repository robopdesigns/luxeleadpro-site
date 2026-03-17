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
                <span className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  ✨ Built for $1M+ Luxury Markets
                </span>
              </div>

              <h1 className="text-6xl sm:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                Close More <span className="text-amber-600">Luxury</span> Deals
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                AI-powered lead generation and nurturing system built specifically for luxury real estate agents. Convert more prospects into clients with intelligent automation and market insights.
              </p>

              {/* Value Props */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-amber-600 text-2xl">✓</span>
                  <span className="text-gray-700">AI lead scoring that identifies your best prospects</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-amber-600 text-2xl">✓</span>
                  <span className="text-gray-700">Daily briefings with market intelligence and leads</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-amber-600 text-2xl">✓</span>
                  <span className="text-gray-700">TCPA/DNC compliance built-in - zero legal risk</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/agent/signup"
                  className="inline-block bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-amber-700 hover:to-amber-600 transition shadow-lg"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/manager/login"
                  className="inline-block border-2 border-gray-300 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:border-amber-600 hover:text-amber-600 transition"
                >
                  Manager Login
                </Link>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                14-day free trial. No credit card required. Full feature access.
              </p>
            </div>

            {/* Right: Image/Visual */}
            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl p-8 border-2 border-amber-200">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Your AI Command Center</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-100 rounded-lg p-3 h-8"></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gray-100 rounded-lg p-3 h-20"></div>
                      <div className="bg-gray-100 rounded-lg p-3 h-20"></div>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 h-12"></div>
                  </div>
                </div>
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
              <div key={index} className="bg-gray-50 rounded-lg p-8 border border-gray-200 hover:border-amber-300 hover:shadow-lg transition">
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
                    ? 'border-amber-600 bg-gradient-to-b from-amber-50 to-white shadow-lg'
                    : 'border-gray-200 bg-white hover:border-amber-300'
                }`}
              >
                {tier.popular && (
                  <div className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-4xl font-bold text-gray-900 mb-6">{tier.price}<span className="text-lg text-gray-600">/mo</span></p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <span className="text-amber-600 font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    tier.popular
                      ? 'bg-amber-600 text-white hover:bg-amber-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/pricing" className="text-amber-600 font-semibold hover:text-amber-700">
              See full pricing & compare features →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:py-32 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl sm:text-6xl font-serif font-bold mb-6">
            Ready to close more luxury deals?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join hundreds of luxury agents using LuxeLeadPro to automate their business and close bigger deals.
          </p>
          <Link
            href="/agent/signup"
            className="inline-block bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition"
          >
            Start Free Trial - No Card Required
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
