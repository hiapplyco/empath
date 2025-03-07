
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const DashboardKnowledge = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Knowledge Base</h2>
      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center text-slate-500">
              <BookOpen className="w-12 h-12 mb-2" />
              <p>Knowledge base coming soon</p>
            </div>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardKnowledge;
