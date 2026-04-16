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
    <><style dangerouslySetInnerHTML={{__html: DASH_CSS}}/><div className="dash-layout">
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
    </div></>
  );
}
