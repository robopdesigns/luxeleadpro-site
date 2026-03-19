export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Brand */}
          <div>
            <svg className="w-8 h-8 mb-4" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" fill="none" stroke="#7c3aed" strokeWidth="1.5" opacity="0.2"/>
              <path d="M 35 65 L 50 35 L 65 65" fill="none" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M 50 35 L 50 65" fill="none" stroke="#d946ef" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <h3 className="font-display text-lg font-bold text-gray-900 mb-2">
              LuxeLeadPro
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              AI-powered lead intelligence for luxury real estate agents. Close 2x more deals.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Product</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/pricing" className="text-gray-600 hover:text-purple-600 font-medium transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/#features" className="text-gray-600 hover:text-purple-600 font-medium transition">
                  Features
                </a>
              </li>
              <li>
                <a href="/agent/login" className="text-gray-600 hover:text-purple-600 font-medium transition">
                  Agent Login
                </a>
              </li>
              <li>
                <a href="/manager/login" className="text-gray-600 hover:text-purple-600 font-medium transition">
                  Manager Login
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-purple-600 font-medium transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 hover:text-purple-600 font-medium transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 font-medium transition">
                  Compliance
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:hello@luxeleadpro.com"
                  className="text-gray-600 hover:text-purple-600 font-medium transition break-all"
                >
                  hello@luxeleadpro.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1-855-LUXELEAD"
                  className="text-gray-600 hover:text-purple-600 font-medium transition"
                >
                  (855) LUXELEAD
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8 sm:pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 text-center sm:text-left">
              © 2026 LuxeLeadPro. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-gray-900 font-medium transition">
                Twitter
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 font-medium transition">
                LinkedIn
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 font-medium transition">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

