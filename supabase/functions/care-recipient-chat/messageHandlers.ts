import { ChatResponse } from "./types.ts";
import { systemPrompt } from "./prompts.ts";

export const handleStartChat = async (chat: any, language: string): Promise<ChatResponse> => {
  try {
    console.log('Starting new care recipient chat...');
    
    const initialMessage = "Hi! I'm Emma, and I'll be helping you find the right care for your loved one. Could you start by telling me about your relationship to the person who needs care?";
    
    // First send system prompt to set up the AI assistant's behavior
    const systemResult = await chat.sendMessage(systemPrompt);
    console.log('System prompt response:', systemResult.response.text());
    
    // Then send the initial greeting
    const result = await chat.sendMessage(initialMessage);
    console.log('Start chat response:', result.response.text());
    
    return {
      type: 'message',
      text: initialMessage // Return our controlled initial message
    };
  } catch (error) {
    console.error('Error starting chat:', error);
    throw error;
  }
};

export const handleRegularMessage = async (chat: any, message: string): Promise<ChatResponse> => {
  try {
    console.log('Processing user message:', message);
    
    if (!message.trim()) {
      throw new Error('Empty message received');
    }

    if (message === 'END_INTERVIEW') {
      throw new Error('END_INTERVIEW should be handled by handleFinishChat');
    }
    
    const result = await chat.sendMessage(message);
    const response = result.response.text();
    
    console.log('Emma response:', response);
    
    return {
      type: 'message',
      text: response
    };
  } catch (error) {
    console.error('Error in message handler:', error);
    throw error;
  }
};
