
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DashboardControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  isPaused: boolean;
  onPauseToggle: () => void;
}

export const DashboardControls = ({
  onPrevious,
  onNext,
  isPaused,
  onPauseToggle
}: DashboardControlsProps) => {
  return (
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
  );
};
