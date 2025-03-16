
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

const systemPrompt = `
You are an expert at analyzing caregiver profile data and structuring it for display and database storage.
Take the raw profile data and organize it into sections for the dashboard display while also preparing it for database storage.

Structure the data into clear sections following this format exactly:
{
  "sections": [
    {
      "title": string,
      "icon": string (Lucide icon name),
      "variant": "default" | "grid" | "list" | "badges",
      "items": Array<{ label: string, value: string }>
    }
  ],
  "database_fields": {
    // For caregiver_profiles table
    "Name": string,
    "Bio": string,
    "Education": string,
    "Email": string,
    "Experience": string,
    "HCA Expiration Date": string, // will be formatted as YYYY-MM-DD
    "HCA Registry ID": string,
    "Hourly Rate": string,
    "Languages": string,
    "License Type": string,
    "Locations Serviced": string,
    "Pet Preferences": string,
    "Phone Number": string,
    "Services Provided": string,
    "Type of Background Check": string,
    "Vaccinations": string,
    "Available Shifts": string,
    "input_method": string // Will be one of: "resume", "audio", "video", "text"
  }
}

Rules for structuring the display data:
1. Use these specific icons:
   - Personal Information: "user"
   - Skills & Specialties: "star"
   - Experience: "briefcase"
   - Certifications: "award"
   - Languages: "globe"
   - Contact: "phone"
   - Locations: "map-pin"
   - Availability: "calendar"
   - Rates: "dollar-sign"
   - Education: "graduation-cap"
   - Preferences: "heart"
   - Services: "check-circle"

2. Format values for better readability:
   - Format phone numbers as (XXX) XXX-XXXX
   - Format dates as "MMM DD, YYYY"
   - Convert boolean values to "Yes" or "No"
   - Always include units for numeric values (e.g., "5 years")

3. Use appropriate variants:
   - Contact/Personal info: "list" variant
   - Skills, languages, locations: "badges" variant
   - Experience details: "grid" variant
   - Certifications: "grid" variant
   - Services provided: "badges" variant

4. Data transformation rules:
   - Format certification details as bullet points: "• Status: Active\\n• Issued: Jan 2024\\n• Expires: Jan 2026"
   - Clean and capitalize names appropriately
   - Ensure all phone numbers are consistently formatted
   - Store list items as comma-separated values

Process carefully and ensure all data is properly structured for both display purposes and database storage.`

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

      // Ensure database_fields object exists
      if (!processedData.database_fields) {
        throw new Error('Invalid profile structure: missing database_fields object')
      }

      // Preserve input_method if it exists in the original data
      if (dataToProcess.input_method && !processedData.database_fields.input_method) {
        processedData.database_fields.input_method = dataToProcess.input_method;
      }

      // Post-process the sections for display
      processedData.sections = processedData.sections.map(section => {
        if (section.variant === 'badges') {
          section.items = section.items.flatMap(item => {
            if (typeof item.value === 'string') {
              const values = item.value.split(',').map(v => v.trim()).filter(Boolean)
              return values.map(value => ({ label: item.label, value }))
            }
            return item
          })
        }
        return section
      })

      console.log('Final processed profile for DB:', processedData)

      return new Response(
        JSON.stringify(processedData),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } catch (error) {
      console.error('Failed to parse Gemini response:', error)
      throw new Error('Invalid response format from AI: ' + error.message)
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
