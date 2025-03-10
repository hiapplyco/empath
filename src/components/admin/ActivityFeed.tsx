
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Heart, User } from 'lucide-react';

export const ActivityFeed = () => {
  const activities = [
    {
      type: 'caregiver',
      title: 'New Caregiver Onboarded',
      description: 'Sarah Johnson completed verification',
      time: '10:23 AM',
      icon: <Users className="text-purple-600 w-5 h-5" />,
      iconBg: 'bg-purple-100',
      actions: ['View Profile', 'Suggest Matches']
    },
    {
      type: 'match',
      title: 'Match Accepted',
      description: 'Robert Williams accepted care from Maria Garcia',
      time: '11:42 AM',
      icon: <Heart className="text-blue-600 w-5 h-5" />,
      iconBg: 'bg-blue-100',
      actions: ['View Details', 'Send Welcome Kit']
    },
    {
      type: 'recipient',
      title: 'New Care Request',
      description: 'Alice Thompson needs dementia care specialist',
      time: '1:15 PM',
      icon: <User className="text-amber-600 w-5 h-5" />,
      iconBg: 'bg-amber-100',
      actions: ['Review Request', 'Suggest Caregivers']
    }
  ];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform interactions</CardDescription>
          </div>
          <Button variant="outline" className="text-xs h-8">View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
              <div className={`w-10 h-10 ${activity.iconBg} rounded-full flex items-center justify-center mr-3 flex-shrink-0`}>
                {activity.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{activity.title}</h4>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
                <div className="flex mt-2">
                  {activity.actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      className={`text-sm text-purple-600 font-medium ${
                        actionIndex < activity.actions.length - 1 ? 'mr-4' : ''
                      }`}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
