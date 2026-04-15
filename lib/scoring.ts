// LuxeLeadPro AI Lead Scoring Engine
// Scores leads 0-100 based on 40+ signals

export interface LeadData {
  full_name?: string | null;
  email?: string | null;
  phone?: string | null;
  market_area?: string | null;
  challenge?: string | null;
  current_stage?: string | null;
  created_at?: string | null;
}

export function scoreLeadAI(lead: LeadData): number {
  let score = 30; // Base score for having contact info
  const text = (lead.challenge || "").toLowerCase();
  const name = lead.full_name || "";
  const email = lead.email || "";

  // CONTACT COMPLETENESS (0-15 points)
  if (name.trim().length > 0) score += 3;
  if (name.includes(" ")) score += 2; // Has full name
  if (email.includes("@")) score += 3;
  if (lead.phone) score += 5;
  if (!email.includes("gmail") && !email.includes("yahoo") && !email.includes("hotmail")) score += 2; // Business email

  // TIMELINE URGENCY (0-25 points)
  if (text.includes("asap") || text.includes("immediately") || text.includes("this week")) score += 25;
  else if (text.includes("30 days") || text.includes("1 month") || text.includes("soon")) score += 20;
  else if (text.includes("30-60") || text.includes("2-3 month")) score += 15;
  else if (text.includes("60") || text.includes("3-6 month")) score += 10;
  else if (text.includes("exploring") || text.includes("just looking")) score += 3;

  // BUDGET SIGNALS (0-20 points)
  if (text.includes("$10m") || text.includes("10m+") || text.includes("10 million")) score += 20;
  else if (text.includes("$5m") || text.includes("5m") || text.includes("5 million")) score += 18;
  else if (text.includes("$2m") || text.includes("2m") || text.includes("2 million")) score += 15;
  else if (text.includes("$1m") || text.includes("1m") || text.includes("million")) score += 12;
  if (text.includes("50k+") || text.includes("gci: 50")) score += 5;
  else if (text.includes("25k") || text.includes("gci: 25")) score += 3;

  // ENGAGEMENT SIGNALS (0-10 points)
  if (lead.current_stage === "demo") score += 10;
  else if (lead.current_stage === "proposal") score += 8;
  else if (lead.current_stage === "contacted") score += 5;

  // MARKET VALUE (0-10 points)
  const luxuryMarkets = ["beverly hills", "manhattan", "miami", "greenwich", "aspen", "palm beach", "atherton", "gold coast", "scottsdale", "hamptons", "malibu", "bel air"];
  const market = (lead.market_area || "").toLowerCase();
  if (luxuryMarkets.some(m => market.includes(m))) score += 10;
  else if (market.length > 0) score += 5;

  // RECENCY (0-5 points)
  if (lead.created_at) {
    const daysSince = Math.floor((Date.now() - new Date(lead.created_at).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSince <= 1) score += 5;
    else if (daysSince <= 7) score += 3;
    else if (daysSince <= 30) score += 1;
  }

  // KEYWORD INTENT (0-10 points)
  const highIntent = ["buy", "purchase", "invest", "relocat", "downsize", "upgrade", "sell", "list"];
  const medIntent = ["interest", "looking", "consider", "think", "want"];
  if (highIntent.some(k => text.includes(k))) score += 10;
  else if (medIntent.some(k => text.includes(k))) score += 5;

  return Math.min(100, Math.max(0, score));
}

export function getScoreLabel(score: number): { label: string; color: string; bgColor: string } {
  if (score >= 80) return { label: "Hot", color: "#DC2626", bgColor: "rgba(239,68,68,0.1)" };
  if (score >= 60) return { label: "Warm", color: "#D97706", bgColor: "rgba(245,158,11,0.1)" };
  if (score >= 40) return { label: "Active", color: "#059669", bgColor: "rgba(16,185,129,0.1)" };
  return { label: "Nurture", color: "#718096", bgColor: "rgba(113,128,150,0.1)" };
}
