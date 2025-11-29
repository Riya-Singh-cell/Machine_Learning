// ✅ File: src/components/checkin/WellnessToDo.tsx
import { useState } from "react";

interface WellnessToDoProps {
  stressScore: string;
}

const taskMap: Record<string, string[]> = {
  "Low Stress": [
    "💚 Stretch for 5 mins on your mat",
    "🌿 Take a mindful walk outside",
    "☕ Enjoy a warm cup of herbal tea",
  ],
  "Medium Stress": [
    "🙏 Do 10 minutes of guided meditation",
    "✏️ Write down 3 things you're grateful for",
    "🎧 Listen to your favorite calming playlist",
  ],
  "High Stress": [
    "💆️ Practice 4-7-8 breathing for 2 mins",
    "🛏☀️ Lie down and close your eyes for 10 mins",
    "💼 Talk to someone you trust about your day",
  ],
};

const WellnessToDo = ({ stressScore }: WellnessToDoProps) => {
  const [tasks, setTasks] = useState<string[]>(taskMap[stressScore] || []);
  const [newTask, setNewTask] = useState("");

  const toggleComplete = (index: number) => {
    const updated = [...tasks];
    updated[index] = updated[index].startsWith("✅ ")
      ? updated[index].slice(2)
      : "✅ " + updated[index];
    setTasks(updated);
  };

  const updateTask = (index: number, value: string) => {
    const updated = [...tasks];
    updated[index] = value;
    setTasks(updated);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">
        ✨ Your Wellness To-Do List
      </h3>
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.startsWith("✅ ")}
              onChange={() => toggleComplete(index)}
            />
            <input
              className="w-full bg-transparent border-none outline-none"
              value={task.startsWith("✅ ") ? task.slice(2) : task}
              onChange={(e) => updateTask(index, e.target.value)}
            />
            <button
              className="text-red-500 text-sm"
              onClick={() => removeTask(index)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center mt-4 gap-2">
        <input
          className="border px-2 py-1 rounded w-full"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="➕ Add your own task..."
        />
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={addTask}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default WellnessToDo;
