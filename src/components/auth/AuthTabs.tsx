
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { supabase } from "@/lib/supabase";

type AuthTabsProps = {
  isCaregiver: boolean;
};

export const AuthTabs = ({ isCaregiver }: AuthTabsProps) => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  const handleUserExists = (email: string) => {
    setActiveTab("login");
    setLoginEmail(email);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="login">Log In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <LoginForm 
            onGoogleLogin={handleGoogleLogin}
          />
        </TabsContent>
        
        <TabsContent value="signup">
          <SignupForm 
            isCaregiver={isCaregiver} 
            onGoogleLogin={handleGoogleLogin} 
            onUserExists={handleUserExists}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
