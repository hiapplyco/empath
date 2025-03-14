
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Message, ChatResponse, ProfileData } from "./types.ts";

export async function handleFinishChat(
  chat: any, 
  userId: string | null, 
  language: string, 
  supabase: any,
  corsHeaders: Record<string, string>
): Promise<ChatResponse> {
  try {
    console.log('Generating care recipient profile...');
    
    const result = await chat.sendMessage(
      "Based on our conversation, please generate a comprehensive care recipient profile in the JSON format specified earlier. Include all information we've discussed. Respond ONLY with the JSON object, nothing else."
    );
    
    const responseText = result.response.text();
    
    // Extract and parse the JSON
    try {
      const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, responseText];
      const jsonString = jsonMatch[1].trim();
      const profileData = JSON.parse(jsonString) as ProfileData;
      
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
      if (userId && supabase) {
        console.log(`Saving profile for user: ${userId}`);
        const { error: profileError } = await supabase
          .from('care_recipient_profiles')
          .upsert({
            user_id: userId,
            raw_profile: profileWithMetadata,
            processed_profile: profileWithMetadata,
            language: language,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
          
        if (profileError) throw profileError;
      }
      
      return {
        type: 'profile',
        data: {
          raw_profile: profileWithMetadata,
          processed_profile: profileWithMetadata
        },
        message: "Your care profile has been successfully created!"
      };
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError);
      console.log('Response text that failed parsing:', responseText);
      
      // Try again with a more explicit prompt
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
    const jsonMatch = retryText.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, retryText];
    const jsonString = jsonMatch[1].trim();
    const profileData = JSON.parse(jsonString);
    
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
