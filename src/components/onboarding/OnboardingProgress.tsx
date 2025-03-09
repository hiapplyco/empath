
import { CheckCircle2, Circle } from "lucide-react";

interface OnboardingProgressProps {
  currentStep: number;
}

const steps = [
  "Initial Assessment",
  "Document Verification",
  "Personalization",
  "Welcome"
];

export const OnboardingProgress = ({ currentStep }: OnboardingProgressProps) => {
  return (
    <div className="w-full py-6">
      <div className="relative flex justify-between">
        {/* Progress line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
        
        {/* Step indicators */}
        {steps.map((step, index) => {
          const isCompleted = index + 1 < currentStep;
          const isCurrent = index + 1 === currentStep;
          
          return (
            <div
              key={step}
              className={`relative flex flex-col items-center ${
                isCurrent ? "text-purple-600" : isCompleted ? "text-green-600" : "text-gray-400"
              }`}
            >
              <div className={`
                relative z-10 transition-all duration-200
                ${isCurrent ? "scale-110" : ""}
              `}>
                {isCompleted ? (
                  <CheckCircle2 className="h-8 w-8 bg-white rounded-full" />
                ) : (
                  <Circle className={`h-8 w-8 bg-white rounded-full ${isCurrent ? "animate-pulse" : ""}`} />
                )}
              </div>
              <span 
                className={`
                  absolute -bottom-8 text-xs font-medium text-center w-24 
                  hidden sm:block whitespace-normal px-1
                  ${isCurrent ? "text-purple-600" : "text-gray-500"}
                `}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
