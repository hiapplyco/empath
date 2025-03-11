
import React, { useState, useEffect } from 'react';
import { DashboardControls } from './DashboardControls';
import { DashboardSlider } from './DashboardSlider';
import { DashboardDescription } from './DashboardDescription';
import { DashboardIndicators } from './DashboardIndicators';
import { Heart, User, Shield } from 'lucide-react';

const dashboards = [
  { name: "Caregiver Dashboard", icon: <Heart className="h-4 w-4" /> },
  { name: "Care Seeker Dashboard", icon: <User className="h-4 w-4" /> },
  { name: "Admin Dashboard", icon: <Shield className="h-4 w-4" /> }
];

const DashboardShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (!isPaused) {
      const timer = setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % dashboards.length);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [activeIndex, isPaused]);
  
  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + dashboards.length) % dashboards.length);
    setIsPaused(true);
  };
  
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % dashboards.length);
    setIsPaused(true);
  };
  
  const handleDashboardSelect = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <DashboardControls 
          dashboards={dashboards}
          activeIndex={activeIndex}
          isPaused={isPaused}
          onSelect={handleDashboardSelect}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onPauseToggle={() => setIsPaused(!isPaused)}
        />
        
        <DashboardSlider 
          activeIndex={activeIndex}
          dashboards={dashboards}
        />
        
        <DashboardDescription />
        
        <DashboardIndicators 
          count={dashboards.length}
          activeIndex={activeIndex}
          onClick={handleDashboardSelect}
        />
      </div>
    </div>
  );
};

export default DashboardShowcase;
