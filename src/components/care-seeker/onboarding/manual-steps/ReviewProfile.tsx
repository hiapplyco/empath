
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

interface ReviewProfileProps {
  formData: any;
  onBack: () => void;
}

export const ReviewProfile = ({ formData, onBack }: ReviewProfileProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Save profile data
      const { error } = await supabase
        .from('care_seeker_profiles')
        .insert({
          user_id: user.id,
          profile_data: formData,
        });

      if (error) throw error;

      toast({
        title: "Profile Created",
        description: "Your profile has been saved successfully. Taking you to your dashboard.",
      });

      navigate('/care-seeker/dashboard');
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save your profile. Please try again.",
      });
    }
  };

  return (
    <div>
      <CardHeader className="px-0">
        <CardTitle>Review Your Profile</CardTitle>
        <CardDescription>
          Please review the information you've provided
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-0 space-y-6">
        {Object.entries(formData).map(([section, data]: [string, any]) => (
          <div key={section} className="space-y-2">
            <h3 className="font-medium capitalize">{section.replace(/([A-Z])/g, ' $1').trim()}</h3>
            <div className="rounded-lg border p-4">
              {Object.entries(data).map(([key, value]: [string, any]) => (
                <div key={key} className="py-1">
                  <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                  <span className="text-gray-600">
                    {Array.isArray(value) ? value.join(', ') : String(value)}
                  </span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
          </div>
        ))}

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back to Edit
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Submit Profile
          </Button>
        </div>
      </CardContent>
    </div>
  );
};

