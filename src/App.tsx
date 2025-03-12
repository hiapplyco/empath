
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import CareRecipientDashboard from "./components/care-seeker/dashboard/CareRecipientDashboard";
import CareProfile from "./pages/care-seeker/CareProfile";

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
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
