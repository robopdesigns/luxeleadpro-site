"use client";

import { useState } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

type Section = "overview" | "briefing" | "leads" | "outreach" | "analytics" | "settings";

const navItems: { id: Section; icon: string; label: string }[] = [
  { id: "overview", icon: "🏠", label: "Overview" },
  { id: "briefing", icon: "📊", label: "Daily Briefing" },
  { id: "leads", icon: "🎯", label: "My Leads" },
  { id: "outreach", icon: "✉️", label: "Outreach" },
  { id: "analytics", icon: "📈", label: "Analytics" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

const sampleLeads = [
  { name: "Sarah M.", neighborhood: "Lincoln Park", score: 94, status: "Hot", statusColor: "red", value: "$3.2M–$4.5M", lastContact: "Today" },
  { name: "James K.", neighborhood: "Gold Coast", score: 81, status: "Warm", statusColor: "orange", value: "$2.8M–$3.5M", lastContact: "Yesterday" },
  { name: "Diana R.", neighborhood: "River North", score: 73, status: "Nurture", statusColor: "blue", value: "$1.9M–$2.5M", lastContact: "3 days ago" },
  { name: "Marcus T.", neighborhood: "Streeterville", score: 65, status: "New", statusColor: "gray", value: "$2.2M–$3.0M", lastContact: "1 week ago" },
  { name: "Olivia P.", neighborhood: "Wicker Park", score: 58, status: "Cold", statusColor: "slate", value: "$1.5M–$2.0M", lastContact: "2 weeks ago" },
];

const statusColors: Record<string, string> = {
  red: "bg-red-100 text-red-700",
  orange: "bg-orange-100 text-orange-700",
  blue: "bg-blue-100 text-blue-700",
  gray: "bg-gray-100 text-gray-600",
  slate: "bg-slate-100 text-slate-600",
};

function Sidebar({ active, onSelect }: { active: Section; onSelect: (s: Section) => void }) {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0A192F] flex items-center justify-center text-white text-xs font-bold">L</div>
          <span className="font-bold text-gray-900 text-lg">LuxeLeadPro</span>
        </div>
        <p className="text-xs text-gray-500 mt-1 ml-10">Agent Portal</p>
      </div>
      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left
              ${active === item.id
                ? "bg-[#D4AF37]/10 text-[#D4AF37] border-l-4 border-[#D4AF37] pl-2"
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
          <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-white text-xs font-bold">A</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Agent</p>
            <p className="text-xs text-gray-500 truncate">agent@luxeleadpro.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function OverviewSection({ name }: { name: string }) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Good morning, {name}! 👋</h1>
          <p className="text-gray-500 text-sm mt-0.5">{today}</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-green-700 text-sm font-semibold">Your AI briefing is ready</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-500">Hot Leads Today</p>
            <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-lg">🔥</div>
          </div>
          <p className="text-3xl font-bold text-red-600">3</p>
          <p className="text-xs text-gray-400 mt-1">Requires immediate action</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-500">Follow-ups Due</p>
            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-lg">⏰</div>
          </div>
          <p className="text-3xl font-bold text-orange-500">7</p>
          <p className="text-xs text-gray-400 mt-1">Due by end of day</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-500">Demos Booked</p>
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-lg">📅</div>
          </div>
          <p className="text-3xl font-bold text-blue-600">2</p>
          <p className="text-xs text-gray-400 mt-1">This week</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-500">This Month Revenue</p>
            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center text-lg">💰</div>
          </div>
          <p className="text-3xl font-bold text-green-600">$0</p>
          <p className="text-xs text-gray-400 mt-1">Building pipeline...</p>
        </div>
      </div>

      {/* AI Briefing Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="bg-[#0A192F] px-6 py-4 flex items-center justify-between">
          <p className="text-white font-semibold">🤖 Today's Top Opportunity</p>
          <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">AI Powered</span>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-2 flex-wrap">
                <h3 className="text-xl font-bold text-gray-900">Sarah M.</h3>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600 text-sm">Lincoln Park</span>
                <span className="text-gray-400">|</span>
                <span className="text-[#D4AF37] font-bold text-sm">Score: 94/100</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600 text-sm">Budget: $3.2M–$4.5M</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Sarah viewed 12 listings this week. Search radius narrowed from 5 miles to 1 mile — she&apos;s zeroing in. 
                Our AI predicts a <span className="font-semibold text-gray-900">78% close probability</span>. Best outreach window: today before noon.
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">🔥 High Intent</span>
                <span className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold px-3 py-1 rounded-full">💰 $4M+ Buyer</span>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">✅ DNC Clear</span>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-2 bg-[#0A192F] text-white font-semibold rounded-lg hover:opacity-90 transition text-sm shadow-sm">
                  Call Now
                </button>
                <button className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition text-sm">
                  Start Email Sequence
                </button>
              </div>
            </div>
            <div className="bg-[#D4AF37]/10 rounded-xl p-4 border border-[#D4AF37]/10">
              <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-2">AI Insight</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                &ldquo;Sarah viewed 940 N. Michigan Ave twice this week. Her search radius narrowed — she&apos;s closing in on a decision. 
                <strong className="text-gray-900"> Act today.</strong>&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-[#D4AF37]/10">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Close Probability</span>
                  <span className="font-bold text-[#D4AF37]">78%</span>
                </div>
                <div className="w-full bg-[#D4AF37]/10 rounded-full h-2">
                  <div className="bg-[#0A192F] h-2 rounded-full" style={{ width: "78%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead List + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Lead List */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Today&apos;s Lead List</h2>
            <button className="px-4 py-1.5 bg-[#0A192F] text-white text-xs font-semibold rounded-lg hover:opacity-90 transition">
              + Import Leads
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Neighborhood</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Score</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sampleLeads.slice(0, 3).map((lead) => (
                  <tr key={lead.name} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B5952F] flex items-center justify-center text-white text-xs font-bold">
                          {lead.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{lead.name}</p>
                          <p className="text-xs text-gray-400">{lead.value}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{lead.neighborhood}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-100 rounded-full h-1.5">
                          <div className="bg-[#D4AF37] h-1.5 rounded-full" style={{ width: `${lead.score}%` }} />
                        </div>
                        <span className="text-sm font-bold text-gray-900">{lead.score}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[lead.statusColor]}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-xs text-[#D4AF37] font-semibold hover:underline">Contact →</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/dashboard/daily-briefing" className="flex items-center gap-3 w-full px-4 py-3 bg-[#0A192F] text-white font-semibold rounded-lg hover:opacity-90 transition text-sm shadow-sm">
              <span>📊</span> View Full Briefing
            </Link>
            <Link href="/dashboard/outreach" className="flex items-center gap-3 w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition text-sm">
              <span>✉️</span> Start Outreach Campaign
            </Link>
            <button className="flex items-center gap-3 w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition text-sm">
              <span>📤</span> Import Leads (CSV)
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition text-sm">
              <span>📞</span> Log a Call
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition text-sm">
              <span>📅</span> Book Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BriefingSection({ name }: { name: string }) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const topLeads = [
    { name: "Sarah M.", neighborhood: "Lincoln Park", score: 94, budget: "$3.2M–$4.5M", timeline: "ASAP", action: "Call today — 78% close probability", tags: ["🔥 High Intent", "💰 $4M+ Buyer", "✅ DNC Clear"] },
    { name: "James K.", neighborhood: "Gold Coast", score: 81, budget: "$2.8M–$3.5M", timeline: "30 days", action: "Send market report and schedule showing", tags: ["📈 Active Searcher", "🏡 Upsizer"] },
    { name: "Diana R.", neighborhood: "River North", score: 73, budget: "$1.9M–$2.5M", timeline: "60 days", action: "Add to luxury nurture email sequence", tags: ["🌱 Nurture", "📊 Watching Market"] },
  ];

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📊 Daily AI Briefing</h1>
          <p className="text-gray-500 text-sm mt-0.5">{today} · Good morning, {name}!</p>
        </div>
        <div className="flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-4 py-2 rounded-full">
          <span className="text-[#D4AF37] text-sm font-semibold">🤖 AI Generated</span>
        </div>
      </div>

      {/* Top 3 Leads */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">🔥 Your Top 3 Leads Today</h2>
        <div className="space-y-4">
          {topLeads.map((lead, i) => (
            <div key={lead.name} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="w-7 h-7 rounded-full bg-[#D4AF37] flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    <h3 className="font-bold text-gray-900">{lead.name}</h3>
                    <span className="text-gray-400 text-sm">{lead.neighborhood}</span>
                    <span className="text-gray-400 text-sm">·</span>
                    <span className="text-gray-500 text-sm">{lead.budget}</span>
                    <span className="text-gray-400 text-sm">·</span>
                    <span className="text-gray-500 text-sm">{lead.timeline}</span>
                  </div>
                  <p className="text-[#D4AF37] font-semibold text-sm mb-2">→ {lead.action}</p>
                  <div className="flex flex-wrap gap-2">
                    {lead.tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 text-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B5952F]-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{lead.score}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">AI Score</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Intelligence */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">📊 Market Intelligence</h2>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
          <h3 className="font-bold text-blue-900 mb-1">Luxury Market Strong in Lincoln Park & Gold Coast</h3>
          <p className="text-blue-700 text-sm">Average prices up 8.5% YoY. Only 24 active listings (low inventory). 38 days avg on market.</p>
        </div>
        <p className="text-gray-600 text-sm">💡 <strong>Opportunity:</strong> 2 new luxury properties listed today that match your buyer profiles. Act fast — inventory is tight.</p>
      </div>

      {/* Coaching Tip */}
      <div className="bg-gradient-to-r from-[#D4AF37]/5 to-[#D4AF37]/10 border border-[#D4AF37]/10 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">💡 Daily Coaching Tip</h2>
        <p className="text-gray-700">Focus on active leads with ASAP timelines — they convert 3× faster than exploratory leads. One call to Sarah M. today could close a $4M+ deal this month.</p>
      </div>

      {/* Progress Tracker */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">📈 Today&apos;s Progress</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-600">Lead follow-ups completed</span>
              <span className="font-bold text-[#D4AF37]">0 / 7</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div className="bg-[#0A192F] h-2.5 rounded-full" style={{ width: "0%" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-600">Calls made today</span>
              <span className="font-bold text-[#D4AF37]">0 / 5</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div className="bg-[#0A192F] h-2.5 rounded-full" style={{ width: "0%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadsSection() {
  const [search, setSearch] = useState("");
  const filtered = sampleLeads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.neighborhood.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">🎯 My Leads</h1>
        <button className="px-4 py-2 bg-[#0A192F] text-white font-semibold rounded-lg hover:opacity-90 transition text-sm shadow-sm">
          + Import Leads
        </button>
      </div>
      {/* Search / Filter */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
        />
        <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white focus:outline-none">
          <option>All Statuses</option>
          <option>Hot</option>
          <option>Warm</option>
          <option>Nurture</option>
          <option>Cold</option>
        </select>
        <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white focus:outline-none">
          <option>All Neighborhoods</option>
          <option>Lincoln Park</option>
          <option>Gold Coast</option>
          <option>River North</option>
        </select>
      </div>
      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Score</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Neighborhood</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Contact</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((lead) => (
              <tr key={lead.name} className="hover:bg-gray-50 transition">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B5952F] flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {lead.name[0]}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{lead.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-14 bg-gray-100 rounded-full h-1.5">
                      <div className="bg-[#D4AF37] h-1.5 rounded-full" style={{ width: `${lead.score}%` }} />
                    </div>
                    <span className="text-sm font-bold text-gray-900">{lead.score}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-gray-600">{lead.neighborhood}</td>
                <td className="px-5 py-3 text-sm text-gray-600">{lead.value}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[lead.statusColor]}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-gray-500">{lead.lastContact}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button className="text-xs text-white bg-[#D4AF37] px-2.5 py-1 rounded-lg hover:bg-[#B5952F] transition font-medium">Call</button>
                    <button className="text-xs text-gray-600 border border-gray-200 px-2.5 py-1 rounded-lg hover:bg-gray-50 transition font-medium">Email</button>
                    <button className="text-xs text-gray-600 border border-gray-200 px-2.5 py-1 rounded-lg hover:bg-gray-50 transition font-medium">View</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center">
                  <p className="text-gray-400 text-sm">No leads found. Try a different search.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
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

function AgentDashboardContent() {
  const { profile } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const name = profile?.first_name || "Agent";

  const renderSection = () => {
    switch (activeSection) {
      case "overview": return <OverviewSection name={name} />;
      case "briefing": return <BriefingSection name={name} />;
      case "leads": return <LeadsSection />;
      case "outreach": return <PlaceholderSection title="Outreach Campaigns" icon="✉️" />;
      case "analytics": return <PlaceholderSection title="Analytics" icon="📈" />;
      case "settings": return <PlaceholderSection title="Settings" icon="⚙️" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar active={activeSection} onSelect={setActiveSection} />
      <main className="flex-1 overflow-auto">
        {renderSection()}
      </main>
    </div>
  );
}

export default function AgentDashboardPage() {
  return (
    <ProtectedRoute requiredRole="agent">
      <AgentDashboardContent />
    </ProtectedRoute>
  );
}
