
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const DashboardEarnings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Earnings & Benefits</h2>
      <Card>
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center text-slate-500">
              <DollarSign className="w-12 h-12 mb-2" />
              <p>Earnings details coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardEarnings;
