
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

const systemPrompt = `
You are an expert at analyzing caregiver profiles and structuring them for display.
Take the raw profile data and organize it into clear sections for display.

For each profile, return a JSON object with sections array containing:
- title: Section title
- icon: A Lucide icon name (e.g., "User", "Calendar", "Heart")
- variant: Display style ("default", "grid", "list", "badges")
- items: Array of label/value pairs to display

Example structure:
{
  "sections": [
    {
      "title": "Personal Information",
      "icon": "User",
      "variant": "list",
      "items": [
        { "label": "Name", "value": "John Doe" },
        { "label": "Languages", "value": "English, Spanish" }
      ]
    },
    {
      "title": "Experience",
      "icon": "Briefcase",
      "variant": "grid",
      "items": [
        { "label": "Years Experience", "value": "5" },
        { "label": "Specialties", "value": "Elderly Care, Dementia" }
      ]
    }
  ]
}

Important:
- Group related information into logical sections
- Choose appropriate icons from Lucide icon set
- Select the best display variant for each type of data
- Format all values as strings
- Include ALL provided information`

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { profileData } = await req.json()
    console.log('Processing profile data:', profileData)

    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const result = await model.generateContent([
      { text: systemPrompt },
      { text: "Profile data to process:\n" + JSON.stringify(profileData) }
    ])
    
    const response = await result.response
    const text = response.text()
    
    console.log('Generated profile structure:', text)

    try {
      const processedData = JSON.parse(text)
      return new Response(JSON.stringify(processedData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    } catch (error) {
      console.error('Failed to parse Gemini response:', error)
      throw new Error('Invalid response format from AI')
    }
  } catch (error) {
    console.error('Error processing profile:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
