import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { useAdminAuth } from "@/hooks/use-admin-auth";

const AdminAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isAdmin } = useAdminAuth();

  // If user is already authenticated as admin, redirect to dashboard
  if (isAdmin) {
    navigate('/admin/dashboard');
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (!session) {
        throw new Error('No session after login');
      }

      // Check if user is admin using our RPC function
      const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin', {
        user_id: session.user.id
      });

      if (adminError) {
        console.error('Admin check error:', adminError);
        throw new Error('Error checking admin status');
      }

      if (!isAdmin) {
        throw new Error('Not authorized as admin');
      }

      toast.success('Welcome back, admin!');
      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple
