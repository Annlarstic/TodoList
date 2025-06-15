
// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TodoList from './Components/TodoList'
import TodoDetails from './Components/TodoDetails'
import Lost from './Components/Lost'
import Error from './Components/Error'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/todos/:id" element={<TodoDetails />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Lost />} />
      </Routes>
    </Router>
  )
}

export default App
