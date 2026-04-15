"use client";

import { useEffect, useState } from "react";

type Lead = { id: string; full_name: string | null; email: string | null; phone: string | null; market_area: string | null; challenge: string | null; current_stage: string | null; assigned_rep_id: string | null; created_at: string | null };
type Rep = { id: string; name: string; email: string; status: string; phone: string | null; created_at: string };
type Activity = { id: string; rep_id: string; lead_id: string | null; type: string; notes: string | null; outcome: string | null; created_at: string };
type Task = { id: string; title: string; description: string | null; priority: string; status: string; due_date: string | null; created_at: string };
type DashData = { leads: Lead[]; reps: Rep[]; activities: Activity[]; tasks: Task[]; commissions: unknown[]; checkins: unknown[] };

const dashCSS = `
:root{--bg-base:#FAFAF8;--bg-surface:#FFFFFF;--bg-elevated:#F8F6F3;--text-primary:#0A192F;--text-secondary:#4A5568;--text-muted:#718096;--border-default:#E8E5DE;--border-subtle:#F0EDE6;--gold:#D4AF37;--gold-hover:#B5952F;--gold-muted:rgba(212,175,55,0.12);--shadow-sm:0 1px 3px rgba(10,25,47,0.04);--shadow-md:0 4px 16px rgba(10,25,47,0.06)}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',-apple-system,sans-serif;background:var(--bg-base);color:var(--text-primary);-webkit-font-smoothing:antialiased}
.dash-layout{display:grid;grid-template-columns:256px 1fr;min-height:100vh}
.sidebar{background:var(--bg-elevated);border-right:1px solid var(--border-default);padding:24px 0;position:sticky;top:0;height:100vh;overflow-y:auto}
.sidebar-logo{display:flex;align-items:center;gap:10px;padding:0 20px;margin-bottom:32px}
.sidebar-logo svg{width:28px;height:28px}
.sidebar-logo span{font-size:16px;font-weight:300;color:var(--text-primary)}
.sidebar-logo span strong{font-weight:700}
.sidebar-logo .pro{color:var(--gold)}
.sidebar-nav{list-style:none}
.sidebar-nav li a,.sidebar-nav li button{display:flex;align-items:center;gap:12px;padding:12px 20px;font-size:14px;font-weight:500;color:var(--text-muted);border:none;background:none;width:100%;text-align:left;cursor:pointer;border-left:3px solid transparent;transition:all .2s}
.sidebar-nav li a:hover,.sidebar-nav li button:hover{color:var(--text-primary);background:rgba(212,175,55,0.04)}
.sidebar-nav li a.active,.sidebar-nav li button.active{color:var(--gold);background:var(--gold-muted);border-left-color:var(--gold);font-weight:600}
.sidebar-section{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);padding:24px 20px 8px}
.main{padding:32px;overflow-y:auto}
.dash-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:32px}
.dash-header h1{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:var(--text-primary)}
.dash-header .date{font-size:14px;color:var(--text-muted);margin-top:4px}
.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:32px}
.kpi-card{background:var(--bg-surface);border:1px solid var(--border-default);border-radius:12px;padding:20px;transition:all .2s}
.kpi-card:hover{box-shadow:var(--shadow-md)}
.kpi-card .label{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px}
.kpi-card .value{font-family:'JetBrains Mono',monospace;font-size:28px;font-weight:700;color:var(--text-primary)}
.kpi-card .value.gold{color:var(--gold)}
.content-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:32px}
.panel{background:var(--bg-surface);border:1px solid var(--border-default);border-radius:12px;overflow:hidden}
.panel-header{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid var(--border-default)}
.panel-header h3{font-size:14px;font-weight:700;color:var(--text-primary)}
.lead-item{display:flex;align-items:center;gap:12px;padding:14px 20px;border-bottom:1px solid var(--border-subtle);transition:background .2s}
.lead-item:hover{background:var(--bg-base)}
.lead-item:last-child{border-bottom:none}
.lead-avatar{width:36px;height:36px;background:var(--bg-elevated);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--text-secondary);flex-shrink:0}
.lead-info{flex:1}
.lead-name{font-size:14px;font-weight:600;color:var(--text-primary)}
.lead-detail{font-size:12px;color:var(--text-muted)}
.badge-hot{font-size:10px;font-weight:700;padding:3px 8px;border-radius:100px;background:rgba(239,68,68,0.1);color:#DC2626}
.badge-warm{font-size:10px;font-weight:700;padding:3px 8px;border-radius:100px;background:rgba(245,158,11,0.1);color:#D97706}
.badge-active{font-size:10px;font-weight:700;padding:3px 8px;border-radius:100px;background:rgba(16,185,129,0.1);color:#059669}
.task-item{display:flex;align-items:center;gap:12px;padding:14px 20px;border-bottom:1px solid var(--border-subtle)}
.task-item:last-child{border-bottom:none}
.task-check{width:20px;height:20px;border:2px solid var(--border-default);border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0;background:none}
.task-check:hover{border-color:var(--gold)}
.task-check.done{background:var(--gold);border-color:var(--gold)}
.task-text{font-size:14px;color:var(--text-primary)}
.task-text.done{color:var(--text-muted);text-decoration:line-through}
.task-priority{font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px}
.priority-urgent{background:rgba(239,68,68,0.1);color:#DC2626}
.priority-high{background:rgba(245,158,11,0.1);color:#D97706}
.priority-medium{background:rgba(59,130,246,0.1);color:#3B82F6}
.priority-low{background:rgba(16,185,129,0.1);color:#059669}
.btn-gold{display:inline-flex;align-items:center;gap:8px;background:var(--gold);color:var(--text-primary);font-size:14px;font-weight:600;padding:10px 20px;border-radius:8px;border:none;cursor:pointer;transition:all .2s}
.btn-gold:hover{background:var(--gold-hover)}
.add-task-row{display:flex;gap:8px;padding:16px 20px;border-top:1px solid var(--border-default)}
.add-task-row input{flex:1;height:40px;padding:0 12px;background:var(--bg-base);border:1px solid var(--border-default);border-radius:8px;font-size:14px;color:var(--text-primary);outline:none}
.add-task-row input:focus{border-color:var(--gold)}
.add-task-row select{height:40px;padding:0 12px;background:var(--bg-base);border:1px solid var(--border-default);border-radius:8px;font-size:12px;color:var(--text-secondary);outline:none}
@media(max-width:768px){.dash-layout{grid-template-columns:1fr}.sidebar{display:none}.kpi-grid{grid-template-columns:repeat(2,1fr)}.content-grid{grid-template-columns:1fr}}
`;

