
import React, { useState } from 'react';
import { PIADataTable } from '@/components/admin/pia/PIADataTable';
import { PIAStats } from '@/components/admin/pia/PIAStats';
import { PIAFilters } from '@/components/admin/pia/PIAFilters';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

const PIADashboard = () => {
  const [activeTab, setActiveTab] = useState('pia');

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Professional Independent Aides</h1>
          <p className="text-gray-500">Manage and monitor PIA applications and profiles</p>
        </div>
        
        <PIAStats />
        <PIAFilters />
        <PIADataTable />
      </div>
    </div>
  );
};

export default PIADashboard;
