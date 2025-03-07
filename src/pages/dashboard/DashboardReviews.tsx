
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const DashboardReviews = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reviews</h2>
      <Card>
        <CardHeader>
          <CardTitle>Client Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center text-slate-500">
              <Star className="w-12 h-12 mb-2" />
              <p>Reviews coming soon</p>
            </div>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardReviews;
