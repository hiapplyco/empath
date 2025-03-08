import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { ChatMessageList } from "./chat/ChatMessageList";
import { ChatInput } from "./chat/ChatInput";

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export const QuestionnaireChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Initial chat start
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
        navigate('/dashboard');
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

  const handleBack = () => {
    navigate('/onboarding');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <ChatMessageList messages={messages} />
      <ChatInput
        input={input}
        isAnalyzing={isAnalyzing}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onBack={handleBack}
      />
    </Card>
  );
};
