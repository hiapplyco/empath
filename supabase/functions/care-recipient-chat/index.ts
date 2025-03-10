
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai";
import { SupabaseClient, createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const systemPrompt = `You are Emma, a friendly and empathetic care matching assistant for em.path. Your role is to help people find the right caregiver by gathering information about their care needs in a warm, supportive manner. Follow these guidelines:

1. Be warm and empathetic in your responses
2. Ask one question at a time to avoid overwhelming users
3. Listen carefully and acknowledge their responses
4. Guide users through these key topics:
   - Who needs care (self, family member, other)
   - Type of care needed (daily activities, medical, companionship)
   - Schedule requirements
   - Caregiver preferences
   - Location
   - Additional context

Always maintain a supportive, patient tone and validate their feelings about seeking care.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, history = [], language = 'en', action } = await req.json();
    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '');
    const model = genAI.getGenerativeModel({ model: "gemini-flash-2.0" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        ...history.map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        }))
      ],
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });

    if (action === 'start') {
      const result = await chat.sendMessage(
        "Start a conversation with a warm greeting and ask about language preference."
      );
      return new Response(
        JSON.stringify({ 
          type: 'message',
          text: result.response.text(),
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = await chat.sendMessage(message);
    return new Response(
      JSON.stringify({ 
        type: 'message',
        text: result.response.text(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
