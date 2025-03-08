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
          availability: Json | null
          availability_details: Json | null
          available: boolean | null
          bio: string | null
          contact_info: Json | null
          created_at: string
          emergency_protocols: Json[] | null
          equipment_skills: string[] | null
          id: string
          input_method: string | null
          languages: string[] | null
          name: string
          patient_types: Json[] | null
          phone: string | null
          rate_preferences: Json | null
          skills: string[] | null
          updated_at: string
          years_experience: number
        }
        Insert: {
          availability?: Json | null
          availability_details?: Json | null
          available?: boolean | null
          bio?: string | null
          contact_info?: Json | null
          created_at?: string
          emergency_protocols?: Json[] | null
          equipment_skills?: string[] | null
          id?: string
          input_method?: string | null
          languages?: string[] | null
          name: string
          patient_types?: Json[] | null
          phone?: string | null
          rate_preferences?: Json | null
          skills?: string[] | null
          updated_at?: string
          years_experience?: number
        }
        Update: {
          availability?: Json | null
          availability_details?: Json | null
          available?: boolean | null
          bio?: string | null
          contact_info?: Json | null
          created_at?: string
          emergency_protocols?: Json[] | null
          equipment_skills?: string[] | null
          id?: string
          input_method?: string | null
          languages?: string[] | null
          name?: string
          patient_types?: Json[] | null
          phone?: string | null
          rate_preferences?: Json | null
          skills?: string[] | null
          updated_at?: string
          years_experience?: number
        }
        Relationships: []
      }
      caregiver_training: {
        Row: {
          assessment_score: number | null
          caregiver_id: string | null
          completed_at: string | null
          created_at: string | null
          id: string
          module_id: string | null
          progress: number | null
        }
        Insert: {
          assessment_score?: number | null
          caregiver_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          module_id?: string | null
          progress?: number | null
        }
        Update: {
          assessment_score?: number | null
          caregiver_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          module_id?: string | null
          progress?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "caregiver_training_caregiver_id_fkey"
            columns: ["caregiver_id"]
            isOneToOne: false
            referencedRelation: "caregiver_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "caregiver_training_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "training_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      certifications: {
        Row: {
          caregiver_id: string
          created_at: string
          expiry_date: string | null
          id: string
          issued_date: string | null
          name: string
          status: string
          updated_at: string
          verification_status: string
        }
        Insert: {
          caregiver_id: string
          created_at?: string
          expiry_date?: string | null
          id?: string
          issued_date?: string | null
          name: string
          status?: string
          updated_at?: string
          verification_status?: string
        }
        Update: {
          caregiver_id?: string
          created_at?: string
          expiry_date?: string | null
          id?: string
          issued_date?: string | null
          name?: string
          status?: string
          updated_at?: string
          verification_status?: string
        }
        Relationships: []
      }
      mentor_relationships: {
        Row: {
          created_at: string | null
          id: string
          mentee_id: string | null
          mentor_id: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          mentee_id?: string | null
          mentor_id?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          mentee_id?: string | null
          mentor_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentor_relationships_mentee_id_fkey"
            columns: ["mentee_id"]
            isOneToOne: true
            referencedRelation: "caregiver_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentor_relationships_mentor_id_fkey"
            columns: ["mentor_id"]
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
      training_modules: {
        Row: {
          content: Json
          created_at: string | null
          description: string | null
          id: string
          title: string
          type: string
        }
        Insert: {
          content: Json
          created_at?: string | null
          description?: string | null
          id?: string
          title: string
          type: string
        }
        Update: {
          content?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          title?: string
          type?: string
        }
        Relationships: []
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
