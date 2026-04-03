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
  if (cookieStore.get("dashboard_auth")?.value !== "1") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();

  const [leadsRes, repsRes, activitiesRes, tasksRes, commissionsRes, checkinsRes] = await Promise.all([
    supabase.from("leads").select("*").order("created_at", { ascending: false }),
    supabase.from("sales_reps").select("*").order("created_at", { ascending: false }),
    supabase.from("rep_activities").select("*").order("created_at", { ascending: false }).limit(50),
    supabase.from("owner_tasks").select("*").order("created_at", { ascending: false }),
    supabase.from("commissions").select("*").order("created_at", { ascending: false }),
    supabase.from("rep_checkins").select("*").order("created_at", { ascending: false }).limit(20),
  ]);

  return NextResponse.json({
    leads: leadsRes.data || [],
    reps: repsRes.data || [],
    activities: activitiesRes.data || [],
    tasks: tasksRes.data || [],
    commissions: commissionsRes.data || [],
    checkins: checkinsRes.data || [],
  });
}
