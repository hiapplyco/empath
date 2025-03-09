
import { DocumentCard } from "./DocumentCard";

export const OptionalDocumentsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
      <DocumentCard 
        title="COVID-19 Vaccination"
        description="Proof of vaccination status"
        type="medical"
      />
      
      <DocumentCard 
        title="Specialized Training"
        description="Dementia care, wound care certificates"
        type="training"
      />
      
      <DocumentCard 
        title="Professional References"
        description="Letters of recommendation"
        type="other"
      />
      
      <DocumentCard 
        title="Liability Insurance"
        description="Professional insurance documentation"
        type="insurance"
      />
    </div>
  );
};
