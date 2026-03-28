import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { ImpactCardClient } from "./ImpactCardClient";

export async function PhilanthropicImpact() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: preference } = await supabase
    .from("user_charity_preferences")
    .select(`
      contribution_percent,
      charities (
        name,
        description,
        cover_image_url
      )
    `)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!preference || !preference.charities) {
    return (
      <div className="relative overflow-hidden rounded-3xl min-h-[360px] flex flex-col justify-center items-center p-8 bg-surface-container border-2 border-dashed border-outline-variant/30 text-center">
        <AlertCircle size={40} className="text-on-surface-variant mb-4" />
        <h3 className="text-2xl font-bold font-headline mb-2">No Charity Selected</h3>
        <p className="text-on-surface-variant text-sm mb-6">
          Set up your impact to complete your profile.
        </p>
        <Link
          href="/charities"
          className="px-6 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-transform"
        >
          Select Charity
        </Link>
      </div>
    );
  }

  const charity = Array.isArray(preference.charities)
    ? preference.charities[0]
    : preference.charities;

  // Render the interactive client component, passing the secure server data as props
  return (
    <ImpactCardClient
      charity={{
        name: charity.name || "Unknown Charity",
        description: charity.description || "Your performance funds this cause.",
        cover_image_url: charity.cover_image_url || "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
      }}
      initialPercent={preference.contribution_percent || 10}
    />
  );
}