
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CareProfile {
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
  caregiver_preferences?: {
    personality_traits?: string[];
    experience_requirements?: string[];
    gender_preference?: string;
    required_skills?: string[];
    certifications_needed?: string[];
  };
}

export const CareProfileSummary = ({ data }: { data: string }) => {
  const navigate = useNavigate();
  
  // Parse the JSON data from the string, removing markdown code block syntax if present
  const profileData: CareProfile = JSON.parse(data.replace(/```json\n?|```/g, '').trim());

  return (
    <div className="bg-purple-50 p-6 rounded-lg space-y-6 my-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-purple-900">
          Care Profile Summary
        </h2>
        <p className="text-gray-600">
          Here's a summary of the care profile we've created together.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Care Recipient Information</h3>
          <div className="bg-white p-4 rounded-md space-y-2 shadow-sm">
            <p><span className="text-gray-600">Name:</span> {profileData.recipient_information.recipient_name}</p>
            <p><span className="text-gray-600">Age:</span> {profileData.recipient_information.recipient_age}</p>
            <p><span className="text-gray-600">Primary Contact:</span> {profileData.recipient_information.contact_info.primary_contact}</p>
            {profileData.recipient_information.languages && (
              <div>
                <span className="text-gray-600">Languages:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {profileData.recipient_information.languages.map((lang) => (
                    <Badge key={lang} variant="secondary">{lang}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-3">Care Requirements</h3>
          <div className="bg-white p-4 rounded-md space-y-3 shadow-sm">
            <p><span className="text-gray-600">Care Level:</span> {profileData.care_requirements.care_level}</p>
            <div>
              <span className="text-gray-600 block mb-2">Primary Care Needs:</span>
              <div className="flex flex-wrap gap-2">
                {profileData.care_requirements.primary_needs.map((need) => (
                  <Badge key={need} variant="secondary">{need}</Badge>
                ))}
              </div>
            </div>
            <div>
              <span className="text-gray-600 block mb-2">Medical Conditions:</span>
              <div className="flex flex-wrap gap-2">
                {profileData.care_requirements.medical_conditions.map((condition) => (
                  <Badge key={condition}>{condition}</Badge>
                ))}
              </div>
            </div>
            <p><span className="text-gray-600">Mobility Status:</span> {profileData.care_requirements.mobility_status}</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-3">Schedule Details</h3>
          <div className="bg-white p-4 rounded-md space-y-2 shadow-sm">
            <p><span className="text-gray-600">Frequency:</span> {profileData.schedule_preferences.frequency}</p>
            <p><span className="text-gray-600">Duration:</span> {profileData.schedule_preferences.duration}</p>
            <div className="mt-2">
              <span className="text-gray-600 block mb-1">Preferred Schedule:</span>
              {profileData.schedule_preferences.schedule_pattern.map((time) => (
                <p key={time} className="text-sm text-gray-700">{time}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Button 
        className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white"
        onClick={() => navigate('/care-seeker/onboarding/profile')}
      >
        Continue to Profile Setup
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
