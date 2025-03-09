
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import { useEffect, useRef } from "react";

interface Message {
  role: 'assistant' | 'user';
  content: string;
  isProfileData?: boolean;
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
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message, i) => (
          <MessageBubble
            key={i}
            role={message.role}
            content={message.content}
            isProfileData={message.isProfileData}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
