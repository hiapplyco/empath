
import { useState } from 'react';
import { Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CameraCapture } from './CameraCapture';

interface DocumentUploadProps {
  documentType: 'government_id' | 'certification' | 'background_check' | 'medical';
  onUploadComplete: (filePath: string) => void;
}

export const DocumentUpload = ({ documentType, onUploadComplete }: DocumentUploadProps) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          onClick={() => setIsCameraOpen(true)}
          className="flex-1"
        >
          <Camera className="mr-2 h-4 w-4" />
          Use Camera
        </Button>
        <Button variant="outline" className="flex-1">
          <Upload className="mr-2 h-4 w-4" />
          Upload File
        </Button>
      </div>

      <CameraCapture
        documentType={documentType}
        onCapture={onUploadComplete}
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
      />
    </>
  );
};
