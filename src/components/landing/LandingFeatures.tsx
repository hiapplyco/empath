
import { Shield, MessageCircle } from "lucide-react";

export default function LandingFeatures() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">What makes em.path different</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-purple-50 p-8 rounded-xl text-center">
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-purple-600 w-7 h-7" />
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
  );
}
