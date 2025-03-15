import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import CaregiverLanding from "./pages/CaregiverLanding";
import CareSeekerLanding from "./pages/CareSeekerLanding";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import DocumentCapture from "./pages/onboarding/DocumentVerification";
import CareOnboarding from "./pages/care-seeker/Onboarding";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProfileReview from "./pages/onboarding/ProfileReview";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { PIATable } from "./components/admin/pia/PIATable";
import PIAProfile from "./pages/admin/PIAProfile";
import CareRecipientDashboard from "./components/care-seeker/dashboard/CareRecipientDashboard";
import CareProfile from "./pages/care-seeker/CareProfile";
import { AdminDashboardContent } from "./components/admin/dashboard/AdminDashboardContent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/for-caregivers" element={<CaregiverLanding />} />
          <Route path="/for-care-seekers" element={<CareSeekerLanding />} />
          <Route path="/auth/caregiver" element={<Auth />} />
          <Route path="/auth/care-seeker" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/onboarding/documents" element={<DocumentCapture />} />
          <Route path="/onboarding/profile" element={<ProfileReview />} />
          <Route path="/care-seeker/onboarding" element={<CareOnboarding />} />
          <Route path="/care-seeker/dashboard" element={<CareRecipientDashboard />} />
          <Route path="/care-seeker/profile" element={<CareProfile />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          
          {/* Admin routes */}
          <Route path="/admin/*" element={<AdminDashboard />}>
            <Route index element={<AdminDashboardContent />} />
            <Route path="dashboard" element={<AdminDashboardContent />} />
            <Route path="pia-table" element={<PIATable />} />
            <Route path="pia/:id" element={<PIAProfile />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
