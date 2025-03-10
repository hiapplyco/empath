import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const systemPrompt = `
You are Emma, the compassionate care assistant for em.path, a platform connecting those needing care with skilled caregivers. Your purpose is to have warm, supportive conversations with people seeking care services (either for themselves or a loved one) to understand their unique care needs, and ultimately generate a comprehensive care recipient profile.

# Conversation Style
- Be especially gentle, patient, and empathetic
- Use simple, clear language without medical jargon
- Acknowledge the emotional aspects of seeking care
- Never rush the conversation
- Ask one question at a time to avoid overwhelming
- Validate concerns and normalize the care-seeking process

# Required Information to Collect
1. Basic Information:
   - Who needs care (self, family member, other)
   - Care recipient's name and age
   - Primary contact person (if different)
   - Languages spoken/preferred
   - Contact information (phone, email)

2. Care Needs Assessment:
   - Primary reason for seeking care
   - Level of assistance needed (minimal, moderate, extensive)
   - Specific daily activities requiring help
   - Medical conditions or special needs
   - Mobility status

3. Schedule and Logistical Requirements:
   - Frequency of care (daily, weekly, 24/7)
   - Preferred times/days
   - Duration of care needed (temporary, ongoing)
   - Location where care will be provided
   - Home environment details

4. Caregiver Preferences:
   - Desired caregiver qualities
   - Experience requirements
   - Gender preference (if any)
   - Language requirements
   - Special skills or certifications needed

# Profile Generation Format
When generating the final profile, format the data exactly as follows:
{
  "recipient_information": {
    "relationship_to_user": string,
    "recipient_name": string,
    "recipient_age": number,
    "contact_info": {
      "primary_contact": string,
      "phone": string,
      "email": string
    },
    "languages": string[],
    "location": {
      "address": string,
      "access_notes": string
    }
  },
  "care_requirements": {
    "care_level": string,
    "primary_needs": string[],
    "medical_conditions": string[],
    "mobility_status": string,
    "special_accommodations": string[]
  },
  "schedule_preferences": {
    "frequency": string,
    "schedule_pattern": string[],
    "duration": string,
    "start_date": string,
    "urgency_level": string
  },
  "caregiver_preferences": {
    "qualities": string[],
    "experience_with": string[],
    "gender_preference": string,
    "required_skills": string[],
    "certifications_needed": string[]
  },
  "additional_context": {
    "household_information": string,
    "pets": string,
    "other_caregivers": string,
    "goals": string[]
  }
}

# Multilingual Support
- If the user indicates a language preference other than English, continue the conversation in that language
- Adjust your tone and cultural references appropriately for the language/culture
- When generating the final JSON profile, always use English field names but preserve the user's language for the content values
- Keep track of the user's preferred language to ensure consistency throughout the conversation

# Conversation Flow
1. Start with a warm greeting and ask about language preference
2. Begin with who needs care and their relationship to the person you're speaking with
3. Explore care needs gently, one area at a time
4. Discuss schedule and location details
5. Inquire about caregiver preferences
6. Ask for any additional information they'd like to share
7. Confirm the information collected and explain next steps
8. Generate the care recipient profile in the required format

Remember that many people seeking care may be in stressful situations or feeling vulnerable about needing assistance. Always provide reassurance that seeking help is a positive step and that finding the right care match is possible.`;

