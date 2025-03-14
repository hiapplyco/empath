import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "npm:@google/generative-ai";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

// ================= Types =================

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

interface ChatResponse {
  type: 'message' | 'profile';
  text?: string;
  data?: any;
  message?: string;
  error?: string;
}

interface ProfileData {
  recipient_information: {
    relationship_to_user: string;
    recipient_name: string;
    recipient_age: number;
    health_status: string;
    contact_info: {
      primary_contact: string;
      phone: string;
      email: string;
    };
    languages: string[];
    cultural_background: string;
  };
  care_requirements: {
    care_level: string;
    primary_needs: string[];
    medical_conditions: string[];
    mobility_status: string;
    special_accommodations: string[];
    dietary_requirements: string[];
    medical_equipment: string[];
  };
  schedule_preferences: {
    frequency: string;
    schedule_pattern: string[];
    duration: string;
    start_date: string;
    location_details: {
      address: string;
      special_instructions: string;
    };
  };
  preferences: {
    caregiver_qualities: string[];
    language_requirements: string[];
    cultural_preferences: string;
    environment: {
      pets: boolean;
      smoking_allowed: boolean;
      accessibility_features: string[];
    };
  };
}

// ================= Prompts =================

const systemPrompt = `You are Emma, a compassionate and professional AI care coordinator. Your role is to help families find the right care for their loved ones by conducting a friendly interview to gather care needs information. You speak in first person as Emma, and you conduct warm, natural conversations to understand each family's unique situation.

# Conversation Style
- Be warm, empathetic, and genuinely interested in their story
- Acknowledge the emotional aspects of seeking care for a loved one
- Use conversational yet professional language
- Ask gentle follow-up questions to draw out important details
- Show understanding of family dynamics and caregiving challenges
- Keep responses concise but supportive

# Required Information to Collect
1. Care Recipient Information:
   - Relationship to care seeker
   - Care recipient's name
   - Age and general health status
   - Languages spoken
   - Cultural preferences/background
   - Primary contact details

2. Care Requirements:
   - Level of care needed
   - Primary care needs
   - Medical conditions
   - Mobility status
   - Special accommodations
   - Dietary requirements
   - Medical equipment needs

3. Schedule & Logistics:
   - Care frequency needed
   - Preferred schedule patterns
   - Duration of care sessions
   - Expected start date
   - Location/travel requirements
   - Budget considerations

4. Preferences & Environment:
   - Home environment details
   - Specific caregiver qualities desired
   - Language requirements
   - Cultural considerations
   - Pet presence
   - Smoking/non-smoking

# Profile Generation Format
When generating the final profile, use this exact JSON format:
{
  "recipient_information": {
    "relationship_to_user": string,
    "recipient_name": string,
    "recipient_age": number,
    "health_status": string,
    "contact_info": {
      "primary_contact": string,
      "phone": string,
      "email": string
    },
    "languages": string[],
    "cultural_background": string
  },
  "care_requirements": {
    "care_level": string,
    "primary_needs": string[],
    "medical_conditions": string[],
    "mobility_status": string,
    "special_accommodations": string[],
    "dietary_requirements": string[],
    "medical_equipment": string[]
  },
  "schedule_preferences": {
    "frequency": string,
    "schedule_pattern": string[],
    "duration": string,
    "start_date": string,
    "location_details": {
      "address": string,
      "special_instructions": string
    }
  },
  "preferences": {
    "caregiver_qualities": string[],
    "language_requirements": string[],
    "cultural_preferences": string,
    "environment": {
      "pets": boolean,
      "smoking_allowed": boolean,
      "accessibility_features": string[]
    }
  }
}

# Conversation Flow Guidelines
1. Start with a warm welcome and explain your role in helping find care
2. Ask about their relationship to the person needing care
3. Gradually explore care needs through natural conversation
4. Show understanding and empathy throughout
5. Confirm details gently but thoroughly
6. Address any concerns or questions they raise
7. End with clear next steps and appreciation

Remember to:
- Keep the conversation flowing naturally
- Show genuine care and understanding
- Handle sensitive information respectfully
- Focus on both practical needs and emotional aspects
- Express gratitude for sharing their situation

Your first message should always be:
"Hi! I'm Emma, and I'll be helping you find the right care for your loved one. Could you start by telling me about your relationship to the person who needs care?"`;

// ================= AI Client Functions =================

const createAIClient = () => {
  const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '');
  return genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    }
  });
};

const startChat = (model: any, history: Message[]) => {
  console.log('Starting chat with history length:', history.length);
  const chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: [{ text: systemPrompt }]
      }
    ].concat(history.map(({ role, content }) => ({
      role: role === 'user' ? 'user' : 'model',
      parts: [{ text: content }]
    })))
  });
  console.log('Chat started successfully');
  return chat;
};

const processResponse = (response: string) => {
  try {
    // Extract JSON if present in markdown code blocks
    const jsonMatch = response.match(/```json\n?([\s\S]*?)\n?```/);
    const cleanJson = jsonMatch ? jsonMatch[1].trim() : response;
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Profile generation error:', error);
    throw new Error('Failed to process AI response');
  }
};

// ================= Message Handlers =================

const handleStartChat = async (chat: any, language: string): Promise<ChatResponse> => {
  try {
    console.log('Starting new care recipient chat...');
    
    const initialMessage = "Hi! I'm Emma, and I'll be helping you find the right care for your loved one. Could you start by telling me about your relationship to the person who needs care?";
    
    // First send system prompt to set up the AI assistant's behavior
    const systemResult = await chat.sendMessage(systemPrompt);
    console.log('System prompt response:', systemResult.response.text());
    
    return {
      type: 'message',
      text: initialMessage
    };
  } catch (error) {
    console.error('Error starting chat:', error);
    throw error;
  }
};

const handleRegularMessage = async (chat: any, message: string): Promise<ChatResponse> => {
  try {
    console.log('Processing user message:', message);
    
    if (!message.trim()) {
      throw new Error('Empty message received');
    }

    if (message === 'END_INTERVIEW') {
      throw new Error('END_INTERVIEW should be handled by handleFinishChat');
    }
    
    // Send the user's message to continue the conversation
    const result = await chat.sendMessage(message);
    const response = result.response.text();
    
    console.log('Emma response:', response);
    
    // Ensure we're not accidentally restarting the conversation
    if (response.includes("Hi! I'm Emma") || response.includes("Could you start by telling me")) {
      console.log('Detected potential conversation restart, adjusting response...');
      return {
        type: 'message',
        text: "I apologize, but I seem to have lost track of our conversation. Could you please confirm what you just told me about your loved one so I can better assist you?"
      };
    }
    
    return {
      type: 'message',
      text: response
    };
  } catch (error) {
    console.error('Error in message handler:', error);
    throw error;
  }
};

// ================= Profile Generator =================

async function handleFinishChat(
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

// ================= Main Server Handler =================

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, history = [], language = 'en', action, userId } = await req.json();
    
    console.log('Request details:', { action, historyLength: history.length, message });
    
    const model = createAIClient();
    const chat = startChat(model, history);

    let response;

    switch (action) {
      case 'start':
        response = await handleStartChat(chat, language);
        break;
      case 'finish':
        response = await handleFinishChat(chat, userId, language, history, corsHeaders);
        break;
      default:
        if (!message) {
          throw new Error('No message provided for regular chat');
        }
        response = await handleRegularMessage(chat, message);
    }

    console.log('Response:', response);

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in care recipient chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
