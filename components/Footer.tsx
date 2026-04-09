import Link from "next/link";

export function Footer() {
  return (
    <footer style={{ background: '#050B14' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <svg className="w-7 h-7" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polyline points="15,70 50,25 85,70" stroke="#D4AF37" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="50" cy="25" r="4" fill="#D4AF37"/>
                <line x1="50" y1="70" x2="50" y2="45" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round"/>
              </svg>
              <span className="text-lg text-white" style={{ letterSpacing: '-0.3px' }}>
                <strong>Luxe</strong>Lead<span style={{ color: '#D4AF37', fontWeight: 700 }}>Pro</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
              AI-powered lead intelligence and generation for luxury real estate agents. Close more deals, faster.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: '#64748B' }}>Product</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/pricing', label: 'Pricing' },
                { href: '/territory', label: 'Territories' },
                { href: '/demo', label: 'Demo' },
                { href: '/agent/login', label: 'Agent Login' },
                { href: '/manager/login', label: 'Manager Login' },
              ].map(link => (
                <li key={link.href}><Link href={link.href} className="transition-colors duration-200 hover:text-white" style={{ color: '#94A3B8' }}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: '#64748B' }}>Company</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
                { href: '/compliance', label: 'Compliance' },
              ].map(link => (
                <li key={link.href}><Link href={link.href} className="transition-colors duration-200 hover:text-white" style={{ color: '#94A3B8' }}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: '#64748B' }}>Contact</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="mailto:support@luxeleadpro.com" className="transition-colors hover:text-white" style={{ color: '#94A3B8' }}>support@luxeleadpro.com</a></li>
              <li><a href="mailto:hello@luxeleadpro.com" className="transition-colors hover:text-white" style={{ color: '#94A3B8' }}>hello@luxeleadpro.com</a></li>
            </ul>
            <div className="mt-6">
              <Link href="https://calendly.com/robopdesigns/strategy-call" className="inline-block px-5 py-2.5 text-sm font-semibold rounded-md transition-all duration-200 hover:shadow-md hover:-translate-y-0.5" style={{ background: '#D4AF37', color: '#0A192F' }}>
                Book a Strategy Call
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8" style={{ borderTop: '1px solid #1E293B' }}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm" style={{ color: '#64748B' }}>© 2026 LuxeLeadPro LLC. All rights reserved.</p>
            <div className="flex gap-6">
              {['Twitter', 'LinkedIn', 'Instagram'].map(s => (
                <a key={s} href="#" className="text-sm transition-colors hover:text-white" style={{ color: '#64748B' }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
