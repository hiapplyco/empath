
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createAIClient, startChat } from "./ai-client.ts";
import { handleStartChat, handleRegularMessage } from "./messageHandlers.ts";
import { handleFinishChat } from "./profileGenerator.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, history = [], language = 'en', action, userId } = await req.json();
    
    console.log('Request details:', { action, historyLength: history.length, message });
    
    const model = createAIClient();
    const chat = startChat(model, history);

    let response;

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

    console.log('Response:', response);

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
