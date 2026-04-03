import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function isOwnerAuthed(cookieStore: ReturnType<typeof cookies>) {
  return cookieStore.get("dashboard_auth")?.value === "1";
}

// GET - list all reps (owner only)
export async function GET() {
  const cookieStore = await cookies();
  if (!isOwnerAuthed(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  const { data: reps, error } = await supabase
    .from("sales_reps")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ reps });
}

// POST - create a new rep (owner only)
export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!isOwnerAuthed(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.password) {
    return NextResponse.json({ error: "Name, email, and password required" }, { status: 400 });
  }

  const supabase = getSupabase();
  
  // Simple hash for rep passwords (not using bcrypt to keep deps minimal)
  const encoder = new TextEncoder();
  const data = encoder.encode(body.password + "luxeleadpro_salt");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const passwordHash = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

  const { data: rep, error } = await supabase
    .from("sales_reps")
    .insert({
      name: body.name,
      email: body.email,
      password_hash: passwordHash,
      phone: body.phone || null,
      status: body.status || "active",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ rep });
}
