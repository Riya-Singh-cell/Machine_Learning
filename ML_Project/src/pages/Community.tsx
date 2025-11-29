
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { MessageCircle, Heart, Users, Shield, Clock, Lightbulb } from "lucide-react";

const Community = () => {
  const discussions = [
    {
      id: 1,
      title: "Managing work stress during busy seasons",
      author: "Sarah K.",
      replies: 23,
      likes: 45,
      time: "2 hours ago",
      tag: "Work Stress",
      preview: "I've been struggling with increased workload lately and wondering how others cope..."
    },
    {
      id: 2,
      title: "Sleep hygiene tips that actually work",
      author: "Mike R.",
      replies: 18,
      likes: 67,
      time: "5 hours ago",
      tag: "Sleep Health",
      preview: "After months of poor sleep, I finally found some techniques that help. Here's what worked..."
    },
    {
      id: 3,
      title: "Dealing with social anxiety in new environments",
      author: "Alex P.",
      replies: 31,
      likes: 89,
      time: "1 day ago",
      tag: "Social Anxiety",
      preview: "Starting a new job has been challenging for my social anxiety. Looking for support and tips..."
    },
    {
      id: 4,
      title: "Meditation apps vs. traditional meditation",
      author: "Jamie L.",
      replies: 12,
      likes: 34,
      time: "2 days ago",
      tag: "Mindfulness",
      preview: "Curious about everyone's experience with different meditation approaches..."
    }
  ];

  const supportGroups = [
    {
      name: "Students & Academic Stress",
      members: 1247,
      description: "Support for students dealing with academic pressure, exam anxiety, and school-life balance.",
      activity: "Very Active"
    },
    {
      name: "Working Professionals",
      members: 2156,
      description: "Workplace stress, career anxiety, and work-life balance discussions.",
      activity: "Active"
    },
    {
      name: "New Parents Support",
      members: 834,
      description: "Mental health support for new parents navigating life changes.",
      activity: "Active"
    },
    {
      name: "Mindfulness & Meditation",
      members: 1891,
      description: "Share meditation experiences, techniques, and mindfulness practices.",
      activity: "Very Active"
    }
  ];

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "Work Stress": return "bg-red-100 text-red-800";
      case "Sleep Health": return "bg-blue-100 text-blue-800";
      case "Social Anxiety": return "bg-purple-100 text-purple-800";
      case "Mindfulness": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Support 🤝</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with others on similar mental wellness journeys. Share experiences, find support, 
            and grow together in a safe, moderated environment.
          </p>
        </div>

        {/* Community Guidelines */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-500" />
              <span>Community Guidelines</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Be Kind & Supportive</h3>
                <p className="text-sm text-gray-600">Every member deserves respect and compassion</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Maintain Privacy</h3>
                <p className="text-sm text-gray-600">Protect your privacy and respect others'</p>
              </div>
              <div className="text-center">
                <Lightbulb className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Share Constructively</h3>
                <p className="text-sm text-gray-600">Focus on helpful, positive contributions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Discussions */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    <span>Recent Discussions</span>
                  </CardTitle>
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                    New Discussion
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <div key={discussion.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                          {discussion.title}
                        </h3>
                        <Badge className={getTagColor(discussion.tag)}>
                          {discussion.tag}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{discussion.preview}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span>by {discussion.author}</span>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{discussion.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-3 h-3" />
                            <span>{discussion.replies} replies</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{discussion.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline" className="w-full">
                    Load More Discussions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Support Groups */}
          <div>
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-purple-500" />
                  <span>Support Groups</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportGroups.map((group, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900 text-sm">{group.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {group.activity}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{group.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Users className="w-3 h-3 mr-1" />
                        <span>{group.members.toLocaleString()} members</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4 text-sm">
                  Browse All Groups
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask for Support
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <Heart className="w-4 h-4 mr-2" />
                  Share Success Story
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Share a Tip
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Community Stats */}
        <Card className="mt-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-center text-gray-900 mb-6">
              Community Impact
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">5,247</div>
                <div className="text-sm text-gray-600">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">892</div>
                <div className="text-sm text-gray-600">Support Stories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">12K+</div>
                <div className="text-sm text-gray-600">Helpful Responses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">98%</div>
                <div className="text-sm text-gray-600">Feel Supported</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Community;
