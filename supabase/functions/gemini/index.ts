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

Follow these conversation guidelines:
1. Start with a warm welcome and ask for the caregiver's name
2. After name, ask about contact information (phone and email)
3. Progress through certifications and languages
4. Move to experience level and specialties
5. Discuss availability preferences
6. Ask about patient types and equipment skills
7. End with emergency response protocols
8. Confirm all information before completing

For each response:
1. Extract any provided information into the schema
2. Ask only ONE follow-up question based on what information is still needed
3. Be encouraging and professional
4. If answers are unclear, politely ask for clarification
5. Format responses as JSON with:
   - parsed_data: partial CaregiverProfile object with information gathered so far
   - next_question: string with the next question to ask
   - completed: boolean indicating if all required information is gathered

Remember to:
- Extract specific details from replies (e.g. "I've been a caregiver for 5 years" → years_experience: 5)
- Handle multi-value responses (e.g. "I speak English and Spanish" → languages: ["English", "Spanish"])
- Keep track of previous responses to avoid asking for information already provided
`

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt, type = 'default', history = [] } = await req.json()
    console.log(`Processing ${type} request with input:`, prompt)

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
    })

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
