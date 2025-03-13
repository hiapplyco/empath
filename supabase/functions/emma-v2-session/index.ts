
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Initialize Gemini with better error handling
const initializeGemini = () => {
  const apiKey = Deno.env.get('GEMINI_API_KEY')
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured')
  }
  return new GoogleGenerativeAI(apiKey)
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { mode, message } = await req.json()
    const genAI = initializeGemini()
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    
    console.log(`Processing ${mode} request...`)

    if (mode === 'initialize') {
      console.log('Initializing Emma session...')
      
      try {
        const chat = model.startChat({
          history: [],
          generationConfig: {
            maxOutputTokens: 8192,
          },
        })

        const result = await chat.sendMessage(`You are Emma, an AI assistant specialized in caregiving and healthcare. Start by warmly introducing yourself and asking how you can help with caregiving needs.`)
        const response = await result.response
        const text = response.text()

        console.log('Successfully initialized chat:', text)
        
        return new Response(
          JSON.stringify({ 
            status: 'success',
            message: text 
          }), 
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      } catch (error) {
        console.error('Chat initialization error:', error)
        throw new Error(`Failed to initialize chat: ${error.message}`)
      }
    } else if (mode === 'chat') {
      if (!message) {
        throw new Error('Message is required for chat mode')
      }

      console.log('Processing chat message:', message)
      
      try {
        const chat = model.startChat({
          generationConfig: {
            maxOutputTokens: 8192,
          },
        })

        const result = await chat.sendMessage(message)
        const response = await result.response
        const text = response.text()

        console.log('Chat response:', text)

        return new Response(
          JSON.stringify({ 
            status: 'success',
            message: text 
          }), 
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      } catch (error) {
        console.error('Chat error:', error)
        throw new Error(`Failed to process chat message: ${error.message}`)
      }
    }
    
    throw new Error('Invalid mode specified')
  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ 
        status: 'error',
        message: error.message || 'Internal server error'
      }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

