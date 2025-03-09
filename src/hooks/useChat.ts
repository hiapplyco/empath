import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

interface UseChatReturn {
  messages: Message[];
  input: string;
  isAnalyzing: boolean;
  handleInputChange: (value: string) => void;
  handleSubmit: () => Promise<void>;
  handleBack: () => void;
  handleFinish: () => Promise<void>;
}

export const useChat = (): UseChatReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const startChat = async () => {
      setIsAnalyzing(true);
      try {
        const { data, error } = await supabase.functions.invoke('gemini-chat', {
          body: { message: 'START_CHAT' }
        });

        if (error) throw error;

        if (data.type === 'message') {
          setMessages([{ role: 'assistant', content: data.text }]);
        }
      } catch (error: any) {
        console.error('Error starting chat:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to start the chat. Please try again."
        });
      } finally {
        setIsAnalyzing(false);
      }
    };

    startChat();
  }, [toast]);

  const handleProfileData = async (profileData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user found');

      const { error: profileError } = await supabase
        .from('caregiver_profiles')
        .upsert({
          id: user.id,
          gemini_response: profileData.raw_profile,
          processed_profile: profileData.processed_profile
        });

      if (profileError) throw profileError;

      toast({
        title: "Profile Created",
        description: "Your profile has been successfully created!"
      });
      
      document.querySelector('.chat-container')?.classList.add('animate-fade-out');
      
      setTimeout(() => {
        navigate('/onboarding/documents');
      }, 500);
    } catch (error: any) {
      console.error('Profile saving error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save profile. Please try again."
      });
      throw error;
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const handleSubmit = async () => {
    if (!input.trim() || isAnalyzing) return;

    const userMessage = input.trim();
    setInput('');
    setIsAnalyzing(true);
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: { 
          message: userMessage,
          history: messages.map(m => ({ role: m.role, text: m.content }))
        }
      });

      if (error) throw error;

      if (data.type === 'message') {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.text 
        }]);
      } else if (data.type === 'profile') {
        await handleProfileData(data.data);
      }

    } catch (error: any) {
      console.error('Error in conversation:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process your message. Please try again."
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBack = () => {
    window.location.href = '/onboarding';
  };

  const handleFinish = async () => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: { 
          message: 'END_INTERVIEW',
          history: messages.map(m => ({ role: m.role, text: m.content })),
          action: 'finish'
        }
      });

      if (error) throw error;

      if (data.type === 'profile') {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: JSON.stringify(data.data.raw_profile),
          isProfileData: true
        }]);
        await handleProfileData(data.data);
      }
    } catch (error: any) {
      console.error('Error finishing interview:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate your profile. Please try again."
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    messages,
    input,
    isAnalyzing,
    handleInputChange,
    handleSubmit,
    handleBack,
    handleFinish
  };
};
