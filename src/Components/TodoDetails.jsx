
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const fetchTodo = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
  if (!res.ok) throw new Error('Todo not found')
  return res.json()
}

function TodoDetails() {
  const { id } = useParams()

  const { data: todo, isLoading, isError, error } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => fetchTodo(id),
  })

  if (isLoading) return <p className="text-center mt-10">Loading...</p>
  if (isError) return <p className="text-center text-red-500 mt-10">{error.message}</p>

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Todo Details</h2>
      <p><strong>ID:</strong> {todo.id}</p>
      <p><strong>Title:</strong> {todo.title}</p>
      <p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Not completed'}</p>
      <button
        onClick={() => window.history.back()}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Go Back
      </button>
    </div>
  )
}

export default TodoDetails