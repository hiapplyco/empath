
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { headers } = req;
    const upgradeHeader = headers.get("upgrade") || "";

    if (upgradeHeader.toLowerCase() !== "websocket") {
      const { userId, mode } = await req.json();
      
      if (mode === 'initialize') {
        // Initialize session with Gemini
        console.log('Initializing session for user:', userId);
        
        const model = "gemini-2.0-flash";
        const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${Deno.env.get('GEMINI_API_KEY')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model,
            messages: [{
              role: 'system',
              content: "You are Emma, an AI assistant specialized in helping caregivers create their professional profiles. Guide them through sharing their experience, skills, and preferences in a conversational way."
            }],
          })
        });

        if (!response.ok) {
          throw new Error(`Failed to initialize Gemini session: ${await response.text()}`);
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      return new Response(JSON.stringify({ status: 'success' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Handle WebSocket connection
    const { socket, response } = Deno.upgradeWebSocket(req);
    
    socket.onopen = () => {
      console.log("WebSocket opened");
    };

    socket.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received message:", data);

        // Process the message based on its type
        if (data.type === 'audio') {
          // Handle audio data
          // Convert base64 audio to the format expected by Gemini
          // Send to Gemini and get response
        }
        
        // Send response back to client
        socket.send(JSON.stringify({
          type: 'response',
          content: 'Message received'
        }));
      } catch (error) {
        console.error('Error processing message:', error);
        socket.send(JSON.stringify({
          type: 'error',
          message: error.message
        }));
      }
    };

    socket.onerror = (e) => console.error("WebSocket error:", e);
    socket.onclose = () => console.log("WebSocket closed");

    return response;
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
