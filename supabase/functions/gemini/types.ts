
export interface CaregiverProfile {
  personal_information: {
    name: string;
    contact_info: {
      phone: string;
      email: string;
      address: string;
    };
    certifications: string[];
    languages: string[];
    bio: string;
  };
  experience: {
    years_experience: number;
    specialties: string[];
    previous_roles: string[];
    availability: {
      shift_preferences: Array<'Morning' | 'Evening' | 'Night' | 'Live-in'>;
      hours_per_week: number;
    };
  };
  patient_care_details: {
    patient_types: Array<{
      type: string;
      description: string;
      common_maladies: Array<{
        name: string;
        description: string;
        symptoms: string[];
        care_techniques: string[];
        equipment: string[];
        common_medications: string[];
        daily_living_assistance: string[];
      }>;
    }>;
    care_equipment: {
      mobility_aids: string[];
      medical_devices: string[];
      safety_equipment: string[];
    };
    emergency_protocols: Array<{
      scenario: string;
      steps: string[];
      required_equipment: string[];
    }>;
    assessment_tools: Array<{
      type: string;
      name: string;
      description: string;
      frequency: string;
    }>;
  };
  legal_ethical_considerations: {
    consent_management: {
      informed_consent: boolean;
      power_of_attorney: boolean;
    };
    privacy_compliance: {
      HIPAA: boolean;
      data_protection: boolean;
    };
    advance_directives: {
      living_will: boolean;
      DNR_orders: boolean;
    };
  };
}
