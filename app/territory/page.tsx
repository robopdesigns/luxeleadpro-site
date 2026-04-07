"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

const territories = [
  { zip: "10021", area: "Upper East Side, Manhattan", status: "available" },
  { zip: "10012", area: "SoHo/NoHo, Manhattan", status: "available" },
  { zip: "10013", area: "Tribeca, Manhattan", status: "available" },
  { zip: "90210", area: "Beverly Hills, CA", status: "available" },
  { zip: "90077", area: "Bel Air, CA", status: "available" },
  { zip: "33139", area: "Miami Beach, FL", status: "available" },
  { zip: "33480", area: "Palm Beach, FL", status: "available" },
  { zip: "85253", area: "Paradise Valley, AZ", status: "available" },
  { zip: "06830", area: "Greenwich, CT", status: "available" },
  { zip: "94027", area: "Atherton, CA", status: "available" },
  { zip: "60611", area: "Gold Coast, Chicago", status: "available" },
  { zip: "98039", area: "Medina, WA", status: "available" },
  { zip: "78746", area: "Westlake Hills, Austin", status: "available" },
  { zip: "89012", area: "Henderson, NV (Luxury)", status: "available" },
  { zip: "30327", area: "Buckhead, Atlanta", status: "available" },
];

export default function TerritoryPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero */}
        <section className="pt-24 pb-16 px-4 text-center bg-gradient-to-b from-purple-50 to-white">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-semibold mb-6">
              🔒 Exclusive — Only 1 Agent Per Territory
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Claim Your Territory
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Own your ZIP code exclusively. Every luxury lead in your territory goes to you — and only you.
              Once claimed, it&apos;s gone forever.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">How Exclusive Territory Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Choose Your ZIP Codes", desc: "Select the luxury markets you want to own. You can claim multiple territories." },
                { step: "2", title: "We Lock It Down", desc: "Your territory is exclusively yours. No other LuxeLeadPro agent gets leads in your area." },
                { step: "3", title: "Leads Start Flowing", desc: "We run targeted ad campaigns in your territory. 30-50 qualified leads delivered monthly." },
                { step: "4", title: "AI Does the Rest", desc: "Leads are scored, prioritized, and AI sends first-touch outreach automatically." },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Territory Map */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Available Territories</h2>
            <p className="text-center text-gray-600 mb-10">First-come, first-served. Once a territory is claimed, it&apos;s permanently reserved.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {territories.map((t) => (
                <div key={t.zip} className="bg-white rounded-xl border-2 border-gray-200 p-5 hover:border-purple-400 hover:shadow-lg transition">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-purple-600">ZIP {t.zip}</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      t.status === "available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {t.status === "available" ? "✅ Available" : "🔒 Claimed"}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900">{t.area}</h3>
                  {t.status === "available" && (
                    <Link href="https://calendly.com/robopdesigns/strategy-call" className="block mt-3 text-center py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition">
                      Claim This Territory
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-gray-500 mt-8">
              Don&apos;t see your market? <Link href="https://calendly.com/robopdesigns/strategy-call" className="text-purple-600 font-semibold hover:underline">Book a call</Link> — we can set up any US luxury market.
            </p>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">What Territory Owners Get</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: "🔒", title: "ZIP Code Exclusivity", desc: "Only 1 agent per territory. Your leads are YOUR leads. Period." },
                { icon: "📊", title: "30-50 Leads Per Month", desc: "Pre-qualified luxury buyers and sellers, scored 60+ by AI before delivery." },
                { icon: "🤖", title: "AI Auto-Outreach", desc: "Our AI sends personalized first-touch emails within minutes of a new lead." },
                { icon: "🎯", title: "Targeted Ad Campaigns", desc: "We run Facebook + Google ads specifically in your territory. You don't lift a finger." },
                { icon: "🤝", title: "White-Glove Onboarding", desc: "Personal setup call. We configure everything for you within 48 hours." },
                { icon: "📞", title: "Priority Support", desc: "Direct line to our team. Response within 1 hour, guaranteed." },
                { icon: "📈", title: "Quarterly Strategy Reviews", desc: "We analyze your territory performance and optimize campaigns every quarter." },
                { icon: "⚡", title: "First Access to New Features", desc: "Territory owners get beta access to everything we build." },
              ].map((f, i) => (
                <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-xl">
                  <span className="text-2xl">{f.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
                    <p className="text-sm text-gray-600">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-center">
          <div className="max-w-2xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Own Your Market?</h2>
            <p className="text-lg opacity-90 mb-8">Book a 15-minute strategy call. We&apos;ll show you which territories are available in your area and get you set up within 48 hours.</p>
            <Link href="https://calendly.com/robopdesigns/strategy-call" className="inline-block px-8 py-4 bg-white text-purple-700 font-bold rounded-xl hover:bg-gray-50 transition shadow-lg">
              Book Your Strategy Call →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
