
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="/empath-simple-logo.svg" alt="empath logo" className="h-6 w-6" />
              <span className="text-xl font-semibold">em.path</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link to="/caregivers" className="text-gray-600 hover:text-gray-900 transition-colors">
              Find Caregivers
            </Link>
            <Link to="/careers" className="text-gray-600 hover:text-gray-900 transition-colors">
              Become a Caregiver
            </Link>
            <Link to="/auth">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fadeIn">
            <div className="flex flex-col gap-4">
              <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                About
              </Link>
              <Link to="/caregivers" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                Find Caregivers
              </Link>
              <Link to="/careers" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                Become a Caregiver
              </Link>
              <div className="px-4">
                <Link to="/auth">
                  <Button className="w-full">Sign In</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
