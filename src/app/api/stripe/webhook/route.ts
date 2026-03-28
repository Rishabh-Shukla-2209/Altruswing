import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

// Bypasses RLS to update database securely from the server
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) return new NextResponse("Missing signature", { status: 400 });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", errorMessage);
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  // --- TRAFFIC CONTROLLER ---
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id;

    if (!userId) {
      console.error("No client_reference_id found in session");
      return new NextResponse("Missing User ID", { status: 400 });
    }

    // SCENARIO A: One-Time Donation
    if (session.metadata?.type === "one_time_donation") {
      const { error } = await supabaseAdmin.from("donations").insert({
        user_id: userId,
        charity_id: session.metadata.charity_id,
        amount_cents: session.amount_total, // Stripe returns the total charged in cents
        stripe_session_id: session.id,
        status: "completed",
      });

      if (error) {
        console.error("Error logging donation to Supabase:", error.message);
        return new NextResponse("Database Error", { status: 500 });
      }

      console.log(`🟢 Successfully logged donation for user ${userId}`);
    }

    // SCENARIO B: Monthly/Yearly Subscription
    else {
      const customerId = session.customer as string;
      const { error } = await supabaseAdmin.from("profiles").update({
        subscription_status: "active",
        stripe_customer_id: customerId,
      }).eq("id", userId);

      if (error) {
        console.error("Error updating Supabase profile:", error.message);
        return new NextResponse("Database Error", { status: 500 });
      }

      console.log(`🟢 Successfully activated subscription for user ${userId}`);
    }
  }
  else if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    // If cancel_at_period_end is true, they are canceling. Otherwise, they are active.
    const newStatus = subscription.cancel_at_period_end ? "canceling" : "active";

    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ subscription_status: newStatus })
      .eq("stripe_customer_id", customerId);

    if (error) {
      console.error("Error updating subscription status:", error.message);
      return new NextResponse("Database Error", { status: 500 });
    }

    console.log(`🟡 Updated subscription status to ${newStatus} for customer ${customerId}`);
  }
  else if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ subscription_status: "inactive" })
      .eq("stripe_customer_id", customerId);

    if (error) {
      console.error("Error revoking subscription in Supabase:", error.message);
      return new NextResponse("Database Error", { status: 500 });
    }

    console.log(`🔴 Successfully revoked subscription for customer ${customerId}`);
  }

  else if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object as Stripe.Invoice & { subscription?: string };
    if (invoice.subscription) {
      const customerId = invoice.customer as string;
      const { error } = await supabaseAdmin
        .from("profiles")
        .update({ subscription_status: "active" })
        .eq("stripe_customer_id", customerId);

      if (error) {
        console.error("Error updating subscription status:", error.message);
        return new NextResponse("Database Error", { status: 500 });
      }
      console.log(`🟢 Successfully processed successful payment for customer ${customerId}`);
    }
  }
  else if (event.type === "invoice.payment_failed") {
    const invoice = event.data.object as Stripe.Invoice & { subscription?: string };
    if (invoice.subscription) {
      const customerId = invoice.customer as string;
      const { error } = await supabaseAdmin
        .from("profiles")
        .update({ subscription_status: "past_due" })
        .eq("stripe_customer_id", customerId);

      if (error) {
        console.error("Error updating subscription status to past_due:", error.message);
        return new NextResponse("Database Error", { status: 500 });
      }
      console.log(`🔴 Handling failed payment for customer ${customerId}`);
    }
  }

  return new NextResponse(null, { status: 200 });
}