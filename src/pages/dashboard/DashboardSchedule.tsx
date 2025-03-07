
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const DashboardSchedule = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Schedule</h2>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Shifts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center text-slate-500">
              <Calendar className="w-12 h-12 mb-2" />
              <p>Calendar integration coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSchedule;
