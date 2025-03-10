
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { OnboardingProgress } from "@/components/care-seeker/onboarding/OnboardingProgress";
import { OnboardingSelection } from "@/components/care-seeker/onboarding/OnboardingSelection";
import { CareRecipientChat } from "@/components/care-seeker/onboarding/CareRecipientChat";
import { ManualOnboarding } from "@/components/care-seeker/onboarding/ManualOnboarding";

const CareOnboarding = () => {
  const [onboardingType, setOnboardingType] = useState<"selection" | "chat" | "manual">("selection");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <OnboardingProgress currentStep={1} />
        
        {onboardingType === "selection" && (
          <OnboardingSelection onSelect={setOnboardingType} />
        )}
        
        {onboardingType === "chat" && (
          <CareRecipientChat onBack={() => setOnboardingType("selection")} />
        )}
        
        {onboardingType === "manual" && (
          <ManualOnboarding onBack={() => setOnboardingType("selection")} />
        )}
      </div>
    </div>
  );
};

export default CareOnboarding;
