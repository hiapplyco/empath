
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Heart, User, Shield } from 'lucide-react';
import { CaregiverDashboardContent } from './dashboards/CaregiverDashboardContent';
import { CareSeekerDashboardContent } from './dashboards/CareSeekerDashboardContent';
import { AdminDashboardContent } from './dashboards/AdminDashboardContent';
import { DashboardControls } from './DashboardControls';

const DashboardShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const dashboards = [
    { name: "Caregiver Dashboard", icon: <Heart className="h-4 w-4" />, content: <CaregiverDashboardContent /> },
    { name: "Care Seeker Dashboard", icon: <User className="h-4 w-4" />, content: <CareSeekerDashboardContent /> },
    { name: "Admin Dashboard", icon: <Shield className="h-4 w-4" />, content: <AdminDashboardContent /> }
  ];
  
  useEffect(() => {
    if (!isPaused) {
      const timer = setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % dashboards.length);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [activeIndex, isPaused, dashboards.length]);
  
  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + dashboards.length) % dashboards.length);
    setIsPaused(true);
  };
  
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % dashboards.length);
    setIsPaused(true);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* Dashboard Selector Tabs */}
        <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b">
          <div className="flex items-center space-x-1">
            {dashboards.map((dashboard, index) => (
              <Button
                key={index}
                variant={activeIndex === index ? "default" : "ghost"}
                size="sm"
                className={`flex items-center h-8 px-3 ${activeIndex === index ? "bg-purple-600" : "text-gray-600"}`}
                onClick={() => {
                  setActiveIndex(index);
                  setIsPaused(true);
                }}
              >
                {dashboard.icon}
                <span className="ml-2 text-xs">{dashboard.name}</span>
              </Button>
            ))}
          </div>
          <DashboardControls
            onPrevious={handlePrevious}
            onNext={handleNext}
            isPaused={isPaused}
            onPauseToggle={() => setIsPaused(!isPaused)}
          />
        </div>
        
        {/* Dashboard Preview */}
        <div className="relative overflow-hidden" style={{ height: "400px" }}>
          <div 
            className="transition-transform duration-700 ease-in-out flex"
            style={{ transform: `translateX(-${activeIndex * 100}%)`, width: `${dashboards.length * 100}%` }}
          >
            {dashboards.map((dashboard, index) => (
              <div key={index} className="w-full h-full flex-shrink-0">
                {dashboard.content}
              </div>
            ))}
          </div>
        </div>
        
        {/* Dashboard Bottom Description */}
        <div className="p-3 border-t bg-white">
          <p className="text-xs text-center text-gray-600">
            em.path provides specialized dashboard interfaces for caregivers, care recipients, and administrators.
          </p>
        </div>
        
        {/* Indicator Dots */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center space-x-1">
          {dashboards.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                activeIndex === index ? "bg-purple-600" : "bg-gray-300"
              }`}
              onClick={() => {
                setActiveIndex(index);
                setIsPaused(true);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardShowcase;
