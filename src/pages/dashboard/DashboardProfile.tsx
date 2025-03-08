
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { DynamicProfileSection } from "@/components/profile/DynamicProfileSection";

const DashboardProfile = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['caregiver-profile'],
    queryFn: async () => {
      const { data: profileData } = await supabase
        .from('caregiver_profiles')
        .select('*')
        .single();

      if (profileData?.gemini_response) {
        const { data: processedProfile } = await supabase.functions.invoke('process-profile', {
          body: { profileData: profileData.gemini_response }
        });
        return { ...profileData, processed: processedProfile };
      }

      return profileData;
    },
  });

  if (isLoading || !profile) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">My Profile</h2>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="h-[200px] animate-pulse bg-gray-100" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Profile</h2>
      </div>

      {profile.processed?.sections ? (
        <div className="grid gap-6">
          {profile.processed.sections.map((section, index) => (
            <DynamicProfileSection key={index} section={section} />
          ))}
        </div>
      ) : (
        <Card className="p-4">
          <p className="text-center text-gray-500">No profile data available</p>
        </Card>
      )}
    </div>
  );
};

export default DashboardProfile;
