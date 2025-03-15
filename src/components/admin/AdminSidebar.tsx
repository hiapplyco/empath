import React from 'react';
import { Heart, LineChart, MessageSquare, Settings, User, Users, Table } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link, useLocation } from 'react-router-dom';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="flex items-center mb-8">
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
          <Heart className="text-white w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold ml-2">em.path</h1>
        <span className="ml-1 text-xs text-gray-500">admin</span>
      </div>
      
      <nav className="space-y-1 flex-1">
        <Link
          to="/admin/dashboard"
          className={`flex items-center space-x-3 p-2 w-full text-left ${activeTab === 'dashboard' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'} rounded-lg font-medium`}
          onClick={() => setActiveTab('dashboard')}>
          <LineChart className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
        
        <Link
          to="/pia-table"
          className={`flex items-center space-x-3 p-2 w-full text-left ${activeTab === 'pia-table' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'} rounded-lg font-medium`}
          onClick={() => setActiveTab('pia-table')}>
          <Table className="w-5 h-5" />
          <span>PIA Table</span>
        </Link>
        
        <Link
          to="/admin/matches"
          className={`flex items-center space-x-3 p-2 w-full text-left ${activeTab === 'matches' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'} rounded-lg font-medium`}
          onClick={() => setActiveTab('matches')}>
          <Heart className="w-5 h-5" />
          <span>Matches</span>
          <Badge className="ml-auto bg-purple-600 text-white">12</Badge>
        </Link>
        <Link
          to="/admin/caregivers"
          className={`flex items-center space-x-3 p-2 w-full text-left ${activeTab === 'caregivers' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'} rounded-lg font-medium`}
          onClick={() => setActiveTab('caregivers')}>
          <Users className="w-5 h-5" />
          <span>Caregivers</span>
        </Link>
        <Link
          to="/admin/recipients"
          className={`flex items-center space-x-3 p-2 w-full text-left ${activeTab === 'recipients' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'} rounded-lg font-medium`}
          onClick={() => setActiveTab('recipients')}>
          <User className="w-5 h-5" />
          <span>Care Recipients</span>
        </Link>
        <Link
          to="/admin/messages"
          className={`flex items-center space-x-3 p-2 w-full text-left ${activeTab === 'messages' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'} rounded-lg font-medium`}
          onClick={() => setActiveTab('messages')}>
          <MessageSquare className="w-5 h-5" />
          <span>Messages</span>
          <Badge className="ml-auto bg-red-600 text-white">3</Badge>
        </Link>
        <Link
          to="/admin/settings"
          className={`flex items-center space-x-3 p-2 w-full text-left ${activeTab === 'settings' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'} rounded-lg font-medium`}
          onClick={() => setActiveTab('settings')}>
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </nav>
      
      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="flex items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/admin.jpg" />
            <AvatarFallback className="bg-purple-200 text-purple-700">AM</AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <p className="text-sm font-medium">Admin Manager</p>
            <p className="text-xs text-gray-500">admin@empath.care</p>
          </div>
        </div>
      </div>
    </div>
  );
};
