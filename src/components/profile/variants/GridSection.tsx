
import { Input } from "@/components/ui/input";
import { EditableProfileProps } from "../types";

export const GridView = ({ items }: { items: { label: string; value: string | number }[] }) => (
  <div className="grid grid-cols-2 gap-4">
    {items.map((item, index) => (
      <div key={index}>
        <p className="text-sm text-gray-500">{item.label}</p>
        <p className="font-medium">{item.value}</p>
      </div>
    ))}
  </div>
);

export const GridEdit = ({ items, onItemsChange }: EditableProfileProps) => (
  <div className="grid grid-cols-2 gap-4">
    {items.map((item, index) => (
      <div key={index} className="space-y-1">
        <span className="text-sm text-gray-500">{item.label}</span>
        <Input
          value={item.value}
          onChange={(e) => {
            const newItems = [...items];
            newItems[index] = { ...item, value: e.target.value };
            onItemsChange(newItems);
          }}
        />
      </div>
    ))}
  </div>
);
