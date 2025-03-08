
import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export const QuestionnaireChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${
                message.role === 'assistant' ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === 'assistant'
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isAnalyzing}
          className="flex-1"
        />
        <Button type="submit" disabled={isAnalyzing}>
          <Send className="h-4 w-4" />
        </Button>
      </form>

      <div className="p-4 border-t flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
    </Card>
  );
};
