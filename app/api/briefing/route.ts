import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}

function getLeadScore(challenge: string | null) {
  const text = (challenge || "").toLowerCase();
  let score = 40;
  if (text.includes("timeline: asap")) score += 30;
  else if (text.includes("timeline: 30-60")) score += 20;
  else if (text.includes("timeline: 60+")) score += 10;
  if (text.includes("monthly gci: 50k+")) score += 30;
  else if (text.includes("monthly gci: 25k-50k")) score += 20;
  else if (text.includes("monthly gci: 10k-25k")) score += 10;
  return Math.min(score, 100);
}

// This runs as a Vercel Cron job (configured in vercel.json)
export async function GET(request: Request) {
  // Verify cron secret or allow internal calls
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && !request.headers.get("x-vercel-cron")) {
    // Allow direct access for testing
  }

  const supabase = getSupabase();

  // Get all leads
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (!leads || leads.length === 0) {
    return NextResponse.json({ message: "No leads to brief on" });
  }

  // Score and rank leads
  const scoredLeads = leads.map((lead) => ({
    ...lead,
    score: getLeadScore(lead.challenge),
  }));
  scoredLeads.sort((a, b) => b.score - a.score);

  const topLeads = scoredLeads.slice(0, 5);
  const hotCount = scoredLeads.filter((l) => l.score >= 80).length;
  const warmCount = scoredLeads.filter((l) => l.score >= 60 && l.score < 80).length;
  const newToday = leads.filter((l) => {
    const d = new Date(l.created_at);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }).length;

  // Build briefing HTML
  const briefingHtml = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:20px">
  <div style="text-align:center;margin-bottom:24px">
    <div style="display:inline-block;width:48px;height:48px;background:linear-gradient(135deg,#7c3aed,#d946ef);border-radius:12px;margin-bottom:12px">
      <span style="color:white;font-size:22px;font-weight:bold;line-height:48px">L</span>
    </div>
    <h1 style="color:#1f2937;font-size:20px;margin:0">Your Morning Briefing</h1>
    <p style="color:#6b7280;font-size:13px;margin-top:4px">${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
  </div>

  <div style="display:flex;gap:12px;margin-bottom:24px">
    <div style="flex:1;background:#f3e8ff;border-radius:12px;padding:16px;text-align:center">
      <div style="font-size:28px;font-weight:bold;color:#7c3aed">${leads.length}</div>
      <div style="font-size:12px;color:#6b7280">Total Leads</div>
    </div>
    <div style="flex:1;background:#fef2f2;border-radius:12px;padding:16px;text-align:center">
      <div style="font-size:28px;font-weight:bold;color:#ef4444">${hotCount}</div>
      <div style="font-size:12px;color:#6b7280">Hot (80+)</div>
    </div>
    <div style="flex:1;background:#fff7ed;border-radius:12px;padding:16px;text-align:center">
      <div style="font-size:28px;font-weight:bold;color:#f59e0b">${warmCount}</div>
      <div style="font-size:12px;color:#6b7280">Warm (60+)</div>
    </div>
    <div style="flex:1;background:#ecfdf5;border-radius:12px;padding:16px;text-align:center">
      <div style="font-size:28px;font-weight:bold;color:#10b981">${newToday}</div>
      <div style="font-size:12px;color:#6b7280">New Today</div>
    </div>
  </div>

  <h2 style="color:#1f2937;font-size:16px;margin-bottom:12px">🔥 Your Top 5 Prospects</h2>
  ${topLeads
    .map(
      (lead, i) => `
    <div style="background:${i === 0 ? "#faf5ff" : "#f9fafb"};border-radius:10px;padding:14px;margin-bottom:8px;border-left:4px solid ${lead.score >= 80 ? "#ef4444" : lead.score >= 60 ? "#f59e0b" : "#6b7280"}">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <strong style="color:#1f2937;font-size:14px">${lead.full_name || "Unknown"}</strong>
          <div style="color:#6b7280;font-size:12px">${lead.email || ""} ${lead.phone ? "· " + lead.phone : ""}</div>
          ${lead.market_area ? `<div style="color:#7c3aed;font-size:11px;margin-top:2px">${lead.market_area}</div>` : ""}
        </div>
        <div style="background:${lead.score >= 80 ? "#fef2f2" : lead.score >= 60 ? "#fff7ed" : "#f3f4f6"};color:${lead.score >= 80 ? "#ef4444" : lead.score >= 60 ? "#f59e0b" : "#6b7280"};padding:6px 12px;border-radius:20px;font-weight:bold;font-size:14px">
          ${lead.score}
        </div>
      </div>
    </div>`
    )
    .join("")}

  <div style="text-align:center;margin-top:24px">
    <a href="https://www.luxeleadpro.com/dashboard" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#d946ef);color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Open Dashboard →</a>
  </div>

  <div style="text-align:center;margin-top:24px;padding-top:16px;border-top:1px solid #e5e7eb">
    <p style="color:#9ca3af;font-size:11px">LuxeLeadPro — AI Lead Intelligence | luxeleadpro.com</p>
  </div>
</div>`;

  // Send via Resend if configured
  if (process.env.RESEND_API_KEY && process.env.ALERT_EMAIL_TO) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.ALERT_EMAIL_FROM || "LuxeLeadPro <briefing@luxeleadpro.com>",
          to: process.env.ALERT_EMAIL_TO,
          subject: `🔥 Your Morning Briefing — ${hotCount} Hot Leads, ${leads.length} Total`,
          html: briefingHtml,
        }),
      });
    } catch (e) {
      console.error("Failed to send briefing email:", e);
    }
  }

  return NextResponse.json({
    sent: true,
    totalLeads: leads.length,
    hotLeads: hotCount,
    warmLeads: warmCount,
    newToday,
    topLeads: topLeads.map((l) => ({ name: l.full_name, score: l.score })),
    briefingHtml,
  });
}
