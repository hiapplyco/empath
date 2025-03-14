export interface Message {
  role: 'assistant' | 'user';
  text: string;
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
    contact_info: {
      primary_contact: string;
      phone: string;
      email: string;
    };
    languages?: string[];
    cultural_background?: string;
  };
  care_requirements: {
    care_level: string;
    primary_needs: string[];
    medical_conditions: string[];
    mobility_status: string;
    special_accommodations?: string[];
  };
  schedule_preferences: {
    frequency: string;
    schedule_pattern: string[];
    duration: string;
    start_date: string;
  };
}

// Add any missing interfaces if needed
export interface SystemConfig {
  language: string;
  initialPrompt: string;
}
