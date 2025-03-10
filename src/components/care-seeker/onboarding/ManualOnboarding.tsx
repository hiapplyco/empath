
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft } from "lucide-react";
import { BasicInfo } from "./manual-steps/BasicInfo";
import { CareNeeds } from "./manual-steps/CareNeeds";
import { Schedule } from "./manual-steps/Schedule";
import { CaregiverPreferences } from "./manual-steps/CaregiverPreferences";
import { LocationDetails } from "./manual-steps/LocationDetails";
import { AdditionalInfo } from "./manual-steps/AdditionalInfo";
import { ReviewProfile } from "./manual-steps/ReviewProfile";

interface ManualOnboardingProps {
  onBack: () => void;
}

export const ManualOnboarding = ({ onBack }: ManualOnboardingProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    basicInfo: {},
    careNeeds: {},
    schedule: {},
    preferences: {},
    location: {},
    additionalInfo: {},
  });

  const updateFormData = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const progress = Math.min((step / 6) * 100, 100);

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ChevronLeft className="h-4 w-4" /> Back to Selection
        </Button>
        <div className="text-sm text-gray-500">
          Step {step} of 6
        </div>
      </div>

      <Progress value={progress} className="mb-8" />

      {step === 1 && (
        <BasicInfo 
          data={formData.basicInfo} 
          onUpdate={(data) => updateFormData('basicInfo', data)}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <CareNeeds 
          data={formData.careNeeds}
          onUpdate={(data) => updateFormData('careNeeds', data)}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Schedule 
          data={formData.schedule}
          onUpdate={(data) => updateFormData('schedule', data)}
          onNext={() => setStep(4)}
          onBack={() => setStep(2)}
        />
      )}
      {step === 4 && (
        <CaregiverPreferences 
          data={formData.preferences}
          onUpdate={(data) => updateFormData('preferences', data)}
          onNext={() => setStep(5)}
          onBack={() => setStep(3)}
        />
      )}
      {step === 5 && (
        <LocationDetails 
          data={formData.location}
          onUpdate={(data) => updateFormData('location', data)}
          onNext={() => setStep(6)}
          onBack={() => setStep(4)}
        />
      )}
      {step === 6 && (
        <AdditionalInfo 
          data={formData.additionalInfo}
          onUpdate={(data) => updateFormData('additionalInfo', data)}
          onComplete={() => setStep(7)}
          onBack={() => setStep(5)}
        />
      )}
      {step === 7 && (
        <ReviewProfile 
          formData={formData}
          onBack={() => setStep(6)}
        />
      )}
    </Card>
  );
};
