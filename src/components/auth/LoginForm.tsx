
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Apple } from 'lucide-react';
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

type LoginFormProps = {
  onGoogleLogin: () => Promise<void>;
};

export const LoginForm = ({ onGoogleLogin }: LoginFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
