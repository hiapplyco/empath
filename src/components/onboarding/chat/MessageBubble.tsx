
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MessageBubbleProps {
  role: 'assistant' | 'user';
  content: string;
  isProfileData?: boolean;
}

export const MessageBubble = ({ role, content, isProfileData }: MessageBubbleProps) => {
  if (isProfileData) {
    try {
      const profileData = JSON.parse(content);
      return (
        <Card className="w-full p-4 bg-purple-50 border border-purple-100 mb-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-purple-900">Personal Information</h3>
              <div className="grid gap-2">
                <div><span className="font-medium">Name:</span> {profileData.personal_information.name}</div>
                <div><span className="font-medium">Contact:</span> {profileData.personal_information.contact_info.phone}</div>
                <div><span className="font-medium">Languages:</span> {profileData.personal_information.languages.join(", ")}</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-purple-900">Experience & Skills</h3>
              <div className="grid gap-2">
                <div><span className="font-medium">Years of Experience:</span> {profileData.experience.years}</div>
                <div className="flex flex-wrap gap-1">
                  {profileData.experience.specialties.map((specialty: string, index: number) => (
                    <Badge key={index} variant="secondary">{specialty}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-purple-900">Patient Care</h3>
              <div className="grid gap-2">
                {profileData.patient_care_details.patient_types.map((type: any, index: number) => (
                  <div key={index}>
                    <div className="font-medium">{type.type}</div>
                    <ul className="list-disc list-inside pl-4 text-sm text-gray-600">
                      {type.details.common_challenges.map((challenge: string, idx: number) => (
                        <li key={idx}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      );
    } catch (e) {
      console.error("Error parsing profile data:", e);
    }
  }

  return (
    <div className={`flex ${role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
      <div className={`rounded-lg px-4 py-2 max-w-[80%] ${
        role === 'assistant'
          ? 'bg-[#E5DEFF] text-gray-800'
          : 'bg-primary text-primary-foreground'
      }`}>
        {content}
      </div>
    </div>
  );
};
