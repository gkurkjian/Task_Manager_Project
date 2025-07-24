import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AddTaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTask = async () => {
    if (!title.trim()) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title, completed: false }]);

    if (error) {
      console.error("Error adding task:", error);
    } else {
      console.log("Task added:", data);
      setTitle("");
      onTaskAdded(); // ✅ Refresh task list
    }

    setLoading(false);
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        value={title}
        placeholder="New task"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAddTask} disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </button>
    </div>
  );
}
