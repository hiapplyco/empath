
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { DynamicProfileSection } from "@/components/profile/DynamicProfileSection";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardProfile = () => {
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['caregiver-profile'],
    queryFn: async () => {
      // Get authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log('No authenticated user found');
        throw new Error('No authenticated user found');
      }

      console.log('Fetching profile for user:', user.id);

      // First try to get profile directly
      const { data: profileData, error: profileError } = await supabase
        .from('caregiver_profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      console.log('Raw profile data fetched:', profileData);

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        throw profileError;
      }

      if (!profileData) {
        console.log('No profile data found');
        return null;
      }

      // Process the profile data if gemini_response exists
      if (profileData.gemini_response) {
        console.log('Processing profile with gemini_response:', profileData.gemini_response);
        
        const { data: processedProfile, error: processError } = await supabase.functions.invoke('process-profile', {
          body: { profileData }
        });

        console.log('Processed profile result:', processedProfile);

        if (processError) {
          console.error('Error processing profile:', processError);
          throw processError;
        }

        return { ...profileData, processed: processedProfile };
      }

      return profileData;
    },
  });

  if (error) {
    console.error('Error in profile component:', error);
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

  if (!profile?.processed?.sections) {
    return (
      <Card className="p-4">
        <p className="text-center text-gray-500">No profile data available or profile needs to be processed. Please complete the onboarding chat to create your profile.</p>
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
