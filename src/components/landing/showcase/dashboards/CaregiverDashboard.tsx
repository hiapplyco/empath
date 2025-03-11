import React from 'react';
import { DashboardContent } from './DashboardContent';
import { DashboardSidebar } from './DashboardSidebar';
import { User, Calendar, MessageSquare, DollarSign, Shield } from 'lucide-react';

const sidebarItems = [
  { icon: <User className="w-3 h-3" />, label: 'Dashboard', isActive: true },
  { icon: <Calendar className="w-3 h-3" />, label: 'Schedule' },
  { icon: <MessageSquare className="w-3 h-3" />, label: 'Messages' },
  { icon: <DollarSign className="w-3 h-3" />, label: 'Earnings' },
  { icon: <Shield className="w-3 h-3" />, label: 'Benefits' }
];

export const CaregiverDashboard = () => {
  return (
    <div className="w-full h-full flex-shrink-0">
      <div className="flex h-full">
        <DashboardSidebar 
          items={sidebarItems}
          userInitial="S"
          userName="Sarah"
          userType="caregiver"
        />
        <DashboardContent>
          
        </DashboardContent>
      </div>
    </div>
  );
};
