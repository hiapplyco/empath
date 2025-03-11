import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Heart, Users, User, MessageSquare, Settings, Search, Bell } from 'lucide-react';

export const AdminDashboardContent = () => {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-48 bg-white border-r p-3">
        <div className="flex items-center mb-4">
          <div className="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center">
            <Heart className="text-white w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold ml-2">em.path</h3>
          <span className="text-[0.6rem] ml-1 text-gray-500">admin</span>
        </div>
        
        <nav className="space-y-1">
          <a className="flex items-center justify-between p-2 bg-purple-100 text-purple-600 rounded-lg text-xs">
            <div className="flex items-center">
              <BarChart3 className="w-3 h-3 mr-2" />
              <span>Dashboard</span>
            </div>
          </a>
          <a className="flex items-center justify-between p-2 text-gray-600 rounded-lg text-xs">
            <div className="flex items-center">
              <Heart className="w-3 h-3 mr-2" />
              <span>Matches</span>
            </div>
            <Badge className="text-[0.6rem] py-0 h-4 bg-purple-600">12</Badge>
          </a>
          <a className="flex items-center p-2 text-gray-600 rounded-lg text-xs">
            <Users className="w-3 h-3 mr-2" />
            <span>Caregivers</span>
          </a>
          <a className="flex items-center p-2 text-gray-600 rounded-lg text-xs">
            <User className="w-3 h-3 mr-2" />
            <span>Care Recipients</span>
          </a>
          <a className="flex items-center p-2 text-gray-600 rounded-lg text-xs">
            <MessageSquare className="w-3 h-3 mr-2" />
            <span>Messages</span>
          </a>
          <a className="flex items-center p-2 text-gray-600 rounded-lg text-xs">
            <Settings className="w-3 h-3 mr-2" />
            <span>Settings</span>
          </a>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-sm font-bold">Dashboard Overview</h2>
            <p className="text-xs text-gray-500">Thursday, March 9, 2025</p>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
              <input className="h-7 w-32 rounded-md border pl-7 text-xs" placeholder="Search..." />
            </div>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              <Bell className="h-3 w-3 mr-1" /> <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3 mb-4">
          <Card className="shadow-sm">
            <CardContent className="p-3">
              <div className="text-xs text-gray-500 mb-1">Caregivers</div>
              <div className="text-lg font-bold">152</div>
              <div className="text-xs text-green-600">+12 this month</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-3">
              <div className="text-xs text-gray-500 mb-1">Care Recipients</div>
              <div className="text-lg font-bold">87</div>
              <div className="text-xs text-green-600">+8 this month</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-3">
              <div className="text-xs text-gray-500 mb-1">Pending Matches</div>
              <div className="text-lg font-bold">24</div>
              <div className="text-xs text-amber-600">5 high priority</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-3">
              <div className="text-xs text-gray-500 mb-1">Match Success</div>
              <div className="text-lg font-bold">92%</div>
              <div className="text-xs text-green-600">+4% from last month</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <Card className="shadow-sm">
              <CardContent className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-semibold">Recent Activity</h3>
                  <span className="text-xs text-purple-600">View all</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start p-2 bg-gray-50 rounded text-xs">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                      <Users className="text-purple-600 w-3 h-3" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">New Caregiver Onboarded</span>
                        <span className="text-[0.6rem] text-gray-500">10:23 AM</span>
                      </div>
                      <p className="text-[0.6rem] text-gray-500">Sarah Johnson completed verification</p>
                    </div>
                  </div>
                  <div className="flex items-start p-2 bg-gray-50 rounded text-xs">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                      <Heart className="text-blue-600 w-3 h-3" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">Match Accepted</span>
                        <span className="text-[0.6rem] text-gray-500">11:42 AM</span>
                      </div>
                      <p className="text-[0.6rem] text-gray-500">Robert accepted care from Maria</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="shadow-sm">
            <CardContent className="p-3">
              <h3 className="text-xs font-semibold mb-2">Matching Algorithm</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Match Threshold</span>
                    <span className="font-medium">70%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full">
                    <div className="h-1.5 bg-purple-600 rounded-full w-[70%]"></div>
                  </div>
                </div>
                
                <div className="space-y-1.5 mt-2">
                  <div className="flex items-center justify-between text-[0.6rem]">
                    <span>Prioritize personality fit</span>
                    <div className="w-6 h-3 bg-purple-200 rounded-full p-0.5 flex">
                      <div className="w-2 h-2 bg-purple-600 rounded-full ml-auto"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[0.6rem]">
                    <span>Weigh experience heavily</span>
                    <div className="w-6 h-3 bg-purple-200 rounded-full p-0.5 flex">
                      <div className="w-2 h-2 bg-purple-600 rounded-full ml-auto"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[0.6rem]">
                    <span>Consider location proximity</span>
                    <div className="w-6 h-3 bg-purple-200 rounded-full p-0.5 flex">
                      <div className="w-2 h-2 bg-purple-600 rounded-full ml-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
