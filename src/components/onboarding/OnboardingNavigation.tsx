
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';

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
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (location.pathname === '/onboarding/profile') {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const getSkipButtonText = () => {
    switch (location.pathname) {
      case '/onboarding':
        return 'Skip to Documents';
      case '/onboarding/documents':
        return 'Skip to Profile Review';
      case '/onboarding/profile':
        return 'Welcome!';
      default:
        return 'Next';
    }
  };

  return (
    <div className="flex justify-between items-center w-full mb-8">
      {showConfetti && <Confetti 
        recycle={false}
        numberOfPieces={200}
        gravity={0.2}
      />}
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
          {getSkipButtonText()}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
