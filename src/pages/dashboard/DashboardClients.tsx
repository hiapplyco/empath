
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

const DashboardClients = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Clients</h2>
      <Card>
        <CardHeader>
          <CardTitle>Active Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center text-slate-500">
              <User className="w-12 h-12 mb-2" />
              <p>Client list coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardClients;
