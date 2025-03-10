import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Calendar, Clock, Filter, Heart, LineChart, MessageSquare, RefreshCw, Search, Settings, Star, User, Users } from 'lucide-react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ActivityFeed } from '@/components/admin/ActivityFeed';
import { MatchingControls } from '@/components/admin/MatchingControls';
import { StatCard } from '@/components/admin/StatCard';

const AdminDashboard = () => {
  const [matchThreshold, setMatchThreshold] = useState(70);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {activeTab === 'dashboard' && 'Dashboard Overview'}
                  {activeTab === 'matches' && 'Care Matches'}
                  {activeTab === 'caregivers' && 'Caregiver Management'}
                  {activeTab === 'recipients' && 'Care Recipient Management'}
                  {activeTab === 'analytics' && 'Analytics & Reporting'}
                  {activeTab === 'messages' && 'Communication Center'}
                  {activeTab === 'settings' && 'System Settings'}
                </h2>
                <p className="text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    className="pl-10 w-64" 
                    placeholder="Search caregivers, recipients..." 
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
          
          <TabsContent value="dashboard" className="p-6 pt-0">
            <div className="grid grid-cols-4 gap-6 mb-6">
              <StatCard
                title="Active Caregivers"
                value={152}
                icon={<Users className="w-5 h-5 text-purple-600" />}
                trend="+12 this month"
                trendType="positive"
              />
              <StatCard
                title="Care Recipients"
                value={87}
                icon={<User className="w-5 h-5 text-blue-600" />}
                trend="+8 this month"
                trendType="positive"
              />
              <StatCard
                title="Pending Matches"
                value={24}
                icon={<Heart className="w-5 h-5 text-amber-600" />}
                trend="5 high priority"
                trendType="warning"
              />
              <StatCard
                title="Match Success Rate"
                value="92%"
                icon={<Star className="w-5 h-5 text-green-600" />}
                trend="+4% from last month"
                trendType="positive"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <ActivityFeed />
              <div className="space-y-6">
                <MatchingControls 
                  matchThreshold={matchThreshold}
                  setMatchThreshold={setMatchThreshold}
                />
              </div>
            </div>
          </TabsContent>
          
          {/* Other tab contents will be implemented in separate components */}
          <TabsContent value="matches">
            <div className="p-6">Matches content coming soon</div>
          </TabsContent>
          <TabsContent value="caregivers">
            <div className="p-6">Caregivers content coming soon</div>
          </TabsContent>
          <TabsContent value="recipients">
            <div className="p-6">Recipients content coming soon</div>
          </TabsContent>
          <TabsContent value="analytics">
            <div className="p-6">Analytics content coming soon</div>
          </TabsContent>
          <TabsContent value="messages">
            <div className="p-6">Messages content coming soon</div>
          </TabsContent>
          <TabsContent value="settings">
            <div className="p-6">Settings content coming soon</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
