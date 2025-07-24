import { supabase } from "@/lib/supabaseClient";

export default function TaskItem({ task, onToggle }) {
    const handleToggle = async () => {
        const { data, error } = await supabase
            .from("tasks")
            .update({ completed: !task.completed })
            .eq("id", task.id);

        if (error) {
            console.error("Error toggling task:", error);
        } else {
            console.log("Task updated:", data);
            onToggle(); // ✅ Refresh task list
        }
    }

    return (
        <li>
            <label>
                <input
                type="checkbox"
                checked={task.completed}
                onChange={handleToggle}
                />
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
                </span>
            </label>
        </li>
    );
};