import { useState } from 'react'                              // gère l'état local du formulaire
import { useSelector, useDispatch } from 'react-redux'         // useSelector lit le store, useDispatch envoie une action
import { updateUser } from '../../store/authSlice'            // action Redux pour mettre à jour le userName dans le store
import { apiUpdateProfile } from '../../services/apiService'  // envoie la modification au backend
import Navbar from '../../components/Navbar'                  // composant réutilisable
import Footer from '../../components/Footer'                 // composant réutilisable

function Profile() {                                     // Récupère user et token depuis le store Redux
  const { user, token } = useSelector((s) => s.auth) 
  const dispatch = useDispatch()                          
  const [isEditing, setIsEditing] = useState(false)     // affiche/cache le formulaire
  const [newUserName, setNewUserName] =
    useState(user?.userName || '')

  const handleSave = async () => {
    await apiUpdateProfile(token, newUserName)          // envoie la modification à l'API
    dispatch(updateUser({ userName: newUserName }))     // met à jour le store et la navbar se met à jour aussi
    setIsEditing(false)                                // referme le formulaire 
  }

  return (
    <>
      <Navbar />
      <main className="main bg-dark">
        <div className="header">
          {/* user?.firstName = sécurisé si user est null  */} 
          <h1>Welcome back 
            <br/>{user?.firstName} {user?.lastName}!
          </h1>
          {/* Bascule entre le formulaire et le bouton Edit */}                     
          {isEditing ? (
            <div>
              <input type="text"
                value={newUserName}
                onChange={(e)=>setNewUserName(e.target.value)}/>
                {/* Save appelle l'API puis ferme le formulaire */} 
              <button className="edit-button"
                onClick={handleSave}>Save</button>
              <button className="edit-button"
                onClick={()=>setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <button className="edit-button"
              onClick={()=>setIsEditing(true)}>
              Edit Name
            </button>
          )}
        </div>

        <h2 className="sr-only">Accounts</h2>
        {/* 3 Comptes bancaires (données statiques en attendant la Phase 2)  */}
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
export default Profile