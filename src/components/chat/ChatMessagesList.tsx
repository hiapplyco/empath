
import { ScrollArea } from "@/components/ui/scroll-area";
import { CareProfileCard } from "@/components/care-seeker/onboarding/chat/CareProfileCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useRef } from "react";

interface Message {
  role: 'assistant' | 'user';
  content?: string;
  text?: string;
}

interface ChatMessagesListProps {
  messages: Message[];
}

export const ChatMessagesList = ({ messages }: ChatMessagesListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isJsonProfile = (content: string) => {
    try {
      // Check if the message contains a code block
      const codeBlockMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
      if (!codeBlockMatch) return false;
      
      // Parse the JSON from within the code block
      const jsonContent = JSON.parse(codeBlockMatch[1].trim());
      return (
        jsonContent.recipient_information &&
        jsonContent.care_requirements &&
        jsonContent.schedule_preferences
      );
    } catch {
      return false;
    }
  };

  const parseJsonProfile = (content: string) => {
    try {
      const codeBlockMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
      if (!codeBlockMatch) return null;
      
      return JSON.parse(codeBlockMatch[1].trim());
    } catch (e) {
      console.error('Error parsing JSON profile:', e);
      return null;
    }
  };

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message, index) => {
          const content = message.text || message.content || '';
          
          if (message.role === 'assistant' && isJsonProfile(content)) {
            const profileData = parseJsonProfile(content);
            if (profileData) {
              const introText = content.split('```')[0].trim();
              return (
                <div key={index} className="flex flex-col gap-4">
                  {introText && (
                    <div className="flex items-start gap-2">
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-purple-100 text-purple-800">EM</AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg px-4 py-2 max-w-[80%] bg-white border border-gray-200 text-gray-800">
                        {introText}
                      </div>
                    </div>
                  )}
                  <CareProfileCard profile={profileData} />
                </div>
              );
            }
          }

          return (
            <div
              key={index}
              className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'} items-start gap-2`}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-purple-100 text-purple-800">EM</AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === 'assistant'
                    ? 'bg-white border border-gray-200 text-gray-800'
                    : 'bg-purple-600 text-white'
                }`}
              >
                {content}
              </div>

              {message.role === 'user' && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-purple-600 text-white">US</AvatarFallback>
                </Avatar>
              )}
            </div>
          );
        })}
        {/* This div is used as an anchor to scroll to */}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
