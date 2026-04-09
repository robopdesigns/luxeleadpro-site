"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50" style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid #F1F5F9' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <svg className="w-8 h-8" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <polyline points="15,70 50,25 85,70" stroke="#D4AF37" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="50" cy="25" r="4" fill="#D4AF37"/>
              <line x1="50" y1="70" x2="50" y2="45" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round"/>
            </svg>
            <span className="text-lg" style={{ color: '#0A192F', letterSpacing: '-0.3px' }}>
              <strong>Luxe</strong>Lead<span style={{ color: '#D4AF37', fontWeight: 700 }}>Pro</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: '/', label: 'Home' },
              { href: '/pricing', label: 'Pricing' },
              { href: '/territory', label: 'Territories' },
              { href: '/agent/login', label: 'Agent Login' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="text-sm font-medium transition-colors duration-200 hover:text-[#0A192F]" style={{ color: '#4A5568' }}>
                {link.label}
              </Link>
            ))}
            <Link href="https://calendly.com/robopdesigns/strategy-call" className="px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-0.5" style={{ background: '#D4AF37', color: '#0A192F' }}>
              Request Demo
            </Link>
          </nav>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <Link href="https://calendly.com/robopdesigns/strategy-call" className="px-4 py-2 text-sm font-semibold rounded-lg" style={{ background: '#D4AF37', color: '#0A192F' }}>
              Demo
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg hover:bg-gray-100 transition" aria-label="Menu">
              <svg className="w-5 h-5" fill="none" stroke="#0A192F" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                }
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t space-y-1" style={{ borderColor: '#F1F5F9' }}>
            {[
              { href: '/', label: 'Home' },
              { href: '/pricing', label: 'Pricing' },
              { href: '/territory', label: 'Territories' },
              { href: '/agent/login', label: 'Agent Login' },
              { href: '/manager/login', label: 'Manager Login' },
            ].map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-50 transition" style={{ color: '#0A192F' }}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
