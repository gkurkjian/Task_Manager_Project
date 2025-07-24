// pages/index.js
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import TaskList from '../components/TaskList'
import AddTaskForm from '../components/AddTaskForm'

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setTasks(data)
    setLoading(false)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Task Manager</h1>
      <AddTaskForm onTaskAdded={fetchTasks} />
      {loading ? <p>Loading...</p> : <TaskList tasks={tasks} />}
    </div>
  )
}
