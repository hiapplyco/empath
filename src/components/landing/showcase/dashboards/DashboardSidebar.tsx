
import { Heart } from 'lucide-react';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  badge?: string;
}

interface DashboardSidebarProps {
  items: SidebarItem[];
  userInitial: string;
  userName: string;
  userType?: 'admin' | 'caregiver' | 'seeker';
}

export const DashboardSidebar = ({ items, userInitial, userName, userType }: DashboardSidebarProps) => {
  const bgColor = userType === 'seeker' ? 'bg-blue-200' : 'bg-purple-200';
  const textColor = userType === 'seeker' ? 'text-blue-700' : 'text-purple-700';

  return (
    <div className="w-48 bg-white border-r p-3">
      <div className="flex items-center mb-4">
        <div className="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center">
          <Heart className="text-white w-4 h-4" />
        </div>
        <h3 className="text-sm font-bold ml-2">em.path</h3>
        {userType === 'admin' && <span className="text-[0.6rem] ml-1 text-gray-500">admin</span>}
      </div>
      
      <div className="flex items-center mb-4 p-2 bg-purple-50 rounded-lg">
        <div className={`w-6 h-6 ${bgColor} rounded-full flex items-center justify-center text-xs ${textColor}`}>
          {userInitial}
        </div>
        <span className="ml-2 text-xs">{userName}</span>
      </div>
      
      <nav className="space-y-1">
        {items.map((item, index) => (
          <a key={index} className={`flex items-center justify-between p-2 ${item.isActive ? 'bg-purple-100 text-purple-600' : 'text-gray-600'} rounded-lg text-xs`}>
            <div className="flex items-center space-x-2">
              {item.icon}
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className="text-[0.6rem] py-0 px-2 h-4 bg-purple-600 text-white rounded-full">
                {item.badge}
              </span>
            )}
          </a>
        ))}
      </nav>
    </div>
  );
};
