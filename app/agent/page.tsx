"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

function AgentDashboardContent() {
  const { profile } = useAuth();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-display font-semibold text-gray-900 mb-2">
              Good morning, {profile?.first_name}! 👋
            </h1>
            <p className="text-gray-500 text-lg">
              Here&apos;s your AI briefing for today.
            </p>
            <p className="text-gray-500 text-sm mt-1">
              {profile?.office_name} • Agent Dashboard
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="text-gray-500 text-sm font-medium mb-2">
                Total Leads
              </div>
              <div className="text-3xl font-bold text-gray-900">0</div>
              <div className="text-xs text-gray-500 mt-2">This month</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="text-gray-500 text-sm font-medium mb-2">
                Follow-ups Due
              </div>
              <div className="text-3xl font-bold text-purple-600">0</div>
              <div className="text-xs text-gray-500 mt-2">Urgent action</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="text-gray-500 text-sm font-medium mb-2">
                Appointments
              </div>
              <div className="text-3xl font-bold text-gray-900">0</div>
              <div className="text-xs text-gray-500 mt-2">Scheduled</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="text-gray-500 text-sm font-medium mb-2">
                Conversion Rate
              </div>
              <div className="text-3xl font-bold text-gray-900">0%</div>
              <div className="text-xs text-gray-500 mt-2">This quarter</div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Leads */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Recent Leads
              </h2>
              <div className="text-center py-12">
                <p className="text-gray-500">No leads yet</p>
                <p className="text-gray-500 text-sm mt-2">
                  Your leads will appear here as they come in
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:opacity-90 transition shadow-sm">
                  Add Lead Manually
                </button>
                <Link
                  href="/dashboard/outreach"
                  className="block w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold rounded-lg hover:opacity-90 transition shadow-sm text-center"
                >
                  ✉️ Automated Outreach
                </Link>
                <button className="w-full px-4 py-3 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition bg-white">
                  View Settings
                </button>
                <button className="w-full px-4 py-3 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition bg-white">
                  Browse Training
                </button>
              </div>
            </div>
          </div>

          {/* Daily AI Briefing Preview */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              📊 Daily AI Briefing Preview
            </h2>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              {/* Card header with gradient */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                <p className="text-white font-semibold text-sm uppercase tracking-wide">
                  🔥 Today&apos;s Top Opportunity
                </p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Sarah M. — Gold Coast, Chicago
                    </h3>
                    <p className="text-purple-600 font-semibold text-sm mb-3">
                      AI Lead Score: 94 / 100 &nbsp;•&nbsp; Budget: $3.5M–$4.2M
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      Sarah has been browsing 8 listings in the past 24 hours, two price-range
                      increases in the last week, and just inquired about a private showing. Our AI
                      predicts a <strong className="text-gray-900">78% close probability</strong> — this is your highest-priority lead today.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">🔥 High Intent</span>
                      <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">💰 $4M+ Buyer</span>
                      <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">✅ DNC Clear</span>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:opacity-90 transition text-sm shadow-sm">
                        Call Now
                      </button>
                      <button className="px-5 py-2 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition bg-white text-sm">
                        View Profile
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-3">AI Insight</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      &ldquo;Sarah has viewed 940 N. Michigan Ave twice this week. Her search radius narrowed
                      from 5 miles to 1 mile — she&apos;s zeroing in. Best outreach window: <strong className="text-gray-900">today before 12pm</strong>.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Callout */}
          <div className="mt-8 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-display font-semibold text-gray-900 mb-3">
              AI-Powered Lead Management
            </h3>
            <p className="text-gray-600 mb-4">
              Our AI assistant automatically follows up with your leads, qualifies them,
              and schedules appointments — all while you focus on closing deals.
            </p>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:opacity-90 transition shadow-sm">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function AgentDashboardPage() {
  return (
    <ProtectedRoute requiredRole="agent">
      <AgentDashboardContent />
    </ProtectedRoute>
  );
}
