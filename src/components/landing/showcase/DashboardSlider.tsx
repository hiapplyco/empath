
import { Heart, User, Shield } from 'lucide-react';
import { CaregiverDashboard } from './dashboards/CaregiverDashboard';
import { CareSeekerDashboard } from './dashboards/CareSeekerDashboard';
import { AdminDashboard } from './dashboards/AdminDashboard';

interface DashboardSliderProps {
  activeIndex: number;
  dashboards: Array<{ name: string; icon: JSX.Element }>;
}

export const DashboardSlider = ({ activeIndex, dashboards }: DashboardSliderProps) => {
  return (
    <div className="relative overflow-hidden" style={{ height: "400px" }}>
      <div 
        className="transition-transform duration-700 ease-in-out flex"
        style={{ transform: `translateX(-${activeIndex * 100}%)`, width: `${dashboards.length * 100}%` }}
      >
        <CaregiverDashboard />
        <CareSeekerDashboard />
        <AdminDashboard />
      </div>
    </div>
  );
};
