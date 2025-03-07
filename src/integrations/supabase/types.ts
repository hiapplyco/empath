export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      caregiver_profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          monthly_earnings: number | null
          next_payment_date: string | null
          onboarding_step: number | null
          phone: string | null
          rating: number | null
          status: string | null
          total_reviews: number | null
          updated_at: string
          user_id: string
          weekly_hours: number | null
          years_experience: number | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          monthly_earnings?: number | null
          next_payment_date?: string | null
          onboarding_step?: number | null
          phone?: string | null
          rating?: number | null
          status?: string | null
          total_reviews?: number | null
          updated_at?: string
          user_id: string
          weekly_hours?: number | null
          years_experience?: number | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          monthly_earnings?: number | null
          next_payment_date?: string | null
          onboarding_step?: number | null
          phone?: string | null
          rating?: number | null
          status?: string | null
          total_reviews?: number | null
          updated_at?: string
          user_id?: string
          weekly_hours?: number | null
          years_experience?: number | null
        }
        Relationships: []
      }
      certifications: {
        Row: {
          caregiver_id: string
          completed_at: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          name: string
          status: string
          updated_at: string | null
        }
        Insert: {
          caregiver_id: string
          completed_at?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          name: string
          status: string
          updated_at?: string | null
        }
        Update: {
          caregiver_id?: string
          completed_at?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          name?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certifications_caregiver_id_fkey"
            columns: ["caregiver_id"]
            isOneToOne: false
            referencedRelation: "caregiver_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          caregiver_id: string
          content: string
          created_at: string | null
          id: string
          read: boolean | null
          sender_name: string
          sender_type: string
        }
        Insert: {
          caregiver_id: string
          content: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          sender_name: string
          sender_type: string
        }
        Update: {
          caregiver_id?: string
          content?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          sender_name?: string
          sender_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_caregiver_id_fkey"
            columns: ["caregiver_id"]
            isOneToOne: false
            referencedRelation: "caregiver_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      shifts: {
        Row: {
          caregiver_id: string
          client_name: string
          created_at: string | null
          end_time: string
          id: string
          start_time: string
          status: string | null
          tasks: string[] | null
          updated_at: string | null
        }
        Insert: {
          caregiver_id: string
          client_name: string
          created_at?: string | null
          end_time: string
          id?: string
          start_time: string
          status?: string | null
          tasks?: string[] | null
          updated_at?: string | null
        }
        Update: {
          caregiver_id?: string
          client_name?: string
          created_at?: string | null
          end_time?: string
          id?: string
          start_time?: string
          status?: string | null
          tasks?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shifts_caregiver_id_fkey"
            columns: ["caregiver_id"]
            isOneToOne: false
            referencedRelation: "caregiver_profiles"
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
