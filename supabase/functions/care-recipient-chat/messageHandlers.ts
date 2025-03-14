
import { ChatResponse } from "./types.ts";

export const handleStartChat = async (chat: any, language: string): Promise<ChatResponse> => {
  try {
    // Only send initial prompt if there's no history
    const result = await chat.sendMessage("Please start by asking about their relationship to the care recipient.");
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
    
    if (!message.trim()) {
      throw new Error('Empty message received');
    }

    if (message === 'END_INTERVIEW') {
      throw new Error('END_INTERVIEW should be handled by handleFinishChat');
    }
    
    // Send the user's message and get Emma's response
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
