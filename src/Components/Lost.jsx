import { Link } from 'react-router-dom'

function Lost() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="mt-4">Oops! The page you're looking for doesn’t exist.</p>
      <Link to="/" className="text-blue-500 underline mt-2 block">
        Go back home
      </Link>
    </div>
  )
}

export default Lost