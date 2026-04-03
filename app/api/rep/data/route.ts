import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET() {
  const cookieStore = cookies();
  const repId = cookieStore.get("rep_auth")?.value;
  if (!repId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabase();

  const [repRes, leadsRes, activitiesRes, checkinsRes] = await Promise.all([
    supabase.from("sales_reps").select("*").eq("id", repId).single(),
    supabase.from("leads").select("*").eq("assigned_rep_id", repId).order("created_at", { ascending: false }),
    supabase.from("rep_activities").select("*").eq("rep_id", repId).order("created_at", { ascending: false }).limit(50),
    supabase.from("rep_checkins").select("*").eq("rep_id", repId).order("created_at", { ascending: false }).limit(10),
  ]);

  if (repRes.error) return NextResponse.json({ error: "Invalid session" }, { status: 401 });

  return NextResponse.json({
    rep: repRes.data,
    leads: leadsRes.data || [],
    activities: activitiesRes.data || [],
    checkins: checkinsRes.data || [],
  });
}

export async function POST(request: Request) {
  const cookieStore = cookies();
  const repId = cookieStore.get("rep_auth")?.value;
  if (!repId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body?.action) return NextResponse.json({ error: "Action required" }, { status: 400 });

  const supabase = getSupabase();

  if (body.action === "log_activity") {
    const { data, error } = await supabase.from("rep_activities").insert({
      rep_id: repId,
      lead_id: body.lead_id || null,
      type: body.type || "note",
      notes: body.notes || null,
      outcome: body.outcome || null,
      duration_minutes: body.duration_minutes || null,
    }).select().single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ activity: data });
  }

  if (body.action === "checkin") {
    const { data, error } = await supabase.from("rep_checkins").insert({
      rep_id: repId,
      notes: body.notes || "Daily check-in",
      calls_made: body.calls_made || 0,
      demos_booked: body.demos_booked || 0,
      deals_closed: body.deals_closed || 0,
    }).select().single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ checkin: data });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
