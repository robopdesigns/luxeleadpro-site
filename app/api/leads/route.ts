import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

type LeadPayload = {
  full_name: string;
  email: string;
  phone: string;
  brokerage: string;
  market_area: string;
  challenge: string;
  source: string;
};

type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

const requestsByIp = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000; // 10 min
const MAX_REQUESTS_PER_WINDOW = 8;

function getIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const history = requestsByIp.get(ip) || [];
  const recent = history.filter((ts) => now - ts < WINDOW_MS);
  recent.push(now);
  requestsByIp.set(ip, recent);
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return false;
  }

  const formData = new URLSearchParams();
  formData.set("secret", secret);
  formData.set("response", token);
  if (ip && ip !== "unknown") {
    formData.set("remoteip", ip);
  }

  const verifyRes = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      cache: "no-store",
    }
  );

  if (!verifyRes.ok) {
    return false;
  }

  const verifyJson = (await verifyRes.json()) as TurnstileVerifyResponse;
  return Boolean(verifyJson.success);
}

export async function POST(request: Request) {
  const ip = getIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const body = (await request.json().catch(() => null)) as
    | {
        full_name?: string;
        email?: string;
        phone?: string;
        brokerage?: string;
        market_area?: string;
        challenge?: string;
        website?: string; // honeypot
        turnstileToken?: string;
      }
    | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if ((body.website || "").trim()) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const full_name = (body.full_name || "").trim();
  const email = (body.email || "").trim();

  if (!full_name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY?.trim();

  if (turnstileSiteKey || turnstileSecret) {
    const token = (body.turnstileToken || "").trim();
    if (!token) {
      return NextResponse.json(
        { error: "Please complete the spam check." },
        { status: 400 }
      );
    }

    const turnstileOk = await verifyTurnstile(token, ip);
    if (!turnstileOk) {
      return NextResponse.json(
        { error: "Spam check failed. Please try again." },
        { status: 400 }
      );
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: "Server is not configured" },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const payload: LeadPayload = {
    full_name,
    email,
    phone: (body.phone || "").trim(),
    brokerage: (body.brokerage || "").trim(),
    market_area: (body.market_area || "").trim(),
    challenge: (body.challenge || "").trim(),
    source: "website",
  };

  const { error } = await supabase.from("leads").insert([payload]);

  if (error) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
