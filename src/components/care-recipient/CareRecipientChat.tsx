
import { useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Send, ChevronLeft } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCareRecipientChat } from "@/hooks/useCareRecipientChat";

export const CareRecipientChat = () => {
  const {
    messages,
    input,
    setInput,
    isTyping,
    progress,
    sendMessage
  } = useCareRecipientChat();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 bg-white border-b flex items-center">
        <Button variant="ghost" className="mr-2">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Avatar className="h-10 w-10 mr-2">
          <AvatarFallback className="bg-purple-100 text-purple-800">EM</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">Emma</h2>
          <p className="text-xs text-gray-500">Care Matching Assistant</p>
        </div>
        <div className="ml-auto text-sm text-gray-500">
          <span className="font-medium">{progress}%</span> Complete
        </div>
      </div>

      <Progress value={progress} className="h-1" />

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                  <AvatarFallback className="bg-purple-100 text-purple-800">EM</AvatarFallback>
                </Avatar>
              )}
              
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'assistant' 
                    ? 'bg-white border border-gray-200 text-gray-800' 
                    : 'bg-purple-600 text-white'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>

              {message.role === 'user' && (
                <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0">
                  <AvatarFallback className="bg-purple-600 text-white">US</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                <AvatarFallback className="bg-purple-100 text-purple-800">EM</AvatarFallback>
              </Avatar>
              
              <div className="max-w-[80%] rounded-lg p-3 bg-white border border-gray-200">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
        <div className="flex items-center">
          <div className="flex-1 relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="resize-none pr-12 py-3 min-h-[50px] max-h-[150px]"
            />
            <Button 
              type="submit"
              className="absolute right-2 bottom-2 h-8 w-8 p-0 bg-purple-600 hover:bg-purple-700"
              disabled={isTyping || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
