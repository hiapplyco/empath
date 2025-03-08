
export default function LandingHowItWorks() {
  return (
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
  );
}
