import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
// children = tout ce qu'on met entre <PrivateRoute> et </PrivateRoute> ( ici <Profile /> dans app.jsx)
function PrivateRoute({ children }) {
  const { isAuthenticated } =
    useSelector((s) => s.auth)
// Pas connecté l'utilisateur est redirigé vers /login ( redirection coté client)
  if (!isAuthenticated)
    return <Navigate to="/login" replace />
  // Si connecté l'app  affiche la page demandée normalement
  return children
}
export default PrivateRoute