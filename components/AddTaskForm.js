// components/AddTaskForm.js
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AddTaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTask = async () => {
    if (!title.trim()) return;
    setLoading(true);

    const { error } = await supabase
      .from("tasks")
      .insert([{ title, completed: false }]);

    if (error) {
      console.error("Error adding task:", error);
    } else {
      setTitle("");
      onTaskAdded();
    }

    setLoading(false);
  };

  return (
    <div className="mb-3 d-flex">
      <input
        type="text"
        className="form-control me-2"
        placeholder="New task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        onClick={handleAddTask}
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </div>
  );
}
