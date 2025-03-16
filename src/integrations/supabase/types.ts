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
      admin_notifications: {
        Row: {
          content: Json
          created_at: string | null
          id: string
          read: boolean | null
          type: string
        }
        Insert: {
          content: Json
          created_at?: string | null
          id?: string
          read?: boolean | null
          type: string
        }
        Update: {
          content?: Json
          created_at?: string | null
          id?: string
          read?: boolean | null
          type?: string
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          role: Database["public"]["Enums"]["admin_role"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          role?: Database["public"]["Enums"]["admin_role"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          role?: Database["public"]["Enums"]["admin_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      care_needs: {
        Row: {
          care_duration: string | null
          care_frequency: Database["public"]["Enums"]["care_frequency"] | null
          care_level: Database["public"]["Enums"]["care_level"]
          created_at: string | null
          id: string
          location_details: Json | null
          primary_care_reason: string
          recipient_id: string
          schedule_requirements: Json | null
          shift_length: number | null
          specific_needs: string[] | null
          start_date: string | null
          urgency: string | null
        }
        Insert: {
          care_duration?: string | null
          care_frequency?: Database["public"]["Enums"]["care_frequency"] | null
          care_level: Database["public"]["Enums"]["care_level"]
          created_at?: string | null
          id?: string
          location_details?: Json | null
          primary_care_reason: string
          recipient_id: string
          schedule_requirements?: Json | null
          shift_length?: number | null
          specific_needs?: string[] | null
          start_date?: string | null
          urgency?: string | null
        }
        Update: {
          care_duration?: string | null
          care_frequency?: Database["public"]["Enums"]["care_frequency"] | null
          care_level?: Database["public"]["Enums"]["care_level"]
          created_at?: string | null
          id?: string
          location_details?: Json | null
          primary_care_reason?: string
          recipient_id?: string
          schedule_requirements?: Json | null
          shift_length?: number | null
          specific_needs?: string[] | null
          start_date?: string | null
          urgency?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "care_needs_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "care_recipients"
            referencedColumns: ["id"]
          },
        ]
      }
      care_preferences: {
        Row: {
          allergies: string[] | null
          created_at: string | null
          desired_traits: string[] | null
          driving_required: boolean | null
          experience_level: number | null
          gender_preference:
            | Database["public"]["Enums"]["gender_preference"]
            | null
          hourly_rate_range: Json | null
          id: string
          language_requirements: string[] | null
          lifting_requirement: number | null
          other_requirements: string | null
          recipient_id: string
          required_certifications: string[] | null
          special_skills: string[] | null
          vaccination_requirements: string[] | null
          weekly_hours: number | null
        }
        Insert: {
          allergies?: string[] | null
          created_at?: string | null
          desired_traits?: string[] | null
          driving_required?: boolean | null
          experience_level?: number | null
          gender_preference?:
            | Database["public"]["Enums"]["gender_preference"]
            | null
          hourly_rate_range?: Json | null
          id?: string
          language_requirements?: string[] | null
          lifting_requirement?: number | null
          other_requirements?: string | null
          recipient_id: string
          required_certifications?: string[] | null
          special_skills?: string[] | null
          vaccination_requirements?: string[] | null
          weekly_hours?: number | null
        }
        Update: {
          allergies?: string[] | null
          created_at?: string | null
          desired_traits?: string[] | null
          driving_required?: boolean | null
          experience_level?: number | null
          gender_preference?:
            | Database["public"]["Enums"]["gender_preference"]
            | null
          hourly_rate_range?: Json | null
          id?: string
          language_requirements?: string[] | null
          lifting_requirement?: number | null
          other_requirements?: string | null
          recipient_id?: string
          required_certifications?: string[] | null
          special_skills?: string[] | null
          vaccination_requirements?: string[] | null
          weekly_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "care_preferences_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "care_recipients"
            referencedColumns: ["id"]
          },
        ]
      }
      care_recipients: {
        Row: {
          accessibility_needs: string[] | null
          additional_languages: string[] | null
          age: number | null
          first_name: string
          gender: string | null
          id: string
          last_name: string | null
          medical_overview: string | null
          primary_language: string | null
          profile_id: string
        }
        Insert: {
          accessibility_needs?: string[] | null
          additional_languages?: string[] | null
          age?: number | null
          first_name: string
          gender?: string | null
          id?: string
          last_name?: string | null
          medical_overview?: string | null
          primary_language?: string | null
          profile_id: string
        }
        Update: {
          accessibility_needs?: string[] | null
          additional_languages?: string[] | null
          age?: number | null
          first_name?: string
          gender?: string | null
          id?: string
          last_name?: string | null
          medical_overview?: string | null
          primary_language?: string | null
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "care_recipients_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "care_seeker_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      care_seeker_interviews: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          id: string
          matching_tags: string[] | null
          needs_review: boolean | null
          processed_profile: Json
          raw_interview_data: Json
          review_completed: boolean | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          id?: string
          matching_tags?: string[] | null
          needs_review?: boolean | null
          processed_profile: Json
          raw_interview_data: Json
          review_completed?: boolean | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          id?: string
          matching_tags?: string[] | null
          needs_review?: boolean | null
          processed_profile?: Json
          raw_interview_data?: Json
          review_completed?: boolean | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      care_seeker_profiles: {
        Row: {
          created_at: string | null
          id: string
          interview_completed: boolean | null
          onboarding_completed: boolean | null
          onboarding_step: number | null
          profile_sections: Json | null
          relationship_to_recipient: Database["public"]["Enums"]["care_recipient_relation"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          interview_completed?: boolean | null
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          profile_sections?: Json | null
          relationship_to_recipient: Database["public"]["Enums"]["care_recipient_relation"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          interview_completed?: boolean | null
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          profile_sections?: Json | null
          relationship_to_recipient?: Database["public"]["Enums"]["care_recipient_relation"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      caregiver_documents: {
        Row: {
          created_at: string | null
          description: string | null
          document_type: Database["public"]["Enums"]["document_type"]
          expires_at: string | null
          file_name: string | null
          file_path: string | null
          id: string
          required: boolean | null
          status: Database["public"]["Enums"]["document_status"] | null
          title: string
          updated_at: string | null
          user_id: string
          verification_notes: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          document_type: Database["public"]["Enums"]["document_type"]
          expires_at?: string | null
          file_name?: string | null
          file_path?: string | null
          id?: string
          required?: boolean | null
          status?: Database["public"]["Enums"]["document_status"] | null
          title: string
          updated_at?: string | null
          user_id: string
          verification_notes?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          document_type?: Database["public"]["Enums"]["document_type"]
          expires_at?: string | null
          file_name?: string | null
          file_path?: string | null
          id?: string
          required?: boolean | null
          status?: Database["public"]["Enums"]["document_status"] | null
          title?: string
          updated_at?: string | null
          user_id?: string
          verification_notes?: string | null
        }
        Relationships: []
      }
      caregiver_metrics: {
        Row: {
          average_rating: number | null
          caregiver_id: string
          certifications_count: number | null
          completed_trainings: number | null
          created_at: string | null
          id: string
          monthly_earnings: number | null
          next_payment_date: string | null
          next_shift_client: string | null
          next_shift_time: string | null
          pending_messages: number | null
          remaining_weekly_hours: number | null
          todays_shifts: number | null
          total_reviews: number | null
          updated_at: string | null
          weekly_hours: number | null
        }
        Insert: {
          average_rating?: number | null
          caregiver_id: string
          certifications_count?: number | null
          completed_trainings?: number | null
          created_at?: string | null
          id?: string
          monthly_earnings?: number | null
          next_payment_date?: string | null
          next_shift_client?: string | null
          next_shift_time?: string | null
          pending_messages?: number | null
          remaining_weekly_hours?: number | null
          todays_shifts?: number | null
          total_reviews?: number | null
          updated_at?: string | null
          weekly_hours?: number | null
        }
        Update: {
          average_rating?: number | null
          caregiver_id?: string
          certifications_count?: number | null
          completed_trainings?: number | null
          created_at?: string | null
          id?: string
          monthly_earnings?: number | null
          next_payment_date?: string | null
          next_shift_client?: string | null
          next_shift_time?: string | null
          pending_messages?: number | null
          remaining_weekly_hours?: number | null
          todays_shifts?: number | null
          total_reviews?: number | null
          updated_at?: string | null
          weekly_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "caregiver_metrics_caregiver_id_fkey"
            columns: ["caregiver_id"]
            isOneToOne: false
            referencedRelation: "caregiver_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      caregiver_profiles: {
        Row: {
          "Available Shifts": string | null
          Bio: string | null
          created_at: string
          Education: string | null
          Email: string | null
          Experience: string | null
          "HCA Expiration Date": string | null
          "HCA Registry ID": string | null
          "Hourly Rate": string | null
          id: string
          input_method: string | null
          Languages: string | null
          "License Type": string | null
          "Locations Serviced": string | null
          Name: string | null
          "Pet Preferences": string | null
          "Phone Number": string | null
          "Services Provided": string | null
          "Type of Background Check": string | null
          updated_at: string
          Vaccinations: string | null
        }
        Insert: {
          "Available Shifts"?: string | null
          Bio?: string | null
          created_at?: string
          Education?: string | null
          Email?: string | null
          Experience?: string | null
          "HCA Expiration Date"?: string | null
          "HCA Registry ID"?: string | null
          "Hourly Rate"?: string | null
          id?: string
          input_method?: string | null
          Languages?: string | null
          "License Type"?: string | null
          "Locations Serviced"?: string | null
          Name?: string | null
          "Pet Preferences"?: string | null
          "Phone Number"?: string | null
          "Services Provided"?: string | null
          "Type of Background Check"?: string | null
          updated_at?: string
          Vaccinations?: string | null
        }
        Update: {
          "Available Shifts"?: string | null
          Bio?: string | null
          created_at?: string
          Education?: string | null
          Email?: string | null
          Experience?: string | null
          "HCA Expiration Date"?: string | null
          "HCA Registry ID"?: string | null
          "Hourly Rate"?: string | null
          id?: string
          input_method?: string | null
          Languages?: string | null
          "License Type"?: string | null
          "Locations Serviced"?: string | null
          Name?: string | null
          "Pet Preferences"?: string | null
          "Phone Number"?: string | null
          "Services Provided"?: string | null
          "Type of Background Check"?: string | null
          updated_at?: string
          Vaccinations?: string | null
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
      document_verifications: {
        Row: {
          created_at: string | null
          document_path: string
          document_type: string
          id: string
          status: string
          updated_at: string | null
          user_id: string
          verification_results: Json | null
        }
        Insert: {
          created_at?: string | null
          document_path: string
          document_type: string
          id?: string
          status?: string
          updated_at?: string | null
          user_id: string
          verification_results?: Json | null
        }
        Update: {
          created_at?: string | null
          document_path?: string
          document_type?: string
          id?: string
          status?: string
          updated_at?: string | null
          user_id?: string
          verification_results?: Json | null
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
      pia: {
        Row: {
          "Available Shifts": string | null
          Bio: string | null
          Education: string | null
          Email: string | null
          Experience: string | null
          "HCA Expiration Date": string | null
          "HCA Registry ID": string | null
          "Hourly Rate": string | null
          Languages: string | null
          "License Type": string | null
          "Locations Serviced": string | null
          Name: string | null
          "Pet Preferences": string | null
          "Phone Number": string | null
          "Services Provided": string | null
          "Type of Background Check": string | null
          Vaccinations: string | null
        }
        Insert: {
          "Available Shifts"?: string | null
          Bio?: string | null
          Education?: string | null
          Email?: string | null
          Experience?: string | null
          "HCA Expiration Date"?: string | null
          "HCA Registry ID"?: string | null
          "Hourly Rate"?: string | null
          Languages?: string | null
          "License Type"?: string | null
          "Locations Serviced"?: string | null
          Name?: string | null
          "Pet Preferences"?: string | null
          "Phone Number"?: string | null
          "Services Provided"?: string | null
          "Type of Background Check"?: string | null
          Vaccinations?: string | null
        }
        Update: {
          "Available Shifts"?: string | null
          Bio?: string | null
          Education?: string | null
          Email?: string | null
          Experience?: string | null
          "HCA Expiration Date"?: string | null
          "HCA Registry ID"?: string | null
          "Hourly Rate"?: string | null
          Languages?: string | null
          "License Type"?: string | null
          "Locations Serviced"?: string | null
          Name?: string | null
          "Pet Preferences"?: string | null
          "Phone Number"?: string | null
          "Services Provided"?: string | null
          "Type of Background Check"?: string | null
          Vaccinations?: string | null
        }
        Relationships: []
      }
      professional_independent_aides: {
        Row: {
          available_shifts: string | null
          average_rating: number | null
          background_check_type: string | null
          bio: string | null
          created_at: string | null
          education: Database["public"]["Enums"]["education_level"][] | null
          email: string | null
          hca_expiration_date: string | null
          hca_registry_id: string | null
          hourly_rate: string | null
          id: string
          languages: string[] | null
          license_type: string[] | null
          locations_serviced: string[] | null
          name: string
          pet_preferences: string[] | null
          phone_number: string | null
          profile_image_url: string | null
          services_provided: string[] | null
          status: string | null
          total_reviews: number | null
          updated_at: string | null
          vaccinations: string[] | null
          verification_status: string | null
          years_experience: string | null
        }
        Insert: {
          available_shifts?: string | null
          average_rating?: number | null
          background_check_type?: string | null
          bio?: string | null
          created_at?: string | null
          education?: Database["public"]["Enums"]["education_level"][] | null
          email?: string | null
          hca_expiration_date?: string | null
          hca_registry_id?: string | null
          hourly_rate?: string | null
          id?: string
          languages?: string[] | null
          license_type?: string[] | null
          locations_serviced?: string[] | null
          name: string
          pet_preferences?: string[] | null
          phone_number?: string | null
          profile_image_url?: string | null
          services_provided?: string[] | null
          status?: string | null
          total_reviews?: number | null
          updated_at?: string | null
          vaccinations?: string[] | null
          verification_status?: string | null
          years_experience?: string | null
        }
        Update: {
          available_shifts?: string | null
          average_rating?: number | null
          background_check_type?: string | null
          bio?: string | null
          created_at?: string | null
          education?: Database["public"]["Enums"]["education_level"][] | null
          email?: string | null
          hca_expiration_date?: string | null
          hca_registry_id?: string | null
          hourly_rate?: string | null
          id?: string
          languages?: string[] | null
          license_type?: string[] | null
          locations_serviced?: string[] | null
          name?: string
          pet_preferences?: string[] | null
          phone_number?: string | null
          profile_image_url?: string | null
          services_provided?: string[] | null
          status?: string | null
          total_reviews?: number | null
          updated_at?: string | null
          vaccinations?: string[] | null
          verification_status?: string | null
          years_experience?: string | null
        }
        Relationships: []
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
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_admin_access: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      get_user_role: {
        Args: {
          user_id: string
        }
        Returns: string
      }
      get_user_roles: {
        Args: {
          user_id: string
        }
        Returns: Database["public"]["Enums"]["app_role"][]
      }
      migrate_pia_to_caregiver_profiles: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      admin_role: "admin" | "moderator"
      app_role: "admin" | "moderator" | "user"
      care_frequency: "one_time" | "recurring" | "full_time"
      care_level: "light" | "moderate" | "extensive"
      care_recipient_relation: "self" | "family_member" | "friend" | "client"
      document_status:
        | "pending"
        | "uploading"
        | "uploaded"
        | "verified"
        | "rejected"
        | "expired"
      document_type:
        | "government_id"
        | "certification"
        | "background_check"
        | "medical"
        | "tax"
        | "training"
        | "insurance"
        | "other"
      education_level:
        | "CNA"
        | "Home Health Care Certified"
        | "Undergrad"
        | "Masters"
        | "Registered Nurse"
        | "LVN"
        | "Other"
      gender_preference: "no_preference" | "male" | "female" | "other"
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
