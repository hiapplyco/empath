
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CareProfile = () => {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useQuery({
    queryKey: ['care-seeker-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: profileData, error } = await supabase
        .from('care_seeker_profiles')
        .select(`
          *,
          care_recipients (
            first_name,
            last_name,
            age,
            gender,
            medical_overview,
            primary_language,
            additional_languages
          ),
          care_needs (
            care_level,
            primary_care_reason,
            specific_needs,
            care_frequency,
            schedule_requirements,
            location_details
          ),
          care_preferences (
            required_certifications,
            special_skills,
            desired_traits,
            gender_preference,
            language_requirements,
            hourly_rate_range
          )
        `)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      return profileData;
    }
  });

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!profile) {
    return (
      <Card className="m-8">
        <CardContent className="p-6">
          <p className="text-center text-gray-500">No profile data available.</p>
        </CardContent>
      </Card>
    );
  }

  const recipient = profile.care_recipients?.[0];
  const needs = profile.care_needs?.[0];
  const preferences = profile.care_preferences?.[0];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/care-seeker/dashboard')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Care Recipient Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {recipient && (
              <div className="grid gap-4">
                <div>
                  <h3 className="font-medium mb-2">Basic Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><span className="text-gray-600">Name:</span> {recipient.first_name} {recipient.last_name}</p>
                    <p><span className="text-gray-600">Age:</span> {recipient.age}</p>
                    <p><span className="text-gray-600">Gender:</span> {recipient.gender}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Languages</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><span className="text-gray-600">Primary:</span> {recipient.primary_language}</p>
                    {recipient.additional_languages && recipient.additional_languages.length > 0 && (
                      <div className="mt-2">
                        <span className="text-gray-600">Additional:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {recipient.additional_languages.map((lang: string, index: number) => (
                            <Badge key={index} variant="secondary">{lang}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {recipient.medical_overview && (
                  <div>
                    <h3 className="font-medium mb-2">Medical Overview</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>{recipient.medical_overview}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {needs && (
              <div>
                <h3 className="text-lg font-medium mb-4">Care Requirements</h3>
                <div className="grid gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><span className="text-gray-600">Care Level:</span> {needs.care_level}</p>
                    <p><span className="text-gray-600">Primary Reason:</span> {needs.primary_care_reason}</p>
                    {needs.specific_needs && (
                      <div className="mt-2">
                        <span className="text-gray-600">Specific Needs:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {needs.specific_needs.map((need: string, index: number) => (
                            <Badge key={index} variant="secondary">{need}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {needs.schedule_requirements && (
                    <div>
                      <h4 className="font-medium mb-2">Schedule</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p><span className="text-gray-600">Frequency:</span> {needs.care_frequency}</p>
                        {needs.schedule_requirements.times && (
                          <div className="mt-2">
                            <span className="text-gray-600">Preferred Times:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {needs.schedule_requirements.times.map((time: string, index: number) => (
                                <Badge key={index} variant="secondary">{time}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {preferences && (
              <div>
                <h3 className="text-lg font-medium mb-4">Caregiver Preferences</h3>
                <div className="grid gap-4">
                  {preferences.required_certifications && (
                    <div>
                      <h4 className="font-medium mb-2">Required Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {preferences.required_certifications.map((cert: string, index: number) => (
                          <Badge key={index} variant="secondary">{cert}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {preferences.special_skills && (
                    <div>
                      <h4 className="font-medium mb-2">Special Skills Needed</h4>
                      <div className="flex flex-wrap gap-2">
                        {preferences.special_skills.map((skill: string, index: number) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    {preferences.gender_preference && (
                      <p><span className="text-gray-600">Gender Preference:</span> {preferences.gender_preference}</p>
                    )}
                    {preferences.hourly_rate_range && (
                      <p><span className="text-gray-600">Hourly Rate Range:</span> ${preferences.hourly_rate_range.min} - ${preferences.hourly_rate_range.max}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareProfile;
