import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { SocialLoginButtons } from "./SocialLoginButtons";

type LoginFormProps = {
  onGoogleLogin: () => Promise<void>;
};

export const LoginForm = ({ onGoogleLogin }: LoginFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Function to clear any legacy chat data
  const ensurePrivacy = () => {
    // Only remove the legacy chat storage key that's not tied to user ID
    localStorage.removeItem('caregiverOnboardingChat');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Ensure privacy by clearing any legacy data
    ensurePrivacy();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    } else {
      toast({
        title: "Logged in successfully!",
        description: "You are being redirected...",
      });
      navigate('/dashboard');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <Label htmlFor="email-login">Email</Label>
        <Input
          id="email-login"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>
      <div>
        <div className="flex justify-between">
          <Label htmlFor="password-login">Password</Label>
          <a href="#" className="text-sm text-purple-600 hover:text-purple-800">
            Forgot password?
          </a>
        </div>
        <Input
          id="password-login"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>
      
      <SocialLoginButtons onGoogleLogin={onGoogleLogin} disabled={loading} />
    </form>
  );
};
