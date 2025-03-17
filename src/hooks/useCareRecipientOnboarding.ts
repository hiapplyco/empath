
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const useCareRecipientOnboarding = () => {
  const [messages, setMessages] = useState<{ role: 'assistant' | 'user'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [progress, setProgress] = useState(0);
  const [isEndingInterview, setIsEndingInterview] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Set user ID on component mount and listen for auth changes
  useEffect(() => {
    const getUserId = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id || null);
    };
    
    getUserId();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const newUserId = session?.user?.id || null;
        setUserId(newUserId);
        
        // Clear messages when user ID changes to ensure privacy
        if (newUserId !== userId) {
          setMessages([]);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Initialize chat when component mounts and we have a userId
  useEffect(() => {
    if (!userId) return;
    
    const initializeChat = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke('care-recipient-chat', {
          body: { 
            action: 'start',
            language,
            userId,
            history: []
          }
        });

        if (error) throw error;

        if (data?.text) {
          setMessages([{ role: 'assistant', content: data.text }]);
          setProgress(10);
        }
      } catch (error) {
        console.error('Error initializing chat:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to start chat. Please try refreshing the page."
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();
  }, [language, toast, userId]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || !userId) return;

    setIsLoading(true);
    const newMessage = { role: 'user' as const, content };
    setMessages(prev => [...prev, newMessage]);
    setInput('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase.functions.invoke('care-recipient-chat', {
        body: { 
          message: content, 
          language,
          userId: session.user.id 
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      if (!data?.text) {
        throw new Error('Invalid response from chat function');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      setProgress(prev => Math.min(prev + 10, 90));
    } catch (error) {
      console.error('Error sending message:', error);
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
    if (!userId) return;
    
    setIsEndingInterview(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
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

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      // Navigate to profile review page
      navigate('/care-seeker/profile-review');
    } catch (error) {
      console.error('Error ending interview:', error);
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
    progress,
    sendMessage,
    language,
    setLanguage,
    isEndingInterview,
    handleEndInterview
  };
};
