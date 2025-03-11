
import { ReviewProfile } from "../ReviewProfile";
import { useState } from "react";
import { useCareRecipientChat } from "@/hooks/useCareRecipientChat";
import { ChatContainer } from "./ChatContainer";
import { useNavigate } from "react-router-dom";

export const CareRecipientChat = () => {
  const [showReview, setShowReview] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const navigate = useNavigate();
  const {
    messages,
    input,
    setInput,
    isTyping: isLoading,
    progress,
    sendMessage,
    language,
    setLanguage,
    isEndingInterview,
    handleEndInterview,
  } = useCareRecipientChat();

  const handleChatComplete = (data: any) => {
    setProfileData(data);
    setShowReview(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (showReview && profileData) {
    return (
      <ReviewProfile 
        formData={profileData}
        onBack={() => setShowReview(false)}
      />
    );
  }

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
      onSendMessage={sendMessage}
      onLanguageChange={setLanguage}
      onEndInterview={handleEndInterview}
      onComplete={handleChatComplete}
    />
  );
};
