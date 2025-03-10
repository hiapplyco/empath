
import React, { useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Send, ChevronLeft, Languages } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startConversation();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const startConversation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: '', history: [], language, action: 'start' }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
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

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: input,
          history: messages,
          language
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      {/* Header */}
      <div className="border-b p-4 flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://empath.ai/emma.png" alt="Emma" />
          <AvatarFallback>EA</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <h2 className="text-lg font-semibold">Emma (AI Assistant)</h2>
          <p className="text-sm text-gray-500">Online</p>
        </div>
        <div>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Progress value={progress} className="h-1" />

      {/* Chat Messages */}
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-xl px-4 py-2 max-w-2xl ${message.role === 'user' ? 'bg-purple-100 text-gray-700' : 'bg-gray-100 text-gray-700'}`}>
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-xl px-4 py-2 max-w-sm bg-gray-100 text-gray-700">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="resize-none border-none focus-visible:ring-0"
          />
          <Button onClick={sendMessage} disabled={isLoading}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
