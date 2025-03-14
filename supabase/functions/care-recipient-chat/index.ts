
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "npm:@google/generative-ai";
import { handleStartChat, handleRegularMessage } from "./messageHandlers.ts";
import { handleFinishChat } from "./profileGenerator.ts";
import { Message, ChatResponse } from "./types.ts";
import { systemPrompt } from "./prompts.ts";

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
    
    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '');
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });
    
    console.log('Starting chat with action:', action);
    console.log('Message history length:', history.length);
    console.log('Current message:', message);

    // Initialize chat with history, including system prompt if it's a new chat
    let chatHistory = history;
    if (history.length === 0) {
      chatHistory = [{
        role: 'user',
        parts: [{ text: systemPrompt }]
      }];
    }
    
    const chat = model.startChat({ history: chatHistory });
    let response: ChatResponse;

    switch (action) {
      case 'start':
        if (history.length === 0) {
          response = await handleStartChat(chat, language);
        } else {
          throw new Error('Start action called with existing history');
        }
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
