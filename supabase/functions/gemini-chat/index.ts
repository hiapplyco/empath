
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message, history = [], action } = await req.json()
    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      }
    })

    const chat = model.startChat({
      history: [
        ...history.map(({ role, text }: { role: string, text: string }) => ({
          role: role === 'user' ? 'user' : 'model',
          parts: [{ text }],
        }))
      ],
    })

    if (message === 'START_CHAT') {
      const result = await chat.sendMessage("Hi! I'd like to get started with the onboarding process.")
      return new Response(
        JSON.stringify({ type: 'message', text: result.response.text() }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'finish') {
      const result = await chat.sendMessage("Please finish the interview and provide the final JSON profile.")
      const response = result.response.text()
      
      try {
        const profile = JSON.parse(response)
        return new Response(
          JSON.stringify({ type: 'profile', data: profile }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      } catch {
        return new Response(
          JSON.stringify({ type: 'message', text: response }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    // Regular chat message
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
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
