
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { DynamicProfileSection } from "@/components/profile/DynamicProfileSection";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { OnboardingNavigation } from "@/components/onboarding/OnboardingNavigation";

const ProfileReview = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['caregiver-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user found');
      
      const { data: profileData, error: profileError } = await supabase
        .from('caregiver_profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      return profileData;
    },
  });

  if (!profile?.processed_profile?.sections) {
    return (
      <Card className="p-4">
        <p className="text-center text-gray-500">
          No profile data available. Please complete the previous steps.
        </p>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex flex-col space-y-6">
          <OnboardingNavigation 
            backPath="/onboarding/documents" 
            skipPath="/dashboard"
            showSkip={true}
          />
          <OnboardingProgress currentStep={3} />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Review Your Profile</h2>
          <p className="text-center text-gray-600">
            Review and edit your profile information before continuing to the dashboard
          </p>
          
          <div className="grid gap-6">
            {profile.processed_profile.sections.map((section: any, index: number) => (
              <DynamicProfileSection key={index} section={section} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileReview;
