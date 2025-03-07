
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "npm:@google/generative-ai"
import { CaregiverProfile } from "./types.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Initialize Gemini
const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')

// Structured prompt templates for profile generation
const prompts = {
  onboarding: {
    analyze_resume: (resume: string) => `
      Analyze this caregiver resume and extract information into the following JSON structure. 
      Only include fields that can be confidently extracted from the resume. 
      Leave other fields empty or null:
      ${JSON.stringify({ caregiver_profile: {} }, null, 2)}
    `,
    generate_profile: (input: any) => `
      Based on the provided information, generate a complete caregiver profile.
      Fill in any missing fields with reasonable defaults based on the context.
      Return the response in this exact JSON structure:
      ${JSON.stringify({ caregiver_profile: {} }, null, 2)}
    `,
    skill_assessment: (skills: string) => `
      Evaluate these caregiver skills and provide a structured assessment that fits into
      the experience and patient_care_details sections of our profile schema:
      ${JSON.stringify({ caregiver_profile: { experience: {}, patient_care_details: {} } }, null, 2)}
    `
  }
}

// Gemini model configuration
const getModel = (modelType = 'default') => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
  
  const config = {
    temperature: 0.7, // Slightly lower for more consistent structured output
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
  }
  
  return { model, config }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt, type = 'default', input = {}, history = [] } = await req.json()
    
    const { model, config } = getModel()
    console.log(`Processing ${type} request with input:`, input)

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
      case 'analyze_resume':
        promptTemplate = prompts.onboarding.analyze_resume(prompt)
        break
      case 'generate_profile':
        promptTemplate = prompts.onboarding.generate_profile(input)
        break
      case 'skill_assessment':
        promptTemplate = prompts.onboarding.skill_assessment(prompt)
        break
      default:
        throw new Error('Invalid prompt type')
    }

    const result = await chat.sendMessage(promptTemplate)
    const response = await result.response
    const text = response.text()

    // Parse and validate the response as a CaregiverProfile
    let parsedResponse
    try {
      parsedResponse = JSON.parse(text)
      // TODO: Add validation against CaregiverProfile type
    } catch (e) {
      console.error('Failed to parse Gemini response as JSON:', e)
      throw new Error('Invalid response format from AI')
    }

    console.log('Generated profile:', JSON.stringify(parsedResponse).substring(0, 100) + '...')

    return new Response(
      JSON.stringify(parsedResponse),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error in Gemini function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
