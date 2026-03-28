import { Database } from "./database.types";

// ─── Core Enum Exports ───────────────────────────────────────────────
export type RegionType = Database["public"]["Enums"]["REGION"];
export type CategoryType = Database["public"]["Enums"]["CATEGORIES"];

// ─── Multi-Country Expansion ─────────────────────────────────────────
// Every entity can be scoped to a country. This enables region-specific
// draws, charities, and compliance rules without schema migration.
export type CountryCode = string; // ISO 3166-1 alpha-2 (e.g. "AU", "GB", "US")

export interface CountryScopedEntity {
  country_code?: CountryCode;
}

// ─── Teams / Corporate Accounts ──────────────────────────────────────
// Extensible structure for grouping users into teams for corporate
// subscriptions, leaderboards, and bulk billing.
export interface Team {
  id: string;
  name: string;
  owner_user_id: string;
  country_code?: CountryCode;
  max_members: number;
  billing_type: "individual" | "corporate";
  created_at: string;
}

export interface TeamMembership {
  team_id: string;
  user_id: string;
  role: "owner" | "admin" | "member";
  joined_at: string;
}

// ─── Campaign Module (Future Activation) ─────────────────────────────
// Campaigns allow time-boxed promotional events with custom rules,
// bonus prizes, and partnerships. The schema is defined now so the
// admin panel can be extended without architectural changes.
export interface Campaign {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  bonus_pool_cents: number;
  is_active: boolean;
  country_code?: CountryCode;
  sponsor_name?: string;
  sponsor_logo_url?: string;
  created_at: string;
}

export interface CampaignEntry {
  campaign_id: string;
  user_id: string;
  score_id: string;
  entered_at: string;
}

// ─── Mobile App API Contract ─────────────────────────────────────────
// Standardized response envelope for all API routes. Mobile clients
// (React Native, Flutter, etc.) can consume the same Next.js API routes
// using this consistent shape. All server actions that return data
// should conform to this pattern for cross-platform consistency.
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  /** ISO 8601 timestamp of when the response was generated */
  timestamp: string;
  /** Pagination metadata for list endpoints */
  pagination?: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

// ─── Unified User Profile (Aggregated View) ──────────────────────────
// Single type that a mobile or web client can use to display a user.
export interface UserProfile {
  id: string;
  email: string;
  role: string;
  subscription_status: string;
  country_code?: CountryCode;
  team_id?: string;
  scores: Array<{
    id: string;
    stableford_score: number;
    played_on: string;
  }>;
  charity_preference?: {
    charity_id: string;
    contribution_percent: number;
  };
  created_at: string;
}

// ─── Draw Result (Public-facing) ─────────────────────────────────────
export interface DrawResult {
  id: string;
  draw_month: string;
  winning_numbers: number[];
  total_pool_cents: number;
  match_5_pool_cents: number;
  match_4_pool_cents: number;
  match_3_pool_cents: number;
  rollover_cents: number;
  status: string;
  created_at: string;
}
