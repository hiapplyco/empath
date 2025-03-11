
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProfileSummary } from "./ProfileSummary";
import { useEffect, useRef } from "react";

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

interface ChatMessageListProps {
  messages: Message[];
}

export const ChatMessageList = ({ messages }: ChatMessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="space-y-4">
      {messages.map((message, index) => {
        // Check if the message contains JSON data by looking for recipient_information
        const isJsonProfile = message.role === 'assistant' && message.content.includes('"recipient_information"');
        
        return (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {isJsonProfile ? (
              <div className="w-full">
                <ProfileSummary data={message.content} />
              </div>
            ) : (
              <div className={`rounded-xl px-4 py-2 max-w-2xl ${
                message.role === 'user' 
                  ? 'bg-purple-100 text-gray-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {message.content}
              </div>
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};
