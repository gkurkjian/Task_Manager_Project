import { supabase } from "@/lib/supabaseClient";

// components/TaskItem.js
export default function TaskItem({ task, onToggle, onDelete }) {
  const handleToggle = async () => {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", task.id);

    if (!error) onToggle();
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", task.id);

    if (!error) onDelete();
  };

  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center ${
        task.completed ? "list-group-item-success" : ""
      }`}
    >
      <div className="form-check">
        <input
          className="form-check-input me-2"
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          id={`task-${task.id}`}
        />
        <label className="form-check-label" htmlFor={`task-${task.id}`}>
          {task.title}
        </label>
      </div>
      <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
        ✕
      </button>
    </li>
  );
}
