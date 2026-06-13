import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../../store/authSlice'
import { apiUpdateProfile } from '../../services/apiService'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

function Profile() {                                     // Récupère user et token depuis le store Redux
  const { user, token } = useSelector((s) => s.auth) 
  const dispatch = useDispatch()                          
  const [isEditing, setIsEditing] = useState(false)     // State LOCAL : ne concerne que l'UI de cette page
  const [newUserName, setNewUserName] =
    useState(user?.userName || '')

  const handleSave = async () => {
    await apiUpdateProfile(token, newUserName)          // PUT vers l'API
    dispatch(updateUser({ userName: newUserName }))     // sync le store → Navbar update automatiquement
    setIsEditing(false)                                 // ferme le formulaire 
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
          {/* Bascule entre formulaire et bouton selon isEditing */}                     
          {isEditing ? (
            <div>
              <input type="text"
                value={newUserName}
                onChange={(e)=>setNewUserName(e.target.value)}/>
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
        {/* 3 comptes statiques  Phase 2 les rendra dynamiques */}
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
        {/*  2 autres sections account identiques */}
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