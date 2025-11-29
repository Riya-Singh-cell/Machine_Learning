
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Download, Calendar, Brain } from "lucide-react";

const Insights = () => {
  const [timeRange, setTimeRange] = useState("7days");

  // Sample data for charts
  const sleepStressData = [
    { date: "Mon", sleep: 7, stress: 30 },
    { date: "Tue", sleep: 6, stress: 45 },
    { date: "Wed", sleep: 8, stress: 20 },
    { date: "Thu", sleep: 7.5, stress: 25 },
    { date: "Fri", sleep: 6.5, stress: 40 },
    { date: "Sat", sleep: 9, stress: 15 },
    { date: "Sun", sleep: 8, stress: 18 },
  ];

  const moodData = [
    { name: "Excellent", value: 20, color: "#10B981" },
    { name: "Good", value: 35, color: "#3B82F6" },
    { name: "Okay", value: 25, color: "#F59E0B" },
    { name: "Poor", value: 15, color: "#EF4444" },
    { name: "Terrible", value: 5, color: "#DC2626" },
  ];

  const weeklyTrends = [
    { week: "Week 1", stress: 35, mood: 3.2 },
    { week: "Week 2", stress: 42, mood: 2.8 },
    { week: "Week 3", stress: 28, mood: 3.7 },
    { week: "Week 4", stress: 31, mood: 3.5 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Wellness Insights 📈</h1>
            <p className="text-lg text-gray-600">
              Track your mental health journey with visual analytics
            </p>
          </div>
          
          <div className="flex space-x-4">
            <div className="flex bg-white rounded-lg shadow-sm border">
              {["7days", "30days", "3months"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    timeRange === range
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {range === "7days" ? "7 Days" : range === "30days" ? "30 Days" : "3 Months"}
                </button>
              ))}
            </div>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Average Sleep</p>
                  <p className="text-2xl font-bold text-green-700">7.4h</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +0.5h from last week
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">😴</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Stress Level</p>
                  <p className="text-2xl font-bold text-blue-700">Medium</p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1 rotate-180" />
                    -5% improvement
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Mood Score</p>
                  <p className="text-2xl font-bold text-purple-700">3.4/5</p>
                  <p className="text-xs text-purple-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Stable this week
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">😊</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Check-ins</p>
                  <p className="text-2xl font-bold text-orange-700">21</p>
                  <p className="text-xs text-orange-600 flex items-center mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    This month
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">📝</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Sleep vs Stress Correlation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sleepStressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="sleep" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    name="Sleep (hours)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="stress" 
                    stroke="#EF4444" 
                    strokeWidth={3}
                    name="Stress Level"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Mood Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={moodData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {moodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Trends */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle>Monthly Wellness Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="stress" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  name="Stress Level"
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="Mood Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Insights Summary */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle>💡 Your Wellness Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🌟 Positive Patterns</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Your sleep quality has improved by 15% this month</li>
                  <li>• Weekends show consistently lower stress levels</li>
                  <li>• Regular check-ins correlate with better mood stability</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">⚠️ Areas for Improvement</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Midweek stress peaks suggest workload management needed</li>
                  <li>• Consider maintaining consistent sleep schedule</li>
                  <li>• Social interaction levels could be increased</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Insights;
