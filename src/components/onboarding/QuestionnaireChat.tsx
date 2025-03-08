
import { Card } from "@/components/ui/card";
import { ChatMessageList } from "./chat/ChatMessageList";
import { ChatInput } from "./chat/ChatInput";
import { useChat } from "@/hooks/useChat";
import { AlertCircle } from "lucide-react";
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
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const QuestionnaireChat = () => {
  const {
    messages,
    input,
    isAnalyzing,
    handleInputChange,
    handleSubmit,
    handleBack,
    handleFinish
  } = useChat();
  const [showEndConfirmation, setShowEndConfirmation] = useState(false);

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <ChatMessageList messages={messages} />
      <div className="p-4 border-t space-y-4">
        <ChatInput
          input={input}
          isAnalyzing={isAnalyzing}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={() => setShowEndConfirmation(true)}
          disabled={isAnalyzing}
        >
          <AlertCircle className="h-4 w-4 mr-2" />
          End Interview
        </Button>
      </div>

      <AlertDialog open={showEndConfirmation} onOpenChange={setShowEndConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End Interview?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to end the interview? Emma will generate your profile based on the information you've provided.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              handleFinish();
              setShowEndConfirmation(false);
            }}>
              End Interview
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};
