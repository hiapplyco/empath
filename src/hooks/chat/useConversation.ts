
import { useState, useEffect } from 'react';
import { Message, ChatState } from './types';

export const useConversation = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatState, setChatState] = useState<ChatState>('idle');
  const [input, setInput] = useState('');

  // Load saved conversation
  useEffect(() => {
    const savedConversation = localStorage.getItem('caregiverOnboardingChat');
    if (savedConversation) {
      setMessages(JSON.parse(savedConversation));
    }
  }, []);

  // Save conversation after each message
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('caregiverOnboardingChat', JSON.stringify(messages));
    }
  }, [messages]);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const clearConversation = () => {
    setMessages([]);
    localStorage.removeItem('caregiverOnboardingChat');
  };

  return {
    messages,
    chatState,
    setChatState,
    input,
    setInput,
    addMessage,
    clearConversation
  };
};
