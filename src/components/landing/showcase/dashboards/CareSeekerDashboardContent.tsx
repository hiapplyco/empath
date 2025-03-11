import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Search, MessageSquare, Calendar, CreditCard, Clock, Star } from 'lucide-react';

export const CareSeekerDashboardContent = () => {
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
          <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs text-blue-700">
            R
          </div>
          <span className="ml-2 text-xs">Robert</span>
        </div>
        
        <nav className="space-y-1">
          <a className="flex items-center space-x-2 p-2 bg-purple-100 text-purple-600 rounded-lg text-xs">
            <Heart className="w-3 h-3" />
            <span>Matches</span>
          </a>
          <a className="flex items-center space-x-2 p-2 text-gray-600 rounded-lg text-xs">
            <Search className="w-3 h-3" />
            <span>Search</span>
          </a>
          <a className="flex items-center space-x-2 p-2 text-gray-600 rounded-lg text-xs">
            <MessageSquare className="w-3 h-3" />
            <span>Messages</span>
          </a>
          <a className="flex items-center space-x-2 p-2 text-gray-600 rounded-lg text-xs">
            <Calendar className="w-3 h-3" />
            <span>Schedule</span>
          </a>
          <a className="flex items-center space-x-2 p-2 text-gray-600 rounded-lg text-xs">
            <CreditCard className="w-3 h-3" />
            <span>Payments</span>
          </a>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-sm font-bold">Your Top Matches</h2>
            <p className="text-xs text-gray-500">Based on Dad's care needs</p>
          </div>
          <Button size="sm" className="h-7 text-xs bg-purple-600 hover:bg-purple-700">
            View Care Profile
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { name: "Maria G.", match: 97, rating: 4.9, specialty: "Alzheimer's" },
            { name: "David C.", match: 93, rating: 4.8, specialty: "Mobility" },
            { name: "Sarah J.", match: 89, rating: 4.7, specialty: "Post-Surgery" }
          ].map((caregiver, index) => (
            <Card key={index} className="shadow-sm overflow-hidden">
              <div className="h-8 bg-gradient-to-r from-purple-100 to-blue-100 relative">
                <Badge className="absolute top-1 right-1 text-[0.6rem] bg-purple-600">
                  {caregiver.match}% Match
                </Badge>
              </div>
              <CardContent className="p-3 pt-4 relative">
                <div className="absolute -top-4 left-3">
                  <div className="w-8 h-8 rounded-full bg-purple-200 border-2 border-white flex items-center justify-center text-xs font-medium text-purple-700">
                    {caregiver.name.split(' ')[0][0]}{caregiver.name.split(' ')[1][0]}
                  </div>
                </div>
                <div className="pl-6">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xs font-semibold">{caregiver.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-2 h-2 text-yellow-400 fill-yellow-400" />
                      <span className="text-[0.6rem] ml-0.5">{caregiver.rating}</span>
                    </div>
                  </div>
                  <p className="text-[0.6rem] text-gray-500">Specializes in {caregiver.specialty}</p>
                  <div className="flex justify-between mt-2 pt-2 border-t border-gray-100">
                    <Button variant="outline" size="sm" className="text-[0.6rem] h-5 px-1.5">Profile</Button>
                    <Button size="sm" className="text-[0.6rem] h-5 px-1.5 bg-purple-600">Contact</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="shadow-sm overflow-hidden mb-3">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-semibold">Payment Overview</h3>
              <span className="text-xs text-purple-600">Details</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 bg-gray-50 rounded">
                <div className="text-xs text-gray-500">Balance</div>
                <div className="text-sm font-bold">$245</div>
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <div className="text-xs text-gray-500">Next Payment</div>
                <div className="text-sm font-bold">Mar 15</div>
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <div className="text-xs text-gray-500">This Month</div>
                <div className="text-sm font-bold">$312</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-2 gap-3">
          <Card className="shadow-sm">
            <CardContent className="p-3">
              <h3 className="text-xs font-semibold mb-2">Upcoming Care</h3>
              <div className="space-y-1.5">
                <div className="flex items-center p-1.5 bg-gray-50 rounded text-[0.6rem]">
                  <Clock className="text-purple-600 w-3 h-3 mr-1.5" />
                  <div className="flex-1">
                    <div className="font-medium">Maria G.</div>
                    <div className="text-gray-500">Today, 2:00 PM</div>
                  </div>
                </div>
                <div className="flex items-center p-1.5 bg-gray-50 rounded text-[0.6rem]">
                  <Clock className="text-purple-600 w-3 h-3 mr-1.5" />
                  <div className="flex-1">
                    <div className="font-medium">David C.</div>
                    <div className="text-gray-500">Tomorrow, 10:00 AM</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-3">
              <h3 className="text-xs font-semibold mb-2">Care Plan Status</h3>
              <div className="space-y-1.5 text-[0.6rem]">
                <div className="flex justify-between items-center">
                  <span>Medication Management</span>
                  <Badge className="text-[0.6rem] py-0 h-4 bg-green-100 text-green-800 font-normal">
                    Active
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Physical Therapy Support</span>
                  <Badge className="text-[0.6rem] py-0 h-4 bg-amber-100 text-amber-800 font-normal">
                    Pending
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Meal Preparation</span>
                  <Badge className="text-[0.6rem] py-0 h-4 bg-green-100 text-green-800 font-normal">
                    Active
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
