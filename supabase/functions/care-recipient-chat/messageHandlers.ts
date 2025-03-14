import { ChatResponse } from "./types.ts";

export const handleStartChat = async (chat: any, language: string): Promise<ChatResponse> => {
  const result = await chat.sendMessage("Hello! How can I assist you today?");
  return {
    type: 'message',
    text: result.response.text()
  };
};

export const handleRegularMessage = async (chat: any, message: string): Promise<ChatResponse> => {
  if (message === 'END_INTERVIEW') {
    throw new Error('END_INTERVIEW should be handled by handleFinishChat');
  }
  
  const result = await chat.sendMessage(message);
  return {
    type: 'message',
    text: result.response.text()
  };
};
