
export const moodMap: Record<string, number> = {
  excellent: 5,
  good: 4,
  okay: 3,
  poor: 2,
  terrible: 1,
};

export const socialMap: Record<string, number> = {
  high: 5,
  medium: 3,
  low: 1,
  none: 0,
};

export const moodOptions = [
  { value: "excellent", label: "Excellent", emoji: "😄" },
  { value: "good", label: "Good", emoji: "😊" },
  { value: "okay", label: "Okay", emoji: "😐" },
  { value: "poor", label: "Poor", emoji: "😞" },
  { value: "terrible", label: "Terrible", emoji: "😩" },
];

export const getStressColor = (score: string) => {
  switch (score) {
    case "Low":
      return "text-green-600 bg-green-100";
    case "Medium":
      return "text-yellow-600 bg-yellow-100";
    case "High":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export const getStressTips = (score: string) => {
  switch (score) {
    case "Low":
      return "Great job! You're managing stress well. Keep up the good habits and remember to maintain this balance.";
    case "Medium":
      return "You're doing okay, but there's room for improvement. Try some relaxation techniques or consider adjusting your routine.";
    case "High":
      return "It looks like you're experiencing high stress. Consider talking to someone, practicing mindfulness, or taking breaks throughout your day.";
    default:
      return "";
  }
};
