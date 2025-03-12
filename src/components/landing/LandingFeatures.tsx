
import { Shield, MessageCircle, Heart, UserCheck } from "lucide-react";

export default function LandingFeatures() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-heading-2 text-gray-900 mb-6">What makes em.path different</h2>
          <p className="text-body-large text-gray-600">We're revolutionizing care coordination through empathy and technology</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-soft hover:shadow-medium transition-all">
            <div className="w-14 h-14 bg-brand-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-purple-100 transition-colors">
              <Heart className="text-brand-purple-600 w-7 h-7" />
            </div>
            <h3 className="text-heading-3 text-gray-900 mb-3">Caregiver-First</h3>
            <p className="text-body text-gray-600">
              We value caregivers as professionals, offering fair pay, benefits, and growth opportunities.
            </p>
          </div>
          
          <div className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-soft hover:shadow-medium transition-all">
            <div className="w-14 h-14 bg-brand-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-purple-100 transition-colors">
              <Shield className="text-brand-purple-600 w-7 h-7" />
            </div>
            <h3 className="text-heading-3 text-gray-900 mb-3">Built on Trust</h3>
            <p className="text-body text-gray-600">
              Our verification process ensures quality care while maintaining a supportive community.
            </p>
          </div>
          
          <div className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-soft hover:shadow-medium transition-all">
            <div className="w-14 h-14 bg-brand-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-purple-100 transition-colors">
              <MessageCircle className="text-brand-purple-600 w-7 h-7" />
            </div>
            <h3 className="text-heading-3 text-gray-900 mb-3">Guided by Empathy</h3>
            <p className="text-body text-gray-600">
              Our platform fosters meaningful connections beyond just scheduling and payment.
            </p>
          </div>
          
          <div className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-soft hover:shadow-medium transition-all">
            <div className="w-14 h-14 bg-brand-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-purple-100 transition-colors">
              <UserCheck className="text-brand-purple-600 w-7 h-7" />
            </div>
            <h3 className="text-heading-3 text-gray-900 mb-3">Smart Matching</h3>
            <p className="text-body text-gray-600">
              Advanced AI ensures perfect caregiver-client matches based on needs and preferences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