export default function OwnerDashboardClient() {
  const [data, setData] = useState<DashData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("overview");
  const [newTask, setNewTask] = useState("");
  const [taskPriority, setTaskPriority] = useState("medium");

  async function loadData() { const res = await fetch("/api/owner/stats"); if (res.ok) setData(await res.json()); setLoading(false); }
  useEffect(() => { loadData(); }, []);

  async function addTask() {
    if (!newTask.trim()) return;
    await fetch("/api/owner/tasks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: newTask, priority: taskPriority }) });
    setNewTask(""); loadData();
  }

  async function toggleTask(id: string, current: string) {
    await fetch("/api/owner/tasks", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status: current === "done" ? "todo" : "done" }) });
    loadData();
  }

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAF8' }}><div style={{ width: 32, height: 32, border: '3px solid #E8E5DE', borderTopColor: '#D4AF37', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /></div>;

  const leads = data?.leads || [];
  const reps = data?.reps || [];
  const tasks = data?.tasks || [];
  const activities = data?.activities || [];
  const todoTasks = tasks.filter(t => t.status === "todo");
  const doneTasks = tasks.filter(t => t.status === "done");
  const stages = ["new", "contacted", "demo", "proposal", "won", "lost"];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: dashCSS }} />
      <div className="dash-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polyline points="15,70 50,25 85,70" stroke="#D4AF37" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="50" cy="25" r="4" fill="#D4AF37"/><line x1="50" y1="70" x2="50" y2="45" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round"/></svg>
            <span><strong>Luxe</strong>Lead<span className="pro">Pro</span></span>
          </div>
          <div className="sidebar-section">Main</div>
          <ul className="sidebar-nav">
            <li><button className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")}>Overview</button></li>
            <li><button className={tab === "pipeline" ? "active" : ""} onClick={() => setTab("pipeline")}>Pipeline</button></li>
            <li><button className={tab === "reps" ? "active" : ""} onClick={() => setTab("reps")}>Sales Reps</button></li>
            <li><button className={tab === "tasks" ? "active" : ""} onClick={() => setTab("tasks")}>Tasks</button></li>
          </ul>
          <div className="sidebar-section">Actions</div>
          <ul className="sidebar-nav">
            <li><a href="/api/briefing" target="_blank">Send Briefing</a></li>
            <li><button onClick={async () => { await fetch("/api/dashboard-logout", { method: "POST" }); window.location.href = "/dashboard/login"; }}>Logout</button></li>
          </ul>
        </aside>

        {/* Main */}
        <div className="main">
          <div className="dash-header">
            <div>
              <h1>Command Center</h1>
              <div className="date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
          </div>

          {tab === "overview" && (
            <>
              <div className="kpi-grid">
                <div className="kpi-card"><div className="label">Total Leads</div><div className="value">{leads.length}</div></div>
                <div className="kpi-card"><div className="label">Active Reps</div><div className="value">{reps.filter(r => r.status === "active").length}</div></div>
                <div className="kpi-card"><div className="label">Deals Won</div><div className="value gold">{leads.filter(l => l.current_stage === "won").length}</div></div>
                <div className="kpi-card"><div className="label">Open Tasks</div><div className="value">{todoTasks.length}</div></div>
              </div>

              <div className="content-grid">
                {/* Recent Leads */}
                <div className="panel">
                  <div className="panel-header"><h3>Recent Leads</h3></div>
                  {leads.slice(0, 6).map(l => (
                    <div className="lead-item" key={l.id}>
                      <div className="lead-avatar">{(l.full_name || "?")[0]}</div>
                      <div className="lead-info">
                        <div className="lead-name">{l.full_name || "Unknown"}</div>
                        <div className="lead-detail">{l.email}{l.market_area ? ` · ${l.market_area}` : ""}</div>
                      </div>
                      <span className={l.current_stage === "won" ? "badge-active" : l.current_stage === "demo" ? "badge-warm" : "badge-hot"}>
                        {l.current_stage || "new"}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Urgent Tasks */}
                <div className="panel">
                  <div className="panel-header"><h3>Tasks ({todoTasks.length} remaining)</h3></div>
                  {todoTasks.slice(0, 6).map(t => (
                    <div className="task-item" key={t.id}>
                      <button className={`task-check ${t.status === "done" ? "done" : ""}`} onClick={() => toggleTask(t.id, t.status)}>
                        {t.status === "done" && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                      </button>
                      <span className={`task-text ${t.status === "done" ? "done" : ""}`}>{t.title}</span>
                      <span className={`task-priority priority-${t.priority}`}>{t.priority}</span>
                    </div>
                  ))}
                  <div className="add-task-row">
                    <input placeholder="Add a task..." value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()} />
                    <select value={taskPriority} onChange={e => setTaskPriority(e.target.value)}>
                      <option value="urgent">Urgent</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
                    </select>
                    <button className="btn-gold" onClick={addTask} style={{ padding: '8px 16px', fontSize: 13 }}>Add</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === "pipeline" && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
              {stages.map(stage => {
                const stageLeads = leads.filter(l => (l.current_stage || "new") === stage);
                return (
                  <div className="panel" key={stage}>
                    <div className="panel-header"><h3 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1 }}>{stage}</h3><span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{stageLeads.length}</span></div>
                    {stageLeads.slice(0, 5).map(l => (
                      <div className="lead-item" key={l.id} style={{ padding: '10px 14px' }}>
                        <div className="lead-info">
                          <div className="lead-name" style={{ fontSize: 13 }}>{l.full_name || "Unknown"}</div>
                          <div className="lead-detail">{l.email}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          {tab === "reps" && (
            <div>
              <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {reps.length === 0 ? (
                  <div className="panel" style={{ gridColumn: '1 / -1', padding: 48, textAlign: 'center' }}>
                    <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>No sales reps yet. Add your first rep to start tracking performance.</div>
                  </div>
                ) : reps.map(rep => (
                  <div className="kpi-card" key={rep.id}>
                    <div className="lead-name">{rep.name}</div>
                    <div className="lead-detail">{rep.email}</div>
                    <div style={{ marginTop: 12, display: 'flex', gap: 16 }}>
                      <div><span className="value" style={{ fontSize: 20 }}>{leads.filter(l => l.assigned_rep_id === rep.id).length}</span><div className="label">Leads</div></div>
                      <div><span className="value" style={{ fontSize: 20 }}>{activities.filter(a => a.rep_id === rep.id).length}</span><div className="label">Activities</div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "tasks" && (() => {
            const robTasks = todoTasks.filter(t => t.title.startsWith('ROB:'));
            const atlasTasks = todoTasks.filter(t => t.title.startsWith('ATLAS:') || t.title.startsWith('MANUS:'));
            const otherTasks = todoTasks.filter(t => !t.title.startsWith('ROB:') && !t.title.startsWith('ATLAS:') && !t.title.startsWith('MANUS:'));
            const progress = tasks.length ? Math.round((doneTasks.length / tasks.length) * 100) : 0;

            return (
            <div>
              {/* Progress bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24 }}>Launch Checklist</h2>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{doneTasks.length}/{tasks.length} complete ({progress}%)</span>
              </div>
              <div style={{ width: '100%', height: 8, background: 'var(--bg-elevated)', borderRadius: 4, marginBottom: 32 }}>
                <div style={{ width: `${progress}%`, height: 8, background: '#D4AF37', borderRadius: 4, transition: 'width 0.3s' }} />
              </div>

              {/* ROB's Tasks */}
              {robTasks.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: '#D4AF37', marginBottom: 12 }}>Your Tasks (Rob)</div>
                  <div className="panel">
                    {robTasks.map(t => (
                      <div className="task-item" key={t.id}>
                        <button className="task-check" onClick={() => toggleTask(t.id, t.status)} />
                        <span className="task-text">{t.title.replace('ROB: ', '')}</span>
                        <span className={`task-priority priority-${t.priority}`}>{t.priority}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ATLAS Tasks */}
              {atlasTasks.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: 'var(--text-muted)', marginBottom: 12 }}>Atlas (AI) Tasks</div>
                  <div className="panel">
                    {atlasTasks.map(t => (
                      <div className="task-item" key={t.id}>
                        <button className="task-check" onClick={() => toggleTask(t.id, t.status)} />
                        <span className="task-text">{t.title.replace('ATLAS: ', '').replace('MANUS: ', '')}</span>
                        <span className={`task-priority priority-${t.priority}`}>{t.priority}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Tasks */}
              {otherTasks.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: 'var(--text-muted)', marginBottom: 12 }}>General</div>
                  <div className="panel">
                    {otherTasks.map(t => (
                      <div className="task-item" key={t.id}>
                        <button className="task-check" onClick={() => toggleTask(t.id, t.status)} />
                        <span className="task-text">{t.title}</span>
                        <span className={`task-priority priority-${t.priority}`}>{t.priority}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Completed */}
              {doneTasks.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: 'var(--text-muted)', marginBottom: 12 }}>Completed ({doneTasks.length})</div>
                  <div className="panel">
                    {doneTasks.map(t => (
                      <div className="task-item" key={t.id} style={{ opacity: 0.5 }}>
                        <button className="task-check done" onClick={() => toggleTask(t.id, t.status)}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        </button>
                        <span className="task-text done">{t.title.replace('ROB: ', '').replace('ATLAS: ', '').replace('MANUS: ', '')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add task */}
              <div className="panel">
                <div className="add-task-row">
                  <input placeholder="Add a task (prefix with ROB: or ATLAS:)" value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()} />
                  <select value={taskPriority} onChange={e => setTaskPriority(e.target.value)}>
                    <option value="urgent">Urgent</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
                  </select>
                  <button className="btn-gold" onClick={addTask} style={{ padding: '8px 16px', fontSize: 13 }}>Add</button>
                </div>
              </div>
            </div>
            );
          })()}
        </div>
      </div>
    </>
  );
}
