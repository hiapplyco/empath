
import { useState, useEffect } from 'react';
import { Message, ChatState } from './types';
import { supabase } from '@/lib/supabase';

export const useConversation = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatState, setChatState] = useState<ChatState>('idle');
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('en');
  const [userId, setUserId] = useState<string | null>(null);

  // Set user ID on component mount
  useEffect(() => {
    const getUserId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    
    getUserId();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserId(session?.user?.id || null);
        // Clear messages when auth state changes to ensure privacy
        if (!session?.user) {
          setMessages([]);
          localStorage.removeItem('caregiverOnboardingChat');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Load saved conversation for current user
  useEffect(() => {
    if (!userId) return;
    
    const storageKey = `caregiverOnboardingChat_${userId}`;
    const savedConversation = localStorage.getItem(storageKey);
    
    if (savedConversation) {
      try {
        setMessages(JSON.parse(savedConversation));
      } catch (error) {
        console.error('Error parsing saved conversation:', error);
        localStorage.removeItem(storageKey);
      }
    } else {
      // Clear messages if no saved conversation for current user
      setMessages([]);
    }
  }, [userId]);

  // Save conversation after each message
  useEffect(() => {
    if (!userId || messages.length === 0) return;
    
    const storageKey = `caregiverOnboardingChat_${userId}`;
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, userId]);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const clearConversation = () => {
    setMessages([]);
    if (userId) {
      localStorage.removeItem(`caregiverOnboardingChat_${userId}`);
    }
  };

  return {
    messages,
    chatState,
    setChatState,
    input,
    setInput,
    language,
    setLanguage,
    addMessage,
    clearConversation,
    userId
  };
};
