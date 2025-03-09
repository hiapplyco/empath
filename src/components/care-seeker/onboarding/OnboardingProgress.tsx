
import { CheckCircle2, Circle } from "lucide-react";

interface OnboardingProgressProps {
  currentStep: number;
}

const steps = [
  "Getting Started",
  "Care Recipient",
  "Care Needs",
  "Schedule",
  "Preferences",
  "Finalize"
];

export const OnboardingProgress = ({ currentStep }: OnboardingProgressProps) => {
  return (
    <div className="w-full py-4">
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index + 1 < currentStep;
          const isCurrent = index + 1 === currentStep;
          
          return (
            <div
              key={step}
              className={`flex flex-col items-center space-y-2 ${
                isCurrent ? "text-purple-600" : isCompleted ? "text-green-600" : "text-gray-400"
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-8 w-8" />
              ) : (
                <Circle className={`h-8 w-8 ${isCurrent ? "animate-pulse" : ""}`} />
              )}
              <span className="text-xs text-center hidden sm:block">{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
