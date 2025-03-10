
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend: string;
  trendType: 'positive' | 'negative' | 'warning';
}

export const StatCard = ({ title, value, icon, trend, trendType }: StatCardProps) => {
  const trendColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    warning: 'text-amber-600'
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <div className="mr-2">{icon}</div>
          <span className="text-2xl font-bold">{value}</span>
        </div>
        <p className={`text-sm ${trendColors[trendType]} mt-1`}>{trend}</p>
      </CardContent>
    </Card>
  );
};
