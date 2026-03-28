"use server";

import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { revalidatePath } from "next/cache";

// ── Admin guard helper ──────────────────────────────────────────────
async function requireAdmin() {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("Unauthorized");
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") throw new Error("Unauthorized");
    return supabase;
}

// ── Update subscription status ──────────────────────────────────────
export async function forceUpdateSubscription(userId: string, newStatus: string) {
    const supabase = await requireAdmin();
    const { error } = await supabase
        .from("profiles")
        .update({ subscription_status: newStatus })
        .eq("id", userId);
    if (error) throw new Error(error.message);
    revalidatePath("/admin/users");
    revalidatePath("/admin");
    return { success: true };
}

// ── Delete user profile ─────────────────────────────────────────────
export async function deleteUser(userId: string) {
    const supabase = await requireAdmin();

    // Delete scores first (foreign key)
    await supabase.from("scores").delete().eq("user_id", userId);
    await supabase.from("user_charity_preferences").delete().eq("user_id", userId);
    await supabase.from("winners").delete().eq("user_id", userId);

    const { error } = await supabase.from("profiles").delete().eq("id", userId);
    if (error) throw new Error(error.message);

    // Delete from auth as well
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (authError) console.error("Could not delete from auth (might not exist):", authError.message);

    revalidatePath("/admin/users");
    revalidatePath("/admin");
    return { success: true };
}

// ── Create user profiles + auth ─────────────────────────────────────
export async function createUser(formData: {
    email: string;
    password?: string;
    role?: string;
}) {
    const supabase = await requireAdmin();

    const email = formData.email.trim();
    const password = formData.password || Math.random().toString(36).slice(-12);

    if (!email || !email.includes("@")) {
        throw new Error("Invalid email address.");
    }

    // 1. Create user in Auth using admin client
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { role: formData.role || "user" }
    });

    if (authError) throw new Error(authError.message);

    const userId = authData.user.id;

    // 2. Create profile in public.profiles (if not already handled by trigger)
    // We already have a trigger usually but let's be explicit if needed, 
    // though createClient(...) will usually have a trigger to profiles.
    // However, we want to set the role specifically.
    const { error: profileError } = await supabase
        .from("profiles")
        .update({ role: formData.role || "user" })
        .eq("id", userId);

    if (profileError) {
        // If update fails, maybe insert?
        const { error: insertError } = await supabase
            .from("profiles")
            .insert({
                id: userId,
                email,
                role: formData.role || "user",
                subscription_status: "inactive"
            });
        if (insertError) console.error("Profile creation error:", insertError.message);
    }

    revalidatePath("/admin/users");
    return { success: true, userId };
}

// ── Delete a specific score ─────────────────────────────────────────
export async function deleteScore(scoreId: string) {
    const supabase = await requireAdmin();
    const { error } = await supabase
        .from("scores")
        .delete()
        .eq("id", scoreId);
    if (error) throw new Error(error.message);
    revalidatePath("/admin/users");
    return { success: true };
}

// ── Update a specific score value ───────────────────────────────────
export async function updateScore(scoreId: string, newValue: number) {
    const supabase = await requireAdmin();
    if (newValue < 0 || newValue > 45) throw new Error("Score must be between 0 and 45");
    const { error } = await supabase
        .from("scores")
        .update({ stableford_score: newValue })
        .eq("id", scoreId);
    if (error) throw new Error(error.message);
    revalidatePath("/admin/users");
    return { success: true };
}
