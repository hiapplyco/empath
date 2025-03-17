import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { GoogleIcon, AppleIcon } from 'lucide-react';
import { supabase } from "@/lib/supabase";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const isCaregiver = searchParams.get("role") === "caregiver";
  const [loginView, setLoginView] = useState(true);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
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

    setLoginLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: {
        data: {
          name: signupName,
          role: isCaregiver ? "caregiver" : "care-seeker",
        },
      },
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    } else {
      toast({
        title: "Account created successfully!",
        description: "Please check your email to verify your account.",
      });
      navigate('/onboarding');
    }

    setSignupLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoginLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    }

    setLoginLoading(false);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-purple-500 to-purple-800 justify-center items-center p-12">
        <div className="max-w-xl">
          <img src="/emma.png" alt="Emma AI assistant" className="rounded-2xl shadow-2xl mb-8" />
          <h2 className="text-3xl font-bold text-white mb-4">Meet Emma, your AI onboarding assistant</h2>
          <p className="text-white/80 text-lg">
            Emma helps match you with the right caregiving opportunities through a simple conversation. No resumes required!
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img src="/empath-simple-logo.svg" alt="empath logo" className="h-12 w-12" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome to em.path
            </h2>
            <p className="mt-2 text-gray-600">
              {isCaregiver 
                ? "Join our community of caregivers making a difference" 
                : "Find the perfect caregiver for your needs"}
            </p>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <Tabs defaultValue={loginView ? 'login' : 'signup'}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">Log In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email-login">Email</Label>
                    <Input
                      id="email-login"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
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
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loginLoading}>
                    {loginLoading ? "Signing in..." : "Sign In"}
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
                    <Button type="button" variant="outline" onClick={handleGoogleLogin} disabled={loginLoading}>
                      <GoogleIcon className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                    <Button type="button" variant="outline" disabled={loginLoading}>
                      <AppleIcon className="mr-2 h-4 w-4" />
                      Apple
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="name-signup">Name</Label>
                    <Input
                      id="name-signup"
                      type="text"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email-signup">Email</Label>
                    <Input
                      id="email-signup"
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password-signup">Password</Label>
                    <Input
                      id="password-signup"
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={signupLoading}>
                    {signupLoading ? "Creating account..." : "Create Account"}
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
                    <Button type="button" variant="outline" onClick={handleGoogleLogin} disabled={signupLoading}>
                      <GoogleIcon className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                    <Button type="button" variant="outline" disabled={signupLoading}>
                      <AppleIcon className="mr-2 h-4 w-4" />
                      Apple
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center text-sm">
              <p>
                {isCaregiver ? "Not a caregiver? " : "Not looking for care? "}
                <Link 
                  to={isCaregiver ? "/auth/care-seeker" : "/auth/caregiver"} 
                  className="text-purple-600 hover:text-purple-800"
                >
                  {isCaregiver ? "I'm looking for care" : "I'm a caregiver"}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
