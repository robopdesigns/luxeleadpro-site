import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { notFound } from "next/navigation";

const markets: Record<string, { name: string; state: string; zip: string; medianPrice: string; growth: string; daysOnMarket: string; heroText: string }> = {
  "beverly-hills": { name: "Beverly Hills", state: "CA", zip: "90210", medianPrice: "$4,200,000", growth: "+8%", daysOnMarket: "62", heroText: "Find Your Dream Home in Beverly Hills" },
  "manhattan": { name: "Manhattan", state: "NY", zip: "10021", medianPrice: "$1,400,000", growth: "+11%", daysOnMarket: "108", heroText: "Luxury Living in Manhattan" },
  "miami-beach": { name: "Miami Beach", state: "FL", zip: "33139", medianPrice: "$1,750,000", growth: "+9%", daysOnMarket: "72", heroText: "Waterfront Luxury in Miami Beach" },
  "greenwich": { name: "Greenwich", state: "CT", zip: "06830", medianPrice: "$3,200,000", growth: "+36%", daysOnMarket: "40", heroText: "Estate Living in Greenwich" },
  "scottsdale": { name: "Scottsdale", state: "AZ", zip: "85253", medianPrice: "$1,500,000", growth: "+12%", daysOnMarket: "55", heroText: "Desert Luxury in Scottsdale" },
  "atherton": { name: "Atherton", state: "CA", zip: "94027", medianPrice: "$7,500,000", growth: "+5%", daysOnMarket: "85", heroText: "Silicon Valley's Most Exclusive Address" },
  "gold-coast-chicago": { name: "Gold Coast", state: "IL", zip: "60611", medianPrice: "$1,200,000", growth: "+7%", daysOnMarket: "68", heroText: "Iconic Lakefront Living in Chicago" },
  "aspen": { name: "Aspen", state: "CO", zip: "81611", medianPrice: "$5,800,000", growth: "+14%", daysOnMarket: "95", heroText: "Mountain Luxury in Aspen" },
  "palm-beach": { name: "Palm Beach", state: "FL", zip: "33480", medianPrice: "$6,200,000", growth: "+18%", daysOnMarket: "78", heroText: "Island Estate Living in Palm Beach" },
  "austin-westlake": { name: "Westlake Hills", state: "TX", zip: "78746", medianPrice: "$1,800,000", growth: "+10%", daysOnMarket: "52", heroText: "Hill Country Luxury in Austin" },
};

export function generateStaticParams() {
  return Object.keys(markets).map(slug => ({ slug }));
}

export default async function MarketPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const market = markets[slug];
  if (!market) notFound();

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero */}
        <section className="relative pt-24 pb-20 px-4 bg-[#050B14] text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/globe.svg')] bg-center bg-no-repeat opacity-5" />
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-sm mb-6">
              <span></span> {market.name}, {market.state}
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{market.heroText}</h1>
            <p className="text-lg text-white/70 max-w-2xl mb-8">
              Get exclusive access to AI-scored luxury leads in {market.name}. 
              Know exactly which prospects are ready to buy — before anyone else.
            </p>

            {/* Lead Capture Form */}
            <div className="bg-white rounded-2xl p-8 text-gray-900 max-w-lg shadow-2xl">
              <h2 className="text-xl font-bold mb-2">Get Your Free Market Report</h2>
              <p className="text-sm text-gray-500 mb-6">See the latest luxury market data for {market.name}</p>
              <form action="/api/leads/capture" method="POST" className="space-y-3">
                <input type="hidden" name="market_area" value={`${market.name}, ${market.state}`} />
                <input name="full_name" required placeholder="Full Name" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none" />
                <input name="email" type="email" required placeholder="Email Address" className="w-full px-4 py-3 border border-slate-200 rounded-md text-sm focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none" />
                <input name="phone" type="tel" placeholder="Phone Number" className="w-full px-4 py-3 border border-slate-200 rounded-md text-sm focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 outline-none" />
                <select name="challenge" className="w-full px-4 py-3 border border-slate-200 rounded-md text-sm text-slate-600 focus:border-[#D4AF37] outline-none">
                  <option value="">What is your price range?</option>
                  <option value="Budget: $1M-$2M | Timeline: ASAP">$1M — $2M</option>
                  <option value="Budget: $2M-$5M | Timeline: ASAP">$2M — $5M</option>
                  <option value="Budget: $5M-$10M | Timeline: ASAP | Monthly GCI: 50K+">$5M — $10M</option>
                  <option value="Budget: $10M+ | Timeline: ASAP | Monthly GCI: 50K+">$10M+</option>
                  <option value="Just exploring">Just exploring</option>
                </select>
                <button type="submit" className="w-full py-3 bg-[#D4AF37] text-white font-medium rounded-md hover:bg-[#B5952F] hover:shadow-md hover:-translate-y-0.5 transition-all shadow-sm">
                  Get Free Market Report →
                </button>
              </form>
              <p className="text-xs text-gray-400 mt-3 text-center">No spam. We respect your privacy.</p>
            </div>
          </div>
        </section>

        {/* Market Stats */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">{market.name} Luxury Market Snapshot</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Median Luxury Price", value: market.medianPrice, icon: "" },
                { label: "YoY Price Growth", value: market.growth, icon: "" },
                { label: "Avg Days on Market", value: market.daysOnMarket, icon: "" },
                { label: "Territory Status", value: "Available", icon: "" },
              ].map((s, i) => (
                <div key={i} className="text-center p-6 bg-gray-50 rounded-2xl">
                  <span className="text-2xl">{s.icon}</span>
                  <div className="text-2xl font-bold text-gray-900 mt-2">{s.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why LuxeLeadPro */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Top {market.name} Agents Choose LuxeLeadPro</h2>
            <p className="text-gray-600 mb-10">AI-powered lead intelligence built specifically for luxury markets</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: "", title: "AI Lead Scoring", desc: "Every lead scored 0-100 across 40+ signals. Know who's ready to buy before you pick up the phone." },
                { icon: "", title: "6AM Daily Briefing", desc: "Wake up to your top 5 hottest prospects, ranked and ready. No guessing, no wasted calls." },
                { icon: "", title: "Territory Exclusivity", desc: `Be the ONLY LuxeLeadPro agent in ${market.name}. Every lead in your ZIP code goes to you — and only you.` },
              ].map((f, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200">
                  <span className="text-3xl">{f.icon}</span>
                  <h3 className="font-bold text-gray-900 mt-3 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-[#0A192F] text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Claim Your Territory in {market.name}</h2>
          <p className="text-lg opacity-90 mb-8 max-w-lg mx-auto">Only 1 agent per ZIP code. Once {market.zip} is taken, it&apos;s gone forever.</p>
          <a href="https://calendly.com/robopdesigns/strategy-call" className="inline-block px-8 py-4 bg-[#D4AF37] text-white font-medium rounded-md hover:bg-[#B5952F] hover:shadow-lg hover:-translate-y-0.5 transition-all">
            Book Your Strategy Call →
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
