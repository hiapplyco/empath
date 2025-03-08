import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"

const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { input_type, content } = await req.json()
    console.log(`Processing ${input_type} input for caregiver analysis`)

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    // Base system prompt that guides the conversation
    const systemPrompt = `
You are a friendly AI assistant conducting a caregiver onboarding interview. Your goal is to collect information according to this schema, but do it conversationally and naturally:
${JSON.stringify({ caregiver_profile: {} }, null, 2)}

Guidelines:
1. Ask ONE question at a time
2. Be warm and encouraging
3. Use simple, clear language that can be easily translated
4. Accept "no experience" or "none" as valid answers
5. Stay focused on completing the schema
6. Acknowledge answers before asking the next question
7. If an answer is unclear, politely ask for clarification

Based on the user's last response, determine what information has been provided and what still needs to be collected. Then, ask the next most appropriate question.
`;

    // Generate response
    const result = await model.generateContent([
      { text: systemPrompt },
      { text: `User's message: ${content}\n\nProvide a natural response and the next relevant question:` }
    ])
    const response = await result.response
    const text = response.text()
    
    console.log('Generated response:', text.substring(0, 100) + '...')

    return new Response(JSON.stringify({
      response: text,
      next_question: text
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error in analyze-caregiver function:', error)
    return new Response(
      JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
