
import { ProfileItem } from "./types";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

export const handleProfileSave = async (
  sectionTitle: string,
  editedItems: ProfileItem[]
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const updatedProfile = {
      processed_profile: {
        sections: [
          {
            title: sectionTitle,
            items: editedItems
          }
        ]
      }
    };

    const { error } = await supabase
      .from('caregiver_profiles')
      .update(updatedProfile)
      .eq('id', user.id);

    if (error) throw error;

    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully."
    });
    
    return true;
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error saving changes",
      description: error.message
    });
    return false;
  }
};
