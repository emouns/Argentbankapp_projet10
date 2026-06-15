import { useState } from 'react'                          // il creer une variable locale dans un composant 
import { useDispatch, useSelector } from 'react-redux'    // selector lit une valeur dans store redux depuis react,dispatch envoie une action au store redux pour modifier les données
import { useNavigate } from 'react-router-dom'         // permet de changer la page 
import { loginUser } from '../../store/authSlice'     // thunk = action asynchrone Redux
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

function Login() {                  // useState gère les valeurs des champs du formulaire localement
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  // On lit l'état "loading" et "error" depuis Redux pour les afficher
  const { isLoading, error } = useSelector((s) => s.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()              // empêche le rechargement de la page
    // dispatch(loginUser) appelle l'API, attend la réponse, met à jour Redux
    const result = await dispatch(loginUser({ email, password }))
    // Si le login réussit (action "fulfilled"),  redirige vers le profil
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
          {/* onSubmit sur le form déclenche handleSubmit quand on clique le bouton */}
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input type="email" id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
                {/* onChange met à jour le state local à chaque frappe */}
              <input type="password" id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            {/* Affiche le message d'erreur si identifiants incorrects */}
            {error && <p style={{color:'red'}}>{error}</p>}  
            <button className="sign-in-button"
              type="submit" disabled={isLoading}>
              {isLoading ? 'Connexion...' : 'Sign In'}       {/* feedback visuel pendant l'appel API*/}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}
export default Login