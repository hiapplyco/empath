
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai";
import { handleStartChat, handleRegularMessage } from "./messageHandlers.ts";
import { handleFinishChat } from "./profileGenerator.ts";
import { Message, ChatResponse } from "./types.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, history = [], language = 'en', action, userId } = await req.json();
    
    console.log('Request details:', { action, historyLength: history.length, message });
    
    // Initialize the Gemini API client
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    // Start a chat with the provided history
    const chat = model.startChat({
      history: history.map((msg: Message) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: msg.content
      }))
    });

    let response: ChatResponse;

    switch (action) {
      case 'start':
        response = await handleStartChat(chat, language);
        break;
      case 'finish':
        response = await handleFinishChat(chat, userId, language, history, corsHeaders);
        break;
      default:
        if (!message) {
          throw new Error('No message provided for regular chat');
        }
        response = await handleRegularMessage(chat, message);
    }

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in care recipient chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
