"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const css = `.login-layout{display:grid;grid-template-columns:1fr 1fr;min-height:100vh}.brand-panel{background:linear-gradient(135deg,#F5F0E8 0%,#EDE8DD 100%);padding:48px;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden}.brand-panel::after{content:'';position:absolute;top:-100px;right:-100px;width:300px;height:300px;background:radial-gradient(circle,rgba(212,175,55,0.08) 0%,transparent 70%);border-radius:50%}.brand-panel h2{font-family:'Playfair Display',serif;font-size:36px;font-weight:700;line-height:1.2;color:#0A192F;margin-bottom:16px}.brand-panel .accent{color:#D4AF37}.brand-panel .sub{font-size:15px;line-height:1.7;color:#4A5568;margin-bottom:48px;max-width:360px}.login-stats{display:flex;gap:40px}.login-stat .value{font-family:'JetBrains Mono',monospace;font-size:28px;font-weight:700;color:#0A192F}.login-stat .value.gold{color:#D4AF37}.login-stat .label{font-size:12px;color:#718096;margin-top:2px}.form-panel{background:#FFFFFF;padding:48px;display:flex;flex-direction:column;justify-content:center;max-width:480px;margin:0 auto;width:100%}.form-panel h2{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:#0A192F;margin-bottom:6px}.form-sub{font-size:14px;color:#718096;margin-bottom:36px}.form-group{margin-bottom:20px}.form-group label{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#4A5568;margin-bottom:8px}.form-group input{width:100%;height:48px;padding:0 16px;background:#FAFAF8;border:1.5px solid #E8E5DE;border-radius:8px;font-size:14px;color:#0A192F;transition:all .2s;outline:none}.form-group input:focus{border-color:#D4AF37;box-shadow:0 0 0 3px rgba(212,175,55,0.15)}.btn-gold{width:100%;height:48px;background:#D4AF37;color:#0A192F;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s}.btn-gold:hover{background:#B5952F}.btn-gold:disabled{opacity:0.5}.form-footer{text-align:center;margin-top:24px;font-size:13px;color:#718096}.form-footer a{color:#D4AF37;font-weight:600}.error-msg{background:#FEF2F2;border:1px solid #FECACA;color:#DC2626;padding:12px 16px;border-radius:8px;font-size:13px;margin-bottom:20px}.logo-mark svg{width:40px;height:40px}@media(max-width:768px){.login-layout{grid-template-columns:1fr}.brand-panel{display:none}}`;

export default function RepLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const res = await fetch("/api/rep-login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      if (res.ok) { router.push("/rep"); return; }
      setError("Invalid email or password."); setLoading(false);
    } catch { setError("An error occurred."); setLoading(false); }
  }

  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
    <div className="login-layout">
      <div className="brand-panel">
        <div className="logo-mark" style={{ marginBottom: 48 }}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polyline points="15,70 50,25 85,70" stroke="#D4AF37" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="50" cy="25" r="4" fill="#D4AF37"/><line x1="50" y1="70" x2="50" y2="45" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round"/></svg>
        </div>
        <h2>Ready to <span className="accent">close</span>?<br/>Let&apos;s go.</h2>
        <p className="sub">Access your sales portal with scripts, training, prospect pipeline, and everything you need to sell LuxeLeadPro.</p>
        <div className="login-stats">
          <div className="login-stat"><div className="value gold">$450</div><div className="label">Per Territory Close</div></div>
          <div className="login-stat"><div className="value">30%</div><div className="label">First Month Bonus</div></div>
          <div className="login-stat"><div className="value gold">$12K+</div><div className="label">Top Rep Monthly</div></div>
        </div>
      </div>
      <div className="form-panel">
        <h2>Sales Rep Portal</h2>
        <p className="form-sub">Access your sales tools and pipeline</p>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Email Address</label><input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></div>
          <div className="form-group"><label>Password</label><input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" /></div>
          <button type="submit" className="btn-gold" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
        </form>
        <div className="form-footer"><a href="/" style={{ color: '#718096' }}>← Back to Home</a></div>
      </div>
    </div></>
  );
}
