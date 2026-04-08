import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase();

  try {
    // Handle both JSON and FormData
    let data: Record<string, string> = {};
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      data = await req.json();
    } else if (contentType.includes("form")) {
      const formData = await req.formData();
      formData.forEach((value, key) => { data[key] = value.toString(); });
    }

    const { full_name, email, phone, market_area, challenge } = data;

    if (!full_name || !email) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }

    // Check duplicate
    const { data: existing } = await supabase.from("leads").select("id").eq("email", email).single();
    if (existing) {
      // Redirect to thank you anyway (don't reveal duplicate to user)
      return NextResponse.redirect(new URL("/thank-you", req.url));
    }

    // Insert lead
    const { error } = await supabase.from("leads").insert({
      full_name,
      email,
      phone: phone || null,
      market_area: market_area || null,
      challenge: challenge || null,
      current_stage: "new",
    });

    if (error) {
      console.error("Lead capture error:", error);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    // For form submissions, redirect to thank you page
    if (!contentType.includes("application/json")) {
      return NextResponse.redirect(new URL("/thank-you", req.url));
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (e) {
    console.error("Capture error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
