
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { TrendingUp, TrendingDown, Filter, Calendar, Download } from "lucide-react";

const History = () => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // Sample historical data
  const historyData = [
    {
      id: 1,
      date: "2024-06-10",
      sleep: 7.5,
      workHours: 8,
      mood: "good",
      socialInteraction: "medium",
      stressLevel: "Low",
      trend: "up"
    },
    {
      id: 2,
      date: "2024-06-09",
      sleep: 6,
      workHours: 10,
      mood: "okay",
      socialInteraction: "low",
      stressLevel: "Medium",
      trend: "down"
    },
    {
      id: 3,
      date: "2024-06-08",
      sleep: 8,
      workHours: 7,
      mood: "excellent",
      socialInteraction: "high",
      stressLevel: "Low",
      trend: "up"
    },
    {
      id: 4,
      date: "2024-06-07",
      sleep: 6.5,
      workHours: 9,
      mood: "poor",
      socialInteraction: "low",
      stressLevel: "High",
      trend: "down"
    },
    {
      id: 5,
      date: "2024-06-06",
      sleep: 7,
      workHours: 8.5,
      mood: "good",
      socialInteraction: "medium",
      stressLevel: "Medium",
      trend: "up"
    },
    {
      id: 6,
      date: "2024-06-05",
      sleep: 9,
      workHours: 6,
      mood: "excellent",
      socialInteraction: "high",
      stressLevel: "Low",
      trend: "up"
    },
  ];

  const getStressBadgeColor = (level: string) => {
    switch (level) {
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "High": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case "excellent": return "😊";
      case "good": return "🙂";
      case "okay": return "😐";
      case "poor": return "😕";
      case "terrible": return "😞";
      default: return "😐";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const filteredData = historyData.filter(entry => {
    if (filter === "all") return true;
    return entry.stressLevel.toLowerCase() === filter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Check-in History 📊</h1>
            <p className="text-lg text-gray-600">
              Track your mental wellness journey over time
            </p>
          </div>
          
          <div className="flex space-x-4">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by stress" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="low">Low Stress</SelectItem>
                <SelectItem value="medium">Medium Stress</SelectItem>
                <SelectItem value="high">High Stress</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-700">
                {filteredData.length}
              </div>
              <div className="text-sm text-blue-600">Total Check-ins</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-700">
                {filteredData.filter(d => d.stressLevel === "Low").length}
              </div>
              <div className="text-sm text-green-600">Low Stress Days</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-yellow-700">
                {filteredData.filter(d => d.stressLevel === "Medium").length}
              </div>
              <div className="text-sm text-yellow-600">Medium Stress Days</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-red-700">
                {filteredData.filter(d => d.stressLevel === "High").length}
              </div>
              <div className="text-sm text-red-600">High Stress Days</div>
            </CardContent>
          </Card>
        </div>

        {/* History Table */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Detailed History</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Sleep</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Work Hours</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Mood</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Social</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Stress Level</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((entry) => (
                    <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">
                          {formatDate(entry.date)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {entry.date}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900">
                          {entry.sleep}h
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900">
                          {entry.workHours}h
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                          <span className="capitalize text-gray-700">{entry.mood}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="capitalize text-gray-700">
                          {entry.socialInteraction}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStressBadgeColor(entry.stressLevel)}>
                          {entry.stressLevel}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          {entry.trend === "up" ? (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-500" />
                          )}
                          <span className={`ml-1 text-sm ${
                            entry.trend === "up" ? "text-green-600" : "text-red-600"
                          }`}>
                            {entry.trend === "up" ? "Improving" : "Declining"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No check-ins found for the selected filter.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Insights */}
        <Card className="mt-8 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50">
          <CardHeader>
            <CardTitle>📈 Weekly Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-700 mb-2">7.2h</div>
                <div className="text-sm text-purple-600">Average Sleep</div>
                <div className="text-xs text-green-600 flex items-center justify-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +0.3h improvement
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-700 mb-2">Low</div>
                <div className="text-sm text-purple-600">Most Common Stress</div>
                <div className="text-xs text-green-600 flex items-center justify-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  67% of days
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-700 mb-2">3.6/5</div>
                <div className="text-sm text-purple-600">Average Mood</div>
                <div className="text-xs text-green-600 flex items-center justify-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Stable trend
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default History;
