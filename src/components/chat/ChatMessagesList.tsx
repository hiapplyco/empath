
import { ScrollArea } from "@/components/ui/scroll-area";
import { CareProfileCard } from "@/components/care-seeker/onboarding/chat/CareProfileCard";

interface Message {
  role: 'assistant' | 'user';
  content?: string;
  text?: string;
}

interface ChatMessagesListProps {
  messages: Message[];
}

export const ChatMessagesList = ({ messages }: ChatMessagesListProps) => {
  const isJsonProfile = (content: string) => {
    try {
      const data = JSON.parse(content);
      return data.recipient_information && data.care_requirements && data.schedule_preferences;
    } catch {
      return false;
    }
  };

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message, index) => {
          const content = message.text || message.content || '';
          
          if (message.role === 'assistant' && isJsonProfile(content)) {
            try {
              const profileData = JSON.parse(content);
              return <CareProfileCard key={index} profile={profileData} />;
            } catch {
              // Fallback to regular message if JSON parsing fails
              return (
                <div key={index} className="flex justify-start">
                  <div className="bg-secondary text-secondary-foreground rounded-lg px-4 py-2 max-w-[80%]">
                    {content}
                  </div>
                </div>
              );
            }
          }

          return (
            <div
              key={index}
              className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === 'assistant'
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                {content}
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};
