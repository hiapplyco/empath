
import React from 'react';

export const ConversationInterface: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="flex flex-col gap-4">
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-purple-800">
            Hi! I'm Emma, your onboarding assistant. I'll help you create your caregiver profile. 
            You can speak to me or type your responses. What would you like to tell me about your caregiving experience?
          </p>
        </div>
      </div>
    </div>
  );
};
