
export interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export interface ChatResponse {
  type: 'message' | 'profile';
  text?: string;
  data?: any;
  message?: string;
  error?: string;
}

export interface ProfileData {
  recipient_information: {
    relationship_to_user: string;
    recipient_name: string;
    recipient_age: number;
    health_status: string;
    contact_info: {
      primary_contact: string;
      phone: string;
      email: string;
    };
    languages: string[];
    cultural_background: string;
  };
  care_requirements: {
    care_level: string;
    primary_needs: string[];
    medical_conditions: string[];
    mobility_status: string;
    special_accommodations: string[];
    dietary_requirements: string[];
    medical_equipment: string[];
  };
  schedule_preferences: {
    frequency: string;
    schedule_pattern: string[];
    duration: string;
    start_date: string;
    location_details: {
      address: string;
      special_instructions: string;
    };
  };
  preferences: {
    caregiver_qualities: string[];
    language_requirements: string[];
    cultural_preferences: string;
    environment: {
      pets: boolean;
      smoking_allowed: boolean;
      accessibility_features: string[];
    };
  };
}