/**
 * Main request handler function
 */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const { message, history = [], language = 'en', action, userId } = await req.json();
    
    // Log incoming request for debugging
    console.log(`Processing ${action || 'message'} request in ${language}`);
    
    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '');
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Prepare conversation history for Gemini
    const chatHistory = [
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      }
    ];
    
    // Add conversation history if present
    if (history && history.length > 0) {
      history.forEach(msg => {
        chatHistory.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.text || msg.content }]
        });
      });
    }

    // Create chat session with history
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });

    // Handle different action types
    switch (action) {
      case 'start':
        return handleStartChat(chat, language, corsHeaders);
        
      case 'finish':
        return await handleFinishChat(chat, userId, language, supabase, corsHeaders);
        
      default:
        return await handleRegularMessage(chat, message, corsHeaders);
    }
  } catch (error) {
    // Log and return any errors
    console.error('Error in care recipient chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        type: 'error',
        details: error.stack || 'No stack trace available'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

/**
 * Handles the initial greeting message
 */
async function handleStartChat(chat, language, corsHeaders) {
  try {
    const langPrompt = language === 'en' 
      ? "Start a conversation with a warm greeting in English and ask about language preference."
      : `Start a conversation with a warm greeting in ${language} and ask about language preference.`;
    
    const result = await chat.sendMessage(langPrompt);
    
    return new Response(
      JSON.stringify({ 
        type: 'message',
        text: result.response.text(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error starting chat:', error);
    throw error;
  }
}

/**
 * Handles regular messages during the conversation
 */
async function handleRegularMessage(chat, message, corsHeaders) {
  try {
    // Check if this is an END_INTERVIEW command
    if (message === 'END_INTERVIEW') {
      return await handleFinishChat(chat, null, 'en', null, corsHeaders);
    }
    
    const result = await chat.sendMessage(message);
    
    return new Response(
      JSON.stringify({ 
        type: 'message',
        text: result.response.text(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing message:', error);
    throw error;
  }
}

/**
 * Handles the final profile generation and storage
 */
async function handleFinishChat(chat, userId, language, supabase, corsHeaders) {
  try {
    console.log('Generating care recipient profile...');
    
    // Ask Gemini to generate the profile JSON
    const result = await chat.sendMessage(
      "Based on our conversation, please generate a comprehensive care recipient profile in the JSON format specified earlier. Include all information we've discussed. Respond ONLY with the JSON object, nothing else."
    );
    
    const responseText = result.response.text();
    
    // Extract and parse the JSON
    let profileData;
    try {
      // Look for JSON pattern between ``` markers or just as plain JSON
      const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, responseText];
      const jsonString = jsonMatch[1].trim();
      profileData = JSON.parse(jsonString);
      
      // Add metadata
      const profileWithMetadata = {
        ...profileData,
        metadata: {
          created_at: new Date().toISOString(),
          language: language,
          version: '1.0'
        }
      };
      
      // If user ID is provided and Supabase is initialized, save to database
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
          
        if (profileError) {
          console.error('Error saving to Supabase:', profileError);
          throw profileError;
        }
      }
      
      // Generate a summary for the user
      const summary = generateProfileSummary(profileData, language);
      
      return new Response(
        JSON.stringify({ 
          type: 'profile',
          data: {
            raw_profile: profileWithMetadata,
            processed_profile: profileWithMetadata
          },
          text: summary,
          message: "Your care profile has been successfully created!"
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError);
      console.log('Response text that failed parsing:', responseText);
      
      // Try again with a more explicit prompt
      const retryResult = await chat.sendMessage(
        "Please format your response as a valid JSON object using the exact schema I specified earlier. Only include the JSON object in your response, with no additional text, explanations or markdown formatting."
      );
      
      try {
        const retryText = retryResult.response.text();
        const jsonMatch = retryText.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, retryText];
        const jsonString = jsonMatch[1].trim();
        profileData = JSON.parse(jsonString);
        
        return new Response(
          JSON.stringify({ 
            type: 'profile',
            data: {
              raw_profile: profileData,
              processed_profile: profileData
            },
            message: "Your care profile has been successfully created!"
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (retryError) {
        // Fall back to returning the text if retry fails
        return new Response(
          JSON.stringify({ 
            type: 'message',
            text: "I've gathered all your information, but I'm having trouble formatting your profile. A team member will review your information and help complete your profile setup. Thank you for your patience!",
            error: "JSON_PARSE_ERROR"
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }
  } catch (error) {
    console.error('Error finishing chat:', error);
    throw error;
  }
}

/**
 * Generates a human-readable summary of the profile
 */
function generateProfileSummary(profile, language) {
  try {
    const { recipient_information, care_requirements, schedule_preferences, caregiver_preferences } = profile;
    
    // Default English summary
    let summary = `Thank you for sharing your care needs. Based on our conversation, I understand that ${recipient_information.recipient_name} needs ${care_requirements.care_level} level care with a focus on ${care_requirements.primary_needs?.join(', ') || 'daily activities'}. Care is needed ${schedule_preferences.frequency || 'regularly'}, and you prefer a caregiver with experience in ${caregiver_preferences.experience_with?.join(', ') || 'caregiving'}. We'll use this information to find the perfect caregiver match.`;
    
    // Add language-specific summaries as needed
    if (language === 'es') {
      summary = `Gracias por compartir sus necesidades de cuidado. Basado en nuestra conversación, entiendo que ${recipient_information.recipient_name} necesita cuidado de nivel ${care_requirements.care_level} con un enfoque en ${care_requirements.primary_needs?.join(', ') || 'actividades diarias'}. Se necesita atención ${schedule_preferences.frequency || 'regularmente'}, y prefiere un cuidador con experiencia en ${caregiver_preferences.experience_with?.join(', ') || 'cuidados'}. Utilizaremos esta información para encontrar el cuidador perfecto.`;
    }
    
    return summary;
  } catch (error) {
    console.error('Error generating summary:', error);
    return "Thank you for providing your care needs information. We'll use this to find the best possible caregiver match for you.";
  }
}
