import { Card } from "@/components/ui/card";
import { DocumentUploadSection } from "./documents/DocumentUploadSection";
import { OptionalDocumentsSection } from "./documents/OptionalDocumentsSection";
import { SubmittedDocumentsSection } from "./documents/SubmittedDocumentsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OnboardingNavigation } from "./OnboardingNavigation";

export const DocumentCapture = () => {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <OnboardingNavigation 
        backPath="/onboarding" 
        skipPath="/onboarding/profile" 
        showSkip={true}
      />
      
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Document Verification</h1>

      <Card className="p-6 shadow-lg border-gray-100">
        <Tabs defaultValue="required" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="required">Required Documents</TabsTrigger>
            <TabsTrigger value="optional">Optional Documents</TabsTrigger>
            <TabsTrigger value="submitted">Submitted Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="required">
            <DocumentUploadSection />
          </TabsContent>
          <TabsContent value="optional">
            <OptionalDocumentsSection />
          </TabsContent>
          <TabsContent value="submitted">
            <SubmittedDocumentsSection />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
