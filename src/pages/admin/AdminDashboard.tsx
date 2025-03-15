
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminDashboardContent } from '@/components/admin/dashboard/AdminDashboardContent';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
        {location.pathname === '/admin' || location.pathname === '/admin/dashboard' ? (
          <AdminDashboardContent />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
