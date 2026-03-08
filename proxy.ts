import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DASHBOARD_COOKIE = "dashboard_auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  if (pathname === "/dashboard/login") {
    return NextResponse.next();
  }

  const isAuthed = request.cookies.get(DASHBOARD_COOKIE)?.value === "1";

  if (isAuthed) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/dashboard/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
