"use client";

import { useState } from "react";
import Link from "next/link";

const demoLeads = [
  { name: "Victoria Chen", email: "v.chen@luxury.com", phone: "(310) 555-8291", market: "Beverly Hills, CA", score: 94, stage: "demo", timeline: "ASAP", gci: "$85K/mo" },
  { name: "Marcus Williams", email: "marcus.w@realty.com", phone: "(212) 555-0147", market: "Manhattan, NY", score: 88, stage: "contacted", timeline: "30 days", gci: "$120K/mo" },
  { name: "Sarah Goldstein", email: "sarah.g@premier.com", phone: "(305) 555-3821", market: "Miami Beach, FL", score: 82, stage: "new", timeline: "ASAP", gci: "$65K/mo" },
  { name: "James Thornton III", email: "james.t@estates.com", phone: "(415) 555-9012", market: "Pacific Heights, SF", score: 76, stage: "proposal", timeline: "60 days", gci: "$95K/mo" },
  { name: "Alexandra Petrov", email: "a.petrov@luxhomes.com", phone: "(312) 555-6743", market: "Gold Coast, Chicago", score: 71, stage: "new", timeline: "30 days", gci: "$55K/mo" },
  { name: "David Park", email: "david.p@realestate.com", phone: "(702) 555-1234", market: "Las Vegas, NV", score: 65, stage: "contacted", timeline: "60 days", gci: "$45K/mo" },
  { name: "Isabella Romano", email: "i.romano@homes.com", phone: "(858) 555-8765", market: "La Jolla, CA", score: 58, stage: "new", timeline: "90+ days", gci: "$70K/mo" },
  { name: "Robert Kim", email: "r.kim@luxury.com", phone: "(404) 555-2345", market: "Buckhead, Atlanta", score: 45, stage: "new", timeline: "90+ days", gci: "$35K/mo" },
];

