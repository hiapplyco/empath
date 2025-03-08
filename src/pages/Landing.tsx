import { Button } from "@/components/ui/button";
import { Calendar, Award, Shield, MessageCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const handleAuthNavigation = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-50 to-white font-sans">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/empath-simple-logo.svg" 
            alt="em.path logo" 
            className="w-10 h-10 mr-2"
          />
          <span className="text-2xl font-bold text-purple-800">em.path</span>
        </div>
        <div className="hidden md:flex space-x-6 text-purple-800">
          <a href="#how-it-works" className="hover:text-purple-600 transition-colors">How It Works</a>
          <a href="#for-caregivers" className="hover:text-purple-600 transition-colors">For Caregivers</a>
          <a href="#testimonials" className="hover:text-purple-600 transition-colors">Stories</a>
          <a href="#about" className="hover:text-purple-600 transition-colors">About Us</a>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="border-purple-600 text-purple-700 hover:bg-purple-50"
            onClick={handleAuthNavigation}
          >
            Log in
          </Button>
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={handleAuthNavigation}
          >
            Sign up
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 leading-tight">
            Care that <span className="text-purple-600">connects</span> on a human level
          </h1>
          <p className="text-lg text-gray-700">
            em.path brings caregivers and care recipients together through empathy, understanding, and support—creating relationships that truly matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white py-6 px-8 rounded-xl shadow-md">
              I need a caregiver
            </Button>
            <Button 
              variant="outline" 
              className="border-purple-600 text-purple-700 hover:bg-purple-50 py-6 px-8 rounded-xl"
              onClick={handleAuthNavigation}
            >
              I'm a caregiver
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-lg h-80">
          <img 
            src="https://upbnysrcdcpumjyjhysy.supabase.co/storage/v1/object/public/assets//image_fx_%20(20).jpg"
            alt="Caregiver and client sharing a moment"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Values/Benefits Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">What makes em.path different</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-purple-50 p-8 rounded-xl text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-purple-600 w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-purple-800 mb-3">Caregiver-First Approach</h3>
              <p className="text-gray-700">
                We value caregivers as professionals, offering fair pay, benefits, and growth opportunities.
              </p>
            </div>
            <div className="bg-purple-50 p-8 rounded-xl text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-purple-600 w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-purple-800 mb-3">Built on Trust</h3>
              <p className="text-gray-700">
                Our verification process ensures quality care while maintaining a supportive community.
              </p>
            </div>
            <div className="bg-purple-50 p-8 rounded-xl text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-purple-600 w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-purple-800 mb-3">Guided by Empathy</h3>
              <p className="text-gray-700">
                Our platform fosters meaningful connections beyond just scheduling and payment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">How em.path works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold text-purple-800 mb-3 text-center">Share Your Story</h3>
            <p className="text-gray-700 text-center">
              Create your profile with Emma, our friendly assistant who guides you through a conversation, not a form.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold text-purple-800 mb-3 text-center">Find Your Match</h3>
            <p className="text-gray-700 text-center">
              Our thoughtful matching considers skills, personality, and preferences—not just availability.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold text-purple-800 mb-3 text-center">Grow Together</h3>
            <p className="text-gray-700 text-center">
              Build relationships while accessing tools for scheduling, communication, and professional development.
            </p>
          </div>
        </div>
      </section>

      {/* For Caregivers Section */}
      <section id="for-caregivers" className="bg-purple-50 py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-md h-80">
              <img 
                src="https://upbnysrcdcpumjyjhysy.supabase.co/storage/v1/object/public/assets//image_fx_%20(21).jpg"
                alt="Caregiver using the em.path platform"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-purple-900">For caregivers, by caregivers</h2>
              <p className="text-gray-700">
                We built em.path with caregivers at the center, creating tools that respect your time, skills, and wellbeing.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="ml-3 text-gray-700">Simple, streamlined onboarding through natural conversation</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="ml-3 text-gray-700">Professional development resources and certification tracking</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="ml-3 text-gray-700">Fair compensation and transparent payment processing</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="ml-3 text-gray-700">Community support and mentorship opportunities</p>
                </div>
              </div>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={handleAuthNavigation}
              >
                Join as a caregiver
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">Stories from our community</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-purple-600 font-bold">S</span>
              </div>
              <div>
                <h3 className="font-bold text-purple-800">Sarah T.</h3>
                <p className="text-sm text-gray-600">Caregiver, 5 years experience</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "em.path understands what caregivers need. The platform respects my time, highlights my skills, and connects me with clients who truly value what I bring to their lives. I feel part of a supportive community for the first time in my career."
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-purple-600 font-bold">J</span>
              </div>
              <div>
                <h3 className="font-bold text-purple-800">James M.</h3>
                <p className="text-sm text-gray-600">Care recipient's son</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "Finding the right caregiver for my father was overwhelming until we found em.path. The thoughtful matching process introduced us to Maria, who's become like family. The platform makes communication and scheduling so simple, giving us peace of mind."
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-100 py-16 mb-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-purple-900 mb-6">Ready to start your journey?</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Join our community where caregivers are valued and care recipients find perfect matches. Emma is ready to welcome you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white py-6 px-8 rounded-xl shadow-md text-lg"
              onClick={handleAuthNavigation}
            >
              Get started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              className="border-purple-600 text-purple-700 hover:bg-purple-200 py-6 px-8 rounded-xl text-lg"
              onClick={handleAuthNavigation}
            >
              Learn more
            </Button>
          </div>
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
    </div>
  );
}
