"use client";
import { useEffect, useState } from "react";
import "../manus-dash.css";

type Rep = { id:string; name:string; email:string };
type Lead = { id:string; full_name:string|null; email:string|null; phone:string|null; market_area:string|null; challenge:string|null; current_stage:string|null };
type Activity = { id:string; type:string; notes:string|null; created_at:string };

export default function RepPortal() {
  const [tab,setTab]=useState("dashboard");
  const [rep,setRep]=useState<Rep|null>(null);
  const [leads,setLeads]=useState<Lead[]>([]);
  const [activities,setActivities]=useState<Activity[]>([]);
  const [loading,setLoading]=useState(true);
  const [actForm,setActForm]=useState({type:"call",notes:""});
  const [prospectForm,setProspectForm]=useState({name:"",email:"",phone:"",territory:"",notes:"",stage:"new"});
  const [showAdd,setShowAdd]=useState(false);

  async function load(){const r=await fetch("/api/rep/data");if(!r.ok){window.location.href="/rep/login";return;}const d=await r.json();setRep(d.rep);setLeads(d.leads||[]);setActivities(d.activities||[]);setLoading(false);}
  useEffect(()=>{load();},[]);

  async function logActivity(){if(!actForm.notes.trim())return;await fetch("/api/rep/data",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"log_activity",...actForm})});setActForm({type:"call",notes:""});load();}
  async function addProspect(){if(!prospectForm.name.trim())return;await fetch("/api/rep/data",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"add_prospect",...prospectForm})});setProspectForm({name:"",email:"",phone:"",territory:"",notes:"",stage:"new"});setShowAdd(false);load();}
  async function updateStage(id:string,stage:string){await fetch("/api/rep/data",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"update_stage",id,stage})});load();}

  if(loading)return<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg-base)"}}><div style={{width:32,height:32,border:"3px solid var(--border-default)",borderTopColor:"var(--gold)",borderRadius:"50%",animation:"spin 1s linear infinite"}}/></div>;

  const navItems=[{id:"dashboard",label:"Dashboard"},{id:"prospects",label:"Prospects"},{id:"scripts",label:"Scripts & Training"},{id:"goals",label:"Goals & Rewards"}];

  return(
    <div className="dash-layout">
      <aside className="sidebar">
        <div className="sidebar-logo"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polyline points="15,70 50,25 85,70" stroke="#D4AF37" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="50" cy="25" r="4" fill="#D4AF37"/><line x1="50" y1="70" x2="50" y2="45" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round"/></svg><span><strong>Luxe</strong>Lead<span className="pro">Pro</span></span></div>
        <div className="sidebar-section">Main</div>
        <ul className="sidebar-nav">{navItems.map(n=>(<li key={n.id}><a href="#" className={tab===n.id?"active":""} onClick={e=>{e.preventDefault();setTab(n.id)}}>{n.label}</a></li>))}</ul>
        <div className="sidebar-section">Account</div>
        <ul className="sidebar-nav"><li><a href="#" onClick={e=>{e.preventDefault();document.cookie="rep_auth=;path=/;max-age=0";window.location.href="/"}}>Sign Out</a></li></ul>
      </aside>

      <div className="main">
        <div className="dash-header"><div><h1>Welcome, {rep?.name||"Rep"}</h1><div className="date">{new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div></div></div>

        {tab==="dashboard"&&(<>
          <div className="kpi-grid">
            <div className="kpi-card"><div className="label">My Prospects</div><div className="value">{leads.length}</div></div>
            <div className="kpi-card"><div className="label">Activities</div><div className="value">{activities.length}</div></div>
            <div className="kpi-card"><div className="label">Demos Booked</div><div className="value gold">{activities.filter(a=>a.type==="demo").length}</div></div>
            <div className="kpi-card"><div className="label">Deals Closed</div><div className="value gold">{leads.filter(l=>l.current_stage==="won").length}</div></div>
          </div>
          <div className="content-grid">
            <div className="panel">
              <div className="panel-header"><h3>Log Activity</h3></div>
              <div style={{padding:20}}>
                <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>{["call","email","demo","meeting","follow_up"].map(t=>(<button key={t} onClick={()=>setActForm(p=>({...p,type:t}))} style={{padding:"6px 14px",borderRadius:8,fontSize:12,fontWeight:600,border:"1px solid var(--border-default)",background:actForm.type===t?"var(--gold-muted)":"var(--bg-base)",color:actForm.type===t?"var(--gold)":"var(--text-muted)",cursor:"pointer"}}>{t}</button>))}</div>
                <div style={{display:"flex",gap:8}}><input placeholder="What did you do?" value={actForm.notes} onChange={e=>setActForm(p=>({...p,notes:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&logActivity()} style={{flex:1,height:40,padding:"0 12px",background:"var(--bg-base)",border:"1px solid var(--border-default)",borderRadius:8,fontSize:14,color:"var(--text-primary)",outline:"none"}}/><button className="btn-gold" onClick={logActivity} style={{padding:"8px 20px",fontSize:13}}>Log</button></div>
              </div>
            </div>
            <div className="panel">
              <div className="panel-header"><h3>Recent Activity</h3></div>
              {activities.slice(0,6).map(a=>(<div className="lead-item" key={a.id}><div className="lead-info"><div className="lead-name" style={{fontSize:13}}>{a.type}: {a.notes||"No notes"}</div><div className="lead-detail">{new Date(a.created_at).toLocaleString()}</div></div></div>))}
              {activities.length===0&&<div style={{padding:20,textAlign:"center",color:"var(--text-muted)",fontSize:13}}>No activities yet. Start logging calls!</div>}
            </div>
          </div>
        </>)}

        {tab==="prospects"&&(<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><div/><button className="btn-gold" onClick={()=>setShowAdd(true)}>+ Add Prospect</button></div>
          {showAdd&&<div className="panel" style={{padding:20,marginBottom:16}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <input placeholder="Full Name *" value={prospectForm.name} onChange={e=>setProspectForm(p=>({...p,name:e.target.value}))} style={{height:40,padding:"0 12px",background:"var(--bg-base)",border:"1px solid var(--border-default)",borderRadius:8,fontSize:14,outline:"none"}}/>
              <input placeholder="Email" value={prospectForm.email} onChange={e=>setProspectForm(p=>({...p,email:e.target.value}))} style={{height:40,padding:"0 12px",background:"var(--bg-base)",border:"1px solid var(--border-default)",borderRadius:8,fontSize:14,outline:"none"}}/>
              <input placeholder="Phone" value={prospectForm.phone} onChange={e=>setProspectForm(p=>({...p,phone:e.target.value}))} style={{height:40,padding:"0 12px",background:"var(--bg-base)",border:"1px solid var(--border-default)",borderRadius:8,fontSize:14,outline:"none"}}/>
              <input placeholder="Territory / Market" value={prospectForm.territory} onChange={e=>setProspectForm(p=>({...p,territory:e.target.value}))} style={{height:40,padding:"0 12px",background:"var(--bg-base)",border:"1px solid var(--border-default)",borderRadius:8,fontSize:14,outline:"none"}}/>
            </div>
            <textarea placeholder="Notes..." value={prospectForm.notes} onChange={e=>setProspectForm(p=>({...p,notes:e.target.value}))} rows={2} style={{width:"100%",marginTop:12,padding:12,background:"var(--bg-base)",border:"1px solid var(--border-default)",borderRadius:8,fontSize:14,outline:"none",resize:"none"}}/>
            <div style={{display:"flex",gap:8,marginTop:12}}><button className="btn-gold" onClick={addProspect}>Save</button><button onClick={()=>setShowAdd(false)} style={{padding:"8px 20px",background:"var(--bg-base)",border:"1px solid var(--border-default)",borderRadius:8,fontSize:13,cursor:"pointer"}}>Cancel</button></div>
          </div>}
          <div className="panel">
            {leads.map(l=>(<div className="lead-item" key={l.id}><div className="lead-avatar">{(l.full_name||"?")[0]}</div><div className="lead-info"><div className="lead-name">{l.full_name||"Unknown"}</div><div className="lead-detail">{l.email}{l.market_area?" · "+l.market_area:""}</div>{l.challenge&&<div style={{fontSize:12,color:"var(--text-muted)",marginTop:4}}>{l.challenge}</div>}</div>
              <select value={l.current_stage||"new"} onChange={e=>updateStage(l.id,e.target.value)} style={{fontSize:11,fontWeight:700,padding:"4px 8px",borderRadius:100,border:"1px solid var(--border-default)",background:"var(--bg-base)",color:"var(--text-secondary)",cursor:"pointer"}}><option value="new">New</option><option value="contacted">Contacted</option><option value="demo">Demo</option><option value="proposal">Proposal</option><option value="won">Won</option><option value="lost">Lost</option></select>
            </div>))}
            {leads.length===0&&<div style={{padding:40,textAlign:"center",color:"var(--text-muted)"}}>No prospects yet. Click + Add Prospect to start.</div>}
          </div>
        </>)}

        {tab==="scripts"&&(<>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:32}}>
            {[{title:"Pitch Deck",desc:"9-slide presentation",href:"/training/pitch-deck.html"},{title:"Cold Outreach Templates",desc:"Email, LinkedIn, phone scripts",href:"/training/outreach-templates.html"},{title:"Quick Start Guide",desc:"Your first 4 weeks",href:"/training/quick-start.html"},{title:"Commission Structure",desc:"How much you earn per tier",href:"/training/commission-structure.html"},{title:"Competitive Positioning",desc:"Why we beat the competition",href:"/training/competitive-positioning.html"},{title:"Welcome Kit (for clients)",desc:"Send after Territory close",href:"/docs/founding-welcome.html"}].map((r,i)=>(
              <a key={i} href={r.href} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"flex-start",gap:16,padding:20,background:"var(--bg-surface)",border:"1px solid var(--border-default)",borderRadius:12,textDecoration:"none",transition:"all .2s"}}><div style={{width:40,height:40,background:"var(--gold-muted)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:"var(--gold)",fontWeight:700}}>&#9830;</div><div><div style={{fontSize:14,fontWeight:600,color:"var(--text-primary)"}}>{r.title}</div><div style={{fontSize:12,color:"var(--text-muted)",marginTop:2}}>{r.desc}</div></div></a>
            ))}
          </div>
          <h3 style={{fontSize:16,fontWeight:700,color:"var(--text-primary)",marginBottom:16}}>Talk Tracks</h3>
          {[{t:"Opening Pitch",c:"Hi [Name], this is [Your Name] from LuxeLeadPro. We're the only AI platform that both scores AND delivers verified luxury buyer leads directly to agents like you. Do you have 2 minutes?"},{t:"Territory Close (Best)",c:"Here's what our top agents are doing — they're locking in a territory. For $1,499/month, you own your ZIP codes exclusively. Nobody else gets leads in your area. We deliver 30-50 leads/month, our AI sends the first touch automatically. One closed deal pays for 6+ months."},{t:"Objection: Too Expensive",c:"What's one luxury deal worth in commission? $15K? $25K? Our Intelligence plan is $249/month — that's $8/day. If it helps you close just ONE extra deal this year, that's a 50-100x return."},{t:"Objection: Already Use Zillow",c:"Zillow sells the same lead to 3-5 agents. With our Territory plan, you're the ONLY agent getting leads in your area. Exclusivity is the whole game in luxury."}].map((s,i)=>(
            <div key={i} className="panel" style={{padding:20,marginBottom:12}}><div style={{fontSize:14,fontWeight:700,color:"var(--text-primary)",marginBottom:8}}>{s.t}</div><div style={{fontSize:13,color:"var(--text-secondary)",lineHeight:1.7}}>{s.c}</div></div>
          ))}
        </>)}

        {tab==="goals"&&(<>
          <div className="kpi-grid" style={{gridTemplateColumns:"repeat(3,1fr)"}}>
            <div className="kpi-card" style={{textAlign:"center"}}><div className="label">This Month</div><div className="value gold">$0</div><div style={{fontSize:12,color:"var(--text-muted)"}}>Commissions</div></div>
            <div className="kpi-card" style={{textAlign:"center"}}><div className="label">Active Customers</div><div className="value">0</div><div style={{fontSize:12,color:"var(--text-muted)"}}>3+ months active</div></div>
            <div className="kpi-card" style={{textAlign:"center"}}><div className="label">Next Milestone</div><div className="value">10</div><div style={{fontSize:12,color:"var(--text-muted)"}}>for $500 bonus</div></div>
          </div>
          <h3 style={{fontSize:16,fontWeight:700,color:"var(--text-primary)",margin:"24px 0 16px"}}>Commission Rates</h3>
          <div className="panel" style={{marginBottom:24}}>
            {[{plan:"Intelligence ($249/mo)",earn:"$75/mo recurring"},{plan:"Generation ($749/mo)",earn:"$225/mo recurring"},{plan:"Territory ($1,499/mo)",earn:"$450/mo recurring"}].map((c,i)=>(<div className="lead-item" key={i}><div className="lead-info"><div className="lead-name">{c.plan}</div></div><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:14,fontWeight:700,color:"var(--gold)"}}>{c.earn}</div></div>))}
          </div>
          <h3 style={{fontSize:16,fontWeight:700,color:"var(--text-primary)",margin:"0 0 16px"}}>Incentive Bonuses</h3>
          {[{m:"10 Active Customers (3+ months)",b:"$500 Cash Bonus"},{m:"25 Active Customers (3+ months)",b:"$1,500 + 5% raise"},{m:"50 Active Customers (3+ months)",b:"$5,000 + Senior Rep"},{m:"100 Active Customers (3+ months)",b:"$15,000 + Revenue Share + Team Lead"}].map((t,i)=>(
            <div className="panel" key={i} style={{display:"flex",alignItems:"center",padding:"16px 20px",marginBottom:8}}><div style={{flex:1}}><div style={{fontSize:14,fontWeight:700,color:"var(--text-primary)"}}>{t.m}</div><div style={{fontSize:13,color:"var(--gold)"}}>{t.b}</div></div><span style={{fontSize:10,fontWeight:700,padding:"4px 12px",borderRadius:100,background:"var(--bg-elevated)",color:"var(--text-muted)"}}>LOCKED</span></div>
          ))}
        </>)}
      </div>
    </div>
  );
}
