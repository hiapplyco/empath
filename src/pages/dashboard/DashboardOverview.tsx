
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Clock, 
  Calendar, 
  Star, 
  DollarSign, 
  MessageSquare, 
  Award,
  BookOpen,
  Heart
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardOverview = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['caregiver-metrics'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('caregiver_metrics')
        .select('*')
        .eq('caregiver_id', user.id)
        .maybeSingle();

      if (error) throw error;
      console.log('Fetched metrics:', data);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-[140px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[100px]" />
                <Skeleton className="h-4 w-[160px] mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-500 text-sm font-medium">Today's Shifts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-2xl font-bold">{metrics?.todays_shifts || 0}</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              {metrics?.next_shift_client ? 
                `Next: ${metrics.next_shift_client} at ${new Date(metrics.next_shift_time).toLocaleTimeString()}` : 
                'No upcoming shifts'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-500 text-sm font-medium">Weekly Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-2xl font-bold">{metrics?.weekly_hours || 0}</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              {metrics?.remaining_weekly_hours || 0} hours remaining
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-500 text-sm font-medium">Current Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="text-2xl font-bold">{metrics?.average_rating || 'N/A'}</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">{metrics?.total_reviews || 0} client reviews</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-500 text-sm font-medium">Monthly Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-green-600 mr-1" />
              <span className="text-2xl font-bold">{metrics?.monthly_earnings || 0}</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Next payment: {metrics?.next_payment_date ? 
                new Date(metrics.next_payment_date).toLocaleDateString() : 
                'Not scheduled'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-500 text-sm font-medium">Pending Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-2xl font-bold">{metrics?.pending_messages || 0}</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">Unread messages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-500 text-sm font-medium">Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Award className="w-5 h-5 text-indigo-600 mr-2" />
              <span className="text-2xl font-bold">{metrics?.certifications_count || 0}</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">Active certifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-500 text-sm font-medium">Training Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookOpen className="w-5 h-5 text-orange-600 mr-2" />
              <span className="text-2xl font-bold">{metrics?.completed_trainings || 0}</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">Completed modules</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-500 text-sm font-medium">Care Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Heart className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-2xl font-bold">
                {((metrics?.total_reviews || 0) + (metrics?.completed_trainings || 0))}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">Lives impacted</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
