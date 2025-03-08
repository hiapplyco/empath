
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

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
  const [isEditing, setIsEditing] = useState(false);
  const [editedItems, setEditedItems] = useState<ProfileItem[]>(section.items);
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const updatedProfile = {
        processed_profile: {
          sections: [
            {
              title: section.title,
              variant: section.variant,
              items: editedItems
            }
          ]
        }
      };

      const { error } = await supabase
        .from('caregiver_profiles')
        .update(updatedProfile)
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your changes have been saved successfully."
      });
      setIsEditing(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error saving changes",
        description: error.message
      });
    }
  };

  const renderEditableItems = () => {
    switch (section.variant) {
      case "badges":
        return (
          <div className="space-y-2">
            {editedItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={item.value}
                  onChange={(e) => {
                    const newItems = [...editedItems];
                    newItems[index] = { ...item, value: e.target.value };
                    setEditedItems(newItems);
                  }}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        );

      case "grid":
      case "list":
        return (
          <div className="space-y-4">
            {editedItems.map((item, index) => (
              <div key={index} className="flex flex-col gap-1">
                <span className="text-sm text-gray-500">{item.label}</span>
                <Input
                  value={item.value}
                  onChange={(e) => {
                    const newItems = [...editedItems];
                    newItems[index] = { ...item, value: e.target.value };
                    setEditedItems(newItems);
                  }}
                />
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            {editedItems.map((item, index) => (
              <div key={index} className="space-y-1">
                <span className="text-sm text-gray-500">{item.label}</span>
                <Input
                  value={item.value}
                  onChange={(e) => {
                    const newItems = [...editedItems];
                    newItems[index] = { ...item, value: e.target.value };
                    setEditedItems(newItems);
                  }}
                />
              </div>
            ))}
          </div>
        );
    }
  };

  const renderViewItems = () => {
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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          {section.title}
        </CardTitle>
        {isEditing ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setEditedItems(section.items);
                setIsEditing(false);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={handleSave}>
              <Save className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
            <Edit2 className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? renderEditableItems() : renderViewItems()}
      </CardContent>
    </Card>
  );
};
