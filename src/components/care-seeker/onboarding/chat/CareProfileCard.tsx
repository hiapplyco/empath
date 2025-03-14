
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays, Heart, Clock, Star } from "lucide-react";

interface CareRequirements {
  care_level: string;
  primary_needs: string[];
  medical_conditions: string[];
  mobility_status: string;
  special_accommodations?: string[];
}

interface RecipientInformation {
  relationship_to_user: string;
  recipient_name: string;
  recipient_age: number;
  contact_info: {
    primary_contact: string;
    phone: string;
    email: string;
  };
  languages?: string[];
}

interface SchedulePreferences {
  frequency: string;
  schedule_pattern: string[];
  duration: string;
  start_date: string;
}

interface CareProfile {
  recipient_information: RecipientInformation;
  care_requirements: CareRequirements;
  schedule_preferences: SchedulePreferences;
}

interface CareProfileCardProps {
  profile: CareProfile;
}

export const CareProfileCard = ({ profile }: CareProfileCardProps) => {
  return (
    <Card className="w-full bg-white shadow-sm p-6 space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-purple-900 flex items-center gap-2">
            <Star className="h-5 w-5 text-purple-500" />
            Care Recipient Profile
          </h3>
          <p className="text-sm text-gray-500">Profile summary for {profile.recipient_information.recipient_name}</p>
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {/* Basic Information */}
            <section>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Basic Information</h4>
              <div className="grid gap-2 text-sm">
                <p><span className="text-gray-600">Name:</span> {profile.recipient_information.recipient_name}</p>
                <p><span className="text-gray-600">Age:</span> {profile.recipient_information.recipient_age}</p>
                <p><span className="text-gray-600">Relationship:</span> {profile.recipient_information.relationship_to_user}</p>
                <p><span className="text-gray-600">Primary Contact:</span> {profile.recipient_information.contact_info.primary_contact}</p>
              </div>
            </section>

            {/* Care Requirements */}
            <section>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Heart className="h-4 w-4 text-purple-500" />
                Care Requirements
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Care Level</p>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    {profile.care_requirements.care_level}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-2">Primary Needs</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.care_requirements.primary_needs.map((need) => (
                      <Badge key={need} variant="outline" className="bg-blue-50">
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Medical Conditions</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.care_requirements.medical_conditions.map((condition) => (
                      <Badge key={condition} variant="destructive" className="bg-red-50 text-red-700 border-red-200">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Mobility Status</p>
                  <p className="text-sm">{profile.care_requirements.mobility_status}</p>
                </div>
              </div>
            </section>

            {/* Schedule */}
            <section>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-purple-500" />
                Schedule Preferences
              </h4>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Frequency</p>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {profile.schedule_preferences.frequency}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Duration</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{profile.schedule_preferences.duration}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Schedule Pattern</p>
                  {profile.schedule_preferences.schedule_pattern.map((pattern) => (
                    <p key={pattern} className="text-sm">{pattern}</p>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
};
