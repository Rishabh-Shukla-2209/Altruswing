import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-03-25.dahlia",
});

export async function POST(req: Request) {
    try {
        const { amount, charityId, charityName } = await req.json();

        if (!amount || amount < 1) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        const supabase = await createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const checkoutSession = await stripe.checkout.sessions.create({
            mode: "payment", // Crucial: 'payment' for one-off, not 'subscription'
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr", // Update to usd if needed
                        product_data: {
                            name: `Direct Donation to ${charityName}`,
                            description: "One-time philanthropic contribution via AltruSwing.",
                        },
                        unit_amount: amount * 100, // Stripe expects the lowest currency denominator (paise/cents)
                    },
                    quantity: 1,
                },
            ],
            success_url: `${req.headers.get("origin")}/dashboard/settings?donation=success`,
            cancel_url: `${req.headers.get("origin")}/dashboard/settings`,
            customer_email: session.user.email,
            client_reference_id: session.user.id,
            // Pass the charity ID in metadata so your webhook can log the specific donation later
            metadata: {
                type: "one_time_donation",
                charity_id: charityId,
            },
        });

        return NextResponse.json({ url: checkoutSession.url });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Stripe Checkout Error:", errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}