
import { Button } from "@/components/ui/button";
import { Globe, Apple } from 'lucide-react';

type SocialLoginButtonsProps = {
  onGoogleLogin: () => Promise<void>;
  disabled?: boolean;
};

export const SocialLoginButtons = ({ onGoogleLogin, disabled = false }: SocialLoginButtonsProps) => {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button type="button" variant="outline" onClick={onGoogleLogin} disabled={disabled}>
          <Globe className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button type="button" variant="outline" disabled={disabled}>
          <Apple className="mr-2 h-4 w-4" />
          Apple
        </Button>
      </div>
    </>
  );
};
