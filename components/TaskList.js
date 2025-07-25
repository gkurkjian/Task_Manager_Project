// components/TaskList.js
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) return <p className="text-muted">No tasks yet.</p>;

  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
