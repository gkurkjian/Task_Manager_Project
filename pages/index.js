import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Layout from "../components/Layout";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const fetchTasks = async () => {
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });

    if (data) setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!input.trim()) return;

    await supabase.from("tasks").insert({ title: input, completed: false });
    setInput("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await supabase.from("tasks").delete().eq("id", id);
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await supabase
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", task.id);

    fetchTasks();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <Layout>
      <h3 className="mb-4 text-white text-center">Task Manager</h3>

      <div className="d-flex mb-3 w-100" style={{ maxWidth: "500px" }}>
        <input
          type="text"
          className="form-control me-2"
          placeholder="New task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-warning" onClick={addTask}>
          Add
        </button>
      </div>

      <div
        className="bg-white rounded shadow-sm w-100"
        style={{ maxWidth: "500px", overflow: "hidden" }}
      >
        {tasks.map((task) => (
          <div
            key={task.id}
            className="d-flex justify-content-between align-items-center border-bottom p-3"
          >
            <div className="form-check d-flex align-items-center">
              <input
                className="form-check-input me-2"
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task)}
              />
              <label
                className={`form-check-label ${
                  task.completed ? "text-decoration-line-through text-muted" : ""
                }`}
              >
                {task.title}
              </label>
            </div>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => deleteTask(task.id)}
            >
              ✖
            </button>
          </div>
        ))}
        {!tasks.length && <div className="p-3 text-muted">No tasks yet.</div>}
      </div>
    </Layout>
  );
}
