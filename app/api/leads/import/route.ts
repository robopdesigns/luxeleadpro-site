import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { leads } = body;

    if (!leads || !Array.isArray(leads) || leads.length === 0) {
      return NextResponse.json({ error: "No leads provided" }, { status: 400 });
    }

    const supabase = getSupabase();
    const imported = [];

    for (const lead of leads.slice(0, 500)) {
      const { data, error } = await supabase.from("leads").insert({
        full_name: lead.name || lead.full_name || null,
        email: lead.email || null,
        phone: lead.phone || null,
        market_area: lead.market || lead.market_area || lead.city || null,
        challenge: lead.notes || lead.challenge || null,
        current_stage: "new",
      }).select().single();

      if (!error && data) imported.push(data);
    }

    return NextResponse.json({ imported: imported.length, total: leads.length });
  } catch (e) {
    return NextResponse.json({ error: "Import failed" }, { status: 500 });
  }
}
