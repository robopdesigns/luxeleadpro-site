"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

export default function PricingPage() {
  const { user, profile } = useAuth();

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Header */}
        <section className="px-4 py-20 border-b border-gray-200">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-display font-bold text-gray-900 mb-4">
              Luxury Pricing for Luxury Results
            </h1>
            <p className="text-xl text-gray-600">
              Premium features at transparent pricing. Built for $1M+ luxury real estate markets.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Tier 1: Per Agent */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden hover:border-purple-500/50 transition">
                <div className="p-8 border-b border-gray-200">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Per Agent
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Perfect for solo agents
                  </p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">$199</span>
                    <span className="text-gray-600 ml-2">/month per agent</span>
                  </div>
                  <button className="w-full px-6 py-3 bg-purple-500 text-neutral-950 font-semibold rounded-lg hover:bg-purple-400 transition">
                    Get Started
                  </button>
                </div>

                <div className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">Lead management dashboard</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">AI-powered follow-ups</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">Mobile app access</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">Email support</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">Basic analytics</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tier 2: Team Plan (Featured) */}
              <div className="bg-gray-50 border-2 border-purple-500 rounded-lg overflow-hidden ring-2 ring-purple-500/10 relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-purple-500 text-neutral-950 text-sm font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>

                <div className="p-8 border-b border-gray-200">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Team Plan
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    For established offices
                  </p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">$799</span>
                    <span className="text-gray-600 ml-2">/month unlimited agents</span>
                  </div>
                  <button className="w-full px-6 py-3 bg-purple-500 text-neutral-950 font-semibold rounded-lg hover:bg-purple-400 transition">
                    Get Started
                  </button>
                </div>

                <div className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Unlimited agents in one office
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">Manager dashboard</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">Team performance reports</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">Advanced analytics</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">Priority support</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tier 3: Enterprise */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden hover:border-purple-500/50 transition">
                <div className="p-8 border-b border-gray-200">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Enterprise
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    For large organizations
                  </p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">Custom</span>
                    <span className="text-gray-600 ml-2">/ contact us</span>
                  </div>
                  <button className="w-full px-6 py-3 border border-purple-500 text-purple-400 font-semibold rounded-lg hover:bg-purple-500/10 transition">
                    Schedule Demo
                  </button>
                </div>

                <div className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Unlimited agents and teams
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">API access</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">Custom workflows</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">Dedicated account manager</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">White-glove onboarding</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 py-20 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <details className="group bg-gray-50 border border-gray-200 rounded-lg p-6">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-gray-900">
                  Can I switch plans anytime?
                  <span className="transition group-open:rotate-180">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-600 mt-4">
                  Yes! You can upgrade or downgrade your plan anytime. Changes take effect
                  at the start of your next billing cycle.
                </p>
              </details>

              <details className="group bg-gray-50 border border-gray-200 rounded-lg p-6">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-gray-900">
                  Is there a free trial?
                  <span className="transition group-open:rotate-180">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-600 mt-4">
                  Yes! All new agents get a 14-day free trial with full access to all
                  features. No credit card required.
                </p>
              </details>

              <details className="group bg-gray-50 border border-gray-200 rounded-lg p-6">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-gray-900">
                  What about training and support?
                  <span className="transition group-open:rotate-180">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-600 mt-4">
                  We provide onboarding training, video tutorials, and comprehensive
                  documentation. Team Plan and Enterprise customers get priority phone
                  support.
                </p>
              </details>

              <details className="group bg-gray-50 border border-gray-200 rounded-lg p-6">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-gray-900">
                  Can I cancel anytime?
                  <span className="transition group-open:rotate-180">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-600 mt-4">
                  Absolutely. No long-term contracts. Cancel anytime before your billing
                  date.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-20">
          <div className="max-w-4xl mx-auto bg-white border-2 border-purple-200 rounded-2xl p-12 text-center shadow-lg">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Ready to Close 2x More Deals?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Start your free 14-day trial today. No credit card required.
            </p>
            {!user ? (
              <Link
                href="/agent/signup"
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition shadow-md"
              >
                Start Free Trial
              </Link>
            ) : (
              <Link
                href={profile?.role === "manager" ? "/manager" : "/agent"}
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition shadow-md"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}



