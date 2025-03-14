
import { ChatResponse } from "./types.ts";

export const handleStartChat = async (chat: any, language: string): Promise<ChatResponse> => {
  const initialPrompt = language === 'en' 
    ? "Hi! I'm Emma, and I'll be helping you create a care profile today. This will help us understand your care needs and match you with the right caregiver. Could you start by telling me about your relationship to the person who needs care?"
    : "¡Hola! Soy Emma y te ayudaré a crear un perfil de cuidado hoy. Esto nos ayudará a entender las necesidades de cuidado y encontrar el cuidador adecuado. ¿Podrías comenzar contándome sobre tu relación con la persona que necesita cuidado?";
    
  const result = await chat.sendMessage(initialPrompt);
  return {
    type: 'message',
    text: result.response.text()
  };
};

export const handleRegularMessage = async (chat: any, message: string): Promise<ChatResponse> => {
  try {
    console.log('Processing message:', message);
    
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
