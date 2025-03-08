
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

interface FileUploadProps {
  onComplete: () => void;
}

export const FileUpload = ({ onComplete }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // First read the file content
      const text = await file.text();
      console.log('Extracted text from resume, processing...');

      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user found');

      // Process the resume using our edge function
      const { data: processedData, error: processError } = await supabase.functions
        .invoke('process-resume', {
          body: { resumeText: text }
        });

      if (processError) throw processError;

      // Log the processed data to help with debugging
      console.log('Processed resume data:', processedData);

      // Update the caregiver profile with both raw and processed data
      const { error: updateError } = await supabase
        .from('caregiver_profiles')
        .upsert({
          id: user.id,
          input_method: 'resume',
          gemini_response: processedData.raw_profile,
          processed_profile: processedData.processed_profile
        });

      if (updateError) throw updateError;

      // Verify the data was saved
      const { data: verifyData, error: verifyError } = await supabase
        .from('caregiver_profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (verifyError) throw verifyError;
      
      console.log('Verified saved profile:', verifyData);

      toast({
        title: "Resume processed successfully",
        description: "Your profile has been created from your resume.",
      });
      
      navigate('/dashboard/profile');
    } catch (error: any) {
      console.error('Error processing resume:', error);
      toast({
        variant: "destructive",
        title: "Error processing resume",
        description: error.message || "Please try again",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleUpload}
          className="hidden"
          id="resume-upload"
        />
        <label
          htmlFor="resume-upload"
          className="cursor-pointer flex flex-col items-center space-y-2"
        >
          <Upload className="h-8 w-8 text-gray-400" />
          <span className="text-sm text-gray-600">
            Click to upload your resume (PDF, DOC, DOCX)
          </span>
        </label>
      </div>
      {isUploading && <p className="text-center text-sm">Uploading...</p>}
    </div>
  );
};
