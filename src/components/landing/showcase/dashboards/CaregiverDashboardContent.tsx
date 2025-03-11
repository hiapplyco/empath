import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock, CheckCircle, Star, User, Bell, DollarSign, Shield, Calendar, MessageSquare } from 'lucide-react';

export const CaregiverDashboardContent = () => {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-48 bg-white border-r p-3">
        <div className="flex items-center mb-4">
          <div className="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center">
            <Heart className="text-white w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold ml-2">em.path</h3>
        </div>
        
        <div className="flex items-center mb-4 p-2 bg-purple-50 rounded-lg">
          <div className="w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center text-xs text-purple-700">
            S
          </div>
          <span className="ml-2 text-xs">Sarah</span>
        </div>
        
        <nav className="space-y-1">
          <a className="flex items-center space-x-2 p-2 bg-purple-100 text-purple-600 rounded-lg text-xs">
            <User className="w-3 h-3" />
            <span>Dashboard</span>
          </a>
          <a className="flex items-center space-x-2 p-2 text-gray-600 rounded-lg text-xs">
            <Calendar className="w-3 h-3" />
            <span>Schedule</span>
          </a>
          <a className="flex items-center space-x-2 p-2 text-gray-600 rounded-lg text-xs">
            <MessageSquare className="w-3 h-3" />
            <span>Messages</span>
          </a>
          <a className="flex items-center space-x-2 p-2 text-gray-600 rounded-lg text-xs">
            <DollarSign className="w-3 h-3" />
            <span>Earnings</span>
          </a>
          <a className="flex items-center space-x-2 p-2 text-gray-600 rounded-lg text-xs">
            <Shield className="w-3 h-3" />
            <span>Benefits</span>
          </a>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-bold">Welcome back, Sarah</h2>
          <Bell className="w-4 h-4 text-gray-500" />
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          <Card className="shadow-sm">
            <CardContent className="p-3">
              <div className="text-xs text-gray-500 mb-1">Today's Shifts</div>
              <div className="text-lg font-bold">2</div>
              <div className="text-xs text-gray-500">Next: 2:00 PM</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-3">
              <div className="text-xs text-gray-500 mb-1">Weekly Hours</div>
              <div className="text-lg font-bold">18.5</div>
              <div className="text-xs text-gray-500">6.5 hrs remaining</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-3">
              <div className="text-xs text-gray-500 mb-1">Rating</div>
              <div className="text-lg font-bold">4.9</div>
              <div className="text-xs text-gray-500">28 reviews</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <Card className="shadow-sm">
              <CardContent className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-semibold">Upcoming Schedule</h3>
                  <span className="text-xs text-purple-600">View all</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center p-2 bg-gray-50 rounded text-xs">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                      <Clock className="text-purple-600 w-3 h-3" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Robert Johnson</div>
                      <div className="text-gray-500">2:00 PM - 6:00 PM</div>
                    </div>
                    <Badge className="text-[0.6rem] py-0 h-4 bg-green-100 text-green-800 font-normal">
                      Confirmed
                    </Badge>
                  </div>
                  <div className="flex items-center p-2 bg-gray-50 rounded text-xs">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                      <Clock className="text-purple-600 w-3 h-3" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Mary Williams</div>
                      <div className="text-gray-500">Tomorrow, 9:00 AM</div>
                    </div>
                    <Badge className="text-[0.6rem] py-0 h-4 bg-green-100 text-green-800 font-normal">
                      Confirmed
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="shadow-sm">
            <CardContent className="p-3">
              <h3 className="text-xs font-semibold mb-2">Certifications</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-xs">HIPAA Compliance</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-xs">CPR Certified</span>
                </div>
                <div className="flex items-center text-red-500">
                  <Clock className="w-3 h-3 mr-1" />
                  <span className="text-xs">CNA - Renew in 14d</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
