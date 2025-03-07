
import { Button } from "@/components/ui/button";
import { Heart, Menu } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">em.path</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </a>
            <a href="/caregivers" className="text-gray-600 hover:text-gray-900 transition-colors">
              Find Caregivers
            </a>
            <a href="/careers" className="text-gray-600 hover:text-gray-900 transition-colors">
              Become a Caregiver
            </a>
            <Button size="sm">Sign In</Button>
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
              <a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                About
              </a>
              <a href="/caregivers" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                Find Caregivers
              </a>
              <a href="/careers" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                Become a Caregiver
              </a>
              <div className="px-4">
                <Button className="w-full">Sign In</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
