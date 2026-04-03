import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase();
  try {
    const body = await req.json();
    const {
      full_name,
      email,
      phone,
      brokerage,
      market_area,
      challenge,
      timeline,
      monthly_revenue,
      turnstileToken,
    } = body;

    // Validate required fields
    if (!full_name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const { data: existingLead, error: checkError } = await supabase
      .from("leads")
      .select("id")
      .eq("email", email)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      throw checkError;
    }

    if (existingLead) {
      return NextResponse.json(
        { error: "This email has already been submitted" },
        { status: 409 }
      );
    }

    // Insert lead into Supabase
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          name: full_name,
          email,
          phone: phone || null,
          brokerage: brokerage || null,
          market: market_area || null,
          gci_range: monthly_revenue || null,
          timeline: timeline || null,
          challenge: challenge || null,
          status: "new",
        },
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lead submitted successfully",
        lead: data?.[0] || {},
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error: "Failed to submit lead",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
