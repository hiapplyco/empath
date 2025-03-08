
export default function LandingTestimonials() {
  return (
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
  );
}
