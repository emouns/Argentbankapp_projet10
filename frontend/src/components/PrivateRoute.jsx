import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
// children tout ce qui est entre PrivateRoute et PrivateRoute
// Ici ce sera <Profile />
function PrivateRoute({ children }) {
  const { isAuthenticated } =
    useSelector((s) => s.auth)
// Pas connecté l'utilisateur est redirige vers /login
// replace = effacer le profile de l'historique de navigation
  if (!isAuthenticated)
    return <Navigate to="/login" replace />
  // Connecté cela affiche la page normalement
  return children
}
export default PrivateRoute