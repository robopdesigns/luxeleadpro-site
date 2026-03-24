"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

type ManagerSection = "overview" | "agents" | "revenue" | "pipeline" | "tasks" | "settings";

const navItems: { id: ManagerSection; icon: string; label: string }[] = [
  { id: "overview", icon: "📊", label: "Overview" },
  { id: "agents", icon: "👥", label: "Agent Performance" },
  { id: "revenue", icon: "💰", label: "Revenue & Commissions" },
  { id: "pipeline", icon: "🎯", label: "Sales Pipeline" },
  { id: "tasks", icon: "📋", label: "Team Tasks" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

const commissionTiers = [
  { plan: "Per Agent", price: "$199/mo", repEarns: "$50/mo", color: "purple" },
  { plan: "Agent + Outreach", price: "$299/mo", repEarns: "$75/mo", color: "blue" },
  { plan: "Team", price: "$799/mo", repEarns: "$150/mo", color: "orange" },
  { plan: "Team + Outreach", price: "$999/mo", repEarns: "$200/mo", color: "pink" },
];

const activityFeed = [
  { time: "Just now", icon: "🚀", event: "System launched", detail: "LuxeLeadPro is live!" },
  { time: "Today", icon: "🌐", event: "Website went live", detail: "luxeleadpro.com is online" },
  { time: "Pending", icon: "📢", event: "First sales rep posting", detail: "LinkedIn & Indeed — pending" },
  { time: "Soon", icon: "🤝", event: "First agent onboarded", detail: "Waiting for first signup" },
  { time: "Soon", icon: "💰", event: "First MRR", detail: "First customer pending" },
];

function ManagerSidebar({ active, onSelect, name }: { active: ManagerSection; onSelect: (s: ManagerSection) => void; name: string }) {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-xs font-bold">L</div>
          <span className="font-bold text-gray-900 text-lg">LuxeLeadPro</span>
        </div>
        <p className="text-xs text-gray-500 mt-1 ml-10">Manager Portal</p>
      </div>
      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left
              ${active === item.id
                ? "bg-purple-50 text-purple-700 border-l-4 border-purple-600 pl-2"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      {/* Bottom */}
      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-xs font-bold">
            {name[0] || "M"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
            <p className="text-xs text-purple-600 truncate font-medium">Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function OverviewSection({ name }: { name: string }) {
  const mrrGoal = 10000;
  const currentMrr = 0;
  const progress = (currentMrr / mrrGoal) * 100;

  return (
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {name}! ⚡</h1>
        <p className="text-gray-500 text-sm mt-0.5">LuxeLeadPro Command Center</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total MRR</p>
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">💜</div>
          </div>
          <p className="text-2xl font-bold text-purple-600">$0</p>
          <p className="text-xs text-gray-400 mt-1">Target: $10,000/mo</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Customers</p>
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">🏆</div>
          </div>
          <p className="text-2xl font-bold text-green-600">0</p>
          <p className="text-xs text-gray-400 mt-1">Target: 50 active</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Active Agents</p>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">👥</div>
          </div>
          <p className="text-2xl font-bold text-blue-600">0</p>
          <p className="text-xs text-gray-400 mt-1">Hiring now</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Avg AI Score</p>
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">🤖</div>
          </div>
          <p className="text-2xl font-bold text-orange-500">—</p>
          <p className="text-xs text-gray-400 mt-1">No data yet</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Deals Closed</p>
            <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center">🎯</div>
          </div>
          <p className="text-2xl font-bold text-pink-600">0</p>
          <p className="text-xs text-gray-400 mt-1">This month</p>
        </div>
      </div>

      {/* Revenue Progress */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-900">Revenue Progress</h2>
          <span className="text-sm text-gray-500">0% to $10k MRR goal</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-4 mb-2">
          <div
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span className="font-semibold text-purple-600">$0 MRR</span>
          <span>Goal: $10,000 MRR</span>
        </div>
      </div>

      {/* Leaderboard + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Agent Leaderboard */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">👥 Agent Leaderboard</h2>
            <button className="text-xs text-purple-600 font-semibold hover:underline">View All</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Agent</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Leads</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Deals</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Conv %</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Commission</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">R</div>
                    <span className="text-sm font-semibold text-gray-900">Rob Podgorski</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-medium">Owner</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">0</td>
                <td className="px-4 py-3 text-sm text-gray-600">0</td>
                <td className="px-4 py-3 text-sm text-gray-600">—</td>
                <td className="px-4 py-3 text-sm text-gray-600">$0</td>
              </tr>
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center">
                  <p className="text-gray-400 text-sm">No other agents yet</p>
                  <button className="mt-2 text-xs text-purple-600 font-semibold hover:underline">+ Invite an agent</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Activity Feed */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">⚡ Recent Activity</h2>
          <div className="space-y-4">
            {activityFeed.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-sm shrink-0">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{item.event}</p>
                  <p className="text-xs text-gray-500">{item.detail}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
        <h2 className="font-bold text-gray-900 mb-4">⚡ Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:opacity-90 transition text-sm shadow-sm justify-center">
            ➕ Add Agent
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition text-sm justify-center">
            📧 Send Team Briefing
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition text-sm justify-center">
            💰 Process Commissions
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition text-sm justify-center">
            📊 Generate Report
          </button>
        </div>
      </div>

      {/* Commission Summary */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">💰 Commission Structure</h2>
          <p className="text-sm text-gray-500 mt-0.5">What reps earn per customer per month</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
          {commissionTiers.map((tier) => {
            const colorMap: Record<string, { bg: string; text: string; badge: string }> = {
              purple: { bg: "bg-purple-50", text: "text-purple-700", badge: "bg-purple-100 text-purple-700" },
              blue: { bg: "bg-blue-50", text: "text-blue-700", badge: "bg-blue-100 text-blue-700" },
              orange: { bg: "bg-orange-50", text: "text-orange-600", badge: "bg-orange-100 text-orange-700" },
              pink: { bg: "bg-pink-50", text: "text-pink-700", badge: "bg-pink-100 text-pink-700" },
            };
            const c = colorMap[tier.color];
            return (
              <div key={tier.plan} className="p-6">
                <p className="text-sm font-semibold text-gray-900 mb-1">{tier.plan}</p>
                <p className="text-lg font-bold text-gray-700 mb-2">{tier.price}</p>
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${c.badge}`}>
                  💰 Rep earns {tier.repEarns}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RevenueSection() {
  return (
    <div className="p-8 max-w-7xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">💰 Revenue & Commissions</h1>
      {/* MRR Chart Placeholder */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm mb-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-50 flex items-center justify-center text-3xl">📊</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">MRR Chart</h3>
        <p className="text-gray-500 text-sm mb-4">Connect Stripe to see live revenue data</p>
        <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:opacity-90 transition text-sm shadow-sm">
          Connect Stripe →
        </button>
      </div>
      {/* Customer Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Active Customers</h2>
        </div>
        <div className="py-16 text-center">
          <p className="text-4xl mb-3">🏆</p>
          <h3 className="font-semibold text-gray-900 mb-1">No customers yet</h3>
          <p className="text-gray-500 text-sm">Your paying customers will appear here once they sign up.</p>
          <button className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:opacity-90 transition text-sm shadow-sm">
            Share Pricing Page →
          </button>
        </div>
      </div>
      {/* Commission History */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Commission Payment History</h2>
        </div>
        <div className="py-12 text-center">
          <p className="text-gray-400 text-sm">No commission payments yet. Start selling!</p>
        </div>
      </div>
    </div>
  );
}

function AgentsSection() {
  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">👥 Agent Performance</h1>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:opacity-90 transition text-sm shadow-sm">
          + Invite Agent
        </button>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-16 shadow-sm text-center">
        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-purple-50 flex items-center justify-center text-4xl">👥</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">No agents yet</h3>
        <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
          Invite your first sales agent to get started. They&apos;ll get access to the agent portal and AI-powered lead tools.
        </p>
        <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:opacity-90 transition shadow-sm">
          Invite Your First Agent →
        </button>
      </div>
    </div>
  );
}

function PlaceholderSection({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{icon} {title}</h1>
      <div className="bg-white border border-gray-200 rounded-xl p-16 shadow-sm text-center">
        <p className="text-5xl mb-4">{icon}</p>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title} coming soon</h3>
        <p className="text-gray-500 text-sm">This section is being built. Check back soon!</p>
      </div>
    </div>
  );
}

function ManagerPortalContent() {
  const { profile } = useAuth();
  const [activeSection, setActiveSection] = useState<ManagerSection>("overview");
  const name = profile?.first_name || "Manager";

  const renderSection = () => {
    switch (activeSection) {
      case "overview": return <OverviewSection name={name} />;
      case "agents": return <AgentsSection />;
      case "revenue": return <RevenueSection />;
      case "pipeline": return <PlaceholderSection title="Sales Pipeline" icon="🎯" />;
      case "tasks": return <PlaceholderSection title="Team Tasks" icon="📋" />;
      case "settings": return <PlaceholderSection title="Settings" icon="⚙️" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ManagerSidebar active={activeSection} onSelect={setActiveSection} name={name} />
      <main className="flex-1 overflow-auto">
        {renderSection()}
      </main>
    </div>
  );
}

export default function ManagerPortalPage() {
  return (
    <ProtectedRoute requiredRole="manager">
      <ManagerPortalContent />
    </ProtectedRoute>
  );
}
