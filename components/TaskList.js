import TaskItem from "./TaskItem";

export default function TaskLists({ tasks }) {
    if(!tasks || tasks.length === 0) { <p>No tasks available</p>; }
    return (
        <ul>
            {tasks.map((task => {
                <TaskItem key={task.id} task={task}/>
            }))}
        </ul>
    )
}