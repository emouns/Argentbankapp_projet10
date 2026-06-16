import { Link, useNavigate } from 'react-router-dom'     // Link évite le rechargement de page, useNavigate me permet de rediriger après le logout
import { useSelector, useDispatch } from 'react-redux'   // useSelector pour lire le store, useDispatch pour envoyer une action
import { logout } from '../store/authSlice'         // action Redux pour déconnecter
import logo from '../assets/argentBankLogo.webp'

function  Navbar() {
  const  { user, isAuthenticated } =        // useSelector lit une valeur dans le store Redux
     useSelector((s) => s.auth )        
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleLogout = () => {
     dispatch(logout())                     // vide le store : supprime le token et les infos utilisateur
     navigate('/')                          // redirige vers la page d'accueil
}

return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img src={logo} alt="Argent Bank"
          className="main-nav-logo-image" />
      </Link>
      <div>
      { /* Affichage connecté , username et Sign Out  non connecté  Sign In */}
        {isAuthenticated ? (
          <>
            <Link className="main-nav-item"
              to="/profile">
              <i className="fa fa-user-circle"></i>
              {user?.userName}           { /* affiche le pseudo de l'utilisateur connecté */}
            </Link>
            <button className="main-nav-item"
              onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </button>
          </>
        ) : (
          <Link className="main-nav-item"
            to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )  

}
export default Navbar