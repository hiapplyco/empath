
import React from 'react';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

interface ConversationInterfaceProps {
  messages: Message[];
}

export const ConversationInterface: React.FC<ConversationInterfaceProps> = ({ messages }) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] p-4 rounded-lg ${
              message.role === 'user'
                ? 'bg-purple-100 text-purple-900'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};
