
import { Card, CardContent } from "@/components/ui/card";
import { Brain } from "lucide-react";

const EmptyResults = () => {
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
      <CardContent className="text-center py-12">
        <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
        <p className="text-gray-500">
          Complete the assessment above to see your stress level and
          personalized recommendations.
        </p>
      </CardContent>
    </Card>
  );
};

export default EmptyResults;
