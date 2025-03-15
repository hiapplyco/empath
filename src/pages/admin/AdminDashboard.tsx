
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const { isAdmin, isChecking, error } = useAdminAuth();

  // Only show content if we've confirmed admin status
  if (isChecking) {
    return <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">Checking credentials...</p>
    </div>;
  }

  if (!isAdmin) {
    // Use replace to prevent navigation loops
    navigate('/admin/auth', { replace: true });
    return null;
  }

  if (error) {
    toast.error('Authentication error. Please try logging in again.');
    navigate('/admin/auth', { replace: true });
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
