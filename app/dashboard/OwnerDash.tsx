"use client";
import { useEffect, useState } from "react";
import "../manus-dash.css";

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
    <div className="dash-layout">
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
          <li><a href="/api/briefing" target="_blank">Send Briefing</a></li>
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
  );
}
