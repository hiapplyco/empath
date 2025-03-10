import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Paperclip, Camera, Send, ChevronLeft, Languages } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export const CareRecipientChat = ({ onBack }: { onBack: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Start the conversation with a greeting when the component mounts
    startConversation();
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat container when new messages are added
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
    if (!newMessage.trim()) return;

    const userMessage: Message = { role: 'user', content: newMessage };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage, history: messages, language }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage: Message = { role: 'assistant', content: data.text };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: "Sorry, I couldn't send your message. Please try again." }
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
    <div className="flex flex-col h-screen">
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
              {/* Add more languages here */}
            </SelectContent>
          </Select>
        </div>
      </div>

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
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Camera className="h-5 w-5" />
          </Button>
          <Textarea
            rows={1}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
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
