
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

For each profile, return a JSON object with:
1. sections: Array of profile sections, each containing:
   - title: Section title
   - icon: Suggested icon name from Lucide icons
   - items: Array of items to display
   - variant: Suggested display style ("default", "grid", "list", "badges")

Format the output exactly like this:
{
  "sections": [
    {
      "title": "Personal Information",
      "icon": "user",
      "variant": "default",
      "items": [
        { "label": "Name", "value": "John Doe" },
        { "label": "Years Experience", "value": "5 years" }
      ]
    }
  ]
}

Important:
- Use appropriate Lucide icon names
- Choose appropriate display variants based on content type
- Structure items logically within each section
- Include ALL provided information, nothing should be lost
- Be consistent with data organization
`

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { profileData } = await req.json()
    console.log('Processing profile data:', profileData)

    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const result = await model.generateContent(
      systemPrompt + "\n\nProfile data to process:\n" + JSON.stringify(profileData)
    )
    const response = await result.response
    const text = response.text()
    
    console.log('Processed profile structure:', text)

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
