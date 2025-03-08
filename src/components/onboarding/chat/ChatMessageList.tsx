
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import { useEffect, useRef } from "react";

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

interface ChatMessageListProps {
  messages: Message[];
}

export const ChatMessageList = ({ messages }: ChatMessageListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-4" ref={scrollRef}>
      <div className="space-y-4">
        {messages.map((message, i) => (
          <MessageBubble
            key={i}
            role={message.role}
            content={message.content}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
