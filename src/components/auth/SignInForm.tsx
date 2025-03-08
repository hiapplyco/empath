
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Starting sign in process...");

    try {
      console.log("Attempting to sign in with email:", email);
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error("Auth error:", authError);
        throw authError;
      }

      console.log("Sign in successful, checking profile:", authData.user.id);
      
      const { data: profile, error: profileError } = await supabase
        .from('caregiver_profiles')
        .select('onboarding_step')
        .eq('user_id', authData.user.id)
        .single();
      
      if (profileError) {
        console.error("Profile error:", profileError);
        throw profileError;
      }

      console.log("Profile data:", profile);

      if (!profile || profile.onboarding_step === 1) {
        console.log("Navigating to onboarding...");
        navigate('/onboarding');
      } else {
        console.log("Navigating to dashboard...");
        navigate('/dashboard');
      }

      toast({
        title: "Success",
        description: "Successfully signed in.",
      });

    } catch (error: any) {
      console.error("Error in sign in process:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to sign in. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
};
