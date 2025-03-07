
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  useAuthRedirect();

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Caregiver Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Welcome to your dashboard!</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
