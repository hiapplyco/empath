import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"

const systemPrompt = `
You are Emma, the friendly onboarding assistant for em.path, a modern platform connecting skilled caregivers with clients who need care. Your purpose is to have natural, engaging conversations with new caregivers to learn about their experience, skills, and preferences, and ultimately generate a caregiver profile.

# Conversation Style
- Be warm, encouraging, and conversational
- Use casual, clear language and avoid jargon
- Express genuine interest in the caregiver's background
- Acknowledge their responses and relate to their experiences
- Use open-ended questions and empathetic follow-ups

# Required Information to Collect
1. Basic Information:
   - Full Name
   - Years of Experience
   - Languages Spoken
   - Contact Information (phone, email)

2. Professional Qualifications:
   - Certifications (with status and dates)
   - Specializations
   - Skills and Competencies

3. Patient Care Experience:
   - Types of Patients (e.g., elderly, post-operative, dementia)
   - Medical Equipment Proficiency
   - Emergency Response Protocols

4. Availability:
   - Work Schedule Preferences
   - Shift Types
   - Geographic Area

# Profile Generation Format
When generating the final profile, format the data exactly as follows:
{
  "personal_information": {
    "name": string,
    "contact_info": {
      "phone": string,
      "email": string
    },
    "languages": string[],
    "certifications": [
      {
        "name": string,
        "status": string,
        "issued": string,
        "expiry": string,
        "verification": string
      }
    ]
  },
  "experience": {
    "years": number,
    "specialties": string[],
    "availability": {
      "shift_types": string[]
    }
  },
  "patient_care_details": {
    "patient_types": [
      {
        "type": string,
        "details": {
          "common_challenges": string[]
        }
      }
    ],
    "equipment_skills": string[]
  },
  "emergency_response": {
    "protocols": [
      {
        "scenario": string,
        "expected_response": string[]
      }
    ]
  }
}

IMPORTANT: When a user provides information, extract and store it in this exact format. Don't skip any provided information. If information for a field is missing, include the field with null or an empty array as appropriate.`

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message, history = [], action } = await req.json()
    console.log('Request received:', { message, action, historyLength: history.length })
    
    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')
    console.log('Initialized Gemini AI client')

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192
      }
    })
    console.log('Got generative model')

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }]
        },
        ...history.map(({ role, text }) => ({
          role: role === 'user' ? 'user' : 'model',
          parts: [{ text }]
        }))
      ]
    })
    console.log('Started chat with history length:', history.length + 1)

    if (message === 'START_CHAT') {
      console.log('Initiating new chat')
      const result = await chat.sendMessage(
        "Hi! I'm interested in joining em.path as a caregiver."
      )
      return new Response(
        JSON.stringify({ type: 'message', text: result.response.text() }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'finish') {
      console.log('Finalizing chat and generating profile')
      const result = await chat.sendMessage(
        "Based on our conversation, please generate a JSON profile following the exact format specified in the system prompt, including all information that was provided. Format as clean JSON without any markdown or extra text."
      )
      const response = result.response.text()
      console.log('Raw response:', response)

      try {
        const cleanJson = response
          .replace(/```json\n?/, '')
          .replace(/```/, '')
          .replace(/^[\s\S]*?({[\s\S]*})[\s\S]*$/, '$1')
          .trim()
        
        console.log('Cleaned JSON:', cleanJson)
        
        const processResult = await fetch(
          'https://upbnysrcdcpumjyjhysy.supabase.co/functions/v1/process-profile',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': req.headers.get('Authorization') || '',
            },
            body: JSON.stringify({ profileData: JSON.parse(cleanJson) })
          }
        )

        const processedProfile = await processResult.json()
        const profile = JSON.parse(cleanJson)

        return new Response(
          JSON.stringify({ 
            type: 'profile', 
            data: {
              raw_profile: profile,
              processed_profile: processedProfile
            }
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      } catch (error) {
        console.error('Profile generation error:', error)
        console.error('Raw response was:', response)
        return new Response(
          JSON.stringify({ 
            type: 'error', 
            message: 'Failed to generate profile. Please try again.',
            details: error.message,
            response: response 
          }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }
    }

    console.log('Processing chat message:', message)
    const result = await chat.sendMessage(message)
    const response = result.response.text()

    return new Response(
      JSON.stringify({ type: 'message', text: response }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
