import { useSelector } from 'react-redux'         // lit isAuthenticated dans le store Redux
import { Navigate } from 'react-router-dom'      // redirige vers une autre page sans rechargement
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