
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "npm:@google/generative-ai"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Initialize Gemini
const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')

// Prompt templates
const prompts = {
  onboarding: {
    analyze_resume: (resume: string) => `Analyze this caregiver resume and extract key information: ${resume}`,
    skill_assessment: (experience: string) => `Evaluate these caregiver skills and provide feedback: ${experience}`,
  },
  chat: {
    default: "You are a helpful assistant for caregivers.",
    medical: "You are a medical knowledge assistant. Provide accurate, evidence-based information.",
  },
}

// Gemini model configuration
const getModel = (modelType = 'default') => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
  
  const config = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
  }
  
  return { model, config }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt, type = 'default', context = {}, history = [] } = await req.json()
    
    const { model, config } = getModel()
    console.log(`Processing ${type} request with prompt: ${prompt.substring(0, 100)}...`)

    // Start chat session
    const chat = model.startChat({
      generationConfig: config,
      history: history.map(({ role, text }: { role: string, text: string }) => ({
        role: role === 'user' ? 'user' : 'model',
        parts: [{ text }],
      })),
    })

    // Get response based on prompt type
    let promptTemplate = ''
    switch (type) {
      case 'onboarding_resume':
        promptTemplate = prompts.onboarding.analyze_resume(prompt)
        break
      case 'onboarding_skills':
        promptTemplate = prompts.onboarding.skill_assessment(prompt)
        break
      case 'medical_chat':
        promptTemplate = `${prompts.chat.medical}\n\nUser question: ${prompt}`
        break
      default:
        promptTemplate = `${prompts.chat.default}\n\nUser input: ${prompt}`
    }

    const result = await chat.sendMessage(promptTemplate)
    const response = await result.response
    const text = response.text()

    console.log('Generated response:', text.substring(0, 100) + '...')

    return new Response(
      JSON.stringify({
        response: text,
        type,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
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
