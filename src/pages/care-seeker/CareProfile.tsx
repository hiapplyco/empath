
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const CareProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['care-seeker-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // First get the user's care seeker profile
      const { data: profileData, error: profileError } = await supabase
        .from('care_seeker_profiles')
        .select('id, user_id')
        .eq('user_id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        throw profileError;
      }

      if (!profileData) {
        throw new Error('No profile found');
      }

      // Then get the care recipient details using the profile ID
      const { data: recipientData, error: recipientError } = await supabase
        .from('care_recipients')
        .select(`
          *,
          care_needs (
            care_level,
            primary_care_reason,
            specific_needs,
            care_frequency,
            schedule_requirements
          ),
          care_preferences (
            required_certifications,
            special_skills,
            gender_preference,
            hourly_rate_range,
            language_requirements
          )
        `)
        .eq('profile_id', profileData.id)
        .single();

      if (recipientError) {
        console.error('Error fetching recipient:', recipientError);
        throw recipientError;
      }

      return recipientData;
    },
    retry: 1,
    onError: (error) => {
      console.error('Profile fetch error:', error);
      toast({
        variant: "destructive",
        title: "Error loading profile",
        description: "Could not load your care profile. Please try again later."
      });
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-gray-500">Loading profile...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-gray-500">No profile data available.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
            <div className="grid gap-4">
              <div>
                <h3 className="font-medium mb-2">Basic Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><span className="text-gray-600">Name:</span> {profile.first_name} {profile.last_name}</p>
                  <p><span className="text-gray-600">Age:</span> {profile.age}</p>
                  <p><span className="text-gray-600">Gender:</span> {profile.gender}</p>
                </div>
              </div>

              {profile.care_needs && (
                <div>
                  <h3 className="font-medium mb-2">Care Requirements</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><span className="text-gray-600">Care Level:</span> {profile.care_needs.care_level}</p>
                    <p><span className="text-gray-600">Primary Reason:</span> {profile.care_needs.primary_care_reason}</p>
                    {profile.care_needs.specific_needs && profile.care_needs.specific_needs.length > 0 && (
                      <div className="mt-2">
                        <span className="text-gray-600">Specific Needs:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {profile.care_needs.specific_needs.map((need: string, index: number) => (
                            <Badge key={index} variant="secondary">{need}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {profile.care_preferences && (
                <div>
                  <h3 className="font-medium mb-2">Caregiver Preferences</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    {profile.care_preferences.gender_preference && (
                      <p><span className="text-gray-600">Gender Preference:</span> {profile.care_preferences.gender_preference}</p>
                    )}
                    {profile.care_preferences.required_certifications && (
                      <div className="mt-2">
                        <span className="text-gray-600">Required Certifications:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {profile.care_preferences.required_certifications.map((cert: string, index: number) => (
                            <Badge key={index} variant="secondary">{cert}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {profile.care_preferences.hourly_rate_range && (
                      <p><span className="text-gray-600">Hourly Rate Range:</span> ${profile.care_preferences.hourly_rate_range.min} - ${profile.care_preferences.hourly_rate_range.max}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareProfile;
