
import { useState } from "react";
import { ChatContainer } from "./ChatContainer";
import { useNavigate } from "react-router-dom";
import { useCareRecipientOnboarding } from "@/hooks/useCareRecipientOnboarding";

export const CareRecipientChat = () => {
  const navigate = useNavigate();
  const {
    messages,
    input,
    setInput,
    isLoading,
    progress,
    sendMessage,
    language,
    setLanguage,
    isEndingInterview,
    handleEndInterview,
  } = useCareRecipientOnboarding();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <ChatContainer 
      messages={messages}
      input={input}
      isLoading={isLoading}
      language={language}
      progress={progress}
      isEndingInterview={isEndingInterview}
      onBack={handleBack}
      onInputChange={setInput}
      onSendMessage={() => input.trim() && sendMessage(input)}
      onLanguageChange={setLanguage}
      onEndInterview={handleEndInterview}
    />
  );
};
