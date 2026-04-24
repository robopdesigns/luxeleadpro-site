import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] flex items-center justify-center px-4 bg-white">
        <div className="max-w-lg text-center">
          <div className="w-20 h-20 rounded-full bg-[#0A192F] flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-lg text-gray-600 mb-8">
            We&apos;ve received your information and your free luxury market report is on its way.
            One of our team members will reach out within 24 hours.
          </p>
          <div className="space-y-3">
            <Link href="https://calendly.com/luxeleadpro-strategy-call/strategy-call-" className="block w-full py-3 bg-[#0A192F] text-white font-semibold rounded-xl hover:opacity-90 transition shadow-md text-center">
              Book a Strategy Call Now →
            </Link>
            <Link href="/" className="block w-full py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-[#D4AF37]/30 transition text-center">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

