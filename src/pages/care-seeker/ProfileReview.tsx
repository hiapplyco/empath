
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const ProfileReview = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/auth');
          return;
        }

        const { data, error } = await supabase
          .from('care_seeker_interviews')
          .select('processed_profile')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) throw error;
        setProfile(data.processed_profile);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profile data"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, toast]);

  const handleConfirm = async () => {
    try {
      const { error } = await supabase
        .from('care_seeker_profiles')
        .update({ 
          profile_sections: profile.sections,
          interview_completed: true 
        })
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully saved"
      });

      navigate('/care-seeker/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile"
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Review Your Profile</CardTitle>
          <CardDescription>
            Please review the information we've gathered from your interview
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {profile?.sections?.map((section: any, index: number) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-medium">{section.title}</h3>
              <div className="grid gap-4">
                {section.items?.map((item: any, itemIndex: number) => (
                  <div key={itemIndex} className="flex justify-between items-start border-b pb-2">
                    <span className="font-medium">{item.label}:</span>
                    <span className="text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="flex justify-end space-x-4 pt-6">
            <Button variant="outline" onClick={() => navigate('/care-seeker/onboarding')}>
              Back to Interview
            </Button>
            <Button onClick={handleConfirm}>
              Confirm & Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileReview;
