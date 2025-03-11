
import { useCareRecipientOnboarding } from '@/hooks/useCareRecipientOnboarding';
import { Progress } from "@/components/ui/progress";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessages } from "./chat/ChatMessages";
import { ChatInput } from "./chat/ChatInput";

interface CareRecipientChatProps {
  onBack: () => void;
}

export const CareRecipientChat = ({ onBack }: CareRecipientChatProps) => {
  const {
    messages,
    input,
    setInput,
    isLoading,
    language,
    progress,
    isEndingInterview,
    sendMessage,
    handleLanguageChange,
    handleEndInterview
  } = useCareRecipientOnboarding();

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <ChatHeader 
        onBack={onBack}
        language={language}
        onLanguageChange={handleLanguageChange}
        onEndInterview={handleEndInterview}
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
        onInputChange={setInput}
        onSendMessage={sendMessage}
      />
    </div>
  );
};
