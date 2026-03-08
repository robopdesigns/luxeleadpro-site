import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function isAuthorized(request: Request) {
  const userAgent = request.headers.get("user-agent") || "";
  if (userAgent.includes("vercel-cron")) return true;

  const auth = request.headers.get("authorization") || "";
  const headerToken = auth.replace("Bearer ", "").trim();
  const urlToken = new URL(request.url).searchParams.get("token")?.trim() || "";
  const expected = process.env.WEEKLY_REPORT_TOKEN?.trim();
  return Boolean(expected) && (headerToken === expected || urlToken === expected);
}

async function sendReportEmail(html: string, count: number) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.ALERT_EMAIL_TO?.trim();
  const from = process.env.ALERT_EMAIL_FROM?.trim() || "Luxe Lead AI Pro <onboarding@resend.dev>";
  if (!apiKey || !to) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Weekly lead report: ${count} new lead${count === 1 ? "" : "s"}`,
      html,
    }),
    cache: "no-store",
  });
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const { data: leads, error } = await supabase
    .from("leads")
    .select("full_name,email,phone,market_area,created_at")
    .gte("created_at", since)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to load leads" }, { status: 500 });
  }

  const rows = (leads || [])
    .map(
      (lead) =>
        `<tr><td>${lead.full_name || "-"}</td><td>${lead.email || "-"}</td><td>${lead.phone || "-"}</td><td>${lead.market_area || "-"}</td><td>${lead.created_at ? new Date(lead.created_at).toLocaleString("en-US", { timeZone: "America/Chicago" }) : "-"}</td></tr>`
    )
    .join("");

  const html = `
    <h2>Luxe Lead AI Pro — Weekly Lead Report</h2>
    <p>New leads in last 7 days: <strong>${(leads || []).length}</strong></p>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
      <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Market</th><th>Created</th></tr></thead>
      <tbody>${rows || '<tr><td colspan="5">No new leads this week.</td></tr>'}</tbody>
    </table>
  `;

  await sendReportEmail(html, (leads || []).length);

  return NextResponse.json({ ok: true, count: (leads || []).length });
}
