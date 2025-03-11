import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, User, Calendar, Clock, Search, MessageSquare, CreditCard, BarChart3, Settings, Users, Shield, ChevronLeft, ChevronRight, CheckCircle, Star, DollarSign, Bell } from 'lucide-react';

const DashboardShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const dashboards = [
    { name: "Caregiver Dashboard", icon: <Heart className="h-4 w-4" /> },
    { name: "Care Seeker Dashboard", icon: <User className="h-4 w-4" /> },
    { name: "Admin Dashboard", icon: <Shield className="h-4 w-4" /> }
  ];
  
  useEffect(() => {
    if (!isPaused) {
      const timer = setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % dashboards.length);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [activeIndex, isPaused, dashboards.length]);
  
  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + dashboards.length) % dashboards.length);
    setIsPaused(true);
  };
  
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % dashboards.length);
    setIsPaused(true);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* Dashboard Selector Tabs */}
        <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b">
          <div className="flex items-center space-x-1">
            {dashboards.map((dashboard, index) => (
              <Button
                key={index}
                variant={activeIndex === index ? "default" : "ghost"}
                size="sm"
                className={`flex items-center h-8 px-3 ${activeIndex === index ? "bg-purple-600" : "text-gray-600"}`}
                onClick={() => {
                  setActiveIndex(index);
                  setIsPaused(true);
                }}
              >
                {dashboard.icon}
                <span className="ml-2 text-xs">{dashboard.name}</span>
              </Button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Button size="icon" variant="outline" className="h-7 w-7" onClick={handlePrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" className="h-7 w-7" onClick={handleNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-7 text-xs"
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? "Resume" : "Pause"}
            </Button>
          </div>
        </div>
        
        {/* Dashboard Preview */}
        <div className="relative overflow-hidden" style={{ height: "400px" }}>
          <div 
            className="transition-transform duration-700 ease-in-out flex"
            style={{ transform: `translateX(-${activeIndex * 100}%)`, width: `${dashboards.length * 100}%` }}
          >
            {/* Caregiver Dashboard */}
            <div className="w-full h-full flex-shrink-0">
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
            </div>
            
            {/* Care Seeker Dashboard */}
            <div className="w-full h-full flex-shrink-0">
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
            </div>
            
            {/* Admin Dashboard */}
            <div className="w-full h-full flex-shrink-0">
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
            </div>
          </div>
        </div>
        
        {/* Dashboard Bottom Description */}
        <div className="p-3 border-t bg-white">
          <p className="text-xs text-center text-gray-600">
            em.path provides specialized dashboard interfaces for caregivers, care recipients, and administrators.
          </p>
        </div>
        
        {/* Indicator Dots */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center space-x-1">
          {dashboards.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                activeIndex === index ? "bg-purple-600" : "bg-gray-300"
              }`}
              onClick={() => {
                setActiveIndex(index);
                setIsPaused(true);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardShowcase;
