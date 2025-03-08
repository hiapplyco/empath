
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

const systemPrompt = `
You are analyzing an audio transcript from a caregiver describing their experience. Extract their information into this exact JSON format. If a piece of information is not mentioned, use "N/A" for the value. Pay special attention to certifications, years of experience, and specialized skills:

{
  "sections": [
    {
      "title": "Personal Information",
      "variant": "list",
      "items": [
        {
          "label": "Name",
          "value": "string"
        }
      ]
    },
    {
      "title": "Languages",
      "variant": "badges",
      "items": Array<{ label: "Language", value: string }>
    },
    {
      "title": "Skills & Specialties",
      "variant": "badges",
      "items": Array<{ label: "Skill", value: string }>
    },
    {
      "title": "Experience",
      "variant": "grid",
      "items": [
        {
          "label": "Years of Experience",
          "value": string (extract number of years mentioned)
        },
        {
          "label": "Shift Types",
          "value": string (extract any mentions of day/night/flexible shifts)
        },
        {
          "label": "Patient Types",
          "value": string (extract mentions of elderly, children, disabled, etc.)
        },
        {
          "label": "Equipment Skills",
          "value": string (extract mentions of medical equipment experience)
        }
      ]
    },
    {
      "title": "Certifications",
      "variant": "badges",
      "items": Array<{ label: "Certification", value: string }> (extract any mentioned certifications like CPR, First Aid, etc.)
    }
  ]
}

Look for specific details about:
1. Any certifications mentioned (e.g., CPR, First Aid, etc.)
2. Years of experience in caregiving
3. Types of patients they've worked with
4. Special skills or training
5. Languages spoken
6. Equipment they're familiar with

If something is mentioned in the audio, make sure to include it in the appropriate section. Don't leave arrays empty if information is provided - populate them with the mentioned items.`

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { audio } = await req.json()
    console.log('Processing audio data...')

    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    console.log('Sending audio to Gemini for transcription...')
    const result = await model.generateContent([
      { text: systemPrompt },
      { text: audio }
    ])
    
    const response = await result.response
    const parsedText = response.text()
    
    console.log('Processed transcript:', parsedText)
    
    try {
      const cleanJson = parsedText
        .replace(/```json\n?/, '')
        .replace(/```/, '')
        .trim()
      
      const profileData = JSON.parse(cleanJson)
      console.log('Extracted profile data:', profileData)

      return new Response(
        JSON.stringify({
          raw_profile: profileData,
          processed_profile: profileData
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } catch (error) {
      console.error('Profile generation error:', error)
      throw new Error('Failed to process audio transcript')
    }
  } catch (error) {
    console.error('Error in audio processing:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
