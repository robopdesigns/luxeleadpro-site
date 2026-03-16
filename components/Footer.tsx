export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-4">
              Luxe Lead
            </h3>
            <p className="text-neutral-400 text-sm">
              AI-powered lead management for luxury real estate professionals.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <a href="/pricing" className="hover:text-yellow-400 transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/#features" className="hover:text-yellow-400 transition">
                  Features
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-yellow-400 transition">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <a href="/privacy" className="hover:text-yellow-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-yellow-400 transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <a
                  href="mailto:hello@luxeleadpro.com"
                  className="hover:text-yellow-400 transition"
                >
                  hello@luxeleadpro.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="hover:text-yellow-400 transition"
                >
                  (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
          <p>&copy; 2025 Luxe Lead Pro. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-yellow-400 transition">
              Twitter
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              LinkedIn
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
