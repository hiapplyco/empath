
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

const DashboardGrowth = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Professional Growth</h2>
      <Card>
        <CardHeader>
          <CardTitle>Learning Path</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center text-slate-500">
              <Award className="w-12 h-12 mb-2" />
              <p>Growth tracking coming soon</p>
            </div>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardGrowth;
