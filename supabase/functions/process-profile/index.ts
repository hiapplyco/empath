
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

const systemPrompt = `
You are an expert at analyzing caregiver profile data and structuring it for display.
Take the raw profile data and organize it into sections for the dashboard display.

Structure the data into clear sections following this format exactly:
{
  "sections": [
    {
      "title": string,
      "icon": string (Lucide icon name),
      "variant": "default" | "grid" | "list" | "badges",
      "items": Array<{ label: string, value: string }>
    }
  ]
}

Rules for structuring the data:
1. Use these specific icons:
   - Personal Information: "user"
   - Skills & Specialties: "star"
   - Experience: "briefcase"
   - Certifications: "award"
   - Languages: "globe"
   - Contact: "phone"

2. Format values for better readability:
   - Format phone numbers as (XXX) XXX-XXXX
   - Format dates as "MMM DD, YYYY"
   - Format arrays into comma-separated lists
   - Format certification details with bullet points
   - Convert boolean values to "Yes" or "No"
   - Always include units for numeric values (e.g., "5 years")

3. Use appropriate variants:
   - Contact/Personal info: "list" variant
   - Skills and languages: "badges" variant
   - Experience details: "grid" variant
   - Certifications: "grid" variant

4. Data transformation rules:
   - Split comma-separated values into individual badges
   - Format certification details as bullet points: "• Status: Active\\n• Issued: Jan 2024\\n• Expires: Jan 2026"
   - Clean and capitalize names appropriately
   - Ensure all phone numbers are consistently formatted`

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { profileData } = await req.json()
    console.log('Processing raw profile data:', profileData)

    // Handle both direct profile data and gemini_response
    const dataToProcess = profileData.gemini_response || profileData
    
    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    const result = await model.generateContent([
      { text: systemPrompt },
      { text: JSON.stringify(dataToProcess) }
    ])
    
    const response = await result.response
    const text = response.text()
    
    console.log('Generated profile structure:', text)

    try {
      // Clean and parse the JSON response
      const cleanJson = text
        .replace(/```json\n?/, '')
        .replace(/```/, '')
        .trim()
      
      const processedData = JSON.parse(cleanJson)
      
      // Ensure sections array exists
      if (!processedData.sections || !Array.isArray(processedData.sections)) {
        throw new Error('Invalid profile structure: missing sections array')
      }

      // Post-process the sections
      processedData.sections = processedData.sections.map(section => {
        if (section.variant === 'badges') {
          section.items = section.items.flatMap(item => {
            if (typeof item.value === 'string') {
              const values = item.value.split(',').map(v => v.trim())
              return values.map(value => ({ label: item.label, value }))
            }
            return item
          })
        }
        return section
      })

      console.log('Final processed profile:', processedData)

      return new Response(
        JSON.stringify(processedData),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
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
