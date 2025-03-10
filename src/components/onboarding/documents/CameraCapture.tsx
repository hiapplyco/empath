
import { useState, useRef } from 'react';
import { Camera, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface CameraCaptureProps {
  documentType: 'government_id' | 'certification' | 'background_check' | 'medical';
  onCapture: (filePath: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const CameraCapture = ({ documentType, onCapture, isOpen, onClose }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCaptureMode, setIsCaptureMode] = useState(true);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        variant: "destructive",
        title: "Camera Error",
        description: "Unable to access camera. Please ensure you've granted permission.",
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleClose = () => {
    stopCamera();
    setCapturedImage(null);
    setIsCaptureMode(true);
    onClose();
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0);
      const image = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(image);
      setIsCaptureMode(false);
      stopCamera();
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setIsCaptureMode(true);
    startCamera();
  };

  const handleSave = async () => {
    if (!capturedImage) return;

    setIsUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Convert base64 to blob
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      
      const fileName = `${documentType}_${Date.now()}.jpg`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('document_verifications')
        .upload(filePath, blob, {
          contentType: 'image/jpeg',
          cacheControl: '3600'
        });

      if (uploadError) throw uploadError;

      // Create verification record
      const { error: dbError } = await supabase
        .from('document_verifications')
        .insert({
          user_id: user.id,
          document_type: documentType,
          document_path: filePath
        });

      if (dbError) throw dbError;

      toast({
        title: "Document Uploaded",
        description: "Your document has been uploaded and is being processed.",
      });

      onCapture(filePath);
      handleClose();
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        variant: "destructive",
        title: "Upload Error",
        description: error.message
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Start camera when dialog opens
  if (isOpen && !stream && isCaptureMode) {
    startCamera();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Capture Document</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          {isCaptureMode ? (
            <>
              <div className="relative w-full aspect-[4/3] bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-2 border-white/50 pointer-events-none">
                  <div className="absolute inset-4 border-2 border-dashed border-white/50" />
                </div>
              </div>
              <Button onClick={handleCapture} className="w-full">
                <Camera className="mr-2 h-4 w-4" />
                Capture
              </Button>
            </>
          ) : (
            <>
              <div className="relative w-full aspect-[4/3] bg-black rounded-lg overflow-hidden">
                <img
                  src={capturedImage || ''}
                  alt="Captured document"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex w-full space-x-2">
                <Button variant="outline" onClick={handleRetake} disabled={isUploading}>
                  Retake
                </Button>
                <Button onClick={handleSave} disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Save"}
                </Button>
              </div>
            </>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
};
