
import { Card } from "@/components/ui/card";
import { ChatMessageList } from "./chat/ChatMessageList";
import { ChatInput } from "./chat/ChatInput";
import { useChat } from "@/hooks/useChat";
import { Check } from "lucide-react";
import { LanguageSelector } from "@/components/care-seeker/onboarding/chat/LanguageSelector";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const QuestionnaireChat = () => {
  const {
    messages,
    input,
    isAnalyzing,
    language,
    handleInputChange,
    handleSubmit,
    handleBack,
    handleFinish,
    handleLanguageChange
  } = useChat();
  const [showEndConfirmation, setShowEndConfirmation] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between bg-white">
        <Button variant="ghost" onClick={handleBack} className="gap-2">Back</Button>
        <div className="flex items-center gap-4">
          <LanguageSelector 
            language={language}
            onLanguageChange={handleLanguageChange}
          />
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => setShowEndConfirmation(true)}
            disabled={isAnalyzing}
          >
            <Check className="h-4 w-4 mr-2" />
            End Interview
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <Progress value={messages.length * 10} className="h-1" />

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        <ChatMessageList messages={messages} />
      </div>

      {/* Input */}
      <div className="border-t p-4 bg-white">
        <ChatInput
          input={input}
          isLoading={isAnalyzing}
          onInputChange={handleInputChange}
          onSendMessage={handleSubmit}
        />
      </div>

      <AlertDialog open={showEndConfirmation} onOpenChange={setShowEndConfirmation}>
        <AlertDialogContent className="animate-scale-in">
          <AlertDialogHeader>
            <AlertDialogTitle>End Interview?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to end the interview? Emma will generate your profile based on the information you've provided.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setShowEndConfirmation(false);
              handleFinish();
            }}>
              End Interview
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
