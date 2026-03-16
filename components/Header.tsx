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
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center font-bold text-neutral-950">
              ✨
            </div>
            <span className="font-display text-xl font-semibold text-white hidden sm:inline">
              Luxe Lead
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-neutral-400 hover:text-yellow-400 transition text-sm"
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className="text-neutral-400 hover:text-yellow-400 transition text-sm"
            >
              Pricing
            </Link>

            {user && profile ? (
              <>
                <Link
                  href={profile.role === "manager" ? "/manager" : "/agent"}
                  className="text-neutral-400 hover:text-yellow-400 transition text-sm"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/agent/login"
                  className="px-4 py-2 text-sm rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition"
                >
                  Agent Login
                </Link>
                <Link
                  href="/manager/login"
                  className="px-4 py-2 text-sm rounded-lg bg-yellow-500 text-neutral-950 font-semibold hover:bg-yellow-400 transition"
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
              className="block px-4 py-2 text-neutral-400 hover:text-yellow-400 hover:bg-neutral-900 rounded"
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className="block px-4 py-2 text-neutral-400 hover:text-yellow-400 hover:bg-neutral-900 rounded"
            >
              Pricing
            </Link>
            {user && profile ? (
              <>
                <Link
                  href={profile.role === "manager" ? "/manager" : "/agent"}
                  className="block px-4 py-2 text-neutral-400 hover:text-yellow-400 hover:bg-neutral-900 rounded"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-neutral-400 hover:text-yellow-400 hover:bg-neutral-900 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/agent/login"
                  className="block px-4 py-2 text-neutral-400 hover:text-yellow-400 hover:bg-neutral-900 rounded"
                >
                  Agent Login
                </Link>
                <Link
                  href="/manager/login"
                  className="block px-4 py-2 text-neutral-400 hover:text-yellow-400 hover:bg-neutral-900 rounded"
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
