
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { DocumentUploadSection } from "./documents/DocumentUploadSection";
import { OptionalDocumentsSection } from "./documents/OptionalDocumentsSection";
import { SubmittedDocumentsSection } from "./documents/SubmittedDocumentsSection";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { DocumentHeader } from "./documents/DocumentHeader";

export const DocumentCapture = () => {
  const [activeTab, setActiveTab] = useState('required');

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <OnboardingNavigation 
        backPath="/onboarding" 
        skipPath="/onboarding/profile" 
        showSkip={true}
      />
      
      <Card className="p-6 shadow-lg border-gray-100">
        <Tabs value={activeTab} className="w-full">
          <DocumentHeader 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
          
          <div className="mt-6">
            <TabsContent value="required">
              <DocumentUploadSection />
            </TabsContent>
            <TabsContent value="optional">
              <OptionalDocumentsSection />
            </TabsContent>
            <TabsContent value="submitted">
              <SubmittedDocumentsSection />
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
};
