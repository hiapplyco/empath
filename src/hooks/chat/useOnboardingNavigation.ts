
import { useNavigate } from "react-router-dom";

export const useOnboardingNavigation = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/onboarding');
  };

  const proceedToDocuments = () => {
    setTimeout(() => {
      navigate('/onboarding/documents');
    }, 500);
  };

  return {
    handleBack,
    proceedToDocuments
  };
};
