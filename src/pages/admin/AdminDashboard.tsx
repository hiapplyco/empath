
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/admin/auth');
        return;
      }

      const { data: adminData, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error || !adminData) {
        toast.error('You do not have admin access');
        navigate('/admin/auth');
      }
    };

    checkAdminAuth();
  }, [navigate]);

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
