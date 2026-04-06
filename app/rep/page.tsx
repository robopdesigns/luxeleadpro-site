"use client";

import { useEffect, useState } from "react";

type Rep = { id: string; name: string; email: string; status: string };
type Lead = { id: string; full_name: string | null; email: string | null; phone: string | null; market_area: string | null; challenge: string | null; current_stage: string | null; created_at: string | null };
type Activity = { id: string; type: string; notes: string | null; outcome: string | null; created_at: string; lead_id: string | null };
type Checkin = { id: string; notes: string; calls_made: number; demos_booked: number; deals_closed: number; created_at: string };

export default function RepDashboard() {
  const [rep, setRep] = useState<Rep | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"home" | "leads" | "scripts" | "checkin">("home");
  const [activityForm, setActivityForm] = useState({ type: "call", notes: "", lead_id: "" });
  const [checkinForm, setCheckinForm] = useState({ notes: "", calls_made: 0, demos_booked: 0, deals_closed: 0 });

  async function loadData() {
    const res = await fetch("/api/rep/data");
    if (res.ok) {
      const data = await res.json();
      setRep(data.rep);
      setLeads(data.leads);
      setActivities(data.activities);
      setCheckins(data.checkins);
    } else {
      window.location.href = "/rep/login";
    }
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  async function logActivity() {
    if (!activityForm.notes.trim()) return;
    await fetch("/api/rep/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "log_activity", ...activityForm }),
    });
    setActivityForm({ type: "call", notes: "", lead_id: "" });
    loadData();
  }

  async function submitCheckin() {
    await fetch("/api/rep/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "checkin", ...checkinForm }),
    });
    setCheckinForm({ notes: "", calls_made: 0, demos_booked: 0, deals_closed: 0 });
    loadData();
  }

  async function logout() {
    document.cookie = "rep_auth=; path=/; max-age=0";
    window.location.href = "/rep/login";
  }

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" /></div>;

  const todayActivities = activities.filter(a => new Date(a.created_at).toDateString() === new Date().toDateString());
  const todayCheckin = checkins.find(c => new Date(c.created_at).toDateString() === new Date().toDateString());

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Welcome, {rep?.name}</h1>
            <p className="text-sm text-purple-200">LuxeLeadPro Sales Portal</p>
          </div>
          <button onClick={logout} className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition">Logout</button>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <nav className="flex gap-1">
            {(["home", "leads", "scripts", "checkin"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-sm font-medium border-b-2 transition ${tab === t ? "border-purple-600 text-purple-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                {t === "home" ? "🏠 Home" : t === "leads" ? "👥 My Leads" : t === "scripts" ? "📋 Scripts" : "✅ Check In"}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {tab === "home" && (
          <div className="space-y-6">
            {/* Today's Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "My Leads", value: leads.length, color: "bg-purple-50 text-purple-700" },
                { label: "Activities Today", value: todayActivities.length, color: "bg-blue-50 text-blue-700" },
                { label: "Demos Booked", value: activities.filter(a => a.type === "demo").length, color: "bg-green-50 text-green-700" },
                { label: "Checked In", value: todayCheckin ? "✅" : "❌", color: todayCheckin ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700" },
              ].map((s, i) => (
                <div key={i} className={`rounded-xl p-5 ${s.color}`}>
                  <div className="text-sm font-medium opacity-80">{s.label}</div>
                  <div className="text-3xl font-bold mt-1">{s.value}</div>
                </div>
              ))}
            </div>

            {/* Quick Activity Log */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Log Activity</h2>
              <div className="flex flex-wrap gap-2 mb-3">
                {["call", "email", "demo", "meeting", "follow_up"].map(t => (
                  <button key={t} onClick={() => setActivityForm(p => ({ ...p, type: t }))} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activityForm.type === t ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                    {t === "call" ? "📞 Call" : t === "email" ? "📧 Email" : t === "demo" ? "🎬 Demo" : t === "meeting" ? "🤝 Meeting" : "🔄 Follow-up"}
                  </button>
                ))}
              </div>
              {leads.length > 0 && (
                <select value={activityForm.lead_id} onChange={e => setActivityForm(p => ({ ...p, lead_id: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm mb-3">
                  <option value="">Select a lead (optional)</option>
                  {leads.map(l => <option key={l.id} value={l.id}>{l.full_name || l.email}</option>)}
                </select>
              )}
              <div className="flex gap-2">
                <input placeholder="What did you do?" value={activityForm.notes} onChange={e => setActivityForm(p => ({ ...p, notes: e.target.value }))} onKeyDown={e => e.key === "Enter" && logActivity()} className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm" />
                <button onClick={logActivity} className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700">Log</button>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Your Recent Activity</h2>
              {activities.length === 0 ? (
                <p className="text-gray-400 text-sm">No activities logged yet. Start by making some calls!</p>
              ) : (
                <div className="space-y-2">
                  {activities.slice(0, 10).map(a => (
                    <div key={a.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{a.type === "call" ? "📞" : a.type === "email" ? "📧" : a.type === "demo" ? "🎬" : a.type === "meeting" ? "🤝" : "🔄"}</span>
                        <span className="text-sm text-gray-700">{a.notes || a.type}</span>
                      </div>
                      <span className="text-xs text-gray-400">{new Date(a.created_at).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "leads" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">My Assigned Leads</h2>
            {leads.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <p className="text-gray-400 text-lg">No leads assigned yet</p>
                <p className="text-gray-400 text-sm mt-1">Your manager will assign leads to you soon</p>
              </div>
            ) : (
              <div className="space-y-3">
                {leads.map(l => (
                  <div key={l.id} className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">{l.full_name || "Unknown"}</h3>
                        <p className="text-sm text-gray-500">{l.email} {l.phone && `· ${l.phone}`}</p>
                        {l.market_area && <p className="text-xs text-purple-600 mt-1">{l.market_area}</p>}
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${l.current_stage === "won" ? "bg-green-100 text-green-700" : l.current_stage === "demo" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"}`}>{l.current_stage || "new"}</span>
                    </div>
                    {l.challenge && <p className="text-sm text-gray-600 mt-3 bg-gray-50 rounded-lg p-3">{l.challenge}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "scripts" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Scripts & Talk Tracks</h2>
            {[
              { title: "Opening Pitch", content: "Hi [Name], this is [Your Name] from LuxeLeadPro. We're the only AI platform that both scores AND delivers verified luxury buyer leads directly to agents like you. Our agents wake up every morning knowing exactly who to call. Do you have 2 minutes?" },
              { title: "Value Proposition", content: "We analyze 40+ data signals per lead and score them 0-100. But here's what makes us different — on our Generation plan, we actually DELIVER 15-25 pre-qualified luxury leads to your dashboard every month. We run the ads, qualify the leads, score them, and only send you prospects scoring 60 or above. You just close." },
              { title: "The Territory Play (Best Close)", content: "Here's what our top agents are doing — they're locking in a territory. For $1,499/month, you own your ZIP codes exclusively. Nobody else on LuxeLeadPro gets leads in your area. We deliver 30-50 leads/month, our AI sends the first touch automatically, and you get white-glove everything. One closed deal pays for 6+ months." },
              { title: "Objection: Too Expensive", content: "I hear that. Let me ask — what's one luxury deal worth in commission? $15K? $25K? Our Intelligence plan is $249/month — that's $8/day. If it helps you close just ONE extra deal this year, that's a 50-100x return. And if you want leads delivered, the Generation plan at $749/month typically pays for itself in the first 30 days." },
              { title: "Objection: Already Have a CRM", content: "Great — we're not replacing your CRM. We plug INTO it. Think of us as the intelligence + lead gen layer on top. Your CRM stores contacts. We tell you WHICH contacts to call, WHEN, and deliver fresh qualified leads you've never seen before. It's like adding a full-time analyst AND marketing team for a fraction of the cost." },
              { title: "Objection: I Already Get Leads from Zillow", content: "Right, and so does every other agent in your ZIP code. Zillow sells the same lead to 3-5 agents. With our Territory plan, you're the ONLY agent getting leads in your area. Exclusivity is the whole game in luxury. When's the last time a $2M buyer wanted to feel like one of many?" },
              { title: "Standard Close", content: "Based on what you've shared, I'd recommend starting with Intelligence + Generation at $749/month — you get the AI scoring PLUS 15-25 qualified leads delivered monthly. We handle everything. Can we get you started this week? As a founding agent, you lock in this rate for life." },
            ].map((script, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-2">{script.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{script.content}</p>
              </div>
            ))}

            {/* Training Resources */}
            <h2 className="text-xl font-bold text-gray-900 mt-10">📚 Training Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Pitch Deck", desc: "14-slide presentation for selling LuxeLeadPro", href: "/training/pitch-deck.md", icon: "🎯" },
                { title: "Cold Outreach Templates", desc: "Email, LinkedIn, phone, text templates + follow-up sequence", href: "/training/outreach-templates.md", icon: "📧" },
                { title: "Quick Start Guide", desc: "Your first 4 weeks — what to do and when", href: "/training/quick-start.md", icon: "🚀" },
                { title: "Commission Structure", desc: "How much you earn per customer, per tier", href: "/training/commission-structure.md", icon: "💰" },
                { title: "Competitive Positioning", desc: "Why we beat Zillow, BoldLeads, CINC, and others", href: "/training/competitive-positioning.md", icon: "🏆" },
                { title: "Full Training Guide", desc: "Complete employee training program", href: "/training/training-guide.html", icon: "📖" },
              ].map((res, i) => (
                <a key={i} href={res.href} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-gray-200 p-5 hover:border-purple-300 hover:shadow-md transition flex items-start gap-4">
                  <span className="text-2xl">{res.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{res.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{res.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {tab === "checkin" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Daily Check-In</h2>

            {todayCheckin ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <p className="text-green-700 font-bold text-lg">✅ You already checked in today!</p>
                <div className="flex justify-center gap-6 mt-4">
                  <div><span className="text-2xl font-bold text-green-800">{todayCheckin.calls_made}</span><br/><span className="text-xs text-green-600">Calls</span></div>
                  <div><span className="text-2xl font-bold text-green-800">{todayCheckin.demos_booked}</span><br/><span className="text-xs text-green-600">Demos</span></div>
                  <div><span className="text-2xl font-bold text-green-800">{todayCheckin.deals_closed}</span><br/><span className="text-xs text-green-600">Closes</span></div>
                </div>
                <p className="text-sm text-green-600 mt-3">{todayCheckin.notes}</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <p className="text-gray-600 text-sm mb-4">Log your daily numbers and any notes for your manager.</p>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Calls Made</label>
                    <input type="number" min={0} value={checkinForm.calls_made} onChange={e => setCheckinForm(p => ({ ...p, calls_made: +e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-center text-lg font-bold mt-1" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Demos Booked</label>
                    <input type="number" min={0} value={checkinForm.demos_booked} onChange={e => setCheckinForm(p => ({ ...p, demos_booked: +e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-center text-lg font-bold mt-1" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Deals Closed</label>
                    <input type="number" min={0} value={checkinForm.deals_closed} onChange={e => setCheckinForm(p => ({ ...p, deals_closed: +e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-center text-lg font-bold mt-1" />
                  </div>
                </div>
                <textarea placeholder="Notes for today (wins, blockers, questions)..." value={checkinForm.notes} onChange={e => setCheckinForm(p => ({ ...p, notes: e.target.value }))} rows={3} className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm mb-4" />
                <button onClick={submitCheckin} className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition">Submit Check-In</button>
              </div>
            )}

            {/* Previous Checkins */}
            {checkins.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Previous Check-ins</h3>
                <div className="space-y-3">
                  {checkins.filter(c => c !== todayCheckin).slice(0, 7).map(c => (
                    <div key={c.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">{new Date(c.created_at).toLocaleDateString()}</span>
                        <div className="flex gap-3 text-xs text-gray-500">
                          <span>📞 {c.calls_made}</span><span>🎬 {c.demos_booked}</span><span>🏆 {c.deals_closed}</span>
                        </div>
                      </div>
                      {c.notes && <p className="text-sm text-gray-600">{c.notes}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
