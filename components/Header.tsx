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
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* ── LOGO ──────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Icon: solid filled diamond/arrow mark — clear at any size */}
            <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Solid purple rounded square bg */}
              <rect width="40" height="40" rx="10" fill="url(#logoGrad)"/>
              {/* Bold upward arrow / chevron — filled, not outline */}
              <path d="M20 10 L30 28 H10 Z" fill="white" opacity="0.15"/>
              <path d="M20 8 L31 27 H9 Z" fill="white" opacity="0.9"/>
              <rect x="18.5" y="21" width="3" height="9" rx="1.5" fill="white"/>
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed"/>
                  <stop offset="100%" stopColor="#c026d3"/>
                </linearGradient>
              </defs>
            </svg>

            {/* Wordmark */}
            <div className="flex flex-col leading-none">
              <span className="text-[17px] font-bold tracking-tight text-gray-900 group-hover:text-purple-700 transition">
                LuxeLeadPro
              </span>
              <span className="text-[10px] font-medium tracking-widest text-purple-500 uppercase">
                AI Lead Intelligence
              </span>
            </div>
          </Link>

          {/* ── DESKTOP NAV ───────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium transition text-sm">
              Home
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-purple-600 font-medium transition text-sm">
              Pricing
            </Link>

            {user && profile ? (
              <>
                <Link
                  href={profile.role === "manager" ? "/manager" : "/agent"}
                  className="text-gray-700 hover:text-purple-600 font-medium transition text-sm"
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
                  className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-purple-300 transition font-medium"
                >
                  Agent Login
                </Link>
                <Link
                  href="/manager/login"
                  className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition shadow-sm"
                >
                  Manager Login
                </Link>
              </>
            )}
          </nav>

          {/* ── MOBILE CTA ────────────────────────────────────── */}
          <div className="flex items-center gap-2 md:hidden">
            <a href="https://calendly.com/robopdesigns/strategy-call" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg">
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
              className="block px-4 py-3 text-gray-900 font-medium hover:text-purple-600 hover:bg-purple-50 rounded-lg transition text-sm">
              Home
            </Link>
            <Link href="/pricing" onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-gray-900 font-medium hover:text-purple-600 hover:bg-purple-50 rounded-lg transition text-sm">
              Pricing
            </Link>

            {user && profile ? (
              <>
                <Link href={profile.role === "manager" ? "/manager" : "/agent"} onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-gray-900 font-medium hover:text-purple-600 hover:bg-purple-50 rounded-lg transition text-sm">
                  Dashboard
                </Link>
                <button onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-gray-900 font-medium hover:text-purple-600 hover:bg-purple-50 rounded-lg transition text-sm">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/agent/login" onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-gray-900 font-medium hover:text-purple-600 hover:bg-purple-50 rounded-lg transition text-sm">
                  Agent Login
                </Link>
                <div className="px-4 pt-2 pb-1">
                  <Link href="/manager/login" onClick={() => setMenuOpen(false)}
                    className="block w-full text-center py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl text-sm hover:from-purple-700 hover:to-pink-700 transition">
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
