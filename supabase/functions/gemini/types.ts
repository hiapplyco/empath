
export interface CaregiverProfile {
  personal_information: {
    name: string;
    contact_info: {
      phone: string;
      email: string;
    };
    certifications: string[];
    languages: string[];
  };
  experience: {
    years_experience: number;
    specialties: string[];
    availability: {
      shift_types: string[];
    };
  };
  patient_care_details: {
    patient_types: Array<{
      type: string;
      details: {
        common_challenges: string[];
      };
    }>;
    equipment_skills: string[];
  };
  emergency_response: {
    protocols: Array<{
      scenario: string;
      expected_response: string[];
    }>;
  };
}

