
import React from 'react';
import CareRecipientDashboard from '@/components/care-seeker/dashboard/CareRecipientDashboard';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const Dashboard = () => {
  // Use auth redirect hook to ensure user is authenticated
  useAuthRedirect({ role: 'care-seeker' });

  return <CareRecipientDashboard />;
};

export default Dashboard;
