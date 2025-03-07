
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Heart, Shield, Users, Star, MapPin, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              Senior Care Made <span className="text-primary">Simple</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Find the perfect care solution for your loved ones. Our personalized recommendations come at no cost to your family.
            </p>
            <div className="max-w-xl mx-auto">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter city or zip code"
                  className="text-lg h-12"
                />
                <Button size="lg" className="h-12">
                  <Search className="mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Shield}
              title="Trusted Network"
              description="Access our extensive network of vetted senior living communities and care providers."
            />
            <FeatureCard
              icon={Users}
              title="Expert Guidance"
              description="Get personalized support from our experienced advisors every step of the way."
            />
            <FeatureCard
              icon={Heart}
              title="Personalized Care"
              description="Find the perfect care solution tailored to your loved one's unique needs."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Stat number="12k+" label="Senior Living Communities" />
            <Stat number="4k+" label="Home Care Providers" />
            <Stat number="400k+" label="Consumer Reviews" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl font-bold">Ready to Find the Perfect Care Solution?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take our care assessment quiz and get personalized recommendations tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg">
              Take Care Quiz
              <ArrowRight className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              Browse Communities
              <MapPin className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => {
  return (
    <Card className="text-center p-6 hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

const Stat = ({ number, label }: { number: string, label: string }) => {
  return (
    <div className="space-y-2">
      <div className="text-4xl font-bold text-primary">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

export default Index;
