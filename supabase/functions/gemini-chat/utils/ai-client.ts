
import { GoogleGenerativeAI } from "npm:@google/generative-ai";

export const createAIClient = () => {
  const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '');
  return genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192
    }
  });
};

export const startChat = (model: any, history: Array<{ role: string, text: string }>) => {
  return model.startChat({
    history: [
      {
        role: 'user',
        parts: [{ text: systemPrompt }]
      },
      ...history.map(({ role, text }) => ({
        role: role === 'user' ? 'user' : 'model',
        parts: [{ text }]
      }))
    ]
  });
};

export const processResponse = (response: string) => {
  try {
    const cleanJson = response
      .replace(/```json\n?/, '')
      .replace(/```/, '')
      .replace(/^[\s\S]*?({[\s\S]*})[\s\S]*$/, '$1')
      .trim();
    
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Profile generation error:', error);
    throw new Error('Failed to process AI response');
  }
};
