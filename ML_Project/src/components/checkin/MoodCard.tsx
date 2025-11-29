
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { moodOptions } from "@/utils/stressUtils";

interface MoodCardProps {
  mood: string;
  setMood: (value: string) => void;
}

const MoodCard = ({ mood, setMood }: MoodCardProps) => {
  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Heart className="w-5 h-5 text-red-500" />
          <span>Mood Rating</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-2">
          {moodOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setMood(option.value)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                mood === option.value
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="text-2xl mb-1">{option.emoji}</div>
              <div className="text-xs text-gray-600">
                {option.label}
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodCard;
