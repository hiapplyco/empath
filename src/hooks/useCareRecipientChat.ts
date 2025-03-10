
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

  return {
    messages,
    input,
    setInput,
    isTyping,
    progress,
    sendMessage
  };
};
