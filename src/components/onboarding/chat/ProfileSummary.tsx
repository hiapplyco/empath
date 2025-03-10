
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfileData {
  recipient_information: {
    relationship_to_user: string;
    recipient_name: string;
    recipient_age: number;
    contact_info: {
      primary_contact: string;
      phone: string;
      email: string;
    };
  };
  care_requirements: {
    care_level: string;
    primary_needs: string[];
    medical_conditions: string[];
    mobility_status: string;
  };
  schedule_preferences: {
    frequency: string;
    schedule_pattern: string[];
    duration: string;
    start_date: string;
  };
}

export const ProfileSummary = ({ data }: { data: string }) => {
  const navigate = useNavigate();
  
  // Parse the JSON data from the string
  const profileData: ProfileData = JSON.parse(data.replace(/```json\n?|```/g, '').trim());

  return (
    <div className="bg-purple-50 p-4 rounded-lg space-y-4 my-4">
      <div className="flex items-center gap-2 text-purple-700 mb-4">
        <Check className="w-5 h-5" />
        <span className="font-medium">Profile Created Successfully!</span>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Care Recipient Information</h3>
          <div className="bg-white p-3 rounded-md space-y-2">
            <p><span className="text-gray-600">Name:</span> {profileData.recipient_information.recipient_name}</p>
            <p><span className="text-gray-600">Age:</span> {profileData.recipient_information.recipient_age}</p>
            <p><span className="text-gray-600">Relationship:</span> {profileData.recipient_information.relationship_to_user}</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-700 mb-2">Care Requirements</h3>
          <div className="bg-white p-3 rounded-md space-y-2">
            <p><span className="text-gray-600">Care Level:</span> {profileData.care_requirements.care_level}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {profileData.care_requirements.primary_needs.map((need, index) => (
                <Badge key={index} variant="secondary">{need}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-700 mb-2">Schedule</h3>
          <div className="bg-white p-3 rounded-md space-y-2">
            <p><span className="text-gray-600">Frequency:</span> {profileData.schedule_preferences.frequency}</p>
            <p><span className="text-gray-600">Duration:</span> {profileData.schedule_preferences.duration}</p>
            <div className="text-sm text-gray-600 mt-2">
              {profileData.schedule_preferences.schedule_pattern.map((time, index) => (
                <p key={index}>{time}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Button 
        className="w-full mt-6 bg-purple-600 hover:bg-purple-700"
        onClick={() => navigate('/care-seeker/dashboard')}
      >
        Continue to em.path
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
