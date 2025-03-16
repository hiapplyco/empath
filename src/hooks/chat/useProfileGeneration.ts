
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

      const profileDataFields = profileData.processed_profile.database_fields || {};
      
      // Prepare profile data with the correct column names matching the database schema
      const profileRecord = {
        id: user.id,
        Name: profileDataFields.Name || '',
        Bio: profileDataFields.Bio || '',
        "Phone Number": profileDataFields["Phone Number"] || '',
        Email: profileDataFields.Email || user.email || '',
        Languages: profileDataFields.Languages || '',
        Education: profileDataFields.Education || '',
        Experience: profileDataFields.Experience || '',
        "Hourly Rate": profileDataFields["Hourly Rate"] || '',
        "Locations Serviced": profileDataFields["Locations Serviced"] || '',
        "Type of Background Check": profileDataFields["Type of Background Check"] || '',
        "HCA Registry ID": profileDataFields["HCA Registry ID"] || '',
        "HCA Expiration Date": profileDataFields["HCA Expiration Date"] || null,
        "Vaccinations": profileDataFields.Vaccinations || '',
        "Available Shifts": profileDataFields["Available Shifts"] || '',
        "Services Provided": profileDataFields["Services Provided"] || '',
        "Pet Preferences": profileDataFields["Pet Preferences"] || '',
        input_method: "text"
      };

      // Using upsert to either create a new profile or update the existing one
      const { error: profileError } = await supabase
        .from('caregiver_profiles')
        .upsert(profileRecord);

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
