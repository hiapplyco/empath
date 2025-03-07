
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInForm } from "@/components/auth/SignInForm";
import { useState } from "react";
import { SignUpForm } from "@/components/auth/SignUpForm";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            {isSignIn ? "Sign in to your account" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {isSignIn
              ? "Enter your email below to sign in to your account"
              : "Enter your details below to create your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSignIn ? <SignInForm /> : <SignUpForm />}
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-sm"
            >
              {isSignIn
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
