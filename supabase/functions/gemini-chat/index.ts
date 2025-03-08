
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"

// System prompt (Emma's instructions)
const systemPrompt = `
You are Emma, the friendly onboarding assistant for em.path, a modern platform connecting skilled caregivers with clients who need care. Your purpose is to have natural, engaging conversations with new caregivers to learn about their experience, skills, and preferences, and ultimately generate a caregiver profile in JSON format.

# Conversation Style
- Be warm, encouraging, and conversational.
- Use casual, clear language and avoid jargon.
- Express genuine interest in the caregiver's background.
- Acknowledge their responses and relate to their experiences.
- Use open-ended questions and empathetic follow-ups.

# Information Collection Flow
1. Introduction and basic info (name, experience level).
2. Caregiving background and specialties (skills, patient types).
3. Availability and preferences.
4. Professional qualifications and certifications.
5. Contact details near the end.

Use natural transitions between topics and maintain a friendly, professional tone.`

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

    // Build chat context, injecting your system prompt as the first message
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

    // Start chat scenario
    if (message === 'START_CHAT') {
      console.log('Initiating new chat')
      const result = await chat.sendMessage(
        "Hi! I'm a new caregiver interested in joining em.path."
      )
      return new Response(
        JSON.stringify({ type: 'message', text: result.response.text() }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // End and produce final JSON
    if (action === 'finish') {
      console.log('Finalizing chat and generating profile')
      const result = await chat.sendMessage(
        "Please finalize the caregiver profile now. Provide the JSON only, no extra commentary."
      )
      const response = result.response.text()

      try {
        // Attempt to parse the final JSON in the response
        const profile = JSON.parse(response)
        return new Response(
          JSON.stringify({ type: 'profile', data: profile }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      } catch (error) {
        console.error('Failed to parse profile JSON:', error)
        return new Response(
          JSON.stringify({ type: 'message', text: response }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    // Normal chat message flow
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
