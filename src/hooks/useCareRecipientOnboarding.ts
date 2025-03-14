
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

export const useCareRecipientOnboarding = () => {
  const [messages, setMessages] = useState<{ role: 'assistant' | 'user'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [progress, setProgress] = useState(0);
  const [isEndingInterview, setIsEndingInterview] = useState(false);
  const navigate = useNavigate();

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    setIsLoading(true);
    const newMessage = { role: 'user' as const, content };
    setMessages(prev => [...prev, newMessage]);
    setInput('');

    try {
      const { data, error } = await supabase.functions.invoke('care-recipient-chat', {
        body: { message: content, language }
      });

      if (error) throw error;

      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      setProgress(prev => Math.min(prev + 10, 90));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndInterview = async () => {
    setIsEndingInterview(true);
    try {
      const { data, error } = await supabase.functions.invoke('care-recipient-chat', {
        body: { message: 'END_INTERVIEW', language }
      });

      if (error) throw error;

      const { error: dbError } = await supabase
        .from('care_seeker_interviews')
        .insert({
          raw_interview_data: { messages },
          processed_profile: data.profile,
          needs_review: true
        });

      if (dbError) throw dbError;

      navigate('/care-seeker/profile-review');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save interview data. Please try again."
      });
    } finally {
      setIsEndingInterview(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    language,
    progress,
    isEndingInterview,
    sendMessage,
    setLanguage,
    handleEndInterview
  };
};
