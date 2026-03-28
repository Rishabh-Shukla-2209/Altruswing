"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function logNewScore(scoreValue: number) {
    const supabase = await createClient();

    // 1. Authenticate securely on the server
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error("Unauthorized: You must be logged in.");
    }

    // 2. Insert the score
    const { error: insertError } = await supabase
        .from("scores")
        .insert({
            user_id: user.id,
            stableford_score: scoreValue,
        });

    if (insertError) {
        throw new Error(insertError.message);
    }

    // 3. Purge the Next.js cache for the dashboard
    revalidatePath("/dashboard");

    return { success: true };
}

// Add this below your existing logNewScore function

export async function updateContributionPercent(percent: number) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("Unauthorized");

    const { error } = await supabase
        .from("user_charity_preferences")
        .update({ contribution_percent: percent })
        .eq("user_id", user.id);

    if (error) {
        throw new Error(error.message);
    }

    // Instantly push the new data to the UI
    revalidatePath("/dashboard");
    return { success: true };
}

// Add this below your existing actions

export async function updateUserCharity(charityId: string) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("Unauthorized");

    const { error } = await supabase
        .from("user_charity_preferences")
        .update({ charity_id: charityId })
        .eq("user_id", user.id);

    if (error) {
        throw new Error(error.message);
    }

    // Force the dashboard to fetch the new charity data
    revalidatePath("/dashboard");
    return { success: true };
}
