"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Header() {
  const { user, profile, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-[#FDFBF7]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* ── LOGO ──────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <svg className="w-9 h-9 flex-shrink-0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <rect width="512" height="512" rx="64" fill="#0A192F"/>
              <g transform="translate(256, 270)">
                <line x1="-104" y1="56" x2="0" y2="-104" stroke="#D4AF37" strokeWidth="20" strokeLinecap="round"/>
                <line x1="104" y1="56" x2="0" y2="-104" stroke="#D4AF37" strokeWidth="20" strokeLinecap="round"/>
                <line x1="-104" y1="56" x2="104" y2="56" stroke="#D4AF37" strokeWidth="8" strokeLinecap="round" opacity="0.35"/>
                <line x1="-64" y1="-8" x2="64" y2="-8" stroke="#D4AF37" strokeWidth="7" strokeLinecap="round" opacity="0.5"/>
                <circle cx="0" cy="-104" r="20" fill="#D4AF37"/>
                <circle cx="0" cy="-104" r="8" fill="#0A192F"/>
              </g>
            </svg>
            <div className="flex flex-col leading-none">
              <span className="text-[17px] font-bold tracking-tight text-[#1A1A1A] group-hover:text-[#D4AF37] transition">
                LuxeLeadPro
              </span>
              <span className="text-[10px] font-medium tracking-widest text-[#D4AF37] uppercase">
                AI Lead Intelligence
              </span>
            </div>
          </Link>

          {/* ── DESKTOP NAV ───────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-[#D4AF37] font-medium transition text-sm">
              Home
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-[#D4AF37] font-medium transition text-sm">
              Pricing
            </Link>

            {user && profile ? (
              <>
                <Link
                  href={profile.role === "manager" ? "/manager" : "/agent"}
                  className="text-gray-700 hover:text-[#D4AF37] font-medium transition text-sm"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/agent/login"
                  className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-[#D4AF37]/30 transition font-medium"
                >
                  Agent Login
                </Link>
                <Link
                  href="https://calendly.com/robopdesigns/strategy-call"
                  className="px-4 py-2 text-sm rounded-md bg-[#D4AF37] text-white font-medium hover:bg-[#B5952F] hover:shadow-md hover:-translate-y-0.5 transition-all shadow-sm"
                >
                  Request Demo
                </Link>
              </>
            )}
          </nav>

          {/* ── MOBILE CTA ────────────────────────────────────── */}
          <div className="flex items-center gap-2 md:hidden">
            <a href="https://calendly.com/robopdesigns/strategy-call" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm bg-[#D4AF37] text-white font-semibold rounded-lg">
              Book a Call
            </a>

          {/* ── MOBILE HAMBURGER ──────────────────────────────── */}
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>
          </div>
        </div>

        {/* ── MOBILE MENU ───────────────────────────────────── */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-1">
            <Link href="/" onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-gray-900 font-medium hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 rounded-lg transition text-sm">
              Home
            </Link>
            <Link href="/pricing" onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-gray-900 font-medium hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 rounded-lg transition text-sm">
              Pricing
            </Link>

            {user && profile ? (
              <>
                <Link href={profile.role === "manager" ? "/manager" : "/agent"} onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-gray-900 font-medium hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 rounded-lg transition text-sm">
                  Dashboard
                </Link>
                <button onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-gray-900 font-medium hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 rounded-lg transition text-sm">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/agent/login" onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-gray-900 font-medium hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 rounded-lg transition text-sm">
                  Agent Login
                </Link>
                <div className="px-4 pt-2 pb-1">
                  <Link href="/manager/login" onClick={() => setMenuOpen(false)}
                    className="block w-full text-center py-3 bg-[#D4AF37] text-white font-semibold rounded-xl text-sm hover:bg-[#B5952F] transition">
                    Manager Login
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
