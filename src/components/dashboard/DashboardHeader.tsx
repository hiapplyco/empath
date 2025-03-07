
import React from 'react';
import { Bell } from 'lucide-react';

export const DashboardHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold">Welcome back, Maria</h2>
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
        <div className="flex items-center">
          <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center mr-2">
            <span className="text-purple-700 font-medium">MR</span>
          </div>
        </div>
      </div>
    </div>
  );
};
