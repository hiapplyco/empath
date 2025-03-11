
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export const useCareRecipientOnboarding = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [progress, setProgress] = useState(0);
  const [isEndingInterview, setIsEndingInterview] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please sign in to continue."
        });
        navigate('/auth');
        return;
      }
    };
    
    checkAuth();
    startConversation();
  }, []);

  const startConversation = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('care-recipient-chat', {
        body: { 
          message: '', 
          history: [], 
          language,
          action: 'start'
        }
      });

      if (error) throw error;
      
      setMessages([{ role: 'assistant', content: data.text }]);
      setProgress(10);
    } catch (error) {
      console.error('Failed to start conversation:', error);
      setMessages([
        { role: 'assistant', content: "Sorry, I'm having trouble starting the conversation. Please try again later." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('care-recipient-chat', {
        body: { 
          message: input,
          history: messages.map(m => ({ role: m.role, text: m.content })),
          language
        }
      });

      if (error) throw error;

      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      setProgress(prev => Math.min(prev + 10, 100));
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Sorry, I couldn't process your message. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = async (newLanguage: string) => {
    setLanguage(newLanguage);
    const languageName = SUPPORTED_LANGUAGES[newLanguage as keyof typeof SUPPORTED_LANGUAGES];
    const languageChangeMessage = `Please continue our conversation in ${languageName}.`;
    
    setMessages(prev => [...prev, { role: 'user', content: languageChangeMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('care-recipient-chat', {
        body: { 
          message: languageChangeMessage,
          history: messages.map(m => ({ role: m.role, text: m.content })),
          language: newLanguage
        }
      });

      if (error) throw error;
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (error) {
      console.error('Failed to change language:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Sorry, I couldn't change the language. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
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
          history: messages.map(m => ({ role: m.role, text: m.content })),
          language,
          action: 'finish',
          userId: session.user.id
        }
      });

      if (error) throw error;

      const { error: insertError } = await supabase
        .from('care_seeker_interviews')
        .insert({
          user_id: session.user.id,
          raw_interview_data: { messages, language },
          processed_profile: data.data
        });

      if (insertError) throw insertError;

      toast({
        title: "Interview Completed",
        description: "Thank you for sharing your care needs. We're taking you to your dashboard.",
      });

      navigate('/care-seeker/dashboard');
    } catch (error: any) {
      console.error('Error ending interview:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to process interview. Please try again.",
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
    handleLanguageChange,
    handleEndInterview
  };
};
