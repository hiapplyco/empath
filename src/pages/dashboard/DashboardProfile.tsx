
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { DynamicProfileSection } from "@/components/profile/DynamicProfileSection";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardProfile = () => {
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['caregiver-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log('No authenticated user found');
        throw new Error('No authenticated user found');
      }

      console.log('Fetching profile for user:', user.id);
      
      const { data: profileData, error: profileError } = await supabase
        .from('caregiver_profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        throw profileError;
      }

      console.log('Retrieved profile data:', profileData);
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

  if (!profile?.processed_profile?.sections) {
    return (
      <Card className="p-4">
        <p className="text-center text-gray-500">No profile data available. Please complete the onboarding process.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Profile</h2>
      </div>

      <div className="grid gap-6">
        {profile.processed_profile.sections.map((section, index) => (
          <DynamicProfileSection key={index} section={section} />
        ))}
      </div>
    </div>
  );
};

export default DashboardProfile;
