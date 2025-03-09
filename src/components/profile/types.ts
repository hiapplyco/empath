
export interface ProfileItem {
  label: string;
  value: string | number;
}

export interface ProfileSection {
  title: string;
  variant: "default" | "grid" | "list" | "badges";
  items: ProfileItem[];
}

export interface ProfileSectionProps {
  section: ProfileSection;
}

export interface EditableProfileProps {
  items: ProfileItem[];
  onItemsChange: (items: ProfileItem[]) => void;
}
