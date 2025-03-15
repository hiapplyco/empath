
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export const PIAStats = () => {
  const { data: stats } = useQuery({
    queryKey: ['pia-stats'],
    queryFn: async () => {
      const { data: total } = await supabase
        .from('professional_independent_aides')
        .select('count')
        .single();

      const { data: verified } = await supabase
        .from('professional_independent_aides')
        .select('count')
        .eq('verification_status', 'verified')
        .single();

      const { data: pending } = await supabase
        .from('professional_independent_aides')
        .select('count')
        .eq('verification_status', 'pending')
        .single();

      return {
        total: total?.count || 0,
        verified: verified?.count || 0,
        pending: pending?.count || 0
      };
    },
  });

  const statCards = [
    {
      title: 'Total PIAs',
      value: stats?.total || 0,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Verified',
      value: stats?.verified || 0,
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      title: 'Pending',
      value: stats?.pending || 0,
      icon: Clock,
      color: 'text-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {statCards.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="flex items-center p-6">
            <div className={`rounded-full p-3 bg-gray-100 mr-4 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
