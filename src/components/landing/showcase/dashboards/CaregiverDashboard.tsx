
import { DashboardContent } from './DashboardContent';
import { DashboardSidebar } from './DashboardSidebar';
import { User, Calendar, MessageSquare, DollarSign, Shield } from 'lucide-react';

const sidebarItems = [
  { icon: User, label: 'Dashboard', active: true },
  { icon: Calendar, label: 'Schedule' },
  { icon: MessageSquare, label: 'Messages' },
  { icon: DollarSign, label: 'Earnings' },
  { icon: Shield, label: 'Benefits' }
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
        <DashboardContent type="caregiver" />
      </div>
    </div>
  );
};
