
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Moon } from "lucide-react";

interface SleepCardProps {
  sleep: number[];
  setSleep: (value: number[]) => void;
}

const SleepCard = ({ sleep, setSleep }: SleepCardProps) => {
  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Moon className="w-5 h-5 text-blue-500" />
          <span>Sleep Quality</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Label className="text-sm text-gray-600 mb-4 block">
          Hours of sleep last night: {sleep[0]} hours
        </Label>
        <Slider
          value={sleep}
          onValueChange={setSleep}
          max={12}
          min={0}
          step={0.5}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>0h</span>
          <span>12h</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepCard;
