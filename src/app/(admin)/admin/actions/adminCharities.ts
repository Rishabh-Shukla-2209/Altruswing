"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleCharityStatus(charityId: string, currentStatus: boolean) {
    const supabase = await createClient();

    // Verify Admin rights
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("Unauthorized");

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") throw new Error("Unauthorized");

    const { error } = await supabase
        .from("charities")
        .update({ is_active: !currentStatus })
        .eq("id", charityId);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/charities");
    revalidatePath("/admin");
    return { success: true };
}

export async function deleteCharity(charityId: string) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("Unauthorized");

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") throw new Error("Unauthorized");

    const { error } = await supabase
        .from("charities")
        .delete()
        .eq("id", charityId);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/charities");
    revalidatePath("/admin");
    return { success: true };
}

export async function createCharity(formData: {
    name: string;
    description: string;
    category: string;
    location: string;
    cover_image_url: string;
    impact_label: string;
    impact_value: string;
}) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("Unauthorized");

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") throw new Error("Unauthorized");

    // Validate required fields
    if (!formData.name || formData.name.trim().length < 2) {
        throw new Error("Charity name must be at least 2 characters.");
    }

    const { error } = await supabase
        .from("charities")
        .insert({
            name: formData.name.trim(),
            description: formData.description.trim() || null,
            category: formData.category as any || null,
            location: formData.location as any || null,
            cover_image_url: formData.cover_image_url.trim() || null,
            impact_label: formData.impact_label.trim() || null,
            impact_value: formData.impact_value.trim() || null,
            is_active: true,
        });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/charities");
    revalidatePath("/admin");
    revalidatePath("/charities");
    return { success: true };
}

export async function updateCharity(charityId: string, formData: {
    name: string;
    description: string;
    category: string;
    location: string;
    cover_image_url: string;
    impact_label: string;
    impact_value: string;
}) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("Unauthorized");

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") throw new Error("Unauthorized");

    if (!formData.name || formData.name.trim().length < 2) {
        throw new Error("Charity name must be at least 2 characters.");
    }

    const { error } = await supabase
        .from("charities")
        .update({
            name: formData.name.trim(),
            description: formData.description.trim() || null,
            category: formData.category as any || null,
            location: formData.location as any || null,
            cover_image_url: formData.cover_image_url.trim() || null,
            impact_label: formData.impact_label.trim() || null,
            impact_value: formData.impact_value.trim() || null,
        })
        .eq("id", charityId);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/admin/charities");
    revalidatePath("/admin");
    revalidatePath("/charities");
    return { success: true };
}
