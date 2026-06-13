import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../store/authSlice'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

function Login() {                  // State LOCAL : email et password ne concernent que ce composant
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const { isLoading, error } = useSelector((s) => s.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()              // bloque le rechargement de page (comportement HTML natif)
    const result = await dispatch(loginUser({ email, password }))
    // loginUser.fulfilled.match(result) vérifie si l'action a réussi
    if (loginUser.fulfilled.match(result))
      navigate('/profile')          // redirection vers le dashboard
  }

  return (
    <>
      <Navbar />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>      
          {/* onSubmit sur le form = meilleure pratique que onClick sur le bouton */}
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input type="email" id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
                {/*  value et onChange = React contrôle l'input */}
              <input type="password" id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            {/* Affiche le message d'erreur si identifiants incorrects */}
            {error && <p style={{color:'red'}}>{error}</p>}
            {/* desactivé pendant l'appel API  empêche le double-clic */}
            <button className="sign-in-button"
              type="submit" disabled={isLoading}>
              {isLoading ? 'Connexion...' : 'Sign In'}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}
export default Login