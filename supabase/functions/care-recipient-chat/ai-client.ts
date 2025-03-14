
import { GoogleGenerativeAI } from "npm:@google/generative-ai";
import { Message } from "./types.ts";
import { systemPrompt } from "./prompts.ts";

export const createAIClient = () => {
  const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '');
  return genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    }
  });
};

export const startChat = (model: any, history: Message[]) => {
  console.log('Starting chat with history length:', history.length);
  const chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: [{ text: systemPrompt }]
      }
    ].concat(history.map(({ role, content }) => ({
      role: role === 'user' ? 'user' : 'model',
      parts: [{ text: content }]
    })))
  });
  console.log('Chat started successfully');
  return chat;
};

export const processResponse = (response: string) => {
  try {
    // Extract JSON if present in markdown code blocks
    const jsonMatch = response.match(/```json\n?([\s\S]*?)\n?```/);
    const cleanJson = jsonMatch ? jsonMatch[1].trim() : response;
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Profile generation error:', error);
    throw new Error('Failed to process AI response');
  }
};
