import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileItem {
  label: string;
  value: string | number;
}

interface ProfileSection {
  title: string;
  variant: "default" | "grid" | "list" | "badges";
  items: ProfileItem[];
}

interface DynamicProfileSectionProps {
  section: ProfileSection;
}

export const DynamicProfileSection = ({ section }: DynamicProfileSectionProps) => {
  const renderItems = () => {
    switch (section.variant) {
      case "badges":
        return (
          <div className="flex flex-wrap gap-2">
            {section.items.map((item, index) => (
              <Badge key={index} variant="secondary">
                {item.value}
              </Badge>
            ))}
          </div>
        );

      case "grid":
        return (
          <div className="grid grid-cols-2 gap-4">
            {section.items.map((item, index) => (
              <div key={index}>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        );

      case "list":
        return (
          <div className="space-y-2">
            {section.items.map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="text-sm text-gray-500 w-1/3">{item.label}:</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            {section.items.map((item, index) => (
              <div key={index}>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {section.title}
        </CardTitle>
      </CardHeader>
      <CardContent>{renderItems()}</CardContent>
    </Card>
  );
};
