import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function LandingFooter() {
  return (
    <>
      {/* CTA Section */}
      <section className="bg-purple-100 py-16 mb-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-purple-900 mb-6">Ready to start your journey?</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Join our community where caregivers are valued and care recipients find perfect matches. Emma is ready to welcome you.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src="/empath-simple-logo.svg" 
              alt="em.path logo" 
              className="w-10 h-10 mr-2"
            />
            <span className="text-xl font-bold text-purple-800">em.path</span>
          </div>
          <div className="flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-purple-600">About Us</a>
            <a href="#" className="text-gray-600 hover:text-purple-600">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-purple-600">Terms</a>
            <a href="#" className="text-gray-600 hover:text-purple-600">Support</a>
            <a href="#" className="text-gray-600 hover:text-purple-600">Careers</a>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600">© {new Date().getFullYear()} em.path - Creating meaningful connections through empathetic care</p>
        </div>
      </footer>
    </>
  );
}
