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
    <header className="sticky top-0 z-50 border-b border-purple-700 bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <svg className="w-8 h-8" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" fill="none" stroke="#7c3aed" strokeWidth="1.5" opacity="0.2"/>
              <path d="M 35 65 L 50 35 L 65 65" fill="none" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M 50 35 L 50 65" fill="none" stroke="#d946ef" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span className="font-display text-xl font-semibold text-purple-900 hidden sm:inline">
              LuxeLeadPro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-900 hover:text-purple-600 font-medium transition text-sm"
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className="text-gray-900 hover:text-purple-600 font-medium transition text-sm"
            >
              Pricing
            </Link>

            {user && profile ? (
              <>
                <Link
                  href={profile.role === "manager" ? "/manager" : "/agent"}
                  className="text-gray-900 hover:text-purple-600 font-medium transition text-sm"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-900 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/agent/login"
                  className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-900 hover:bg-gray-100 transition font-medium"
                >
                  Agent Login
                </Link>
                <Link
                  href="/manager/login"
                  className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition"
                >
                  Manager Login
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-800 space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 text-neutral-400 hover:text-purple-400 hover:bg-gray-50 rounded"
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className="block px-4 py-2 text-neutral-400 hover:text-purple-400 hover:bg-gray-50 rounded"
            >
              Pricing
            </Link>
            {user && profile ? (
              <>
                <Link
                  href={profile.role === "manager" ? "/manager" : "/agent"}
                  className="block px-4 py-2 text-neutral-400 hover:text-purple-400 hover:bg-gray-50 rounded"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-neutral-400 hover:text-purple-400 hover:bg-gray-50 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/agent/login"
                  className="block px-4 py-2 text-neutral-400 hover:text-purple-400 hover:bg-gray-50 rounded"
                >
                  Agent Login
                </Link>
                <Link
                  href="/manager/login"
                  className="block px-4 py-2 text-neutral-400 hover:text-purple-400 hover:bg-gray-50 rounded"
                >
                  Manager Login
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}


