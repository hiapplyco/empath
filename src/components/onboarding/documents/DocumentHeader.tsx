
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const DocumentHeader = ({ activeTab, onTabChange }: { 
  activeTab: string;
  onTabChange: (value: string) => void;
}) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Document Verification</h1>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger 
          value="required" 
          onClick={() => onTabChange('required')}
        >
          Required Documents
        </TabsTrigger>
        <TabsTrigger 
          value="optional"
          onClick={() => onTabChange('optional')}
        >
          Optional Documents
        </TabsTrigger>
        <TabsTrigger 
          value="submitted"
          onClick={() => onTabChange('submitted')}
        >
          Submitted Documents
        </TabsTrigger>
      </TabsList>
    </div>
  );
};
