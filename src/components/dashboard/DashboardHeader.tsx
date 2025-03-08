
import React from 'react';
import { Bell, LogOut } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const DashboardHeader = () => {
  const navigate = useNavigate();
  
  const { data: profile } = useQuery({
    queryKey: ['caregiver-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user found');

      const { data } = await supabase
        .from('caregiver_profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      console.log('Fetched profile for header:', data);
      return data;
    },
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const displayName = profile?.processed?.sections?.[0]?.items?.[0]?.value || profile?.name || 'Caregiver';

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold">
          Welcome back, {displayName}
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
        <Button variant="ghost" size="sm" onClick={handleSignOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </Button>
      </div>
    </div>
  );
};
