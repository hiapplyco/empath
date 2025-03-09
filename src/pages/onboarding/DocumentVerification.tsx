
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentUploadSection } from "@/components/onboarding/documents/DocumentUploadSection";
import { OptionalDocumentsSection } from "@/components/onboarding/documents/OptionalDocumentsSection";
import { SubmittedDocumentsSection } from "@/components/onboarding/documents/SubmittedDocumentsSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const DocumentVerification = () => {
  const [activeTab, setActiveTab] = useState('required');

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-purple-900">Document Verification</h1>
        <p className="text-gray-600">Upload your credentials to complete your caregiver profile</p>
      </div>
      
      <Tabs defaultValue="required" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="required" className="relative">
            Required Documents
            <Badge variant="destructive" className="ml-2 absolute top-0 right-0 transform translate-x-1 -translate-y-1">3</Badge>
          </TabsTrigger>
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
      
      <div className="mt-8 flex justify-between">
        <Button variant="outline" className="text-purple-700 border-purple-300">
          Save and continue later
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700">
          {activeTab === 'required' ? 'Continue when complete' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};

export default DocumentVerification;
