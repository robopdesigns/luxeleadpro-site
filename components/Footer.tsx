export function Footer() {
  return (
    <footer className="bg-[#050B14] text-white mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center font-bold text-sm text-white">L</div>
              <span className="text-lg font-bold">LuxeLeadPro</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI-powered lead intelligence and generation for luxury real estate agents. Close more deals, faster.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-widest">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/pricing" className="text-slate-400 hover:text-white transition">Pricing</a></li>
              <li><a href="/territory" className="text-slate-400 hover:text-white transition">Territories</a></li>
              <li><a href="/demo" className="text-slate-400 hover:text-white transition">Demo</a></li>
              <li><a href="/agent/login" className="text-slate-400 hover:text-white transition">Agent Login</a></li>
              <li><a href="/manager/login" className="text-slate-400 hover:text-white transition">Manager Login</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-widest">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/privacy" className="text-slate-400 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="/terms" className="text-slate-400 hover:text-white transition">Terms of Service</a></li>
              <li><a href="/compliance" className="text-slate-400 hover:text-white transition">Compliance</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-widest">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="mailto:support@luxeleadpro.com" className="text-slate-400 hover:text-white transition">support@luxeleadpro.com</a></li>
              <li><a href="mailto:hello@luxeleadpro.com" className="text-slate-400 hover:text-white transition">hello@luxeleadpro.com</a></li>
            </ul>
            <div className="mt-6">
              <a href="https://calendly.com/robopdesigns/strategy-call" className="inline-block px-5 py-2.5 bg-[#D4AF37] text-white text-sm font-medium rounded-md hover:bg-[#B5952F] transition-all shadow-sm">
                Book a Strategy Call
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">© 2026 LuxeLeadPro LLC. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-500 hover:text-white transition text-sm">Twitter</a>
              <a href="#" className="text-slate-500 hover:text-white transition text-sm">LinkedIn</a>
              <a href="#" className="text-slate-500 hover:text-white transition text-sm">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
