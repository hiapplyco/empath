
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import LandingFooter from "@/components/landing/LandingFooter";

export default function Stories() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Navbar />
      <div className="pt-24 pb-16">
        {/* Header Section */}
        <section className="container mx-auto px-6 mb-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6 text-center">
            Stories: The Heart of em.path
          </h1>
          <p className="text-lg text-gray-700 mb-8 text-center">
            At em.path, we believe that caregiving is fundamentally about human connection. 
            Behind every match we facilitate are real people with unique stories, challenges, 
            and triumphs. These stories showcase how our platform is transforming caregiving 
            relationships through empathy, technology, and genuine understanding.
          </p>
        </section>

        {/* Maria's Story */}
        <section className="container mx-auto px-6 mb-20 max-w-4xl">
          <h2 className="text-3xl font-bold text-purple-800 mb-6">
            A Caregiver's Journey: Maria's Story
          </h2>
          
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="/lovable-uploads/67be2b5c-df2a-49b7-8aee-8ae0f1050e14.png"
              alt="Maria, a professional caregiver with her care recipient"
              className="w-full h-auto object-cover"
            />
          </div>
          
          <Card className="mb-6 border-purple-100 bg-purple-50 shadow-sm">
            <CardContent className="p-6">
              <blockquote className="text-xl italic text-purple-900">
                "em.path sees me as a whole person, not just a list of qualifications. For the first time, I feel truly valued for my approach to caregiving."
              </blockquote>
            </CardContent>
          </Card>
          
          <div className="space-y-4 text-gray-700">
            <p>
              When Maria Rodriguez moved to the United States from the Philippines five years ago, she brought with her a decade of caregiving experience and a profound dedication to elder care. Despite her expertise, she struggled to find opportunities that matched her unique skills and approach.
            </p>
            <p>
              "Before em.path, I was constantly underemployed," Maria recalls. "Agencies would send me to homes where there wasn't a good personality match, or where my specialized dementia care training wasn't needed. I felt like just another name on a list."
            </p>
            <p>
              Everything changed when Maria joined em.path. During her conversation with Emma, the platform's digital assistant, she was asked not just about her certifications and availability, but about her caregiving philosophy, communication style, and what brought her joy in her work.
            </p>
            <p>
              "The onboarding process felt like someone was actually listening to me," she says. "Emma asked me questions that made me reflect on why I do this work and what makes me unique as a caregiver."
            </p>
            <p>
              Within two weeks, Maria was matched with the Patel family, who needed specialized memory care for their grandmother with cultural sensitivity to her Indian heritage. Maria's experience with diverse cultural traditions and her patient, relationship-focused approach made her an ideal match.
            </p>
            <p>
              "With em.path, I earn 30% more than I did through traditional agencies, set my own schedule, and work with families where I can make a real difference," Maria explains. "The platform handles all the administrative work so I can focus on providing care."
            </p>
            <p>
              Today, Maria serves as a mentor to new caregivers on the platform, sharing her expertise while continuing her own professional development through em.path's specialized training programs.
            </p>
            <p>
              "This isn't just a job anymore—it's a career with purpose and growth. I'm respected as a professional and matched with families who value my specific approach to caregiving."
            </p>
          </div>
        </section>

        {/* Henderson Family Story */}
        <section className="container mx-auto px-6 mb-20 max-w-4xl">
          <h2 className="text-3xl font-bold text-purple-800 mb-6">
            Finding the Perfect Match: The Henderson Family Story
          </h2>
          
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="/lovable-uploads/88e5b10a-973c-4dc4-a68a-0125eccdd283.png"
              alt="Robert Henderson and his daughter Sarah discussing care options for his wife"
              className="w-full h-auto object-cover"
            />
          </div>
          
          <Card className="mb-6 border-purple-100 bg-purple-50 shadow-sm">
            <CardContent className="p-6">
              <blockquote className="text-xl italic text-purple-900">
                "After months of stressful searching, em.path found us a caregiver who feels like she was meant to be part of our family."
              </blockquote>
            </CardContent>
          </Card>
          
          <div className="space-y-4 text-gray-700">
            <p>
              When Robert Henderson's wife Elaine was diagnosed with Parkinson's disease, their daughter Sarah knew they needed in-home support. As a busy professional living two states away, Sarah was overwhelmed by the responsibility of finding the right care for her mother.
            </p>
            <p>
              "The traditional agencies sent us caregivers based on availability, not compatibility," Sarah explains. "One caregiver was qualified on paper but spoke so softly that my mom, who has hearing loss, couldn't communicate with her at all."
            </p>
            <p>
              Sarah discovered em.path through a support group for families dealing with Parkinson's. The platform's approach immediately felt different.
            </p>
            <p>
              "Instead of filling out endless forms, we had a conversation with Emma, who asked thoughtful questions about mom's needs, preferences, and personality," Sarah recalls. "We talked about how mom was a former English professor who loves discussing books, her preference for quiet mornings, and her fear of losing her independence."
            </p>
            <p>
              Based on this detailed profile, em.path recommended three potential caregivers, highlighting why each would be a good match. The family connected with Teresa, whose patient communication style and background in education created an immediate bond with Elaine.
            </p>
            <p>
              "Teresa doesn't just help mom with daily tasks—she engages her mind through literary discussions and helps her maintain dignity in difficult moments," says Robert. "She understands how to support Elaine on bad days and when to step back and encourage independence on good ones."
            </p>
            <p>
              The platform's care coordination tools allow Sarah to stay connected despite the distance. "I can see updates on mom's care, communicate with Teresa, and coordinate with dad—all in one place. It's given us peace of mind we didn't think was possible."
            </p>
            <p>
              For the Hendersons, em.path transformed a stressful situation into a supportive care relationship built on genuine connection. "Finding Teresa wasn't just about finding help—it was about finding the right person who understands and respects who mom is as a person."
            </p>
          </div>
        </section>

        {/* Sunrise Senior Services Story */}
        <section className="container mx-auto px-6 mb-20 max-w-4xl">
          <h2 className="text-3xl font-bold text-purple-800 mb-6">
            Revolutionizing Care Coordination: Sunrise Senior Services' Story
          </h2>
          
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="/lovable-uploads/0ae1d5c4-e7ee-4402-8678-c6393222e584.png"
              alt="The Sunrise Senior Services team using em.path's agency dashboard"
              className="w-full h-auto object-cover"
            />
          </div>
          
          <Card className="mb-6 border-purple-100 bg-purple-50 shadow-sm">
            <CardContent className="p-6">
              <blockquote className="text-xl italic text-purple-900">
                "em.path has transformed how we connect clients with caregivers, improving satisfaction rates by 78% while reducing our administrative workload."
              </blockquote>
            </CardContent>
          </Card>
          
          <div className="space-y-4 text-gray-700">
            <p>
              Sunrise Senior Services has provided home care coordination for over 15 years. Despite their commitment to quality care, Chief Operations Officer Jamal Washington found their matching process inefficient and often misaligned with client needs.
            </p>
            <p>
              "We were using outdated systems—spreadsheets, paper forms, and basic scheduling software," Jamal explains. "Our care coordinators spent hours managing logistics instead of focusing on relationship quality."
            </p>
            <p>
              After implementing em.path's enterprise platform, Sunrise experienced a transformation in their operations and outcomes.
            </p>
            <p>
              "The difference was immediate," says Angela Rivera, Care Matching Director. "Instead of our previous 15-point assessment, clients and caregivers engage in natural conversations with Emma, revealing subtle preferences and compatibility factors we were missing before."
            </p>
            <p>
              The platform's AI-powered matching algorithm now suggests optimal caregiver-client pairings based on a sophisticated analysis of needs, personalities, cultural factors, and scheduling requirements. Care coordinators review these recommendations, adding their expertise to the final decision.
            </p>
            <p>
              "We've reduced the time spent on administrative tasks by 62%," Jamal notes. "More importantly, our match success rate has increased dramatically. Previously, about 40% of initial matches resulted in a client requesting a different caregiver within the first month. With em.path, that number is down to just 8%."
            </p>
            <p>
              The platform has also improved Sunrise's caregiver retention. "Our caregivers report higher job satisfaction because they're matched with clients where they can truly excel," Angela explains. "Our turnover rate has decreased by 34% since implementing em.path."
            </p>
            <p>
              For smaller agencies without extensive resources, em.path offers particular value. "The platform handles the complex technology and algorithms we could never develop independently," says Jamal. "We maintain our personal touch and relationships while leveraging sophisticated matching technology."
            </p>
            <p>
              Sunrise now uses em.path's data insights to identify gaps in their caregiver network, strategically recruiting professionals with specific skills, language capabilities, or cultural backgrounds to meet their community's needs.
            </p>
            <p>
              "em.path hasn't just improved our existing processes—it's completely transformed how we think about successful caregiving relationships," Jamal concludes. "We're providing better care while operating more efficiently than ever before."
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-12 mb-8 max-w-4xl bg-purple-100 rounded-xl">
          <h2 className="text-3xl font-bold text-purple-900 mb-6 text-center">
            Join the em.path Community
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8 text-center">
            These stories represent just a glimpse of how em.path is transforming caregiving through meaningful connections. Whether you're a caregiver seeking fulfilling work, a family searching for the perfect care match, or an organization striving to provide better care coordination, em.path offers a better way forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => navigate('/auth/caregiver')}
            >
              Become a Caregiver
            </Button>
            <Button
              variant="outline"
              className="border-purple-600 text-purple-700 hover:bg-purple-50"
              onClick={() => navigate('/auth/care-seeker')}
            >
              Find Care
            </Button>
            <Button
              variant="ghost"
              className="text-purple-700 hover:bg-purple-50"
              onClick={() => navigate('/admin')}
            >
              Partner with Us
            </Button>
          </div>
        </section>
      </div>
      
      <LandingFooter />
    </div>
  );
}
