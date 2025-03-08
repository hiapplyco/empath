
import React from 'react';
import { Bell } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const DashboardHeader = () => {
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
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold">
          Welcome back, {profile?.first_name || 'Caregiver'}
        </h2>
        <p className="text-slate-500">{new Date().toLocaleDateString('en-US', { 
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-slate-500 hover:text-slate-700">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </div>
  );
};
