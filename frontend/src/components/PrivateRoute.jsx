import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
  const { isAuthenticated } =
    useSelector((s) => s.auth)

  if (!isAuthenticated)
    return <Navigate to="/login" replace />
  
  return children
}
export default PrivateRoute