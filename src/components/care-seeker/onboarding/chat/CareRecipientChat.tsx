
import { ReviewProfile } from "../ReviewProfile";
import { useState } from "react";
import { useCareRecipientChat } from "@/hooks/useCareRecipientChat";
import { ChatContainer } from "./ChatContainer";

export const CareRecipientChat = () => {
  const [showReview, setShowReview] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const chat = useCareRecipientChat();

  const handleChatComplete = (data: any) => {
    setProfileData(data);
    setShowReview(true);
  };

  if (showReview && profileData) {
    return (
      <ReviewProfile 
        formData={profileData}
        onBack={() => setShowReview(false)}
      />
    );
  }

  return <ChatContainer {...chat} onComplete={handleChatComplete} />;
};
