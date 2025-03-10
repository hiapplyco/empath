
import { useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Message, ProfileData, UserContext } from './types';

export const useProfileGeneration = (messages: Message[]) => {
  const [isExiting, setIsExiting] = useState(false);
  const { toast } = useToast();

  const handleProfileData = async (profileData: ProfileData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user found');

      const { error: profileError } = await supabase
        .from('caregiver_profiles')
        .upsert({
          id: user.id,
          gemini_response: profileData.raw_profile,
          processed_profile: profileData.processed_profile
        });

      if (profileError) throw profileError;

      toast({
        title: "Profile Created",
        description: "Your profile has been successfully created!"
      });
      
      setIsExiting(true);
      return true;
    } catch (error: any) {
      console.error('Profile saving error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save profile. Please try again."
      });
      return false;
    }
  };

  const generateProfile = async (userContext: UserContext) => {
    try {
      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: { 
          message: 'END_INTERVIEW',
          history: messages.map(m => ({ role: m.role, text: m.content })),
          action: 'finish',
          userContext
        }
      });

      if (error) throw error;

      if (data.type === 'profile') {
        return await handleProfileData(data.data);
      }
      return false;
    } catch (error: any) {
      console.error('Error finishing interview:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate your profile. Please try again."
      });
      return false;
    }
  };

  return {
    generateProfile,
    isExiting
  };
};
