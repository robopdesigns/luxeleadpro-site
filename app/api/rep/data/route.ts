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
  const cookieStore = await cookies();
  const repId = cookieStore.get("rep_auth")?.value;
  if (!repId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabase();

  const [repRes, leadsRes, activitiesRes, checkinsRes] = await Promise.all([
    supabase.from("sales_reps").select("*").eq("id", repId).single(),
    supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(100),
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
  const cookieStore = await cookies();
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

  if (body.action === "edit_activity") {
    if (!body.id) return NextResponse.json({ error: "Activity ID required" }, { status: 400 });
    const updates: Record<string, unknown> = {};
    if (body.type) updates.type = body.type;
    if (body.notes !== undefined) updates.notes = body.notes;
    if (body.outcome !== undefined) updates.outcome = body.outcome;

    const { data, error } = await supabase.from("rep_activities").update(updates).eq("id", body.id).eq("rep_id", repId).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ activity: data });
  }

  if (body.action === "delete_activity") {
    if (!body.id) return NextResponse.json({ error: "Activity ID required" }, { status: 400 });
    const { error } = await supabase.from("rep_activities").delete().eq("id", body.id).eq("rep_id", repId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ deleted: true });
  }

  // Add/edit a prospect (lead) from the rep portal
  if (body.action === "add_prospect") {
    const { data, error } = await supabase.from("leads").insert({
      full_name: body.name,
      email: body.email || null,
      phone: body.phone || null,
      market_area: body.territory || null,
      challenge: body.notes || null,
      current_stage: body.stage || "new",
      assigned_rep_id: repId,
    }).select().single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ lead: data });
  }

  if (body.action === "edit_prospect") {
    if (!body.id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });
    const updates: Record<string, unknown> = {};
    if (body.name !== undefined) updates.full_name = body.name;
    if (body.email !== undefined) updates.email = body.email;
    if (body.phone !== undefined) updates.phone = body.phone;
    if (body.territory !== undefined) updates.market_area = body.territory;
    if (body.notes !== undefined) updates.challenge = body.notes;
    if (body.stage !== undefined) updates.current_stage = body.stage;

    const { data, error } = await supabase.from("leads").update(updates).eq("id", body.id).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ lead: data });
  }

  if (body.action === "update_stage") {
    if (!body.id || !body.stage) return NextResponse.json({ error: "Lead ID and stage required" }, { status: 400 });
    const { data, error } = await supabase.from("leads").update({ current_stage: body.stage }).eq("id", body.id).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Also log to pipeline stages
    await supabase.from("pipeline_stages").insert({ lead_id: body.id, stage: body.stage, changed_by: repId, notes: body.notes || null });

    return NextResponse.json({ lead: data });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
