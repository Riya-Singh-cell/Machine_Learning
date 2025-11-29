
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Heart, Brain, Shield, Users, Target, Award } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-blue-500" />,
      title: "AI-Powered Insights",
      description: "Advanced machine learning algorithms analyze your patterns to provide personalized mental health insights."
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: "Privacy First",
      description: "Your data is encrypted, secure, and never shared. We prioritize your privacy and confidentiality above all."
    },
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "Compassionate Design",
      description: "Every interaction is designed with empathy, creating a safe space for your mental wellness journey."
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: "Community Support",
      description: "Connect with others on similar journeys in a supportive, moderated environment."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Users", description: "People using MindEase daily" },
    { number: "500K+", label: "Check-ins", description: "Mental health assessments completed" },
    { number: "95%", label: "User Satisfaction", description: "Report improved self-awareness" },
    { number: "24/7", label: "Support", description: "Always available when you need us" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About MindEase</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We believe that mental health support should be accessible, compassionate, and personalized. 
            MindEase combines cutting-edge AI technology with human empathy to create a platform that 
            truly understands and supports your mental wellness journey.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-16 border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              To democratize mental health support by providing intelligent, personalized, and accessible 
              tools that help individuals understand, track, and improve their mental wellness. We're committed 
              to breaking down barriers to mental health care and creating a world where everyone has the 
              support they need to thrive.
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose MindEase?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <span>{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Impact by Numbers
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <Card className="mb-16 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-gray-900">
              How MindEase Works
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Daily Check-ins</h3>
                <p className="text-gray-600">
                  Complete quick assessments about your sleep, mood, work stress, and social interactions.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Analysis</h3>
                <p className="text-gray-600">
                  Our AI algorithms analyze your patterns and provide personalized stress level assessments.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Insights</h3>
                <p className="text-gray-600">
                  Receive tailored recommendations, track your progress, and access resources for improvement.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Values */}
        <Card className="mb-16 border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-gray-900">
              Our Values
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <Heart className="w-6 h-6 text-red-500" />
                  <h3 className="text-xl font-semibold text-gray-900">Empathy First</h3>
                </div>
                <p className="text-gray-600">
                  We design every feature with deep empathy for the mental health struggles people face daily.
                </p>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <Shield className="w-6 h-6 text-blue-500" />
                  <h3 className="text-xl font-semibold text-gray-900">Privacy & Trust</h3>
                </div>
                <p className="text-gray-600">
                  Your mental health data is sacred. We maintain the highest standards of privacy and security.
                </p>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <Target className="w-6 h-6 text-green-500" />
                  <h3 className="text-xl font-semibold text-gray-900">Evidence-Based</h3>
                </div>
                <p className="text-gray-600">
                  Our approaches are grounded in scientific research and validated mental health practices.
                </p>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <Award className="w-6 h-6 text-purple-500" />
                  <h3 className="text-xl font-semibold text-gray-900">Continuous Improvement</h3>
                </div>
                <p className="text-gray-600">
                  We constantly evolve our platform based on user feedback and the latest mental health research.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of people who are already improving their mental wellness with MindEase.
            </p>
            <div className="space-x-4">
              <a 
                href="/check-in" 
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Your First Check-in
              </a>
              <a 
                href="/resources" 
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Explore Resources
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
