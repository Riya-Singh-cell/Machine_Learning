import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { getStressColor, getStressTips } from "@/utils/stressUtils";
import { toast } from "@/hooks/use-toast";

interface StressResultsProps {
  stressScore: string;
  stressMessage?: string;
}

const StressResults = ({ stressScore, stressMessage }: StressResultsProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-indigo-500" />
            <span>Your Stress Assessment</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div
            className={`inline-block px-6 py-3 rounded-full text-xl font-bold ${getStressColor(
              stressScore
            )} mb-4`}
          >
            {stressScore}  Level
          </div>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {stressMessage || getStressTips(stressScore)}
          </p>
        </CardContent>
      </Card>

      <div className="mt-6 flex flex-col gap-4">
        
      </div>
    </>
  );
};


export default StressResults;