import { supabase } from "@/lib/supabaseClient";

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
    <li className={`task-item d-flex justify-content-between align-items-center ${task.completed ? "completed" : ""}`}>
      <div className="d-flex align-items-center">
        <input
          type="checkbox"
          className="form-check-input me-2"
          checked={task.completed}
          onChange={handleToggle}
          id={`task-${task.id}`}
        />
        <label className="form-check-label mb-0" htmlFor={`task-${task.id}`}>
          {task.title}
        </label>
      </div>
      <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
        ✕
      </button>
    </li>
  );
}
