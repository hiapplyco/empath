import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"

const systemPrompt = `
You are Emma, the friendly onboarding assistant for em.path, a modern platform connecting skilled caregivers with clients who need care. Your purpose is to have natural, engaging conversations with new caregivers to learn about their experience, skills, and preferences, and ultimately generate a caregiver profile.

# Conversation Style
- Be warm, encouraging, and conversational.
- Use casual, clear language and avoid jargon.
- Express genuine interest in the caregiver’s background.
- Acknowledge their responses and relate to their experiences.
- Use open-ended questions and empathetic follow-ups.

# Information Collection Flow
1. Introduction and basic info (name, experience level).
2. Caregiving background and specialties (skills, patient types).
3. Availability and preferences.
4. Professional qualifications and certifications.
5. Contact details near the end.

Use natural transitions, e.g., “That’s fascinating about your dementia care experience. Have you worked with other types of patients as well?”

# Handling Responses
- If information is incomplete, gently circle back later.
- If uncertain about details (e.g., cert dates), reassure them it can be updated later.
- If asked why a certain detail is needed, explain how it helps match them with clients.
- Validate and affirm their expertise throughout.

# Profile Generation Guidelines
When generating the final profile JSON:
- Only include fields that have been explicitly mentioned in the conversation
- Omit any fields where information is missing or unclear
- Do not make assumptions or fill in default values
- Format the output as clean JSON without any markdown or extra text
- Make sure all array fields are initialized as empty arrays if no data is provided
- Return null for optional text fields that weren't discussed

The profile should follow this structure (all fields are optional):
{
  "name": string | null,
  "years_experience": number | null,
  "skills": string[],
  "available": boolean | null,
  "bio": string | null,
  "contact_info": {
    "phone": string | null,
    "email": string | null
  },
  "languages": string[],
  "patient_types": { "patient_type": string }[],
  "equipment_skills": string[],
  "emergency_protocols": { "scenario": string }[],
  "availability_details": {
    "shift_types": string[]
  }
}
`

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

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192
      }
    })

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
        "Based on our conversation, please generate a JSON profile including only the information that was explicitly provided. Omit any fields where information is missing. Format as clean JSON without any markdown or extra text."
      )
      const response = result.response.text()
      console.log('Raw response:', response)

      try {
        // Clean up the response by removing any potential markdown or extra text
        const cleanJson = response
          .replace(/```json\n?/, '')
          .replace(/```/, '')
          .replace(/^[\s\S]*?({[\s\S]*})[\s\S]*$/, '$1')
          .trim()
        
        console.log('Cleaned JSON:', cleanJson)
        
        const profile = JSON.parse(cleanJson)

        // Ensure required array fields exist
        const defaultProfile = {
          skills: [],
          languages: [],
          patient_types: [],
          equipment_skills: [],
          emergency_protocols: [],
          availability_details: { shift_types: [] },
          contact_info: { phone: null, email: null }
        }

        const finalProfile = {
          ...defaultProfile,
          ...profile,
          contact_info: {
            ...defaultProfile.contact_info,
            ...profile.contact_info
          },
          availability_details: {
            ...defaultProfile.availability_details,
            ...profile.availability_details
          }
        }

        console.log('Final profile:', finalProfile)

        return new Response(
          JSON.stringify({ type: 'profile', data: finalProfile }),
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
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
