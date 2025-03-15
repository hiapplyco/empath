import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, Filter, Search, MessageSquare, Calendar, CreditCard, Settings, Phone, MapPin, Clock, ChevronRight, BookOpen, Shield, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CareRecipientDashboard = () => {
  const [activeTab, setActiveTab] = useState('matches');
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <Heart className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold ml-2">em.path</h1>
        </div>
        
        <div className="flex items-center mb-6 p-3 bg-purple-50 rounded-lg">
          <Avatar>
            <div className="bg-purple-200 text-purple-800 w-10 h-10 rounded-full flex items-center justify-center">
              RJ
            </div>
          </Avatar>
          <div className="ml-3">
            <p className="font-medium">Robert Johnson</p>
            <p className="text-xs text-purple-600">Care for Dad</p>
          </div>
        </div>
        
        <nav className="space-y-1 flex-1">
          {[
            { id: 'matches', icon: Heart, label: 'Matches' },
            { id: 'search', icon: Search, label: 'Search' },
            { id: 'messages', icon: MessageSquare, label: 'Messages', badge: '3' },
            { id: 'schedule', icon: Calendar, label: 'Schedule' },
            { id: 'payments', icon: CreditCard, label: 'Payments' },
            { id: 'careplan', icon: BookOpen, label: 'Care Plan' },
            { 
              id: 'pia-search', 
              icon: Users, 
              label: 'Search PIAs', 
              onClick: () => navigate('/dashboard/admin/pia-table') 
            }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href="#"
                className={`flex items-center space-x-3 p-2 ${
                  activeTab === item.id 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                } rounded-lg font-medium`}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.onClick) {
                    item.onClick();
                  } else {
                    setActiveTab(item.id);
                  }
                }}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.badge && (
                  <Badge className="ml-auto bg-red-600 text-white">{item.badge}</Badge>
                )}
              </a>
            );
          })}
        </nav>
        
        <div className="mt-auto pt-4 border-t border-gray-200">
          <a href="#"
             className="flex items-center space-x-3 p-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </a>
          <a href="#"
             className="flex items-center space-x-3 p-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">
            <Shield className="w-5 h-5" />
            <span>Help & Support</span>
          </a>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Your Care Dashboard</h2>
              <p className="text-gray-500">Find and connect with caregivers matched to your needs</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => navigate('/care-seeker/profile')}
              >
                View Care Profile
              </Button>
            </div>
          </div>

          {/* Content */}
          <TabsContent value="matches">
            <Card>
              <CardHeader>
                <CardTitle>Your Top Matches</CardTitle>
                <CardDescription>
                  We've found these caregivers based on your needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                Coming soon: Top matches display
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search">
            <Card>
              <CardHeader>
                <CardTitle>Search Caregivers</CardTitle>
                <CardDescription>
                  Find caregivers in your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                Coming soon: Search interface
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                  Chat with caregivers and support
                </CardDescription>
              </CardHeader>
              <CardContent>
                Coming soon: Messages interface
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Schedule</CardTitle>
                <CardDescription>
                  Manage your care appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                Coming soon: Schedule interface
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payments</CardTitle>
                <CardDescription>
                  Manage your payment methods and history
                </CardDescription>
              </CardHeader>
              <CardContent>
                Coming soon: Payments interface
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="careplan">
            <Card>
              <CardHeader>
                <CardTitle>Care Plan</CardTitle>
                <CardDescription>
                  Review and update your care requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                Coming soon: Care plan interface
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CareRecipientDashboard;
