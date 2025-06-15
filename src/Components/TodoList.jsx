
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchTodos = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/todos')
  return res.data.slice(0, 50) // limit to first 50 for simplicity
}

function TodoList() {
  const { data: todosData = [], isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const todosPerPage = 5

  // Sync API todos into local editable state
  useEffect(() => {
    if (todosData.length) {
      setTodos(todosData.map(todo => ({ ...todo, title: formatTitle(todo.title) })))
    }
  }, [todosData])

  const formatTitle = () => {
    const tasks = [
      'Passing my AltSchool Examination',
      'Completing my HND this year',
      'Work More on my JavaScript and React',
      'Preparing for my Second Semster Examination',
      'Getting a Job August/September',
      'Getting Married 2025',
      'Networking with People',
      'Visit New Restaurants and New Places',
      'Learn how to Dance',
      'Learning my Native Language',
      'Building and Editing my Github and Vercel',
      'Making Myself Happy',
    ]
    const randomIndex = Math.floor(Math.random() * tasks.length)
    return tasks[randomIndex]
  }

  const indexOfLastTodo = currentPage * todosPerPage
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo)
  const totalPages = Math.ceil(todos.length / todosPerPage)

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return
    const newTask = {
      id: Date.now(),
      title: newTodo.trim(),
      completed: false,
    }
    setTodos([newTask, ...todos])
    setNewTodo('')
    setCurrentPage(1)
  }

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
    const newTotalPages = Math.ceil(updatedTodos.length / todosPerPage)
    if (currentPage > newTotalPages) setCurrentPage(newTotalPages)
  }

  const handleEdit = (id, title) => {
    setEditingId(id)
    setEditText(title)
  }

  const handleSaveEdit = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: editText } : todo
    )
    setTodos(updatedTodos)
    setEditingId(null)
    setEditText('')
  }

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(updatedTodos)
  }

  if (isLoading) return <p className="p-4">Loading...</p>
  if (isError) return <p className="p-4 text-red-500">Error fetching todos.</p>

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 text-gray-800">My Todo List</h1>

        {/* Add New Task */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-2">
          {currentTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center border p-3 rounded bg-gray-50"
            >
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="w-4 h-4"
                />
                {editingId === todo.id ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  <span
                    className={`${
                      todo.completed ? 'line-through text-gray-400' : ''
                    }`}
                  >
                    {todo.title}
                  </span>
                )}
              </div>

              {editingId === todo.id ? (
                <button
                  onClick={() => handleSaveEdit(todo.id)}
                  className="text-green-600 hover:text-green-800 mr-2 text-sm"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(todo.id, todo.title)}
                  className="text-yellow-500 hover:text-yellow-700 mr-2 text-sm"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => handleDelete(todo.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="flex space-x-2 mt-4 justify-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}

export default TodoList