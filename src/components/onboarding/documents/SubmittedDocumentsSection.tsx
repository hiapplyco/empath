
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SubmittedDocumentsSection = () => {
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const { data, error } = await supabase
        .from('caregiver_documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setDocuments(data);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
      {documents.map((doc) => (
        <Card key={doc.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{doc.title}</CardTitle>
                <CardDescription>
                  Submitted on {new Date(doc.created_at).toLocaleDateString()}
                </CardDescription>
              </div>
              <Badge className={
                doc.status === 'verified' ? 'bg-green-500' :
                doc.status === 'rejected' ? 'bg-red-500' :
                'bg-amber-500'
              }>
                {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-40 border border-gray-200 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <FileText className="w-16 h-16 text-gray-400" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-purple-700 text-white p-2 text-sm">
                {doc.file_name}
              </div>
              {doc.status === 'verified' && (
                <div className="absolute top-2 right-2">
                  <div className="bg-green-500 text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="pt-0 text-xs">
            <div className="w-full flex justify-between items-center">
              <span className="flex items-center text-gray-500">
                {doc.expires_at && (
                  <>Expires: {new Date(doc.expires_at).toLocaleDateString()}</>
                )}
              </span>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Replace
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
