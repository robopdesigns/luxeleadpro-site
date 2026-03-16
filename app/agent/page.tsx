"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

function AgentDashboardContent() {
  const { profile } = useAuth();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-neutral-950 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-display font-semibold text-white mb-2">
              Welcome, {profile?.first_name}!
            </h1>
            <p className="text-neutral-400">
              {profile?.office_name} • Agent Dashboard
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <div className="text-neutral-400 text-sm font-medium mb-2">
                Total Leads
              </div>
              <div className="text-3xl font-bold text-white">0</div>
              <div className="text-xs text-neutral-500 mt-2">This month</div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <div className="text-neutral-400 text-sm font-medium mb-2">
                Follow-ups Due
              </div>
              <div className="text-3xl font-bold text-yellow-500">0</div>
              <div className="text-xs text-neutral-500 mt-2">Urgent action</div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <div className="text-neutral-400 text-sm font-medium mb-2">
                Appointments
              </div>
              <div className="text-3xl font-bold text-white">0</div>
              <div className="text-xs text-neutral-500 mt-2">Scheduled</div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <div className="text-neutral-400 text-sm font-medium mb-2">
                Conversion Rate
              </div>
              <div className="text-3xl font-bold text-white">0%</div>
              <div className="text-xs text-neutral-500 mt-2">This quarter</div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Leads */}
            <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">
                Recent Leads
              </h2>
              <div className="text-center py-12">
                <p className="text-neutral-400">No leads yet</p>
                <p className="text-neutral-500 text-sm mt-2">
                  Your leads will appear here as they come in
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-yellow-500 text-neutral-950 font-semibold rounded-lg hover:bg-yellow-400 transition">
                  Add Lead Manually
                </button>
                <button className="w-full px-4 py-3 border border-neutral-700 text-white font-semibold rounded-lg hover:bg-neutral-800 transition">
                  View Settings
                </button>
                <button className="w-full px-4 py-3 border border-neutral-700 text-white font-semibold rounded-lg hover:bg-neutral-800 transition">
                  Browse Training
                </button>
              </div>
            </div>
          </div>

          {/* Feature Callout */}
          <div className="mt-12 bg-gradient-to-r from-neutral-900 to-neutral-800 border border-neutral-700 rounded-lg p-8">
            <h3 className="text-2xl font-display font-semibold text-white mb-3">
              AI-Powered Lead Management
            </h3>
            <p className="text-neutral-300 mb-4">
              Our AI assistant automatically follows up with your leads, qualifies them,
              and schedules appointments — all while you focus on closing deals.
            </p>
            <button className="px-6 py-2 bg-yellow-500 text-neutral-950 font-semibold rounded-lg hover:bg-yellow-400 transition">
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
