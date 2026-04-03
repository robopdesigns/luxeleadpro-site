"use client";

import { useEffect, useState } from "react";

type Lead = { id: string; full_name: string | null; email: string | null; phone: string | null; market_area: string | null; challenge: string | null; current_stage: string | null; assigned_rep_id: string | null; created_at: string | null };
type Rep = { id: string; name: string; email: string; status: string; phone: string | null; created_at: string };
type Activity = { id: string; rep_id: string; lead_id: string | null; type: string; notes: string | null; outcome: string | null; created_at: string };
type Task = { id: string; title: string; description: string | null; priority: string; status: string; due_date: string | null; created_at: string };
type Checkin = { id: string; rep_id: string; notes: string; calls_made: number; demos_booked: number; deals_closed: number; created_at: string };

type DashData = { leads: Lead[]; reps: Rep[]; activities: Activity[]; tasks: Task[]; commissions: unknown[]; checkins: Checkin[] };

export default function OwnerDashboardClient() {
  const [data, setData] = useState<DashData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"overview" | "pipeline" | "reps" | "tasks">("overview");
  const [newTask, setNewTask] = useState("");
  const [showAddRep, setShowAddRep] = useState(false);
  const [repForm, setRepForm] = useState({ name: "", email: "", password: "", phone: "" });

  async function loadData() {
    const res = await fetch("/api/owner/stats");
    if (res.ok) setData(await res.json());
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  async function addTask() {
    if (!newTask.trim()) return;
    await fetch("/api/owner/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask }),
    });
    setNewTask("");
    loadData();
  }

  async function toggleTask(id: string, current: string) {
    await fetch("/api/owner/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: current === "done" ? "todo" : "done" }),
    });
    loadData();
  }

  async function addRep() {
    if (!repForm.name || !repForm.email || !repForm.password) return;
    await fetch("/api/reps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(repForm),
    });
    setRepForm({ name: "", email: "", password: "", phone: "" });
    setShowAddRep(false);
    loadData();
  }

  async function logout() {
    await fetch("/api/dashboard-logout", { method: "POST" });
    window.location.href = "/dashboard/login";
  }

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" /></div>;

  const leads = data?.leads || [];
  const reps = data?.reps || [];
  const activities = data?.activities || [];
  const tasks = data?.tasks || [];
  const checkins = data?.checkins || [];

  const stages = ["new", "contacted", "demo", "proposal", "won", "lost"];
  const stageCounts = stages.map(s => ({ stage: s, count: leads.filter(l => (l.current_stage || "new") === s).length }));

  const todayActivities = activities.filter(a => new Date(a.created_at).toDateString() === new Date().toDateString());

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">LuxeLeadPro Command Center</h1>
            <p className="text-sm text-gray-500">Owner Dashboard</p>
          </div>
          <button onClick={logout} className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition">Logout</button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-1">
            {(["overview", "pipeline", "reps", "tasks"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-sm font-medium border-b-2 transition ${tab === t ? "border-purple-600 text-purple-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                {t === "overview" ? "📊 Overview" : t === "pipeline" ? "🔄 Pipeline" : t === "reps" ? "👥 Sales Reps" : "✅ Tasks"}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {tab === "overview" && (
          <div className="space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Leads", value: leads.length, color: "bg-purple-50 text-purple-700" },
                { label: "Active Reps", value: reps.filter(r => r.status === "active").length, color: "bg-blue-50 text-blue-700" },
                { label: "Today's Activities", value: todayActivities.length, color: "bg-green-50 text-green-700" },
                { label: "Deals Won", value: leads.filter(l => l.current_stage === "won").length, color: "bg-amber-50 text-amber-700" },
              ].map((s, i) => (
                <div key={i} className={`rounded-xl p-5 ${s.color}`}>
                  <div className="text-sm font-medium opacity-80">{s.label}</div>
                  <div className="text-3xl font-bold mt-1">{s.value}</div>
                </div>
              ))}
            </div>

            {/* Pipeline Mini */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Pipeline Snapshot</h2>
              <div className="flex gap-2 flex-wrap">
                {stageCounts.map(s => (
                  <div key={s.stage} className="flex-1 min-w-[100px] bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-500 uppercase tracking-wider">{s.stage}</div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">{s.count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Recent Rep Activity</h2>
              {activities.length === 0 ? (
                <p className="text-gray-400 text-sm">No activities yet. Activities will show up once reps start logging calls and demos.</p>
              ) : (
                <div className="space-y-2">
                  {activities.slice(0, 10).map(a => {
                    const rep = reps.find(r => r.id === a.rep_id);
                    return (
                      <div key={a.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{a.type === "call" ? "📞" : a.type === "email" ? "📧" : a.type === "demo" ? "🎬" : "📝"}</span>
                          <div>
                            <span className="font-medium text-gray-900">{rep?.name || "Unknown"}</span>
                            <span className="text-gray-500 text-sm ml-2">{a.type} {a.notes ? `— ${a.notes}` : ""}</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{new Date(a.created_at).toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Recent Checkins */}
            {checkins.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-bold text-gray-900 mb-4">Rep Check-ins</h2>
                <div className="space-y-3">
                  {checkins.slice(0, 5).map(c => {
                    const rep = reps.find(r => r.id === c.rep_id);
                    return (
                      <div key={c.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{rep?.name || "Unknown"}</span>
                          <span className="text-xs text-gray-400">{new Date(c.created_at).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-600">{c.notes}</p>
                        <div className="flex gap-4 mt-2 text-xs text-gray-500">
                          <span>📞 {c.calls_made} calls</span>
                          <span>🎬 {c.demos_booked} demos</span>
                          <span>🏆 {c.deals_closed} closes</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "pipeline" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Lead Pipeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {stages.map(stage => {
                const stageLeads = leads.filter(l => (l.current_stage || "new") === stage);
                return (
                  <div key={stage} className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold uppercase text-gray-500">{stage}</h3>
                      <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{stageLeads.length}</span>
                    </div>
                    <div className="space-y-2">
                      {stageLeads.slice(0, 5).map(l => (
                        <div key={l.id} className="bg-gray-50 rounded-lg p-2 text-xs">
                          <div className="font-medium text-gray-900">{l.full_name || "Unknown"}</div>
                          <div className="text-gray-500">{l.email}</div>
                        </div>
                      ))}
                      {stageLeads.length > 5 && <p className="text-xs text-gray-400 text-center">+{stageLeads.length - 5} more</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "reps" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Sales Reps</h2>
              <button onClick={() => setShowAddRep(true)} className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition">+ Add Rep</button>
            </div>

            {showAddRep && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Add New Sales Rep</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Full Name" value={repForm.name} onChange={e => setRepForm(p => ({ ...p, name: e.target.value }))} className="border border-gray-200 rounded-lg px-4 py-2 text-sm" />
                  <input placeholder="Email" value={repForm.email} onChange={e => setRepForm(p => ({ ...p, email: e.target.value }))} className="border border-gray-200 rounded-lg px-4 py-2 text-sm" />
                  <input placeholder="Password" type="password" value={repForm.password} onChange={e => setRepForm(p => ({ ...p, password: e.target.value }))} className="border border-gray-200 rounded-lg px-4 py-2 text-sm" />
                  <input placeholder="Phone (optional)" value={repForm.phone} onChange={e => setRepForm(p => ({ ...p, phone: e.target.value }))} className="border border-gray-200 rounded-lg px-4 py-2 text-sm" />
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={addRep} className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700">Create Rep</button>
                  <button onClick={() => setShowAddRep(false)} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200">Cancel</button>
                </div>
              </div>
            )}

            {reps.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <p className="text-gray-400 text-lg">No sales reps yet</p>
                <p className="text-gray-400 text-sm mt-1">Add your first rep to start tracking performance</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reps.map(rep => {
                  const repActivities = activities.filter(a => a.rep_id === rep.id);
                  const repLeads = leads.filter(l => l.assigned_rep_id === rep.id);
                  const todayRepActs = repActivities.filter(a => new Date(a.created_at).toDateString() === new Date().toDateString());
                  return (
                    <div key={rep.id} className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-gray-900">{rep.name}</h3>
                          <p className="text-xs text-gray-500">{rep.email}</p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${rep.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{rep.status}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-gray-50 rounded-lg p-2">
                          <div className="text-lg font-bold text-gray-900">{repLeads.length}</div>
                          <div className="text-xs text-gray-500">Leads</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2">
                          <div className="text-lg font-bold text-gray-900">{todayRepActs.length}</div>
                          <div className="text-xs text-gray-500">Today</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2">
                          <div className="text-lg font-bold text-gray-900">{repActivities.filter(a => a.type === "demo").length}</div>
                          <div className="text-xs text-gray-500">Demos</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab === "tasks" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Your Tasks</h2>

            {/* Add task */}
            <div className="flex gap-2">
              <input placeholder="Add a new task..." value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()} className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:border-purple-400 outline-none" />
              <button onClick={addTask} className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700">Add</button>
            </div>

            {/* Task list */}
            <div className="space-y-2">
              {tasks.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                  <p className="text-gray-400">No tasks yet. Add one above!</p>
                </div>
              ) : (
                tasks.map(t => (
                  <div key={t.id} className={`bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 transition ${t.status === "done" ? "opacity-60" : ""}`}>
                    <button onClick={() => toggleTask(t.id, t.status)} className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${t.status === "done" ? "bg-purple-600 border-purple-600 text-white" : "border-gray-300 hover:border-purple-400"}`}>
                      {t.status === "done" && <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>}
                    </button>
                    <div className="flex-1">
                      <p className={`font-medium ${t.status === "done" ? "line-through text-gray-400" : "text-gray-900"}`}>{t.title}</p>
                      {t.description && <p className="text-xs text-gray-500 mt-1">{t.description}</p>}
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${t.priority === "urgent" ? "bg-red-100 text-red-700" : t.priority === "high" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"}`}>{t.priority}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
