
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"

const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { mode } = await req.json()
    
    if (mode === 'initialize') {
      console.log('Initializing Emma session...')
      
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })
      
      try {
        const chat = model.startChat({
          history: [],
          generationConfig: {
            maxOutputTokens: 8192,
          },
        })

        const result = await chat.sendMessage("Hi! I'm Emma, your onboarding assistant. Would you like to tell me about your caregiving experience?")
        const response = await result.response
        const text = response.text()

        console.log('Successfully initialized chat with response:', text)

        return new Response(
          JSON.stringify({ 
            status: 'success',
            message: text 
          }), 
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      } catch (chatError) {
        console.error('Chat initialization error:', chatError)
        throw new Error('Failed to start chat session')
      }
    } else if (mode === 'chat') {
      const { message } = await req.json()
      
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })
      const chat = model.startChat({
        generationConfig: {
          maxOutputTokens: 8192,
        },
      })

      const result = await chat.sendMessage(message)
      const response = await result.response
      const text = response.text()

      return new Response(
        JSON.stringify({ 
          status: 'success',
          message: text 
        }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    return new Response(
      JSON.stringify({ 
        status: 'error',
        message: 'Invalid mode specified' 
      }), 
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    console.error('Error in emma-v2-session:', error)
    return new Response(
      JSON.stringify({ 
        status: 'error',
        message: 'Failed to process request. Please try again.' 
      }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
