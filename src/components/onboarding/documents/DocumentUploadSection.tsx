
import { DocumentCard } from "./DocumentCard";

export const DocumentUploadSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
      <DocumentCard 
        title="Government ID"
        description="Driver's license, state ID, or passport"
        type="government_id"
        required={true}
      />
      
      <DocumentCard 
        title="Professional License"
        description="CNA, HHA, LVN, or RN license"
        type="certification"
        required={true}
      />
      
      <DocumentCard 
        title="Background Check Authorization"
        description="Consent form for background screening"
        type="background_check"
        required={true}
      />
      
      <DocumentCard 
        title="CPR Certification"
        description="Current CPR/First Aid certification"
        type="certification"
        required={true}
      />
    </div>
  );
};
