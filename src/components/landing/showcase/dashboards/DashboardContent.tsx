
import React from 'react';

interface DashboardContentProps {
  children: React.ReactNode;
}

export const DashboardContent = ({ children }: DashboardContentProps) => {
  return (
    <div className="flex-1 p-4 overflow-auto">
      {children}
    </div>
  );
};
