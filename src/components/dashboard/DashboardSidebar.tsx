import React from 'react';
import { 
  Calendar, DollarSign, Award, BookOpen, 
  MessageSquare, Star, Heart, User, Settings, Briefcase 
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const navItems = [
  { icon: Briefcase, label: 'Dashboard', href: '/dashboard' },
  { icon: User, label: 'My Profile', href: '/dashboard/profile' },
  { icon: Calendar, label: 'Schedule', href: '/dashboard/schedule' },
  { icon: DollarSign, label: 'Earnings', href: '/dashboard/earnings' },
  { icon: BookOpen, label: 'Knowledge Base', href: '/dashboard/knowledge' },
  { icon: Award, label: 'Growth & Learning', href: '/dashboard/growth' },
  { icon: MessageSquare, label: 'Community', href: '/dashboard/community' },
  { icon: Star, label: 'Reviews', href: '/dashboard/reviews' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export const DashboardSidebar = () => {
  const location = useLocation();
  
  const { data: profile } = useQuery({
    queryKey: ['caregiver-profile'],
    queryFn: async () => {
      const { data } = await supabase
        .from('caregiver_profiles')
        .select('*')
        .single();
      return data;
    },
  });

  return (
    <div className="w-64 bg-white border-r border-slate-200 p-4 flex flex-col h-screen">
      <div className="flex items-center mb-8">
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
          <Heart className="text-white w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold ml-2">em.path</h1>
      </div>

      <div className="flex items-center mb-6 p-2 bg-purple-50 rounded-lg">
        <div className="w-10 h-10 bg-purple-100 rounded-full mr-3 flex items-center justify-center">
          <User className="text-purple-600 w-5 h-5" />
        </div>
        <div>
          <p className="font-medium text-sm">
            {profile ? `${profile.first_name} ${profile.last_name}` : 'Loading...'}
          </p>
          <p className="text-xs text-green-600">{profile?.status || 'Loading...'}</p>
        </div>
      </div>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 p-2 rounded-lg",
                isActive 
                  ? "bg-purple-100 text-purple-700" 
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="bg-purple-50 p-3 rounded-lg">
          <p className="text-sm font-medium text-purple-700 mb-1">Need assistance?</p>
          <p className="text-xs text-slate-600">Your support team is available</p>
          <button className="mt-2 w-full py-1.5 text-sm bg-purple-600 text-white rounded-md">
            Connect with Support
          </button>
        </div>
      </div>
    </div>
  );
};
