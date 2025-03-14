
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
  onComplete?: (data: any) => void;
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
    <div className="w-[90%] mx-auto min-h-[60px] max-h-[80vh] flex flex-col bg-white rounded-lg shadow-lg border border-gray-200">
      <ChatHeader 
        onBack={onBack}
        language={language}
        onLanguageChange={onLanguageChange}
        onEndInterview={onEndInterview}
        isEndingInterview={isEndingInterview}
      />
      <Progress value={progress} className="h-1" />
      <div className="flex-1 overflow-hidden flex flex-col">
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
    </div>
  );
};
