
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, Camera, Clock, FileText, RefreshCw, Trash2 } from "lucide-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentCardProps {
  title: string;
  description: string;
  required?: boolean;
  type: string;
  onUploadComplete?: () => void;
}

export const DocumentCard = ({
  title,
  description,
  required = false,
  type,
  onUploadComplete
}: DocumentCardProps) => {
  const [uploadState, setUploadState] = useState<'pending' | 'uploading' | 'preview'>('pending');
  const [showOptions, setShowOptions] = useState(false);
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    try {
      setUploadState('uploading');
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const filePath = `${user.id}/${type}/${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('caregiver-documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('caregiver_documents')
        .insert({
          document_type: type,
          title,
          file_path: filePath,
          file_name: file.name,
          required
        });

      if (dbError) throw dbError;

      setUploadState('preview');
      toast({
        title: "Document uploaded",
        description: "Your document has been uploaded and is awaiting verification."
      });
      
      onUploadComplete?.();
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message
      });
      setUploadState('pending');
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please select a file smaller than 5MB"
      });
      return;
    }

    await handleFileUpload(file);
  };

  return (
    <Card className={`border ${uploadState === 'pending' && required ? 'border-red-200' : 'border-gray-200'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {required && <Badge className="bg-red-500">Required</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        {uploadState === 'uploading' ? (
          <div className="h-40 border-2 border-dashed border-purple-300 rounded-lg flex flex-col items-center justify-center bg-purple-50 p-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div className="bg-purple-600 h-2.5 rounded-full w-2/3"></div>
            </div>
            <p className="text-sm text-purple-700">Uploading...</p>
          </div>
        ) : uploadState === 'preview' ? (
          <div className="h-40 border border-gray-200 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <FileText className="w-16 h-16 text-gray-400" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-purple-700 text-white p-2 text-sm flex justify-between">
              <span>Document uploaded</span>
            </div>
          </div>
        ) : (
          <>
            <div 
              className="h-40 border-2 border-dashed border-purple-300 rounded-lg flex flex-col items-center justify-center bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer"
              onClick={() => setShowOptions(true)}
            >
              <UploadCloud className="h-10 w-10 text-purple-500 mb-2" />
              <p className="text-sm text-center text-purple-700 font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 text-center mt-1">
                PDF, PNG, or JPG (max. 5MB)
              </p>
            </div>
            
            {showOptions && (
              <div className="mt-3 flex justify-center space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-xs"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.pdf,.png,.jpg,.jpeg';
                    input.onchange = (e) => handleFileSelect(e as any);
                    input.click();
                  }}
                >
                  <UploadCloud className="w-3 h-3 mr-1" /> Browse Files
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  <Camera className="w-3 h-3 mr-1" /> Use Camera
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
      {uploadState === 'preview' && (
        <CardFooter className="pt-0 text-xs text-gray-500">
          <div className="w-full flex justify-between items-center">
            <span className="flex items-center text-amber-600">
              <Clock className="w-3 h-3 mr-1" /> Awaiting verification
            </span>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
