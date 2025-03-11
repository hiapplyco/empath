
import { useCareRecipientOnboarding } from '@/hooks/useCareRecipientOnboarding';
import { ChatContainer } from "./chat/ChatContainer";

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
    <ChatContainer 
      onBack={onBack}
      messages={messages}
      input={input}
      isLoading={isLoading}
      language={language}
      progress={progress}
      isEndingInterview={isEndingInterview}
      onInputChange={setInput}
      onSendMessage={sendMessage}
      onLanguageChange={handleLanguageChange}
      onEndInterview={handleEndInterview}
    />
  );
};
