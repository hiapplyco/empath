
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

const systemPrompt = `
You are an expert caregiver resume analyzer specializing in healthcare professional profiles. Extract comprehensive information from caregiver resumes with high accuracy, focusing on healthcare-specific qualifications, experience, and skills.

Provide a confidence score (1-5) for each extracted field and make educated inferences when information is implied but not explicitly stated. When extracting certification information, look for specific details like certification numbers, issuing authorities, and expiration dates to support document verification.

Return results in exactly this JSON format:

{
  "sections": [
    {
      "title": "Personal Information",
      "variant": "list",
      "items": [
        {
          "label": "Name",
          "value": string,
          "confidence": number
        },
        {
          "label": "Email",
          "value": string,
          "confidence": number
        },
        {
          "label": "Phone",
          "value": string,
          "confidence": number
        },
        {
          "label": "Location",
          "value": string,
          "confidence": number
        },
        {
          "label": "Availability",
          "value": string,
          "confidence": number
        }
      ]
    },
    {
      "title": "Languages",
      "variant": "badges",
      "items": Array<{ 
        "label": "Language", 
        "value": string,
        "proficiency": "Basic"|"Conversational"|"Fluent"|"Native",
        "confidence": number
      }>
    },
    {
      "title": "Care Specialties",
      "variant": "badges",
      "items": Array<{ 
        "label": "Specialty", 
        "value": string,
        "years": string,
        "confidence": number 
      }>
    },
    {
      "title": "Medical Skills",
      "variant": "badges",
      "items": Array<{ 
        "label": "Skill", 
        "value": string,
        "confidence": number 
      }>
    },
    {
      "title": "Non-Medical Skills",
      "variant": "badges",
      "items": Array<{ 
        "label": "Skill", 
        "value": string,
        "confidence": number 
      }>
    },
    {
      "title": "Experience Summary",
      "variant": "grid",
      "items": [
        {
          "label": "Total Years Experience",
          "value": string,
          "confidence": number
        },
        {
          "label": "Care Settings",
          "value": Array<string>, // e.g., ["Home Care", "Assisted Living", "Hospital"]
          "confidence": number
        },
        {
          "label": "Shift Types",
          "value": Array<string>, // e.g., ["Day", "Night", "Live-in", "24-hour"]
          "confidence": number
        },
        {
          "label": "Weekly Availability",
          "value": string,
          "confidence": number
        },
        {
          "label": "Service Area",
          "value": string,
          "confidence": number
        }
      ]
    },
    {
      "title": "Patient Experience",
      "variant": "grid",
      "items": Array<{
        "label": "Patient Type",
        "value": string, // e.g., "Dementia", "Post-Surgical", "Pediatric"
        "experience": string, // e.g., "3 years"
        "confidence": number
      }>
    },
    {
      "title": "Equipment Proficiency",
      "variant": "grid",
      "items": Array<{
        "label": "Equipment",
        "value": string, // e.g., "Hoyer Lift", "Feeding Tube", "Oxygen"
        "experience": string, // e.g., "Extensive", "Moderate", "Basic"
        "confidence": number
      }>
    },
    {
      "title": "Certifications",
      "variant": "grid",
      "items": Array<{
        "label": string, // e.g., "CNA", "CPR", "HHA"
        "value": string, // e.g., "Certified Nursing Assistant"
        "cert_number": string, // if available, otherwise ""
        "issuing_authority": string, // if available, otherwise ""
        "issue_date": string, // format as YYYY-MM-DD if available, otherwise ""
        "expiry_date": string, // format as YYYY-MM-DD if available, otherwise ""
        "status": "Active"|"Expired"|"Unknown",
        "confidence": number
      }>
    },
    {
      "title": "Employment History",
      "variant": "timeline",
      "items": Array<{
        "employer": string,
        "position": string,
        "start_date": string, // format as YYYY-MM if available
        "end_date": string, // format as YYYY-MM or "Present"
        "responsibilities": Array<string>,
        "care_type": string, // e.g., "Elder Care", "Post-Operative", "Hospice"
        "confidence": number
      }>
    },
    {
      "title": "Emergency Skills",
      "variant": "badges",
      "items": Array<{
        "label": "Emergency Skill",
        "value": string, // e.g., "Fall Management", "Stroke Response"
        "confidence": number
      }>
    },
    {
      "title": "Additional Skills",
      "variant": "badges",
      "items": Array<{
        "label": "Skill Category", // e.g., "Cooking", "Transportation", "Medication Management"
        "value": string,
        "confidence": number
      }>
    }
  ],
  "matching_tags": Array<string>, // Keywords for matching algorithm
  "profile_completeness_score": number, // 0-100
  "verification_needed": Array<string> // Fields that need verification
}

When analyzing the resume, apply these specialized guidelines:
1. Categorize healthcare skills as either "Medical Skills" (clinical/technical) or "Non-Medical Skills" (supportive/daily living)
2. Identify specialized care experience like dementia, Alzheimer's, Parkinson's, or stroke recovery
3. Extract specific certification details including numbers and dates when available
4. Look for patient types the caregiver has worked with (elderly, disabled, pediatric, etc.)
5. Note emergency response training or experience
6. Identify equipment operation skills (Hoyer lifts, hospital beds, oxygen, etc.)
7. Extract scheduling preferences and availability patterns
8. Note care environment experience (home, facility, hospital)
`

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
