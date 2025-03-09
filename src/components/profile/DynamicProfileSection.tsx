
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2, Save, X } from "lucide-react";
import { BadgesView, BadgesEdit } from "./variants/BadgesSection";
import { GridView, GridEdit } from "./variants/GridSection";
import { ProfileSectionProps, ProfileItem } from "./types";
import { handleProfileSave } from "./profile-utils";

export const DynamicProfileSection = ({ section }: ProfileSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItems, setEditedItems] = useState<ProfileItem[]>(section.items);

  const handleSave = async () => {
    const success = await handleProfileSave(section.title, editedItems);
    if (success) setIsEditing(false);
  };

  const renderSection = (isEditing: boolean) => {
    switch (section.variant) {
      case "badges":
        return isEditing ? (
          <BadgesEdit items={editedItems} onItemsChange={setEditedItems} />
        ) : (
          <BadgesView items={section.items} />
        );
      case "grid":
      case "list":
        return isEditing ? (
          <GridEdit items={editedItems} onItemsChange={setEditedItems} />
        ) : (
          <GridView items={section.items} />
        );
      default:
        return isEditing ? (
          <GridEdit items={editedItems} onItemsChange={setEditedItems} />
        ) : (
          <GridView items={section.items} />
        );
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">{section.title}</CardTitle>
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
      <CardContent>{renderSection(isEditing)}</CardContent>
    </Card>
  );
};
