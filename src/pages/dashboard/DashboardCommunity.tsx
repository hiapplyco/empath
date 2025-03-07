
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const DashboardCommunity = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Community</h2>
      <Card>
        <CardHeader>
          <CardTitle>Discussion Board</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center text-slate-500">
              <MessageSquare className="w-12 h-12 mb-2" />
              <p>Community features coming soon</p>
            </div>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCommunity;
