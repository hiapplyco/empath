
import { Progress } from "@/components/ui/progress";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

interface ChatContainerProps {
  onBack: () => void;
  messages: { role: 'assistant' | 'user'; content: string }[];
  input: string;
  isLoading: boolean;
  language: string;
  progress: number;
  isEndingInterview: boolean;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onLanguageChange: (value: string) => void;
  onEndInterview: () => void;
  onComplete?: (data: any) => void;  // Added this optional prop
}

export const ChatContainer = ({
  onBack,
  messages,
  input,
  isLoading,
  language,
  progress,
  isEndingInterview,
  onInputChange,
  onSendMessage,
  onLanguageChange,
  onEndInterview
}: ChatContainerProps) => {
  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <ChatHeader 
        onBack={onBack}
        language={language}
        onLanguageChange={onLanguageChange}
        onEndInterview={onEndInterview}
        isEndingInterview={isEndingInterview}
      />
      <Progress value={progress} className="h-1" />
      <ChatMessages 
        messages={messages}
        isLoading={isLoading}
      />
      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={onInputChange}
        onSendMessage={onSendMessage}
      />
    </div>
  );
};
