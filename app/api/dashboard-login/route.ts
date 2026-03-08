import { NextResponse } from "next/server";

const DASHBOARD_COOKIE = "dashboard_auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    password?: string;
  } | null;

  const inputPassword = body?.password?.trim() || "";
  const requiredPassword = process.env.DASHBOARD_ACCESS_PASSWORD?.trim() || "";

  if (!requiredPassword) {
    return NextResponse.json(
      { error: "Dashboard password is not configured" },
      { status: 500 }
    );
  }

  if (!inputPassword || inputPassword !== requiredPassword) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: DASHBOARD_COOKIE,
    value: "1",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}
