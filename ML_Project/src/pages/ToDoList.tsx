import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import Navbar from "@/components/Navbar";

const taskMap: Record<string, string[]> = {
  "Low Stress": [
    "✨ Do 5-minute morning stretches or sun salutation yoga",
    "🍵 Sip your favorite drink slowly and mindfully",
    "🎧 Play soft music while taking deep breaths",
    "🌿 Spend 10 minutes near plants or sunlight",
    "📖 Write 3 things you're grateful for today",
  ],
  "Medium Stress": [
    "🌬️ Practice 4-7-8 breathing",
    "📓 Journal one small worry + one hopeful thought",
    "🧘‍♀️ Do 3 calming yoga poses",
    "🎨 Doodle freely",
    "🍫 Treat yourself — chocolate or cozy nap",
  ],
  "High Stress": [
    "🛌 Lay down in a dark room with your eyes closed for 10 minutes",
    "🕯️ Light a candle and focus on its flame",
    "🧸 Call or text someone who makes you feel safe",
    "🖌️ Scribble out your feelings — no filter",
    "🧘‍♂️ Do slow, deep breathing with hand on heart",
    "📺 Watch a comfort show or rain sounds",
  ],
};

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: any;
  stressLevel: string;
}

const ToDoList = () => {
  const location = useLocation();
  const stressScore = location.state?.stressScore || "Low Stress";

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  // Load tasks from Firebase
  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksData: Task[] = [];
      querySnapshot.forEach((doc) => {
        tasksData.push({
          id: doc.id,
          ...doc.data()
        } as Task);
      });
      setTasks(tasksData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Add default tasks for stress level if no tasks exist for that level
  useEffect(() => {
    const addDefaultTasks = async () => {
      if (loading) return;
      
      const tasksForCurrentStressLevel = tasks.filter(task => task.stressLevel === stressScore);
      
      if (tasksForCurrentStressLevel.length === 0) {
        const defaultTasks = taskMap[stressScore] || [];
        
        for (const taskText of defaultTasks) {
          try {
            await addDoc(collection(db, "tasks"), {
              text: taskText,
              completed: false,
              createdAt: serverTimestamp(),
              stressLevel: stressScore
            });
          } catch (error) {
            console.error("Error adding default task:", error);
          }
        }
      }
    };

    addDefaultTasks();
  }, [stressScore, tasks.length, loading]);

  const toggleComplete = async (task: Task) => {
    try {
      const taskRef = doc(db, "tasks", task.id);
      await updateDoc(taskRef, {
        completed: !task.completed
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const updateTask = async (task: Task, newText: string) => {
    try {
      const taskRef = doc(db, "tasks", task.id);
      await updateDoc(taskRef, {
        text: newText
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const removeTask = async (taskId: string) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() !== "") {
      try {
        await addDoc(collection(db, "tasks"), {
          text: newTask.trim(),
          completed: false,
          createdAt: serverTimestamp(),
          stressLevel: stressScore
        });
        setNewTask("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Navbar />
        <div className="max-w-2xl mx-auto p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your tasks...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">📝 Your To-Do List</h1>

        <div className="flex gap-2 mb-4">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="➕ Add your own task..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between bg-white p-3 rounded shadow">
              <div className="flex items-center gap-2 w-full">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                />
                <input
                  className={`w-full border-none outline-none bg-transparent ${
                    task.completed ? 'line-through text-gray-500' : ''
                  }`}
                  value={task.text}
                  onChange={(e) => updateTask(task, e.target.value)}
                />
              </div>
              <button
                className="text-red-500 hover:text-red-700 text-sm ml-2"
                onClick={() => removeTask(task.id)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;