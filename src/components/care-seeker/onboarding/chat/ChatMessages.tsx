
import { useRef, useEffect } from 'react';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={chatContainerRef} 
      className="flex-1 overflow-y-auto p-4 space-y-4"
      style={{ maxHeight: messages.length > 0 ? '400px' : '0px', transition: 'max-height 0.3s ease-in-out' }}
    >
      {messages.map((message, index) => (
        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`rounded-xl px-4 py-2 max-w-2xl ${
            message.role === 'user' ? 'bg-purple-100 text-gray-700' : 'bg-gray-100 text-gray-700'
          }`}>
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
  );
};
