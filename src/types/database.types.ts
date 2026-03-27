export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      charities: {
        Row: {
          category: Database["public"]["Enums"]["CATEGORIES"] | null
          cover_image_url: string | null
          created_at: string | null
          description: string | null
          id: string
          impact_label: string | null
          impact_value: string | null
          is_active: boolean | null
          location: Database["public"]["Enums"]["REGION"] | null
          name: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["CATEGORIES"] | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          impact_label?: string | null
          impact_value?: string | null
          is_active?: boolean | null
          location?: Database["public"]["Enums"]["REGION"] | null
          name: string
        }
        Update: {
          category?: Database["public"]["Enums"]["CATEGORIES"] | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          impact_label?: string | null
          impact_value?: string | null
          is_active?: boolean | null
          location?: Database["public"]["Enums"]["REGION"] | null
          name?: string
        }
        Relationships: []
      }
      charity_events: {
        Row: {
          charity_id: string
          created_at: string | null
          description: string | null
          event_date: string
          id: string
          is_active: boolean | null
          location: string | null
          title: string
        }
        Insert: {
          charity_id: string
          created_at?: string | null
          description?: string | null
          event_date: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          title: string
        }
        Update: {
          charity_id?: string
          created_at?: string | null
          description?: string | null
          event_date?: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "charity_events_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
        ]
      }
      charity_images: {
        Row: {
          charity_id: string
          created_at: string | null
          display_order: number | null
          id: string
          image_url: string
        }
        Insert: {
          charity_id: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url: string
        }
        Update: {
          charity_id?: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "charity_images_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
        ]
      }
      draws: {
        Row: {
          created_at: string | null
          draw_month: string
          id: string
          match_3_pool_cents: number | null
          match_4_pool_cents: number | null
          match_5_pool_cents: number | null
          rollover_cents: number | null
          status: string | null
          total_pool_cents: number | null
          winning_numbers: number[] | null
        }
        Insert: {
          created_at?: string | null
          draw_month: string
          id?: string
          match_3_pool_cents?: number | null
          match_4_pool_cents?: number | null
          match_5_pool_cents?: number | null
          rollover_cents?: number | null
          status?: string | null
          total_pool_cents?: number | null
          winning_numbers?: number[] | null
        }
        Update: {
          created_at?: string | null
          draw_month?: string
          id?: string
          match_3_pool_cents?: number | null
          match_4_pool_cents?: number | null
          match_5_pool_cents?: number | null
          rollover_cents?: number | null
          status?: string | null
          total_pool_cents?: number | null
          winning_numbers?: number[] | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          role: string | null
          stripe_customer_id: string | null
          subscription_status: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          role?: string | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          role?: string | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
        }
        Relationships: []
      }
      scores: {
        Row: {
          created_at: string | null
          id: string
          played_on: string
          stableford_score: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          played_on?: string
          stableford_score: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          played_on?: string
          stableford_score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scores_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_charity_preferences: {
        Row: {
          charity_id: string | null
          contribution_percent: number | null
          user_id: string
        }
        Insert: {
          charity_id?: string | null
          contribution_percent?: number | null
          user_id: string
        }
        Update: {
          charity_id?: string | null
          contribution_percent?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_charity_preferences_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_charity_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      winners: {
        Row: {
          created_at: string | null
          draw_id: string
          id: string
          matched_count: number | null
          payment_status: string | null
          prize_cents: number
          proof_image_url: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          draw_id: string
          id?: string
          matched_count?: number | null
          payment_status?: string | null
          prize_cents: number
          proof_image_url?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          draw_id?: string
          id?: string
          matched_count?: number | null
          payment_status?: string | null
          prize_cents?: number
          proof_image_url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "winners_draw_id_fkey"
            columns: ["draw_id"]
            isOneToOne: false
            referencedRelation: "draws"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "winners_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      CATEGORIES:
        | "Poverty"
        | "Healthcare"
        | "Education"
        | "Environment"
        | "Children"
        | "Women"
        | "Disaster_Relief"
        | "Community"
        | "Animal_Welfare"
        | "Mental_Health"
      REGION:
        | "North_America"
        | "South_America"
        | "Southeast_Asia"
        | "Middle_East"
        | "Africa"
        | "Europe"
        | "Australia"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      CATEGORIES: [
        "Poverty",
        "Healthcare",
        "Education",
        "Environment",
        "Children",
        "Women",
        "Disaster_Relief",
        "Community",
        "Animal_Welfare",
        "Mental_Health",
      ],
      REGION: [
        "North_America",
        "South_America",
        "Southeast_Asia",
        "Middle_East",
        "Africa",
        "Europe",
        "Australia",
      ],
    },
  },
} as const
