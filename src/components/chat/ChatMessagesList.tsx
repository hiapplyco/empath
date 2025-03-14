
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
    // First clean up the string - remove markdown code block indicators and extra backticks
    const cleanContent = content.replace(/```json\s*|\s*```/g, '').replace(/``/g, '');
    
    try {
      const data = JSON.parse(cleanContent);
      return data.recipient_information && data.care_requirements && data.schedule_preferences;
    } catch {
      return false;
    }
  };

  const parseJsonProfile = (content: string) => {
    const cleanContent = content.replace(/```json\s*|\s*```/g, '').replace(/``/g, '');
    try {
      return JSON.parse(cleanContent);
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
              return <CareProfileCard key={index} profile={profileData} />;
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
