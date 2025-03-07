
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { ArrowRight, Heart, Shield, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 animate-fadeIn">
              Connecting Hearts, <span className="text-primary">Empowering Care</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 animate-slideUp">
              A caregiver-first platform that creates meaningful connections and supports those who dedicate their lives to caring for others.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slideUp">
              <Button size="lg" className="w-full sm:w-auto">
                Find a Caregiver
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Become a Caregiver
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <Feature
              icon={Shield}
              title="Verified Professionals"
              description="Every caregiver is thoroughly vetted and background-checked for your peace of mind."
            />
            <Feature
              icon={Users}
              title="Perfect Matches"
              description="Our intelligent matching system connects you with caregivers who match your specific needs."
            />
            <Feature
              icon={Heart}
              title="Compassionate Care"
              description="Experience care that goes beyond the basics, delivered with genuine compassion."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Experience Better Care?</h2>
          <Button size="lg">
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

const Feature = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => {
  return (
    <div className="text-center p-6">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Index;
