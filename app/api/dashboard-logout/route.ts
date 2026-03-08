import { NextResponse } from "next/server";

const DASHBOARD_COOKIE = "dashboard_auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: DASHBOARD_COOKIE,
    value: "",
    path: "/",
    expires: new Date(0),
  });

  return response;
}
