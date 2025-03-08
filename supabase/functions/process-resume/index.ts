
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
  "sections": [
    {
      "title": "Personal Information",
      "variant": "list",
      "items": [
        {
          "label": "Name",
          "value": string
        },
        {
          "label": "Email",
          "value": string
        },
        {
          "label": "Phone",
          "value": string
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
          "value": string
        },
        {
          "label": "Shift Types",
          "value": string
        },
        {
          "label": "Patient Types",
          "value": string
        },
        {
          "label": "Equipment Skills",
          "value": string
        }
      ]
    },
    {
      "title": "Certifications",
      "variant": "grid",
      "items": Array<{
        "label": string,
        "value": string
      }>
    }
  ]
}`

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
      const cleanJson = parsedText
        .replace(/```json\n?/, '')
        .replace(/```/, '')
        .trim()
      
      const profileData = JSON.parse(cleanJson)

      return new Response(
        JSON.stringify({
          raw_profile: profileData,
          processed_profile: profileData // Now the format matches directly
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
