
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { BasicInfo } from "@/components/care-seeker/onboarding/BasicInfo";
import { OnboardingProgress } from "@/components/care-seeker/onboarding/OnboardingProgress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const CareOnboarding = () => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate('/auth');
        return;
      }
      setUserId(session.user.id);
    };
    
    checkSession();
  }, [navigate]);

  const handleStepComplete = async (stepData: any) => {
    try {
      const { error } = await supabase
        .from('care_seeker_profiles')
        .upsert({
          user_id: userId,
          ...stepData,
          onboarding_step: step + 1
        });

      if (error) throw error;

      setStep(step + 1);
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <OnboardingProgress currentStep={step} />
        
        <Card className="p-6">
          {step === 1 && (
            <BasicInfo onComplete={handleStepComplete} />
          )}
          {/* Additional steps will be added here */}
        </Card>
      </div>
    </div>
  );
};

export default CareOnboarding;
