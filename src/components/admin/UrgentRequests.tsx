
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface UrgentRequest {
  title: string;
  description: string;
  priority: 'urgent' | 'high';
  action: string;
}

export const UrgentRequests = () => {
  const urgentRequests: UrgentRequest[] = [
    {
      title: 'Post-Surgery Care',
      description: 'Needed within 24 hours',
      priority: 'urgent',
      action: 'Process Now'
    },
    {
      title: 'Respite Care',
      description: 'Family emergency situation',
      priority: 'high',
      action: 'Review Request'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Urgent Requests</CardTitle>
        <CardDescription>Requiring immediate attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {urgentRequests.map((request, index) => (
            <div 
              key={index}
              className={`p-3 border rounded-lg ${
                request.priority === 'urgent' 
                  ? 'border-red-200 bg-red-50' 
                  : 'border-amber-200 bg-amber-50'
              }`}
            >
              <div className="flex justify-between">
                <h4 className={`font-medium ${
                  request.priority === 'urgent' ? 'text-red-800' : 'text-amber-800'
                }`}>
                  {request.title}
                </h4>
                <Badge className={`${
                  request.priority === 'urgent' ? 'bg-red-600' : 'bg-amber-600'
                }`}>
                  {request.priority === 'urgent' ? 'Urgent' : 'High Priority'}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">{request.description}</p>
              <div className="flex mt-2">
                <Button 
                  variant="link" 
                  className={`text-xs font-medium h-auto p-0 ${
                    request.priority === 'urgent' ? 'text-red-600' : 'text-amber-600'
                  }`}
                >
                  {request.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
