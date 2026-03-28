import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-03-25.dahlia",
});

export async function POST() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 1. Get the user's Stripe Customer ID from Supabase
        const { data: profile } = await supabase
            .from("profiles")
            .select("stripe_customer_id")
            .eq("id", user.id)
            .single();

        if (!profile?.stripe_customer_id) {
            return NextResponse.json({ error: "No active subscription found." }, { status: 404 });
        }

        // 2. Fetch the active subscription directly from Stripe
        const subscriptions = await stripe.subscriptions.list({
            customer: profile.stripe_customer_id,
            status: "active",
            limit: 1,
        });

        if (subscriptions.data.length === 0) {
            return NextResponse.json({ error: "No active subscription found in Stripe." }, { status: 404 });
        }

        const subscriptionId = subscriptions.data[0].id;

        // 3. Set the subscription to cancel at period end
        await stripe.subscriptions.update(subscriptionId, {
            cancel_at_period_end: true,
        });

        // 4. Update local database to reflect the pending cancellation
        await supabase
            .from("profiles")
            .update({ subscription_status: "canceling" })
            .eq("id", user.id);

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Cancellation Error:", errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}