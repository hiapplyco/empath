
export interface CaregiverProfile {
  name: string;
  years_experience: number;
  skills: string[];
  available: boolean;
  bio?: string;
  contact_info: {
    phone?: string;
    email?: string;
  };
  languages: string[];
  patient_types: Array<{
    patient_type: string;
  }>;
  equipment_skills: string[];
  emergency_protocols: Array<{
    scenario: string;
  }>;
  availability_details: {
    shift_types: string[];
  };
}

export interface Certification {
  id: string;
  name: string;
  status: string;
  issued_date?: string;
  expiry_date?: string;
  verification_status: string;
  created_at: string;
  updated_at: string;
}
