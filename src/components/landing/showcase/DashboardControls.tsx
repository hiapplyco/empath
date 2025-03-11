
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DashboardControlsProps {
  dashboards: Array<{ name: string; icon: React.ReactNode; }>;
  activeIndex: number;
  isPaused: boolean;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onPauseToggle: () => void;
}

export const DashboardControls = ({
  dashboards,
  activeIndex,
  isPaused,
  onSelect,
  onPrevious,
  onNext,
  onPauseToggle
}: DashboardControlsProps) => {
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b">
      <div className="flex items-center space-x-1">
        {dashboards.map((dashboard, index) => (
          <Button
            key={index}
            variant={activeIndex === index ? "default" : "ghost"}
            size="sm"
            className={`flex items-center h-8 px-3 ${activeIndex === index ? "bg-purple-600" : "text-gray-600"}`}
            onClick={() => onSelect(index)}
          >
            {dashboard.icon}
            <span className="ml-2 text-xs">{dashboard.name}</span>
          </Button>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <Button size="icon" variant="outline" className="h-7 w-7" onClick={onPrevious}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline" className="h-7 w-7" onClick={onNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="h-7 text-xs"
          onClick={onPauseToggle}
        >
          {isPaused ? "Resume" : "Pause"}
        </Button>
      </div>
    </div>
  );
};
