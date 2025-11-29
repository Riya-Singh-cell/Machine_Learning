import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { moodMap, socialMap } from "@/utils/stressUtils";

interface UseStressSubmissionProps {
  sleep: number[];
  workHours: number[];
  mood: string;
  socialInteraction: string;
  setStressScore: (score: string) => void;
  setStressMessage: (msg: string) => void;
  setShowResult: (show: boolean) => void;
}

export const useStressSubmission = ({
  sleep,
  workHours,
  mood,
  socialInteraction,
  setStressScore,
  setStressMessage, 
  setShowResult,
}: UseStressSubmissionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    console.log("🔄 Form submission started");

    if (!mood) {
      toast({
        title: "Missing Information",
        description: "Please select your mood rating.",
        variant: "destructive",
      });
      return;
    }

    if (!socialInteraction) {
      toast({
        title: "Missing Information",
        description: "Please select your social interaction level.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        sleep: sleep[0],
        work: workHours[0],
        support: socialMap[socialInteraction],
        mood: moodMap[mood],
      };

      console.log("📤 Sending payload:", payload);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch("http://localhost:5001/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("📊 Response data:", data);

      if (!data || typeof data.label === "undefined") {
        throw new Error("Invalid response format from server");
      }

      setStressScore(data.label);
      setStressMessage(data.message || "Take care, you're doing fine!"); // ✅ Save message
      setShowResult(true);

      toast({
        title: "Check-in completed! 🌟",
        description: "Your stress assessment is ready.",
      });

    } catch (error: any) {
      console.error("💥 Error:", error);

      let errorMessage = "An unknown error occurred.";

      if (error.name === 'AbortError') {
        errorMessage = "Request timed out. Make sure your Flask server is running.";
      } else if (error.message.includes("Failed to fetch") || error.message.includes("fetch")) {
        errorMessage = "❌ CORS or Network Error: Couldn’t connect to Flask server.\n\nMake sure:\n1. Flask is running\n2. It's on port 5001\n3. CORS is enabled";
      } else if (error.message.includes("status")) {
        errorMessage = `Server error: ${error.message}`;
      } else {
        errorMessage = error.message;
      }

      toast({
        title: "Connection Failed 🚫",
        description: errorMessage,
        variant: "destructive",
      });

    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading };
};