const demoActivities = [
  { time: "8:42 AM", type: "", action: "Called Victoria Chen — interested in Territory plan, scheduling demo", score: "+3" },
  { time: "9:15 AM", type: "", action: "Sent proposal to Marcus Williams — $749/mo Generation plan", score: "" },
  { time: "10:30 AM", type: "", action: "Demo completed with Sarah Goldstein — very impressed with AI scoring", score: "+5" },
  { time: "11:00 AM", type: "", action: "Follow-up call with James Thornton — comparing us to Zillow Premier", score: "" },
  { time: "1:45 PM", type: "", action: "Cold outreach to 12 luxury agents in Pacific Heights market", score: "" },
  { time: "3:00 PM", type: "", action: "Meeting with Alexandra Petrov — closing on Intelligence plan", score: "+2" },
];

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? "bg-red-100 text-red-700" : score >= 60 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600";
  const label = score >= 80 ? "Hot" : score >= 60 ? "Warm" : "Nurture";
  return <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${color}`}>{label} ({score})</span>;
}

export default function DemoPage() {
  const [tab, setTab] = useState<"dashboard" | "leads" | "briefing">("dashboard");

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Header */}
      <header className="bg-[#0A192F] text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center font-bold text-lg">L</div>
              <h1 className="text-xl font-bold">LuxeLeadPro</h1>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">DEMO MODE</span>
            </div>
            <p className="text-sm text-[#D4AF37]/40 mt-0.5 ml-12">Agent Dashboard — Victoria Chen Properties</p>
          </div>
          <Link href="/pricing" className="px-4 py-2 bg-white text-[#D4AF37] font-semibold rounded-lg text-sm hover:bg-[#FDFBF7] transition">
            Get Started →
          </Link>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 flex gap-1">
          {(["dashboard", "leads", "briefing"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-sm font-medium border-b-2 transition ${tab === t ? "border-[#D4AF37] text-[#D4AF37]" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              {t === "dashboard" ? " Dashboard" : t === "leads" ? " Lead Pipeline" : " Morning Briefing"}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {tab === "dashboard" && (
          <div className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: "Total Leads", value: "47", sub: "+8 this week", color: "text-[#D4AF37] bg-[#D4AF37]/10" },
                { label: "Hot Leads (80+)", value: "12", sub: "Ready to close", color: "text-red-700 bg-red-50" },
                { label: "Warm Leads (60+)", value: "18", sub: "Follow up today", color: "text-amber-700 bg-amber-50" },
                { label: "Demos This Week", value: "6", sub: "3 scheduled", color: "text-blue-700 bg-blue-50" },
                { label: "AI Score Avg", value: "72", sub: "Above average", color: "text-green-700 bg-green-50" },
              ].map((s, i) => (
                <div key={i} className={`rounded-xl p-5 ${s.color}`}>
                  <div className="text-sm font-medium opacity-80">{s.label}</div>
                  <div className="text-3xl font-bold mt-1">{s.value}</div>
                  <div className="text-xs opacity-60 mt-1">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Today's Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4"> Today&apos;s Activity</h2>
              <div className="space-y-3">
                {demoActivities.map((a, i) => (
                  <div key={i} className="flex items-center gap-4 py-2 border-b border-gray-100 last:border-0">
                    <span className="text-xs text-gray-400 w-16 shrink-0">{a.time}</span>
                    <span className="text-lg">{a.type}</span>
                    <span className="text-sm text-gray-700 flex-1">{a.action}</span>
                    {a.score && <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{a.score}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Top Leads Quick View */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">🔥 Top Prospects Right Now</h2>
              <div className="space-y-3">
                {demoLeads.slice(0, 5).map((lead, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <span className="font-semibold text-gray-900 text-sm">{lead.name}</span>
                      <span className="text-xs text-gray-500 ml-2">{lead.market}</span>
                    </div>
                    <ScoreBadge score={lead.score} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "leads" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Lead Pipeline</h2>
              <div className="text-sm text-gray-500">Showing {demoLeads.length} leads</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#FDFBF7] border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Market</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Timeline</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">GCI</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Stage</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">AI Score</th>
                  </tr>
                </thead>
                <tbody>
                  {demoLeads.map((lead, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-[#FDFBF7]">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-gray-900">{lead.name}</div>
                        <div className="text-xs text-gray-500">{lead.email}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{lead.market}</td>
                      <td className="px-4 py-3 text-gray-600">{lead.timeline}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">{lead.gci}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          lead.stage === "demo" ? "bg-[#D4AF37]/10 text-[#D4AF37]" :
                          lead.stage === "proposal" ? "bg-blue-100 text-blue-700" :
                          lead.stage === "contacted" ? "bg-amber-100 text-amber-700" :
                          "bg-gray-100 text-gray-600"
                        }`}>{lead.stage}</span>
                      </td>
                      <td className="px-4 py-3"><ScoreBadge score={lead.score} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "briefing" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900"> Your 6AM Morning Briefing</h2>
              <p className="text-gray-500 text-sm mt-1">Delivered to your inbox every morning</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <div className="text-center mb-6">
                <div className="inline-block w-12 h-12 rounded-xl bg-[#0A192F] mb-3">
                  <span className="text-white text-xl font-bold leading-[48px]">L</span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Good Morning, Victoria! ☀️</h3>
                <p className="text-gray-500 text-sm">Here&apos;s your lead intelligence for today</p>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                  { n: "47", l: "Total", c: "bg-[#D4AF37]/10 text-[#D4AF37]" },
                  { n: "12", l: "Hot", c: "bg-red-50 text-red-700" },
                  { n: "18", l: "Warm", c: "bg-amber-50 text-amber-700" },
                  { n: "3", l: "New Today", c: "bg-green-50 text-green-700" },
                ].map((s, i) => (
                  <div key={i} className={`rounded-lg p-3 text-center ${s.c}`}>
                    <div className="text-xl font-bold">{s.n}</div>
                    <div className="text-xs">{s.l}</div>
                  </div>
                ))}
              </div>

              <h4 className="font-bold text-gray-900 mb-3">🔥 Call These First</h4>
              {demoLeads.slice(0, 3).map((lead, i) => (
                <div key={i} className={`rounded-lg p-4 mb-2 border-l-4 ${lead.score >= 80 ? "bg-red-50/50 border-red-500" : "bg-amber-50/50 border-amber-500"}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <strong className="text-gray-900">{lead.name}</strong>
                      <div className="text-xs text-gray-500">{lead.email} · {lead.phone}</div>
                      <div className="text-xs text-[#D4AF37] mt-1">{lead.market}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full font-bold text-sm ${lead.score >= 80 ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                      {lead.score}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/pricing" className="inline-block px-8 py-3 bg-[#0A192F] text-white font-bold rounded-xl hover:opacity-90 transition shadow-lg">
                Get This For Your Business →
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Demo Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-3 px-6 text-center text-sm z-50">
        <span className="opacity-70">This is a demo of the LuxeLeadPro agent dashboard.</span>
        <Link href="/pricing" className="ml-3 font-semibold text-[#D4AF37]/80 hover:text-[#D4AF37]/60">Start your free trial →</Link>
      </div>
    </div>
  );
}
