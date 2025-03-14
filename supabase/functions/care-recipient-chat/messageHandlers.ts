
import { GoogleGenerativeAI } from "npm:@google/generative-ai";
import { Message, ChatResponse } from "./types.ts";

const systemPrompt = `// ... keep existing code (system prompt content)`;

export async function handleStartChat(chat: any, language: string): Promise<ChatResponse> {
  try {
    const langPrompt = language === 'en' 
      ? "Start a conversation with a warm greeting in English and ask about language preference."
      : `Start a conversation with a warm greeting in ${language} and ask about language preference.`;
    
    const result = await chat.sendMessage(langPrompt);
    
    return {
      type: 'message',
      text: result.response.text(),
    };
  } catch (error) {
    console.error('Error starting chat:', error);
    throw error;
  }
}

export async function handleRegularMessage(chat: any, message: string): Promise<ChatResponse> {
  try {
    if (message === 'END_INTERVIEW') {
      throw new Error('END_INTERVIEW should be handled by handleFinishChat');
    }
    
    const result = await chat.sendMessage(message);
    
    return {
      type: 'message',
      text: result.response.text(),
    };
  } catch (error) {
    console.error('Error processing message:', error);
    throw error;
  }
}
