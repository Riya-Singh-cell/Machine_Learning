
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Briefcase } from "lucide-react";

interface WorkCardProps {
  workHours: number[];
  setWorkHours: (value: number[]) => void;
}

const WorkCard = ({ workHours, setWorkHours }: WorkCardProps) => {
  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Briefcase className="w-5 h-5 text-purple-500" />
          <span>Work Load</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Label className="text-sm text-gray-600 mb-4 block">
          Work hours today: {workHours[0]} hours
        </Label>
        <Slider
          value={workHours}
          onValueChange={setWorkHours}
          max={16}
          min={0}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>0h</span>
          <span>16h</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkCard;
