export default function TaskItem({ task }) {
    return (
        <li> 
            {task.title} - {task.completed ? "Completed ✅" : "Pending ❌"}
        </li>
    );
}