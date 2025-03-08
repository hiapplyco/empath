import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

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

  const saveProfileData = async (profileData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user found');

      const { error } = await supabase
        .from('caregiver_profiles')
        .upsert({
          id: user.id,
          gemini_response: profileData
        });

      if (error) throw error;
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save your profile. Please try again."
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
        await saveProfileData(data.data);
        toast({
          title: "Profile Created",
          description: "Your caregiver profile has been created successfully!"
        });
        window.location.href = '/dashboard';
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
        await saveProfileData(data.data);
        toast({
          title: "Profile Created",
          description: "Your caregiver profile has been created successfully!"
        });
        window.location.href = '/dashboard';
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
