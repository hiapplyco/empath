
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Apple } from 'lucide-react';
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

type SignupFormProps = {
  isCaregiver: boolean;
  onGoogleLogin: () => Promise<void>;
  onUserExists: (email: string) => void;
};

export const SignupForm = ({ isCaregiver, onGoogleLogin, onUserExists }: SignupFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: isCaregiver ? "caregiver" : "care-seeker",
        },
      },
    });

    if (error) {
      // Check for user already exists error
      if (error.message?.includes("User already registered") || error.message?.includes("user_already_exists")) {
        toast({
          variant: "destructive",
          title: "Account already exists",
          description: "This email is already registered. Try logging in instead.",
        });
        // Switch to login tab and pre-fill email
        onUserExists(email);
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.message,
        });
      }
    } else {
      toast({
        title: "Account created successfully!",
        description: "Please check your email to verify your account.",
      });
      navigate('/onboarding');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div>
        <Label htmlFor="name-signup">Name</Label>
        <Input
          id="name-signup"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          required
        />
      </div>
      <div>
        <Label htmlFor="email-signup">Email</Label>
        <Input
          id="email-signup"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>
      <div>
        <Label htmlFor="password-signup">Password</Label>
        <Input
          id="password-signup"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Create Account"}
      </Button>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button type="button" variant="outline" onClick={onGoogleLogin} disabled={loading}>
          <Globe className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button type="button" variant="outline" disabled={loading}>
          <Apple className="mr-2 h-4 w-4" />
          Apple
        </Button>
      </div>
    </form>
  );
};
