
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OnboardingNavigationProps {
  backPath?: string;
  skipPath?: string;
  showSkip?: boolean;
}

export const OnboardingNavigation = ({ 
  backPath, 
  skipPath = "/onboarding/documents",
  showSkip = true 
}: OnboardingNavigationProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center w-full mb-8">
      <div className="flex items-center gap-4">
        {backPath && (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(backPath)}
            className="rounded-full hover:bg-purple-50 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
      </div>
      {showSkip && (
        <Button 
          variant="outline"
          onClick={() => navigate(skipPath)}
          className="text-purple-600 border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-colors"
        >
          Skip to Documents
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
