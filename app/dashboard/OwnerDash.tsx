"use client";
import { useEffect, useState } from "react";
const DASH_CSS = `
:root{--bg-base:#FAFAF8;--bg-surface:#FFFFFF;--bg-elevated:#F8F6F3;--text-primary:#0A192F;--text-secondary:#4A5568;--text-muted:#718096;--border-default:#E8E5DE;--border-subtle:#F0EDE6;--gold:#D4AF37;--gold-hover:#B5952F;--gold-muted:rgba(212,175,55,0.12);--navy:#0A192F;--deep:#050B14;--shadow-sm:0 1px 3px rgba(10,25,47,0.04);--shadow-md:0 4px 16px rgba(10,25,47,0.06)}
.dark{--bg-base:#050B14;--bg-surface:#0A192F;--bg-elevated:#112240;--text-primary:#F8FAFC;--text-secondary:#94A3B8;--text-muted:#64748B;--border-default:#1E293B;--border-subtle:#0F172A;--shadow-sm:0 1px 3px rgba(0,0,0,0.2);--shadow-md:0 4px 16px rgba(0,0,0,0.3)}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',-apple-system,sans-serif;background:var(--bg-base);color:var(--text-primary);-webkit-font-smoothing:antialiased;line-height:1.6;transition:background .3s,color .3s}
a{text-decoration:none;color:inherit}
.dash-layout{display:grid;grid-template-columns:256px 1fr;min-height:100vh}
.sidebar{background:var(--bg-elevated);border-right:1px solid var(--border-default);padding:24px 0;position:sticky;top:0;height:100vh;overflow-y:auto;transition:background .3s}
.sidebar-logo{display:flex;align-items:center;gap:10px;padding:0 20px;margin-bottom:32px}
.sidebar-logo svg{width:28px;height:28px}
.sidebar-logo span{font-size:16px;font-weight:300;color:var(--text-primary)}
.sidebar-logo span strong{font-weight:700}
.sidebar-logo span .pro{color:var(--gold)}
.sidebar-nav{list-style:none}
.sidebar-nav li a{display:flex;align-items:center;gap:12px;padding:12px 20px;font-size:14px;font-weight:500;color:var(--text-muted);border-left:3px solid transparent;transition:all .2s}
.sidebar-nav li a:hover{color:var(--text-primary);background:rgba(212,175,55,0.04)}
.sidebar-nav li a.active{color:var(--gold);background:var(--gold-muted);border-left-color:var(--gold);font-weight:600}
.sidebar-nav li a svg{width:18px;height:18px;stroke:currentColor;stroke-width:2;fill:none}
.sidebar-section{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);padding:24px 20px 8px}
.sidebar-bottom{position:absolute;bottom:0;left:0;right:0;padding:16px 20px;border-top:1px solid var(--border-default)}
.sidebar-user{display:flex;align-items:center;gap:10px}
.sidebar-user .avatar{width:36px;height:36px;background:var(--gold-muted);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:var(--gold)}
.sidebar-user .name{font-size:13px;font-weight:600;color:var(--text-primary)}
.sidebar-user .role{font-size:11px;color:var(--text-muted)}
.main{padding:32px;overflow-y:auto}
.dash-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:32px}
.dash-header h1{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:var(--text-primary)}
.dash-header .date{font-size:14px;color:var(--text-muted);margin-top:4px}
.dash-actions{display:flex;align-items:center;gap:12px}
.theme-toggle{width:40px;height:40px;background:var(--bg-surface);border:1px solid var(--border-default);border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--text-muted);transition:all .2s}
.theme-toggle:hover{border-color:var(--gold);color:var(--gold)}
.btn-gold{display:inline-flex;align-items:center;gap:8px;background:var(--gold);color:var(--navy);font-family:'Inter',sans-serif;font-size:14px;font-weight:600;padding:10px 20px;border-radius:8px;border:none;cursor:pointer;transition:all .2s;box-shadow:0 2px 8px rgba(212,175,55,0.25)}
.btn-gold:hover{background:var(--gold-hover)}
.btn-outline{display:inline-flex;align-items:center;gap:8px;background:transparent;color:var(--text-primary);font-family:'Inter',sans-serif;font-size:14px;font-weight:600;padding:10px 20px;border-radius:8px;border:1.5px solid var(--border-default);cursor:pointer;transition:all .2s}
.btn-outline:hover{border-color:var(--gold);color:var(--gold)}
.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:32px}
.kpi-card{background:var(--bg-surface);border:1px solid var(--border-default);border-radius:12px;padding:20px;transition:all .2s}
.kpi-card:hover{box-shadow:var(--shadow-md)}
.kpi-card .label{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px}
.kpi-card .value{font-family:'JetBrains Mono',monospace;font-size:28px;font-weight:700;color:var(--text-primary)}
.kpi-card .value.gold{color:var(--gold)}
.kpi-card .change{font-size:12px;color:#16A34A;margin-top:4px}
.kpi-card .change.red{color:#DC2626}
.content-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:32px}
.panel{background:var(--bg-surface);border:1px solid var(--border-default);border-radius:12px;overflow:hidden}
.panel-full{grid-column:1/-1}
.panel-header{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid var(--border-default)}
.panel-header h3{font-size:14px;font-weight:700;color:var(--text-primary);display:flex;align-items:center;gap:8px}
.panel-header h3 .dot{width:6px;height:6px;background:var(--gold);border-radius:50%}
.panel-header a{font-size:12px;font-weight:600;color:var(--gold)}
.chart-placeholder{background:var(--bg-elevated);border:2px dashed var(--border-default);border-radius:12px;height:240px;display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:14px;margin:16px 20px 20px}
.sub-table{width:100%;border-collapse:collapse}
.sub-table thead th{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);padding:12px 16px;text-align:left;border-bottom:1px solid var(--border-default)}
.sub-table tbody td{padding:14px 16px;font-size:14px;color:var(--text-secondary);border-bottom:1px solid var(--border-subtle)}
.sub-table tbody tr:hover{background:var(--bg-base)}
.sub-table .agent-name{font-weight:600;color:var(--text-primary)}
.sub-table .mono{font-family:'JetBrains Mono',monospace;font-weight:600}
.sub-table .gold-val{color:var(--gold)}
.plan-badge{font-size:10px;font-weight:700;padding:3px 10px;border-radius:100px;display:inline-block}
.plan-exclusive{background:var(--gold-muted);color:var(--gold)}
.plan-gen{background:rgba(59,130,246,0.1);color:#3B82F6}
.plan-intel{background:rgba(107,114,128,0.1);color:#6B7280}
.status-active{color:#16A34A;font-weight:600;font-size:13px}
.status-trial{color:#D97706;font-weight:600;font-size:13px}
.activity-item{display:flex;justify-content:space-between;align-items:flex-start;padding:14px 20px;border-bottom:1px solid var(--border-subtle)}
.activity-item:last-child{border-bottom:none}
.activity-title{font-size:13px;font-weight:600;color:var(--text-primary)}
.activity-desc{font-size:12px;color:var(--text-muted);margin-top:2px}
.activity-time{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-muted);white-space:nowrap}
@media(max-width:1024px){.kpi-grid{grid-template-columns:repeat(2,1fr)}.content-grid{grid-template-columns:1fr}}
@media(max-width:768px){.dash-layout{grid-template-columns:1fr}.sidebar{display:none}.main{padding:20px}}
`;

