"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

interface LoginLayoutProps {
  title: string;
  subtitle: string;
  onSubmit: (email: string, password: string) => Promise<string | null>;
  redirectTo: string;
  altLink?: { text: string; href: string };
  showEmailField?: boolean;
}

export function LoginLayout({ title, subtitle, onSubmit, redirectTo, altLink, showEmailField = true }: LoginLayoutProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const err = await onSubmit(email, password);
    if (err) { setError(err); setLoading(false); }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16 relative" style={{ background: 'linear-gradient(135deg, #F5F0E8, #EDE8DD)' }}>
        <div className="max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-12">
            <svg className="w-10 h-10" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <polyline points="15,70 50,25 85,70" stroke="#D4AF37" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="50" cy="25" r="4" fill="#D4AF37"/>
              <line x1="50" y1="70" x2="50" y2="45" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round"/>
            </svg>
            <span className="text-xl" style={{ color: '#0A192F', letterSpacing: '-0.3px' }}>
              <strong>Luxe</strong>Lead<span style={{ color: '#D4AF37', fontWeight: 700 }}>Pro</span>
            </span>
          </div>

          <h1 className="font-display text-4xl font-bold leading-tight mb-6" style={{ color: '#0A192F' }}>
            Welcome back.<br />Your leads are waiting.
          </h1>

          <div className="space-y-4 mt-10">
            {[
              { value: '12', label: 'Hot Leads Today' },
              { value: '92', label: 'Top AI Score' },
              { value: '$2.8M', label: 'Pipeline Value' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-2xl font-bold" style={{ color: '#D4AF37', fontFamily: "'JetBrains Mono', monospace" }}>{stat.value}</span>
                <span className="text-sm font-medium" style={{ color: '#4A5568' }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12" style={{ background: 'var(--bg-surface, #FFFFFF)' }}>
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <svg className="w-8 h-8" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <polyline points="15,70 50,25 85,70" stroke="#D4AF37" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="50" cy="25" r="4" fill="#D4AF37"/>
              <line x1="50" y1="70" x2="50" y2="45" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round"/>
            </svg>
            <span className="text-lg" style={{ color: '#0A192F' }}>
              <strong>Luxe</strong>Lead<span style={{ color: '#D4AF37', fontWeight: 700 }}>Pro</span>
            </span>
          </div>

          <h2 className="font-display text-3xl font-bold mb-2" style={{ color: 'var(--text-primary, #0A192F)' }}>{title}</h2>
          <p className="text-sm mb-8" style={{ color: 'var(--text-secondary, #4A5568)' }}>{subtitle}</p>

          {error && (
            <div className="mb-6 p-4 rounded-lg text-sm font-medium" style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {showEmailField && (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--text-secondary, #4A5568)' }}>Email Address</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                  className="w-full h-12 rounded-md px-4 text-base outline-none transition-all duration-200"
                  style={{ background: 'var(--bg-base, #FAFAF8)', border: '1px solid var(--border-default, #E8E5DE)', color: 'var(--text-primary, #0A192F)' }}
                />
              </div>
            )}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--text-secondary, #4A5568)' }}>Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                className="w-full h-12 rounded-md px-4 text-base outline-none transition-all duration-200"
                style={{ background: 'var(--bg-base, #FAFAF8)', border: '1px solid var(--border-default, #E8E5DE)', color: 'var(--text-primary, #0A192F)' }}
              />
            </div>
            <button type="submit" disabled={loading}
              className="w-full h-12 rounded-md font-semibold text-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50"
              style={{ background: '#D4AF37', color: '#0A192F' }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {altLink && (
            <p className="text-sm text-center mt-6" style={{ color: 'var(--text-muted, #718096)' }}>
              {altLink.text.split('?')[0]}?{' '}
              <Link href={altLink.href} className="font-medium hover:underline" style={{ color: '#D4AF37' }}>
                {altLink.text.split('?')[1] || 'Click here'}
              </Link>
            </p>
          )}

          <div className="mt-8 text-center">
            <Link href="/" className="text-sm font-medium hover:underline" style={{ color: 'var(--text-muted, #718096)' }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
