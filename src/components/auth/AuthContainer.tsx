
import { ReactNode } from "react";
import { Link } from "react-router-dom";

type AuthContainerProps = {
  children: ReactNode;
  isCaregiver: boolean;
};

export const AuthContainer = ({ children, isCaregiver }: AuthContainerProps) => {
  return (
    <div className="flex h-screen bg-slate-50">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-purple-500 to-purple-800 justify-center items-center p-12">
        <div className="max-w-xl">
          <img src="/emma.png" alt="Emma AI assistant" className="rounded-2xl shadow-2xl mb-8" />
          <h2 className="text-3xl font-bold text-white mb-4">Meet Emma, your AI onboarding assistant</h2>
          <p className="text-white/80 text-lg">
            Emma helps match you with the right caregiving opportunities through a simple conversation. No resumes required!
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img src="/empath-simple-logo.svg" alt="empath logo" className="h-12 w-12" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome to em.path
            </h2>
            <p className="mt-2 text-gray-600">
              {isCaregiver 
                ? "Join our community of caregivers making a difference" 
                : "Find the perfect caregiver for your needs"}
            </p>
          </div>
          
          {children}
          
          <div className="mt-6 text-center text-sm">
            <p>
              {isCaregiver ? "Not a caregiver? " : "Not looking for care? "}
              <Link 
                to={isCaregiver ? "/auth" : "/auth?role=caregiver"} 
                className="text-purple-600 hover:text-purple-800"
              >
                {isCaregiver ? "I'm looking for care" : "I'm a caregiver"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