type Lead = { id: string; full_name: string | null; email: string | null; market_area: string | null; current_stage: string | null; created_at: string | null; assigned_rep_id: string | null };
type Task = { id: string; title: string; description: string | null; priority: string; status: string };
type Rep = { id: string; name: string; email: string; status: string };
type Activity = { id: string; rep_id: string; type: string; notes: string | null; created_at: string };

export default function OwnerDash() {
  const [tab, setTab] = useState("overview");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [reps, setReps] = useState<Rep[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [newTask, setNewTask] = useState("");
  const [taskPri, setTaskPri] = useState("medium");
  const [loading, setLoading] = useState(true);

  async function load() {
    const r = await fetch("/api/owner/stats");
    if (r.ok) { const d = await r.json(); setLeads(d.leads||[]); setTasks(d.tasks||[]); setReps(d.reps||[]); setActivities(d.activities||[]); }
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function addTask() { if (!newTask.trim()) return; await fetch("/api/owner/tasks",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:newTask,priority:taskPri})}); setNewTask(""); load(); }
  async function toggleTask(id:string,s:string) { await fetch("/api/owner/tasks",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,status:s==="done"?"todo":"done"})}); load(); }

  const todo = tasks.filter(t=>t.status==="todo");
  const done = tasks.filter(t=>t.status==="done");
  const robTasks = todo.filter(t=>t.title.startsWith("ROB:"));
  const atlasTasks = todo.filter(t=>t.title.startsWith("ATLAS:")||t.title.startsWith("MANUS:"));
  const otherTasks = todo.filter(t=>!t.title.startsWith("ROB:")&&!t.title.startsWith("ATLAS:")&&!t.title.startsWith("MANUS:"));
  const stages = ["new","contacted","demo","proposal","won","lost"];

  if (loading) return <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg-base)"}}><div style={{width:32,height:32,border:"3px solid var(--border-default)",borderTopColor:"var(--gold)",borderRadius:"50%",animation:"spin 1s linear infinite"}}/></div>;

  const navItems = [
    {id:"overview",label:"Dashboard"},
    {id:"pipeline",label:"Pipeline"},
    {id:"reps",label:"Sales Reps"},
    {id:"tasks",label:"Tasks"},
  ];

  return (
    <><style dangerouslySetInnerHTML={{__html: DASH_CSS}}/><div className="dash-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polyline points="15,70 50,25 85,70" stroke="#D4AF37" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="50" cy="25" r="4" fill="#D4AF37"/><line x1="50" y1="70" x2="50" y2="45" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round"/></svg>
          <span><strong>Luxe</strong>Lead<span className="pro">Pro</span></span>
        </div>
        <div className="sidebar-section">Main</div>
        <ul className="sidebar-nav">
          {navItems.map(n=>(
            <li key={n.id}><a href="#" className={tab===n.id?"active":""} onClick={e=>{e.preventDefault();setTab(n.id)}}>{n.label}</a></li>
          ))}
        </ul>
        <div className="sidebar-section">Actions</div>
        <ul className="sidebar-nav">
          <li><a href="#" onClick={async e=>{e.preventDefault();const r=await fetch("/api/briefing");if(r.ok)alert("Briefing sent successfully!");else alert("Failed to send briefing")}}>Send Briefing</a></li>
          <li><a href="#" onClick={async e=>{e.preventDefault();await fetch("/api/dashboard-logout",{method:"POST"});window.location.href="/dashboard/login"}}>Sign Out</a></li>
        </ul>
      </aside>

      <div className="main">
        <div className="dash-header">
          <div>
            <h1>{tab==="overview"?"Command Center":tab==="pipeline"?"Lead Pipeline":tab==="reps"?"Sales Reps":"Launch Checklist"}</h1>
            <div className="date">{new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>
          </div>
        </div>

        {tab==="overview"&&(<>
          <div className="kpi-grid">
            <div className="kpi-card"><div className="label">Monthly Revenue</div><div className="value gold">$0</div><div className="change">Pre-launch</div></div>
            <div className="kpi-card"><div className="label">Total Leads</div><div className="value">{leads.length}</div><div className="change">{leads.filter(l=>l.current_stage==="won").length} won</div></div>
            <div className="kpi-card"><div className="label">Active Reps</div><div className="value">{reps.filter(r=>r.status==="active").length}</div><div className="change">{reps.length} total</div></div>
            <div className="kpi-card"><div className="label">Open Tasks</div><div className="value gold">{todo.length}</div><div className="change">{done.length} completed</div></div>
          </div>
          <div className="content-grid">
            <div className="panel">
              <div className="panel-header"><h3>Recent Leads</h3><a href="#" onClick={e=>{e.preventDefault();setTab("pipeline")}}>View All</a></div>
              {leads.slice(0,6).map(l=>(<div className="lead-item" key={l.id}><div className="lead-avatar">{(l.full_name||"?")[0]}</div><div className="lead-info"><div className="lead-name">{l.full_name||"Unknown"}</div><div className="lead-detail">{l.email}{l.market_area?` · ${l.market_area}`:""}</div></div><span className={l.current_stage==="won"?"badge-active":l.current_stage==="demo"?"badge-warm":"badge-hot"}>{l.current_stage||"new"}</span></div>))}
              {leads.length===0&&<div style={{padding:20,textAlign:"center",color:"var(--text-muted)",fontSize:13}}>No leads yet</div>}
            </div>
            <div className="panel">
              <div className="panel-header"><h3>Urgent Tasks</h3><a href="#" onClick={e=>{e.preventDefault();setTab("tasks")}}>View All</a></div>
              {todo.filter(t=>t.priority==="urgent"||t.priority==="high").slice(0,6).map(t=>(<div className="task-item" key={t.id}><button className="task-check" onClick={()=>toggleTask(t.id,t.status)}/><span className="task-text">{t.title.replace(/^(ROB|ATLAS|MANUS): /,"")}</span><span className={"task-priority priority-"+t.priority}>{t.priority}</span></div>))}
            </div>
          </div>
        </>)}

        {tab==="pipeline"&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12}}>
            {stages.map(s=>{const sl=leads.filter(l=>(l.current_stage||"new")===s);return(
              <div className="panel" key={s}><div className="panel-header"><h3 style={{textTransform:"uppercase",fontSize:11,letterSpacing:1}}>{s}</h3><span style={{fontSize:11,color:"var(--text-muted)"}}>{sl.length}</span></div>
              {sl.slice(0,8).map(l=>(<div className="lead-item" key={l.id} style={{padding:"10px 14px"}}><div className="lead-info"><div className="lead-name" style={{fontSize:13}}>{l.full_name||"Unknown"}</div><div className="lead-detail">{l.email}</div></div></div>))}
              {sl.length===0&&<div style={{padding:16,textAlign:"center",color:"var(--text-muted)",fontSize:12}}>Empty</div>}
              </div>
            )})}
          </div>
        )}

        {tab==="reps"&&(
          <div>
            {reps.length===0?<div className="panel" style={{padding:48,textAlign:"center"}}><div style={{fontSize:14,color:"var(--text-muted)"}}>No sales reps yet. Post a job listing to hire your first rep.</div></div>
            :<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>{reps.map(r=>(<div className="kpi-card" key={r.id}><div className="lead-name">{r.name}</div><div className="lead-detail">{r.email}</div><div style={{marginTop:12,display:"flex",gap:16}}><div><div className="value" style={{fontSize:20}}>{leads.filter(l=>l.assigned_rep_id===r.id).length}</div><div className="label">Leads</div></div><div><div className="value" style={{fontSize:20}}>{activities.filter(a=>a.rep_id===r.id).length}</div><div className="label">Activities</div></div></div></div>))}</div>}
          </div>
        )}

        {tab==="tasks"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{fontSize:13,color:"var(--text-muted)"}}>{done.length}/{tasks.length} complete ({tasks.length?Math.round(done.length/tasks.length*100):0}%)</div>
            </div>
            <div style={{width:"100%",height:8,background:"var(--bg-elevated)",borderRadius:4,marginBottom:32}}><div style={{width:`${tasks.length?done.length/tasks.length*100:0}%`,height:8,background:"var(--gold)",borderRadius:4,transition:"width .3s"}}/></div>

            {robTasks.length>0&&<><div style={{fontSize:10,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase" as const,color:"var(--gold)",marginBottom:12}}>Your Tasks (Rob)</div>
            <div className="panel" style={{marginBottom:24}}>{robTasks.map(t=>(<div className="task-item" key={t.id} style={{flexWrap:"wrap"}}><button className="task-check" onClick={()=>toggleTask(t.id,t.status)}/><div style={{flex:1,minWidth:0}}><span className="task-text">{t.title.replace("ROB: ","")}</span>{t.description&&<div style={{fontSize:12,color:"var(--text-muted)",marginTop:4,lineHeight:1.5}}>{t.description}</div>}</div><span className={"task-priority priority-"+t.priority}>{t.priority}</span></div>))}</div></>}

            {atlasTasks.length>0&&<><div style={{fontSize:10,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase" as const,color:"var(--text-muted)",marginBottom:12}}>Atlas (AI) Tasks</div>
            <div className="panel" style={{marginBottom:24}}>{atlasTasks.map(t=>(<div className="task-item" key={t.id} style={{flexWrap:"wrap"}}><button className="task-check" onClick={()=>toggleTask(t.id,t.status)}/><div style={{flex:1,minWidth:0}}><span className="task-text">{t.title.replace("ATLAS: ","").replace("MANUS: ","")}</span>{t.description&&<div style={{fontSize:12,color:"var(--text-muted)",marginTop:4,lineHeight:1.5}}>{t.description}</div>}</div><span className={"task-priority priority-"+t.priority}>{t.priority}</span></div>))}</div></>}

            {otherTasks.length>0&&<><div style={{fontSize:10,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase" as const,color:"var(--text-muted)",marginBottom:12}}>General</div>
            <div className="panel" style={{marginBottom:24}}>{otherTasks.map(t=>(<div className="task-item" key={t.id}><button className="task-check" onClick={()=>toggleTask(t.id,t.status)}/><span className="task-text">{t.title}</span><span className={"task-priority priority-"+t.priority}>{t.priority}</span></div>))}</div></>}

            {done.length>0&&<><div style={{fontSize:10,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase" as const,color:"var(--text-muted)",marginBottom:12}}>Completed ({done.length})</div>
            <div className="panel" style={{marginBottom:24}}>{done.map(t=>(<div className="task-item" key={t.id} style={{opacity:.5}}><button className="task-check done" onClick={()=>toggleTask(t.id,t.status)}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></button><span className="task-text done">{t.title.replace(/^(ROB|ATLAS|MANUS): /,"")}</span></div>))}</div></>}

            <div className="panel"><div className="add-task-row"><input placeholder="Add a task (prefix ROB: or ATLAS:)" value={newTask} onChange={e=>setNewTask(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTask()}/><select value={taskPri} onChange={e=>setTaskPri(e.target.value)}><option value="urgent">Urgent</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select><button className="btn-gold" onClick={addTask} style={{padding:"8px 16px",fontSize:13}}>Add</button></div></div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
