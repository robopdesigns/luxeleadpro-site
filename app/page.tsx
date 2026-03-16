"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const { user, profile } = useAuth();

  return (
    <>
      <Header />
      <main className="bg-neutral-950">
        {/* Hero Section */}
        <section className="px-4 py-20 md:py-32 bg-gradient-to-b from-neutral-900 to-neutral-950">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-medium">
                ✨ AI-Powered Lead Management
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Automate Your Luxury{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Real Estate Pipeline
              </span>
            </h1>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              AI-powered lead management for luxury real estate agents. Automate
              nurture, follow-up, and pipeline workflows to close more high-end deals
              effortlessly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {user && profile ? (
                <>
                  <Link
                    href={profile.role === "manager" ? "/manager" : "/agent"}
                    className="px-8 py-4 bg-yellow-500 text-neutral-950 font-bold text-lg rounded-lg hover:bg-yellow-400 transition inline-block"
                  >
                    Go to Dashboard
                  </Link>
                  <Link
                    href="/pricing"
                    className="px-8 py-4 border border-neutral-700 text-white font-bold text-lg rounded-lg hover:bg-neutral-900 transition inline-block"
                  >
                    View Pricing
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/manager/login"
                    className="px-8 py-4 bg-yellow-500 text-neutral-950 font-bold text-lg rounded-lg hover:bg-yellow-400 transition inline-block"
                  >
                    Login for Managers
                  </Link>
                  <Link
                    href="/agent/login"
                    className="px-8 py-4 border border-neutral-700 text-white font-bold text-lg rounded-lg hover:bg-neutral-900 transition inline-block"
                  >
                    Login for Agents
                  </Link>
                </>
              )}
            </div>

            {/* New Agent? CTA */}
            {!user && (
              <p className="text-neutral-400">
                New to LuxeLead?{" "}
                <Link
                  href="/agent/signup"
                  className="text-yellow-400 hover:text-yellow-300 font-semibold transition"
                >
                  Create an agent account
                </Link>
              </p>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20 border-b border-neutral-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-white mb-4">
                Luxury Lead Management Made Simple
              </h2>
              <p className="text-neutral-400 text-lg">
                Everything you need to convert more luxury real estate leads
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 hover:border-yellow-500/50 transition">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  AI-Powered Automation
                </h3>
                <p className="text-neutral-400">
                  Automatically follow up with leads, qualify prospects, and schedule
                  appointments 24/7.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 hover:border-yellow-500/50 transition">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Real-Time Analytics
                </h3>
                <p className="text-neutral-400">
                  Track conversion rates, lead sources, and agent performance with
                  detailed dashboards.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 hover:border-yellow-500/50 transition">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Enterprise Security
                </h3>
                <p className="text-neutral-400">
                  Bank-level encryption and compliance for luxury client data
                  protection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-display font-bold text-neutral-950 mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-neutral-900 text-lg mb-8">
              Join luxury real estate teams closing more deals with AI-powered lead
              management.
            </p>
            {!user ? (
              <Link
                href="/agent/signup"
                className="inline-block px-8 py-4 bg-neutral-950 text-yellow-400 font-bold text-lg rounded-lg hover:bg-neutral-900 transition"
              >
                Start Your Free Trial
              </Link>
            ) : (
              <Link
                href="/pricing"
                className="inline-block px-8 py-4 bg-neutral-950 text-yellow-400 font-bold text-lg rounded-lg hover:bg-neutral-900 transition"
              >
                View Pricing Plans
              </Link>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
