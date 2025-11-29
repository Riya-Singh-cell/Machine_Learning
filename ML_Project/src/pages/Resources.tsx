
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Navbar from "@/components/Navbar";
import { ChevronDown, Phone, Video, Brain, Heart, ExternalLink } from "lucide-react";

const Resources = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const helplines = [
    { name: "National Suicide Prevention Lifeline", number: "988", description: "24/7 crisis support", country: "US" },
    { name: "SAMHSA National Helpline", number: "1-800-662-4357", description: "Mental health & substance abuse", country: "US" },
    { name: "Crisis Text Line", number: "Text HOME to 741741", description: "24/7 text-based crisis support", country: "US/UK/CA" },
    { name: "Vandrevala Foundation", number: "+91-9999-666-555", description: "Mental health helpline", country: "India" },
    { name: "NIMHANS", number: "+91-80-2699-5911", description: "National mental health institute", country: "India" },
    { name: "Samaritans", number: "116 123", description: "Free emotional support", country: "UK" },
  ];

  const exercises = [
    {
      title: "4-7-8 Breathing Technique",
      duration: "5 minutes",
      description: "A simple breathing exercise to reduce anxiety and promote relaxation.",
      steps: [
        "Exhale completely through your mouth",
        "Close your mouth and inhale through your nose for 4 counts",
        "Hold your breath for 7 counts",
        "Exhale through your mouth for 8 counts",
        "Repeat 3-4 cycles"
      ]
    },
    {
      title: "Progressive Muscle Relaxation",
      duration: "15-20 minutes",
      description: "Systematically tense and relax muscle groups to reduce physical tension.",
      steps: [
        "Start with your toes and work upward",
        "Tense each muscle group for 5 seconds",
        "Release and notice the relaxation",
        "Move to the next muscle group",
        "End with deep breathing"
      ]
    },
    {
      title: "5-4-3-2-1 Grounding Technique",
      duration: "3-5 minutes",
      description: "Use your senses to stay present and manage anxiety.",
      steps: [
        "5 things you can see",
        "4 things you can touch",
        "3 things you can hear",
        "2 things you can smell",
        "1 thing you can taste"
      ]
    }
  ];

  const resources = [
    {
      title: "WHO Mental Health",
      url: "https://www.who.int/health-topics/mental-health",
      description: "Global mental health information and resources"
    },
    {
      title: "NIMHANS",
      url: "https://nimhans.ac.in/",
      description: "India's premier mental health institution"
    },
    {
      title: "Mindspace",
      url: "https://mindspace.org.in/",
      description: "Mental health platform for young people in India"
    },
    {
      title: "Mental Health America",
      url: "https://www.mhanational.org/",
      description: "Mental health advocacy and resources"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mental Health Resources 📚</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access professional help, learn self-care techniques, and understand how our AI works to support your mental wellness journey.
          </p>
        </div>

        <div className="space-y-8">
          {/* Mental Health Helplines */}
          <Collapsible>
            <CollapsibleTrigger 
              onClick={() => toggleSection('helplines')}
              className="w-full"
            >
              <Card className="border-0 shadow-lg bg-gradient-to-r from-red-50 to-pink-50 hover:shadow-xl transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <span>Emergency Mental Health Helplines</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openSections.includes('helplines') ? 'rotate-180' : ''}`} />
                  </CardTitle>
                </CardHeader>
              </Card>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                {helplines.map((helpline, index) => (
                  <Card key={index} className="border border-red-200 bg-white">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{helpline.name}</h4>
                          <p className="text-lg font-bold text-red-600 my-1">{helpline.number}</p>
                          <p className="text-sm text-gray-600">{helpline.description}</p>
                          <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-xs rounded-full">
                            {helpline.country}
                          </span>
                        </div>
                        <Button size="sm" variant="outline" className="border-red-300 text-red-600">
                          Call
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Self-Care Exercises */}
          <Collapsible>
            <CollapsibleTrigger 
              onClick={() => toggleSection('exercises')}
              className="w-full"
            >
              <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50 hover:shadow-xl transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <span>Self-Care & Breathing Exercises</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openSections.includes('exercises') ? 'rotate-180' : ''}`} />
                  </CardTitle>
                </CardHeader>
              </Card>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-4 space-y-4">
                {exercises.map((exercise, index) => (
                  <Card key={index} className="border border-green-200 bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-lg">{exercise.title}</span>
                        <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                          {exercise.duration}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{exercise.description}</p>
                      <div className="space-y-2">
                        <h5 className="font-semibold text-gray-900">Steps:</h5>
                        <ol className="list-decimal list-inside space-y-1 text-gray-600">
                          {exercise.steps.map((step, stepIndex) => (
                            <li key={stepIndex}>{step}</li>
                          ))}
                        </ol>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                          <Video className="w-4 h-4 mr-2" />
                          Watch Video
                        </Button>
                        <Button size="sm" variant="outline">
                          Start Exercise
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* AI Explainer */}
          <Collapsible>
            <CollapsibleTrigger 
              onClick={() => toggleSection('ai')}
              className="w-full"
            >
              <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-indigo-50 hover:shadow-xl transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <span>How Our AI Works</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openSections.includes('ai') ? 'rotate-180' : ''}`} />
                  </CardTitle>
                </CardHeader>
              </Card>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card className="mt-4 border border-purple-200 bg-white">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">🧠 Stress Prediction Algorithm</h4>
                      <p className="text-gray-600">
                        Our AI model analyzes patterns in your sleep, work hours, mood, and social interactions 
                        to calculate stress levels. It uses machine learning to identify correlations between 
                        lifestyle factors and mental wellness.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">🔒 Privacy & Security</h4>
                      <p className="text-gray-600">
                        All your data is encrypted and stored securely. We never share personal information 
                        with third parties. Our AI runs locally on our servers to ensure maximum privacy.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">📊 Data Points Analyzed</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Sleep quality and duration patterns</li>
                        <li>Work-life balance indicators</li>
                        <li>Mood variations over time</li>
                        <li>Social interaction frequency</li>
                        <li>Response patterns to interventions</li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Important:</strong> Our AI is a supportive tool and should not replace 
                        professional mental health care. Always consult healthcare providers for serious concerns.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>

          {/* External Resources */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
                <span>Professional Resources & Organizations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {resources.map((resource, index) => (
                  <Card key={index} className="border border-blue-200 hover:border-blue-300 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                        </div>
                        <Button size="sm" variant="outline" className="border-blue-300 text-blue-600">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Resources;
