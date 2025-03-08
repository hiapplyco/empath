
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

const systemPrompt = `
You are a professional resume analyzer. Extract information from resumes into this exact format:
{
  "personal_information": {
    "name": string,
    "contact_info": {
      "phone": string,
      "email": string
    },
    "languages": string[],
    "certifications": [{
      "name": string,
      "status": string,
      "issued": string,
      "expiry": string,
      "verification": string
    }]
  },
  "experience": {
    "years": number,
    "specialties": string[],
    "availability": {
      "shift_types": string[]
    }
  },
  "patient_care_details": {
    "patient_types": [{
      "type": string,
      "details": {
        "common_challenges": string[]
      }
    }],
    "equipment_skills": string[]
  },
  "emergency_response": {
    "protocols": [{
      "scenario": string,
      "expected_response": string[]
    }]
  }
}

Parse all text thoroughly and infer information when possible. For example:
- Calculate years_experience from work history dates
- Identify patient types from role descriptions
- Extract equipment skills from responsibilities
- Infer emergency protocols from certifications and experience`

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { resumeText } = await req.json()
    console.log('Processing resume text:', resumeText.substring(0, 100) + '...')

    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    console.log('Sending resume to Gemini for analysis...')
    const result = await model.generateContent([
      { text: systemPrompt },
      { text: `Extract information from this resume:\n${resumeText}` }
    ])
    
    const response = await result.response
    const parsedText = response.text()
    
    console.log('Processing extracted information...')
    try {
      // Clean and parse the JSON response
      const cleanJson = parsedText
        .replace(/```json\n?/, '')
        .replace(/```/, '')
        .trim()
      
      const profileData = JSON.parse(cleanJson)
      
      // Process the extracted profile data
      const processResult = await fetch(
        'https://upbnysrcdcpumjyjhysy.supabase.co/functions/v1/process-profile',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': req.headers.get('Authorization') || '',
          },
          body: JSON.stringify({ profileData })
        }
      )

      const processedProfile = await processResult.json()
      
      return new Response(
        JSON.stringify({
          raw_profile: profileData,
          processed_profile: processedProfile
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } catch (error) {
      console.error('Error processing resume data:', error)
      throw new Error('Failed to process resume data')
    }
  } catch (error) {
    console.error('Error in resume processing:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
