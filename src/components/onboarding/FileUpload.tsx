
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onComplete: () => void;
}

export const FileUpload = ({ onComplete }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // TODO: Implement file upload to Supabase storage
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Resume uploaded",
        description: "We'll analyze your experience and pre-fill your profile.",
      });
      onComplete();
    }, 2000);
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
