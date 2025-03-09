
import { Card } from "@/components/ui/card";
import { DocumentUploadSection } from "./documents/DocumentUploadSection";
import { OptionalDocumentsSection } from "./documents/OptionalDocumentsSection";
import { SubmittedDocumentsSection } from "./documents/SubmittedDocumentsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const DocumentCapture = () => {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Document Verification</h1>
        <Button 
          variant="ghost" 
          onClick={handleSkip}
          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
        >
          Skip for now
        </Button>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="required" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
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
