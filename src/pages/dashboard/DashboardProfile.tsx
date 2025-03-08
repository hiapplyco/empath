import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { DynamicProfileSection } from "@/components/profile/DynamicProfileSection";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardProfile = () => {
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['caregiver-profile'],
    queryFn: async () => {
      // First get the profile data using maybeSingle() instead of single()
      const { data: profileData, error: profileError } = await supabase
        .from('caregiver_profiles')
        .select('*')
        .maybeSingle();

      if (profileError) throw profileError;
      if (!profileData) return null;

      // If we have gemini_response, process it through the process-profile function
      if (profileData.gemini_response) {
        const { data: processedProfile, error: processError } = await supabase.functions.invoke('process-profile', {
          body: { profileData: profileData.gemini_response }
        });

        if (processError) throw processError;
        return { ...profileData, processed: processedProfile };
      }

      return profileData;
    },
  });

  if (error) {
    return (
      <Card className="p-4">
        <p className="text-center text-red-500">Error loading profile: {error.message}</p>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">My Profile</h2>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[300px]" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <Card className="p-4">
        <p className="text-center text-gray-500">No profile data available. Please complete the onboarding chat to create your profile.</p>
      </Card>
    );
  }

  if (!profile.processed?.sections) {
    return (
      <Card className="p-4">
        <p className="text-center text-gray-500">Profile data needs to be processed. Please complete the onboarding chat again.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Profile</h2>
      </div>

      <div className="grid gap-6">
        {profile.processed.sections.map((section, index) => (
          <DynamicProfileSection key={index} section={section} />
        ))}
      </div>
    </div>
  );
};

export default DashboardProfile;
