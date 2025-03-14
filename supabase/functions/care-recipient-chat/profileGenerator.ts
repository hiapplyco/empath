
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Message, ChatResponse, ProfileData } from "./types.ts";

export async function handleFinishChat(
  chat: any, 
  userId: string | null, 
  language: string, 
  history: Message[],
  corsHeaders: Record<string, string>
): Promise<ChatResponse> {
  try {
    console.log('Generating care recipient profile...');
    
    const result = await chat.sendMessage(
      "Based on our conversation, please generate a comprehensive care recipient profile in the JSON format specified earlier. Include all information we've discussed. Respond ONLY with the JSON object, nothing else."
    );
    
    const responseText = result.response.text();
    
    try {
      const profileData = processResponse(responseText) as ProfileData;
      
      // Add metadata
      const profileWithMetadata = {
        ...profileData,
        metadata: {
          created_at: new Date().toISOString(),
          language: language,
          version: '1.0'
        }
      };
      
      // Save to database if user ID is provided
      if (userId) {
        console.log(`Saving profile for user: ${userId}`);
        
        const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;
        
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        
        // Update the interview record
        const { error: interviewError } = await supabase
          .from('care_seeker_interviews')
          .upsert({
            user_id: userId,
            raw_interview_data: { messages: history, language },
            processed_profile: profileWithMetadata,
            needs_review: true,
            review_completed: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
          
        if (interviewError) throw interviewError;

        // Update the user's profile status
        const { error: profileError } = await supabase
          .from('care_seeker_profiles')
          .upsert({
            user_id: userId,
            interview_completed: true,
            profile_sections: [
              {
                title: "Care Recipient Information",
                items: Object.entries(profileWithMetadata.recipient_information)
                  .map(([key, value]) => ({ label: key, value }))
              },
              {
                title: "Care Requirements",
                items: Object.entries(profileWithMetadata.care_requirements)
                  .map(([key, value]) => ({ label: key, value }))
              },
              {
                title: "Schedule & Preferences",
                items: [
                  ...Object.entries(profileWithMetadata.schedule_preferences)
                    .map(([key, value]) => ({ label: key, value })),
                  ...Object.entries(profileWithMetadata.preferences)
                    .map(([key, value]) => ({ label: key, value }))
                ]
              }
            ]
          });
          
        if (profileError) throw profileError;
      }
      
      return {
        type: 'profile',
        data: profileWithMetadata,
        message: "Your care profile has been successfully created! You'll be redirected to review your profile."
      };
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError);
      console.log('Response text that failed parsing:', responseText);
      return await retryProfileGeneration(chat);
    }
  } catch (error) {
    console.error('Error finishing chat:', error);
    throw error;
  }
}

async function retryProfileGeneration(chat: any): Promise<ChatResponse> {
  try {
    const retryResult = await chat.sendMessage(
      "Please format your response as a valid JSON object using the exact schema I specified earlier. Only include the JSON object in your response, with no additional text, explanations or markdown formatting."
    );
    
    const retryText = retryResult.response.text();
    const profileData = processResponse(retryText);
    
    return {
      type: 'profile',
      data: {
        raw_profile: profileData,
        processed_profile: profileData
      },
      message: "Your care profile has been successfully created!"
    };
  } catch (retryError) {
    return {
      type: 'message',
      text: "I've gathered all your information, but I'm having trouble formatting your profile. A team member will review your information and help complete your profile setup. Thank you for your patience!",
      error: "JSON_PARSE_ERROR"
    };
  }
}
