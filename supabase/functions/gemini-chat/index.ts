import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"

const systemPrompt = `
You are Emma, the friendly onboarding assistant for em.path, a modern platform connecting skilled caregivers with clients who need care. Your purpose is to have natural, engaging conversations with new caregivers to learn about their experience, skills, and preferences, and ultimately generate a caregiver profile in JSON format.

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

# Conversation Wrap-up
- Summarize what you’ve learned.
- Thank them for their time.
- Explain next steps (onboarding).
- Invite final questions.

# Structured Output Requirements
1. Throughout the conversation, collect data internally but do NOT show partial JSON.
2. Only when the conversation naturally concludes, finalize the caregiver profile.
3. Present the final JSON object as your last message, with no extra text before or after the JSON.
4. The final JSON must match the schema exactly (same property names, no extras).

End the conversation gracefully by providing the final JSON in the correct order and format. No additional commentary should follow the JSON output.
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
        "Based on our conversation, please generate a JSON profile for me with these fields: name (string), years_experience (number), skills (string[]), available (boolean), bio (string), contact_info (object with phone and email), languages (string[]), patient_types (array of objects with patient_type field), equipment_skills (string[]), emergency_protocols (array of objects with scenario field), availability_details (object with shift_types array). Format it as valid JSON only, no commentary."
      )
      const response = result.response.text()
      console.log('Generated profile:', response)

      try {
        const profile = JSON.parse(response)
        return new Response(
          JSON.stringify({ type: 'profile', data: profile }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      } catch (error) {
        console.error('Failed to parse profile JSON:', error, 'Response was:', response)
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
