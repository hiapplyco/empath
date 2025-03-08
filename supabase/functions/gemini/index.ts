
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"
import { CaregiverProfile } from "./types.ts"

const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const systemPrompt = `
You are conducting a caregiver onboarding interview. Extract information according to this schema:

type CaregiverProfile = {
  personal_information: {
    name: string;
    contact_info: {
      phone: string;
      email: string;
    };
    certifications: string[];
    languages: string[];
  };
  experience: {
    years_experience: number;
    specialties: string[];
    availability: {
      shift_types: string[];
    };
  };
  patient_care_details: {
    patient_types: Array<{
      type: string;
      details: {
        common_challenges: string[];
      };
    }>;
    equipment_skills: string[];
  };
  emergency_response: {
    protocols: Array<{
      scenario: string;
      expected_response: string[];
    }>;
  };
};

Follow these rules:
1. Ask ONE question at a time based on the conversation flow provided
2. Be warm and encouraging
3. Extract structured data from responses
4. Keep track of what information is still needed
5. Format all responses as JSON matching the schema above
6. Include a "next_question" field in the response
`

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt, type = 'default', history = [] } = await req.json()
    console.log(`Processing ${type} request with input:`, prompt)

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const chat = model.startChat({
      history: history.map(({ role, text }: { role: string, text: string }) => ({
        role: role === 'user' ? 'user' : 'model',
        parts: [{ text }],
      })),
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      },
    })

    const result = await chat.sendMessage(systemPrompt + "\n\nUser message: " + prompt)
    const response = await result.response
    const text = response.text()

    // Parse and validate the response
    let parsedResponse
    try {
      parsedResponse = JSON.parse(text)
      console.log('Extracted profile data:', parsedResponse)
    } catch (e) {
      console.error('Failed to parse Gemini response as JSON:', e)
      throw new Error('Invalid response format from AI')
    }

    return new Response(
      JSON.stringify(parsedResponse),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error in Gemini function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
