
import React, { useState } from 'react';
import { ActivityFeed } from '../ActivityFeed';
import { MatchingControls } from '../MatchingControls';
import { InterviewNotifications } from '../InterviewNotifications';
import { StatCard } from '../StatCard';
import { Users, Heart, PieChart, Clock } from 'lucide-react';

export const AdminDashboardContent = () => {
  const [matchThreshold, setMatchThreshold] = useState(75);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Caregivers"
          value="254"
          icon={<Users className="w-5 h-5 text-purple-600" />}
          trend="+12% from last month"
          trendType="positive"
        />
        <StatCard
          title="Active Matches"
          value="156"
          icon={<Heart className="w-5 h-5 text-purple-600" />}
          trend="+8% this week"
          trendType="positive"
        />
        <StatCard
          title="Match Success Rate"
          value="92%"
          icon={<PieChart className="w-5 h-5 text-purple-600" />}
          trend="+2% this quarter"
          trendType="positive"
        />
        <StatCard
          title="Avg. Match Time"
          value="48h"
          icon={<Clock className="w-5 h-5 text-purple-600" />}
          trend="-5h from last month"
          trendType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ActivityFeed />
        <div className="lg:col-span-1">
          <MatchingControls
            matchThreshold={matchThreshold}
            setMatchThreshold={setMatchThreshold}
          />
        </div>
        <div className="lg:col-span-1">
          <InterviewNotifications />
        </div>
      </div>
    </div>
  );
};
