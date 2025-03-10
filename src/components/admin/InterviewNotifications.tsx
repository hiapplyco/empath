
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const InterviewNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Subscribe to realtime updates for new interviews
    const channel = supabase
      .channel('interview-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'care_seeker_interviews'
        },
        (payload) => {
          setNotifications(prev => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">New Interview Notifications</h2>
      {notifications.map((notification) => (
        <Card key={notification.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">New Care Seeker Interview</h3>
              <p className="text-sm text-gray-500">
                {new Date(notification.created_at).toLocaleString()}
              </p>
            </div>
            <Badge variant="outline">{notification.status}</Badge>
          </div>
        </Card>
      ))}
    </div>
  );
};
