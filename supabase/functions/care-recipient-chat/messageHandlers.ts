
import { ChatResponse } from "./types.ts";

export const handleStartChat = async (chat: any, language: string): Promise<ChatResponse> => {
  try {
    // No need to send an initial prompt - let the system prompt handle Emma's introduction
    const result = await chat.sendMessage("");
    return {
      type: 'message',
      text: result.response.text()
    };
  } catch (error) {
    console.error('Error starting chat:', error);
    throw error;
  }
};

export const handleRegularMessage = async (chat: any, message: string): Promise<ChatResponse> => {
  try {
    console.log('Processing user message:', message);
    
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
