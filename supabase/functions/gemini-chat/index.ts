
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createAIClient, startChat, processResponse } from "./utils/ai-client.ts"
import { processProfile } from "./utils/profile-processor.ts"

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
    
    const model = createAIClient()
    console.log('Initialized Gemini AI client')

    const chat = startChat(model, history)
    console.log('Started chat with history length:', history.length + 1)

    if (message === 'START_CHAT') {
      console.log('Initiating new chat')
      const result = await chat.sendMessage(
        "Hi! I'm interested in joining em.path as a caregiver."
      )
      return new Response(
        JSON.stringify({ 
          type: 'message', 
          text: result.response.text().replace(/```json[\s\S]*?```/g, '') 
        }),
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
        const profile = processResponse(response)
        console.log('Processed profile:', profile)
        
        const processedProfile = await processProfile(profile, req.headers.get('Authorization'))
        
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
    
    const cleanedResponse = response.replace(/```json[\s\S]*?```/g, '')

    return new Response(
      JSON.stringify({ type: 'message', text: cleanedResponse }),
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
