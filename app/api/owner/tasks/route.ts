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

export async function GET() {
  const cookieStore = cookies();
  if (!isOwnerAuthed(cookieStore)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabase();
  const { data, error } = await supabase.from("owner_tasks").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ tasks: data });
}

export async function POST(request: Request) {
  const cookieStore = cookies();
  if (!isOwnerAuthed(cookieStore)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body?.title) return NextResponse.json({ error: "Title required" }, { status: 400 });

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("owner_tasks")
    .insert({ title: body.title, description: body.description, priority: body.priority || "medium", due_date: body.due_date })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ task: data });
}

export async function PATCH(request: Request) {
  const cookieStore = cookies();
  if (!isOwnerAuthed(cookieStore)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body?.id) return NextResponse.json({ error: "Task ID required" }, { status: 400 });

  const supabase = getSupabase();
  const updates: Record<string, unknown> = {};
  if (body.status) updates.status = body.status;
  if (body.title) updates.title = body.title;
  if (body.priority) updates.priority = body.priority;

  const { data, error } = await supabase.from("owner_tasks").update(updates).eq("id", body.id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ task: data });
}
