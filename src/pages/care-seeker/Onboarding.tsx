import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { OnboardingProgress } from "@/components/care-seeker/onboarding/OnboardingProgress";
import { OnboardingSelection } from "@/components/care-seeker/onboarding/OnboardingSelection";
import { CareRecipientChat } from "@/components/care-seeker/onboarding/CareRecipientChat";
import { ManualOnboarding } from "@/components/care-seeker/onboarding/ManualOnboarding";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const CareOnboarding = () => {
  const [onboardingType, setOnboardingType] = useState<"selection" | "chat" | "manual">("selection");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Add authentication check on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to continue with onboarding",
        });
        navigate('/auth');
      }
    };

    checkAuth();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <OnboardingProgress currentStep={1} />
        
        {onboardingType === "selection" && (
          <OnboardingSelection onSelect={setOnboardingType} />
        )}
        
        {onboardingType === "chat" && (
          <CareRecipientChat />
        )}
        
        {onboardingType === "manual" && (
          <ManualOnboarding onBack={() => setOnboardingType("selection")} />
        )}
      </div>
    </div>
  );
};

export default CareOnboarding;
