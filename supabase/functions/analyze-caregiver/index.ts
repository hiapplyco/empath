import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "npm:@google/generative-ai"

const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CaregiverProfileStructure {
  caregiver_profile: {
    personal_information: {
      name: string;
      contact_info: {
        phone: string;
        email: string;
        address: string;
      };
      certifications: string[];
      languages: string[];
      bio: string;
    };
    experience: {
      years_experience: number;
      specialties: string[];
      previous_roles: string[];
      availability: {
        shift_preferences: Array<"Morning" | "Evening" | "Night" | "Live-in">;
        hours_per_week: number;
      };
    };
    // ... other profile sections as per schema
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { input_type, content } = await req.json()
    console.log(`Processing ${input_type} input for caregiver analysis`)

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    // Construct prompt based on input type
    let prompt = `Analyze the following ${input_type} content and extract relevant information about the caregiver. `
    prompt += `Structure the output exactly according to this JSON schema for a caregiver profile: ${JSON.stringify({ caregiver_profile: {} }, null, 2)}`

    if (input_type === 'resume') {
      prompt += "\nPay special attention to experience, certifications, and specialties."
    } else if (input_type === 'text' || input_type === 'audio') {
      prompt += "\nFocus on personal information, care philosophy, and availability preferences."
    }

    const result = await model.generateContent(prompt + "\n\nContent to analyze:\n" + content)
    const response = await result.response
    const text = response.text()
    
    console.log('Generated profile structure:', text.substring(0, 100) + '...')

    // Parse and validate the response
    let parsedResponse: CaregiverProfileStructure
    try {
      parsedResponse = JSON.parse(text)
    } catch (e) {
      console.error('Failed to parse Gemini response as JSON:', e)
      throw new Error('Invalid response format from AI')
    }

    return new Response(JSON.stringify(parsedResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error in analyze-caregiver function:', error)
    return new Response(
      JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
