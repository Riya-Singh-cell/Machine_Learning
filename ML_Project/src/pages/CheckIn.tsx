import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import SleepCard from "@/components/checkin/SleepCard";
import WorkCard from "@/components/checkin/WorkCard";
import MoodCard from "@/components/checkin/MoodCard";
import SocialCard from "@/components/checkin/SocialCard";
import StressResults from "@/components/checkin/StressResults";
import EmptyResults from "@/components/checkin/EmptyResults";
import { useStressSubmission } from "@/hooks/useStressSubmission";

const CheckIn = () => {
  const [sleep, setSleep] = useState([7]);
  const [workHours, setWorkHours] = useState([8]);
  const [mood, setMood] = useState("");
  const [socialInteraction, setSocialInteraction] = useState("");
  const [stressScore, setStressScore] = useState<string | null>(null);
  const [stressMessage, setStressMessage] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const navigate = useNavigate(); // ✅ useNavigate hook

  const { handleSubmit, isLoading } = useStressSubmission({
    sleep,
    workHours,
    mood,
    socialInteraction,
    setStressScore,
    setStressMessage,
    setShowResult,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How are you feeling today, friend? 💙
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take a moment to check in with yourself. Your honest responses help
            us provide better insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <SleepCard sleep={sleep} setSleep={setSleep} />
            <WorkCard workHours={workHours} setWorkHours={setWorkHours} />
            <MoodCard mood={mood} setMood={setMood} />
            <SocialCard 
              socialInteraction={socialInteraction} 
              setSocialInteraction={setSocialInteraction} 
            />

            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? "Analyzing..." : "Show My Stress Score 🧠"}
            </Button>
          </div>

          {/* Result Section */}
          <div className="space-y-6">
            {showResult && stressScore ? (
              <>
                <StressResults
                  stressScore={stressScore}
                  stressMessage={stressMessage}
                />

                {/* ✅ Navigate to ToDoList */}
                <Button
  onClick={() =>
    navigate("/todo", { state: { stressScore: stressScore || "Low Stress" } })
  }
  className="w-full bg-pink-500 hover:bg-pink-600 text-white"
>
  Let's turn this energy into something amazing
</Button>

              </>
            ) : (
              <EmptyResults />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
