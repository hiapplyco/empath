import React from 'react';
import { DashboardContent } from './DashboardContent';
import { DashboardSidebar } from './DashboardSidebar';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, User, Calendar, MessageSquare, DollarSign, Shield, Clock, CheckCircle, Bell } from 'lucide-react';

export const CaregiverDashboard = () => {
  const sidebarItems = [
    { icon: <User className="w-3 h-3" />, label: 'Dashboard', isActive: true },
    { icon: <Calendar className="w-3 h-3" />, label: 'Schedule' },
    { icon: <MessageSquare className="w-3 h-3" />, label: 'Messages' },
    { icon: <DollarSign className="w-3 h-3" />, label: 'Earnings' },
    { icon: <Shield className="w-3 h-3" />, label: 'Benefits' }
  ];

  return (
    <div className="w-full h-full flex-shrink-0">
      <div className="flex h-full">
        <DashboardSidebar 
          items={sidebarItems}
          userInitial="S"
          userName="Sarah"
          userType="caregiver"
        />
        <DashboardContent>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-bold">Welcome back, Sarah</h2>
            <Bell className="w-4 h-4 text-gray-500" />
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <Card>
              <CardContent className="flex flex-col items-start gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <p className="text-sm font-medium">Earnings this month</p>
                <p className="text-2xl font-bold">$2,450</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-start gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <p className="text-sm font-medium">Hours worked</p>
                <p className="text-2xl font-bold">120 hrs</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-start gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <p className="text-sm font-medium">Client satisfaction</p>
                <p className="text-2xl font-bold">98%</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Schedule and Certifications */}
          <div className="grid grid-cols-3 gap-3">
            <Card>
              <CardContent className="flex flex-col items-start gap-2">
                <Calendar className="w-5 h-5 text-yellow-500" />
                <p className="text-sm font-medium">Upcoming shift</p>
                <p className="text-xl font-bold">Tomorrow, 9 AM</p>
                <Badge variant="secondary">
                  <Clock className="w-3 h-3 mr-1" />
                  2 hrs left to confirm
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-start gap-2">
                <Shield className="w-5 h-5 text-purple-500" />
                <p className="text-sm font-medium">Certifications</p>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <p className="text-xl font-bold">CPR</p>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <p className="text-xl font-bold">First Aid</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </DashboardContent>
      </div>
    </div>
  );
};
