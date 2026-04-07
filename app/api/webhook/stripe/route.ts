import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-03-31.basil" });

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = getSupabase();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email || session.metadata?.email;
    const plan = session.metadata?.plan || "intelligence";

    if (email) {
      // Log the new customer
      await supabase.from("leads").insert({
        full_name: session.customer_details?.name || email,
        email,
        current_stage: "won",
        challenge: `Plan: ${plan} | Stripe: ${session.id}`,
      });
    }
  }

  if (event.type === "customer.subscription.deleted") {
    // Handle cancellation
    const sub = event.data.object as Stripe.Subscription;
    console.log("Subscription cancelled:", sub.id);
  }

  return NextResponse.json({ received: true });
}
