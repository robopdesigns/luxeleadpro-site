import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.email || !body?.password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(body.password + "luxeleadpro_salt");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const passwordHash = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

  const supabase = getSupabase();
  const { data: rep, error } = await supabase
    .from("sales_reps")
    .select("*")
    .eq("email", body.email.toLowerCase().trim())
    .eq("password_hash", passwordHash)
    .eq("status", "active")
    .single();

  if (error || !rep) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, rep: { id: rep.id, name: rep.name, email: rep.email } });
  response.cookies.set({
    name: "rep_auth",
    value: rep.id,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}
