
import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Check, Send } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/lib/supabase";

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
  
  useEffect(() => {
    // Initial greeting
    setMessages([{
      role: 'assistant',
      content: "Hi! I'm here to learn about your caregiving experience. I'm an AI assistant powered by Gemini. Let's start with your name - what should I call you?"
    }]);
  }, []);

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
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      // Call the Gemini edge function
      const { data, error } = await supabase.functions.invoke('gemini', {
        body: { 
          type: 'text',
          prompt: userMessage,
          history: messages.map(m => ({ role: m.role, text: m.content }))
        }
      });

      if (error) throw error;

      // Add AI response
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data?.response || "I apologize, but I couldn't process that properly. Could you try rephrasing?"
      }]);

    } catch (error: any) {
      console.error('Error calling Gemini:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I apologize, but I encountered an error. Could you please try again?"
      }]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBack = () => {
    navigate('/onboarding');
  };

  const handleDone = () => {
    navigate('/dashboard');
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
        <Button
          onClick={handleDone}
          className="flex items-center gap-2"
        >
          Done
          <Check className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
