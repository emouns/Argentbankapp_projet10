import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../../store/authSlice'
import { apiUpdateProfile } from '../../services/apiService'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

function Profile() {
  const { user, token } = useSelector((s) => s.auth)
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [newUserName, setNewUserName] =
    useState(user?.userName || '')

  const handleSave = async () => {
    await apiUpdateProfile(token, newUserName)
    dispatch(updateUser({ userName: newUserName }))
    {/* ↑ met aussi à jour la Navbar (même store) */}
    setIsEditing(false)
  }

  return (
    <>
      <Navbar />
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back
            <br/>{user?.firstName} {user?.lastName}!
          </h1>
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
        // 3 sections .account depuis user.html
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
        // ... répéter pour Savings (x6712) et Credit Card (x8349)
      </main>
      <Footer />
    </>
  )
}
export default Profile