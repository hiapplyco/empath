import { ChatResponse } from "./types.ts";

export const handleStartChat = async (chat: any, language: string): Promise<ChatResponse> => {
  const initialPrompt = language === 'en' 
    ? "Hi! I'm Emma, and I'll be helping you create your care profile today. This will help us understand your care needs and match you with the right caregiver. Could you start by telling me about the type of care you're looking for?"
    : "¡Hola! Soy Emma y te ayudaré a crear tu perfil de cuidado hoy. Esto nos ayudará a entender tus necesidades de cuidado y encontrar el cuidador adecuado. ¿Podrías comenzar contándome qué tipo de cuidado estás buscando?";
    
  const result = await chat.sendMessage(initialPrompt);
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
