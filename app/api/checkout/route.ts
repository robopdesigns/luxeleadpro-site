import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-03-31.basil" });

const PLANS: Record<string, { name: string; price: number; interval: "month" }> = {
  intelligence: { name: "LuxeLeadPro Intelligence", price: 24900, interval: "month" },
  generation: { name: "LuxeLeadPro Intelligence + Generation", price: 74900, interval: "month" },
  territory: { name: "LuxeLeadPro Exclusive Territory", price: 149900, interval: "month" },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const plan = PLANS[body.plan];
    if (!plan) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: plan.name, description: `Monthly subscription — Founding Agent rate` },
            unit_amount: plan.price,
            recurring: { interval: plan.interval },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.luxeleadpro.com"}/agent/login?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.luxeleadpro.com"}/pricing?checkout=cancelled`,
      metadata: { plan: body.plan, email: body.email || "" },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
