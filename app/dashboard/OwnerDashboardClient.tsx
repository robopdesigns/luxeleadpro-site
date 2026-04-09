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
  const [taskPriority, setTaskPriority] = useState("medium");
  const [showAddRep, setShowAddRep] = useState(false);
  const [repForm, setRepForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [taskFilter, setTaskFilter] = useState<"all" | "todo" | "done">("all");

  async function loadData() { const res = await fetch("/api/owner/stats"); if (res.ok) setData(await res.json()); setLoading(false); }
  useEffect(() => { loadData(); }, []);

  async function addTask() {
    if (!newTask.trim()) return;
    await fetch("/api/owner/tasks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: newTask, priority: taskPriority }) });
    setNewTask(""); setTaskPriority("medium"); loadData();
  }

  async function toggleTask(id: string, current: string) {
    await fetch("/api/owner/tasks", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status: current === "done" ? "todo" : "done" }) });
    loadData();
  }

  async function addRep() {
    if (!repForm.name || !repForm.email || !repForm.password) return;
    await fetch("/api/reps", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(repForm) });
    setRepForm({ name: "", email: "", password: "", phone: "" }); setShowAddRep(false); loadData();
  }

  async function logout() { await fetch("/api/dashboard-logout", { method: "POST" }); window.location.href = "/dashboard/login"; }

  if (loading) return <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37]" /></div>;

  const leads = data?.leads || [];
  const reps = data?.reps || [];
  const activities = data?.activities || [];
  const tasks = data?.tasks || [];
  const checkins = data?.checkins || [];
  const stages = ["new", "contacted", "demo", "proposal", "won", "lost"];
  const stageCounts = stages.map(s => ({ stage: s, count: leads.filter(l => (l.current_stage || "new") === s).length }));
  const todayActs = activities.filter(a => new Date(a.created_at).toDateString() === new Date().toDateString());

  const filteredTasks = taskFilter === "all" ? tasks : tasks.filter(t => t.status === taskFilter);
  const urgentTasks = tasks.filter(t => t.priority === "urgent" && t.status === "todo");
  const highTasks = tasks.filter(t => t.priority === "high" && t.status === "todo");
  const medTasks = tasks.filter(t => t.priority === "medium" && t.status === "todo");
  const lowTasks = tasks.filter(t => t.priority === "low" && t.status === "todo");
  const doneTasks = tasks.filter(t => t.status === "done");

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* Header */}
      <header className="border-b border-[var(--border-default)] bg-[var(--bg-base)]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37] flex items-center justify-center font-bold text-lg">L</div>
            <div>
              <h1 className="text-lg font-bold">LuxeLeadPro</h1>
              <p className="text-xs text-[var(--text-muted)]">Owner Command Center</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/api/briefing" target="_blank" className="px-3 py-1.5 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition"> Send Briefing</a>
            <button onClick={logout} className="px-3 py-1.5 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition">Logout</button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-6 flex gap-1">
          {(["overview", "pipeline", "reps", "tasks"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 py-3.5 text-sm font-medium border-b-2 transition ${tab === t ? "border-[#D4AF37] text-[var(--text-primary)]" : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]"}`}>
              {t === "overview" ? " Overview" : t === "pipeline" ? "🔄 Pipeline" : t === "reps" ? " Sales Reps" : " Tasks"}
              {t === "tasks" && urgentTasks.length > 0 && <span className="ml-2 bg-red-50 text-red-600 text-xs px-1.5 py-0.5 rounded-full">{urgentTasks.length}</span>}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {tab === "overview" && (
          <div className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: "Total Leads", value: leads.length, icon: "", color: "from-[#D4AF37]/20 to-[#D4AF37]/5 border-[#D4AF37]/20", text: "text-[#D4AF37]/80" },
                { label: "Active Reps", value: reps.filter(r => r.status === "active").length, icon: "", color: "from-blue-500/20 to-blue-600/5 border-blue-500/20", text: "text-blue-400" },
                { label: "Today's Activity", value: todayActs.length, icon: "", color: "from-amber-500/20 to-amber-600/5 border-amber-500/20", text: "text-amber-600" },
                { label: "Deals Won", value: leads.filter(l => l.current_stage === "won").length, icon: "", color: "from-green-500/20 to-green-600/5 border-green-500/20", text: "text-emerald-600" },
                { label: "Open Tasks", value: tasks.filter(t => t.status === "todo").length, icon: "", color: "from-pink-500/20 to-pink-600/5 border-pink-500/20", text: "text-pink-400" },
              ].map((s, i) => (
                <div key={i} className={`rounded-2xl border bg-gradient-to-br ${s.color} p-5`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">{s.label}</span>
                    <span className="text-lg">{s.icon}</span>
                  </div>
                  <div className={`text-3xl font-bold ${s.text}`}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Pipeline + Urgent Tasks side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
                <h2 className="font-bold text-[var(--text-primary)] mb-4">Pipeline Snapshot</h2>
                <div className="flex gap-2 flex-wrap">
                  {stageCounts.map(s => (
                    <div key={s.stage} className="flex-1 min-w-[80px] bg-[var(--bg-elevated)] rounded-xl p-3 text-center">
                      <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{s.stage}</div>
                      <div className="text-2xl font-bold text-[var(--text-primary)] mt-1">{s.count}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
                <h2 className="font-bold text-[var(--text-primary)] mb-4"> Urgent Tasks</h2>
                {urgentTasks.length === 0 ? (
                  <p className="text-[var(--text-muted)] text-sm">No urgent tasks. You&apos;re on track! </p>
                ) : (
                  <div className="space-y-2">
                    {urgentTasks.slice(0, 5).map(t => (
                      <div key={t.id} className="flex items-center gap-3 py-2 border-b border-[var(--border-subtle)] last:border-0">
                        <button onClick={() => toggleTask(t.id, t.status)} className="w-5 h-5 rounded-full border-2 border-red-300 flex-shrink-0 hover:bg-red-50 transition" />
                        <span className="text-sm text-[var(--text-primary)]">{t.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
              <h2 className="font-bold text-[var(--text-primary)] mb-4">Recent Rep Activity</h2>
              {activities.length === 0 ? (
                <p className="text-[var(--text-muted)] text-sm">No activities yet. Activities appear when reps start logging calls and demos.</p>
              ) : (
                <div className="space-y-2">
                  {activities.slice(0, 8).map(a => {
                    const rep = reps.find(r => r.id === a.rep_id);
                    return (
                      <div key={a.id} className="flex items-center justify-between py-2 border-b border-[var(--border-subtle)] last:border-0">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{a.type === "call" ? "" : a.type === "email" ? "" : a.type === "demo" ? "" : ""}</span>
                          <div>
                            <span className="font-medium text-[var(--text-primary)] text-sm">{rep?.name || "Unknown"}</span>
                            <span className="text-[var(--text-muted)] text-sm ml-2">{a.type} {a.notes ? `— ${a.notes}` : ""}</span>
                          </div>
                        </div>
                        <span className="text-xs text-[var(--text-muted)]">{new Date(a.created_at).toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "pipeline" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Lead Pipeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {stages.map(stage => {
                const stageLeads = leads.filter(l => (l.current_stage || "new") === stage);
                const colors: Record<string, string> = { new: "border-gray-500/30", contacted: "border-amber-500/30", demo: "border-[#D4AF37]/30", proposal: "border-blue-500/30", won: "border-green-500/30", lost: "border-red-500/30" };
                return (
                  <div key={stage} className={`rounded-2xl border ${colors[stage] || "border-[var(--border-default)]"} bg-[var(--bg-surface)] p-4`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">{stage}</h3>
                      <span className="bg-[var(--bg-elevated)] text-[var(--text-secondary)] text-xs font-bold px-2 py-0.5 rounded-full">{stageLeads.length}</span>
                    </div>
                    <div className="space-y-2">
                      {stageLeads.slice(0, 5).map(l => (
                        <div key={l.id} className="bg-[var(--bg-elevated)] rounded-lg p-2.5 text-xs">
                          <div className="font-medium text-[var(--text-primary)]">{l.full_name || "Unknown"}</div>
                          <div className="text-[var(--text-muted)]">{l.email}</div>
                          {l.market_area && <div className="text-[#D4AF37]/80 mt-1">📍 {l.market_area}</div>}
                        </div>
                      ))}
                      {stageLeads.length > 5 && <p className="text-xs text-[var(--text-muted)] text-center">+{stageLeads.length - 5} more</p>}
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
              <h2 className="text-xl font-bold">Sales Reps</h2>
              <button onClick={() => setShowAddRep(true)} className="px-4 py-2 bg-[#D4AF37] text-[var(--text-primary)] text-sm font-semibold rounded-xl hover:opacity-90 transition">+ Add Rep</button>
            </div>
            {showAddRep && (
              <div className="rounded-2xl border border-[#D4AF37]/30 bg-[var(--bg-surface)] p-6">
                <h3 className="font-bold mb-4">Add New Sales Rep</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input placeholder="Full Name" value={repForm.name} onChange={e => setRepForm(p => ({ ...p, name: e.target.value }))} className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-white/30 focus:border-[#D4AF37]/50 outline-none" />
                  <input placeholder="Email" value={repForm.email} onChange={e => setRepForm(p => ({ ...p, email: e.target.value }))} className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-white/30 focus:border-[#D4AF37]/50 outline-none" />
                  <input placeholder="Password" type="password" value={repForm.password} onChange={e => setRepForm(p => ({ ...p, password: e.target.value }))} className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-white/30 focus:border-[#D4AF37]/50 outline-none" />
                  <input placeholder="Phone (optional)" value={repForm.phone} onChange={e => setRepForm(p => ({ ...p, phone: e.target.value }))} className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-white/30 focus:border-[#D4AF37]/50 outline-none" />
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={addRep} className="px-4 py-2 bg-[#D4AF37] text-[var(--text-primary)] text-sm font-semibold rounded-xl">Create Rep</button>
                  <button onClick={() => setShowAddRep(false)} className="px-4 py-2 bg-[var(--bg-elevated)] text-[var(--text-secondary)] text-sm rounded-xl hover:bg-[var(--bg-elevated)]">Cancel</button>
                </div>
              </div>
            )}
            {reps.length === 0 ? (
              <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-16 text-center">
                <p className="text-4xl mb-3"></p>
                <p className="text-[var(--text-muted)] text-lg">No sales reps yet</p>
                <p className="text-[var(--text-muted)] text-sm mt-1">Add your first rep to start tracking performance</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reps.map(rep => {
                  const repActs = activities.filter(a => a.rep_id === rep.id);
                  const repLeads = leads.filter(l => l.assigned_rep_id === rep.id);
                  return (
                    <div key={rep.id} className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-[var(--text-primary)]">{rep.name}</h3>
                          <p className="text-xs text-[var(--text-muted)]">{rep.email}</p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${rep.status === "active" ? "bg-green-500/20 text-emerald-600" : "bg-[var(--bg-elevated)] text-[var(--text-muted)]"}`}>{rep.status}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-[var(--bg-elevated)] rounded-xl p-2"><div className="text-lg font-bold text-[var(--text-primary)]">{repLeads.length}</div><div className="text-xs text-[var(--text-muted)]">Leads</div></div>
                        <div className="bg-[var(--bg-elevated)] rounded-xl p-2"><div className="text-lg font-bold text-[var(--text-primary)]">{repActs.length}</div><div className="text-xs text-[var(--text-muted)]">Activities</div></div>
                        <div className="bg-[var(--bg-elevated)] rounded-xl p-2"><div className="text-lg font-bold text-[var(--text-primary)]">{repActs.filter(a => a.type === "demo").length}</div><div className="text-xs text-[var(--text-muted)]">Demos</div></div>
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
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Launch Checklist</h2>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[var(--text-muted)]">{doneTasks.length}/{tasks.length} complete</span>
                <div className="w-32 bg-[var(--bg-elevated)] rounded-full h-2">
                  <div className="bg-[#D4AF37] h-2 rounded-full transition-all" style={{ width: `${tasks.length ? (doneTasks.length / tasks.length) * 100 : 0}%` }} />
                </div>
              </div>
            </div>

            {/* Add task */}
            <div className="flex gap-2">
              <input placeholder="Add a new task..." value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()} className="flex-1 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-white/30 focus:border-[#D4AF37]/50 outline-none" />
              <select value={taskPriority} onChange={e => setTaskPriority(e.target.value)} className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl px-3 py-2 text-sm text-[var(--text-secondary)] outline-none">
                <option value="urgent"> Urgent</option>
                <option value="high"> High</option>
                <option value="medium"> Medium</option>
                <option value="low"> Low</option>
              </select>
              <button onClick={addTask} className="px-5 py-2 bg-[#D4AF37] text-[var(--text-primary)] text-sm font-semibold rounded-xl">Add</button>
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              {(["all", "todo", "done"] as const).map(f => (
                <button key={f} onClick={() => setTaskFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${taskFilter === f ? "bg-[#D4AF37]/20 text-[#D4AF37]/80" : "bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:bg-[var(--bg-elevated)]"}`}>
                  {f === "all" ? `All (${tasks.length})` : f === "todo" ? `To Do (${tasks.filter(t => t.status === "todo").length})` : `Done (${doneTasks.length})`}
                </button>
              ))}
            </div>

            {/* Organized task groups */}
            {taskFilter !== "done" && urgentTasks.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-red-600 uppercase tracking-wider mb-3"> Urgent</h3>
                <div className="space-y-2">
                  {urgentTasks.map(t => (
                    <div key={t.id} className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                      <button onClick={() => toggleTask(t.id, t.status)} className="w-6 h-6 rounded-full border-2 border-red-300 flex-shrink-0 hover:bg-red-50 transition flex items-center justify-center" />
                      <div className="flex-1"><p className="text-sm text-[var(--text-primary)]">{t.title}</p>{t.description && <p className="text-xs text-[var(--text-muted)] mt-1">{t.description}</p>}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {taskFilter !== "done" && highTasks.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-3"> High Priority</h3>
                <div className="space-y-2">
                  {highTasks.map(t => (
                    <div key={t.id} className="flex items-center gap-3 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4">
                      <button onClick={() => toggleTask(t.id, t.status)} className="w-6 h-6 rounded-full border-2 border-amber-300 flex-shrink-0 hover:bg-amber-500/20 transition flex items-center justify-center" />
                      <div className="flex-1"><p className="text-sm text-[var(--text-primary)]">{t.title}</p>{t.description && <p className="text-xs text-[var(--text-muted)] mt-1">{t.description}</p>}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {taskFilter !== "done" && medTasks.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-3"> Medium</h3>
                <div className="space-y-2">
                  {medTasks.map(t => (
                    <div key={t.id} className="flex items-center gap-3 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4">
                      <button onClick={() => toggleTask(t.id, t.status)} className="w-6 h-6 rounded-full border-2 border-white/20 flex-shrink-0 hover:bg-[var(--bg-elevated)] transition flex items-center justify-center" />
                      <p className="text-sm text-[var(--text-primary)]">{t.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {taskFilter !== "done" && lowTasks.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-3"> Low</h3>
                <div className="space-y-2">
                  {lowTasks.map(t => (
                    <div key={t.id} className="flex items-center gap-3 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4">
                      <button onClick={() => toggleTask(t.id, t.status)} className="w-6 h-6 rounded-full border-2 border-[var(--border-default)] flex-shrink-0 hover:bg-[var(--bg-elevated)] transition flex items-center justify-center" />
                      <p className="text-sm text-[var(--text-secondary)]">{t.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(taskFilter === "all" || taskFilter === "done") && doneTasks.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3"> Completed ({doneTasks.length})</h3>
                <div className="space-y-2">
                  {doneTasks.map(t => (
                    <div key={t.id} className="flex items-center gap-3 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-4 opacity-60">
                      <button onClick={() => toggleTask(t.id, t.status)} className="w-6 h-6 rounded-full bg-[#D4AF37]/30 border-2 border-[#D4AF37]/50 flex-shrink-0 flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#D4AF37]/80" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      </button>
                      <p className="text-sm text-[var(--text-muted)] line-through">{t.title}</p>
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
