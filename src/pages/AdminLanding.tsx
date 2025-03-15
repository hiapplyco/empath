
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AdminLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-purple-900">
              Em.path Admin Portal
            </h1>
            <p className="text-xl text-gray-600">
              Empower caregiving relationships through data-driven matching and oversight
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-semibold text-purple-900 mb-4">
                Intelligent Matching
              </h2>
              <p className="text-gray-600 mb-4">
                Our advanced algorithms analyze over 50 data points to create optimal caregiver-recipient pairs, 
                considering factors like experience, specialties, personality traits, and scheduling compatibility.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  <span className="text-gray-700">95% match success rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  <span className="text-gray-700">Real-time compatibility scoring</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-semibold text-purple-900 mb-4">
                Quality Assurance
              </h2>
              <p className="text-gray-600 mb-4">
                Maintain high standards of care through comprehensive verification processes, 
                ongoing monitoring, and data-driven insights into care relationships.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  <span className="text-gray-700">Document verification system</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  <span className="text-gray-700">Performance analytics</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-6">
            <Button
              onClick={() => navigate("/admin/auth")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
            >
              Access Admin Dashboard
            </Button>
            <p className="text-sm text-gray-500">
              Secure access for authorized em.path administrators only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
