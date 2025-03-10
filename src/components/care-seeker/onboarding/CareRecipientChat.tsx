import React, { useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/lib/supabase";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessages } from "./chat/ChatMessages";
import { ChatInput } from "./chat/ChatInput";
import { SUPPORTED_LANGUAGES } from "./chat/LanguageSelector";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

interface CareRecipientChatProps {
  onBack: () => void;
}

export const CareRecipientChat = ({ onBack }: CareRecipientChatProps) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [language, setLanguage] = React.useState('en');
  const [progress, setProgress] = React.useState(0);
  const [isEndingInterview, setIsEndingInterview] = React.useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
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
      
      setMessages([
        { role: 'assistant', content: data.text }
      ]);
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

  const handleEndInterview = async () => {
    setIsEndingInterview(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase.functions.invoke('care-recipient-chat', {
        body: { 
          message: 'END_INTERVIEW',
          history: messages.map(m => ({ role: m.role, text: m.content })),
          language,
          action: 'finish'
        }
      });

      if (error) throw error;

      const { error: insertError } = await supabase
        .from('care_seeker_interviews')
        .insert({
          user_id: user.id,
          raw_interview_data: { messages, language },
          processed_profile: data.data
        });

      if (insertError) throw insertError;

      toast({
        title: "Interview Completed",
        description: "Thank you for sharing your care needs. Our team will review your information shortly.",
      });

      navigate('/care-seeker/onboarding/documents');
    } catch (error: any) {
      console.error('Error ending interview:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process interview. Please try again.",
      });
    } finally {
      setIsEndingInterview(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <ChatHeader 
        onBack={onBack}
        language={language}
        onLanguageChange={handleLanguageChange}
        onEndInterview={handleEndInterview}
        isEndingInterview={isEndingInterview}
      />
      <Progress value={progress} className="h-1" />
      <ChatMessages 
        messages={messages}
        isLoading={isLoading}
      />
      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={setInput}
        onSendMessage={sendMessage}
      />
    </div>
  );
};
