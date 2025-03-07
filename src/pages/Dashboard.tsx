
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, Star, DollarSign } from "lucide-react";

const Dashboard = () => {
  useAuthRedirect();

  return (
    <DashboardShell>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-6 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
          <TabsTrigger value="clients">Client Information</TabsTrigger>
          <TabsTrigger value="earnings">Earnings & Benefits</TabsTrigger>
          <TabsTrigger value="growth">Professional Growth</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Center</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-500 text-sm font-medium">Today's Shifts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-2xl font-bold">2</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">Next: Mr. Johnson at 2pm</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-500 text-sm font-medium">Weekly Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-2xl font-bold">18.5</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">6.5 hours remaining</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-500 text-sm font-medium">Current Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="text-2xl font-bold">4.9</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">28 client reviews</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-500 text-sm font-medium">Earnings This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-green-600 mr-1" />
                  <span className="text-2xl font-bold">1,320</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">Next: March 15</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
};

export default Dashboard;
