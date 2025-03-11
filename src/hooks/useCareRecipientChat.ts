import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export const useCareRecipientChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [progress, setProgress] = useState(10);
  const [language, setLanguage] = useState('en');
  const [isEndingInterview, setIsEndingInterview] = useState(false);

  useEffect(() => {
    startChat();
  }, []);

  const startChat = async () => {
    try {
      setIsTyping(true);
      const { data, error } = await supabase.functions.invoke('care-recipient-chat', {
        body: { action: 'start' }
      });

      if (error) throw error;

      if (data.type === 'message') {
        setMessages([{ role: 'assistant', content: data.text }]);
      }
    } catch (error) {
      console.error('Error starting chat:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage = { role: 'user' as const, content };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const { data, error } = await supabase.functions.invoke('care-recipient-chat', {
        body: { 
          message: content,
          history: messages,
        }
      });

      if (error) throw error;

      if (data.type === 'message') {
        setMessages(prev => [...prev, { 
          role: 'assistant',
          content: data.text
        }]);
        
        // Update progress based on conversation state
        setProgress(prev => Math.min(prev + 10, 100));
      }
    } catch (error) {
      console.error('Error in conversation:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleEndInterview = async () => {
    setIsEndingInterview(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase.functions.invoke('care-recipient-chat', {
        body: { 
          message: 'END_INTERVIEW',
          history: messages,
          language,
          action: 'finish',
          userId: session.user.id
        }
      });

      if (error) throw error;

      setIsEndingInterview(false);
      return data;
    } catch (error) {
      console.error('Error ending interview:', error);
      setIsEndingInterview(false);
      throw error;
    }
  };

  return {
    messages,
    input,
    setInput,
    isTyping,
    progress,
    sendMessage,
    language,
    setLanguage,
    isEndingInterview,
    handleEndInterview
  };
};
