import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Heart, Shield, TrendingUp, Users } from "lucide-react";
import { toast } from "@/components/ui/use-toast"; // Make sure this exists

const Index = () => {
  useEffect(() => {
    // 👀 Ping Flask API on mount to check connection
    const checkFlaskConnection = async () => {
      try {
        const res = await fetch("http://localhost:5001/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sleep: 0,
            work: 0,
            support: 0,
            mood: 0,
          }),
        });

        if (!res.ok) throw new Error("API responded with error");

        console.log("✅ Flask API connected!");
      } catch (error) {
        console.error("❌ Flask API unreachable:", error);
        toast({
          title: "Flask API Unreachable ❌",
          description: "Please make sure your backend server is running.",
          variant: "destructive",
        });
      }
    };

    checkFlaskConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Check in with yourself <span className="text-blue-500">today</span> 💙
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            MindEase helps you assess your mental well-being with a gentle AI model 
            trained to detect stress patterns and provide personalized insights.
          </p>

          {/* Hero Illustration */}
          <div className="mb-12 flex justify-center">
            <div className="w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-64 h-64 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full flex items-center justify-center">
                <Heart className="w-24 h-24 text-white animate-pulse" />
              </div>
            </div>
          </div>

          <Link to="/check-in">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Check-In ✨
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Your mental wellness journey, supported by AI
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Safe & Private</h3>
              <p className="text-gray-600">
                Your data is encrypted and private. We prioritize your safety and confidentiality above all.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Track Progress</h3>
              <p className="text-gray-600">
                Visualize your mental health trends over time with beautiful charts and insights.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Support</h3>
              <p className="text-gray-600">
                Connect with others on similar journeys in a supportive, moderated environment.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <Heart className="w-3 h-3 text-white" />
            </div>
            <span className="text-lg font-semibold">MindEase</span>
          </div>
          <p className="text-gray-400 mb-4">
            Supporting your mental wellness journey, one check-in at a time.
          </p>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} MindEase. Made with 💙 for mental health awareness.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
