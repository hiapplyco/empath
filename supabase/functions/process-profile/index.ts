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
    "name": string,
    "bio": string,
    "years_experience": number,
    "available": boolean,
    "input_method": string,
    "phone": string,
    "languages": string[],
    "skills": string[],
    "equipment_skills": string[],
    
    // Complex objects in JSON format
    "contact_info": {
      "phone": string,
      "email": string
    },
    "availability_details": {
      "shift_types": string[],
      "schedule": object // detailed schedule
    },
    "rate_preferences": {
      "hourly_rate": string,
      "rate_range": string
    },
    
    // For PIA compatibility 
    "pia_fields": {
      "Name": string,
      "Bio": string,
      "Education": string,
      "Email": string,
      "Experience": string,
      "HCA_Expiration_Date": string, // will be formatted as YYYY-MM-DD
      "HCA_Registry_ID": string,
      "Hourly_Rate": string,
      "Languages": string,
      "License_Type": string,
      "Locations_Serviced": string,
      "Pet_Preferences": string,
      "Phone_Number": string,
      "Services_Provided": string,
      "Type_of_Background_Check": string,
      "Vaccinations": string,
      "Available_Shifts": string
    }
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
   - Format arrays into comma-separated lists
   - Format certification details with bullet points
   - Convert boolean values to "Yes" or "No"
   - Always include units for numeric values (e.g., "5 years")

3. Use appropriate variants:
   - Contact/Personal info: "list" variant
   - Skills, languages, locations: "badges" variant
   - Experience details: "grid" variant
   - Certifications: "grid" variant
   - Services provided: "badges" variant

4. Data transformation rules:
   - Split comma-separated values into individual badges for display
   - Format certification details as bullet points: "• Status: Active\\n• Issued: Jan 2024\\n• Expires: Jan 2026"
   - Clean and capitalize names appropriately
   - Ensure all phone numbers are consistently formatted

Rules for database field preparation:
1. Extract years_experience as a number (integer) from any experience description
2. Format languages, skills, and equipment_skills as proper string arrays
3. Structure complex fields (contact_info, availability_details, rate_preferences) as JSON objects
4. Ensure phone numbers are stored consistently (e.g., just digits: "1234567890")
5. Extract rate information from text descriptions 
6. Use explicit boolean values for available field
7. Process shift details into structured availability information
8. Keep original text in bio field
9. Populate all PIA fields in the pia_fields object with properly formatted values

The pia_fields object should be completely populated based on the raw data, with values formatted appropriately for the PIA table. If any field doesn't have an equivalent in the raw data, make a best effort to derive it or leave it as null.

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

      // Extract data for caregiver_profiles table
      const {
        name,
        bio,
        years_experience,
        available,
        input_method,
        phone,
        languages,
        skills,
        equipment_skills,
        contact_info,
        availability_details,
        rate_preferences,
        pia_fields
      } = processedData.database_fields

      // Prepare the final data structure for the database
      const dbReadyData = {
        // Fields for caregiver_profiles table
        name,
        bio,
        years_experience: parseInt(years_experience) || 0,
        available: Boolean(available),
        input_method,
        phone,
        languages: Array.isArray(languages) ? languages : [],
        skills: Array.isArray(skills) ? skills : [],
        equipment_skills: Array.isArray(equipment_skills) ? equipment_skills : [],
        contact_info: contact_info || { phone: null, email: null },
        availability_details: availability_details || { shift_types: [] },
        rate_preferences: rate_preferences || {},
        
        // Store PIA fields for compatibility
        pia_fields,
        
        // Store processed display data
        processed_profile: {
          sections: processedData.sections
        }
      }

      console.log('Final processed profile for DB:', dbReadyData)

      return new Response(
        JSON.stringify(dbReadyData),
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
