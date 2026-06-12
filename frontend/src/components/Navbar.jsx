import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import logo from '../assets/ArgentBanklogo.webp'

function  Navbar() {
  const  { user, isAuthenticated } =
     useSelector((s) => s.auth )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleLogout = () => {
     dispatch(logout())
     navigate('/')
}

return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img src={logo} alt="Argent Bank"
          className="main-nav-logo-image" />
      </Link>
      <div>
        {isAuthenticated ? (
          <>
            <Link className="main-nav-item"
              to="/profile">
              <i className="fa fa-user-circle"></i>
              {user?.userName}
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