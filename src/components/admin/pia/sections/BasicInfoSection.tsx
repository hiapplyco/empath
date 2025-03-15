
import { Badge } from "@/components/ui/badge";
import { DollarSign, Clock, Phone, Mail } from "lucide-react";

interface BasicInfoSectionProps {
  pia: {
    hourly_rate?: string;
    years_experience?: string;
    phone_number?: string;
    email?: string;
  };
}

export const BasicInfoSection = ({ pia }: BasicInfoSectionProps) => {
  const formattedRate = pia.hourly_rate 
    ? `$${parseFloat(pia.hourly_rate).toFixed(2)}/hr`
    : 'Rate not specified';

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-700">
          <DollarSign className="w-5 h-5 text-primary/70" />
          <span className="font-medium">{formattedRate}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Clock className="w-5 h-5 text-primary/70" />
          <span className="font-medium">
            {pia.years_experience 
              ? `${pia.years_experience} years experience`
              : 'Experience not specified'}
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {pia.phone_number && (
          <div className="flex items-center gap-2 text-gray-700">
            <Phone className="w-5 h-5 text-primary/70" />
            <span className="font-medium">{pia.phone_number}</span>
          </div>
        )}
        {pia.email && (
          <div className="flex items-center gap-2 text-gray-700">
            <Mail className="w-5 h-5 text-primary/70" />
            <span className="font-medium">{pia.email}</span>
          </div>
        )}
      </div>
    </div>
  );
};
