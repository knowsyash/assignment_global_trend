import { useState, useEffect } from 'react'
import { getTasks, createTask, updateTask, deleteTask } from './api'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks()
        setTasks(data)
      } catch {
        setError('Failed to load tasks')
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  const handleAdd = async () => {
    if (!newTitle.trim()) return

    const newTask = await createTask(newTitle)
    setTasks((prevTasks) => [...prevTasks, newTask])
    setNewTitle('')
  }

  const handleToggle = async (id, completed) => {
    const updatedTask = await updateTask(id, !completed)
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updatedTask : task))
    )
  }

  const handleDelete = async (id) => {
    await deleteTask(id)
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  return (
    <div>
      <h1>Task Manager</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleAdd()
        }}
      >
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New task title"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task.id, task.completed)}
            />
            <span
              style={task.completed ? { textDecoration: 'line-through' } : {}}
            >
              {task.title}
            </span>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
