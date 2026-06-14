const BASE = 'http://localhost:3001/api/v1'
// FONCTION 1  Login  envoie email et password, reçoit un token JWT
export const apiLogin = async (email,password) => {
    const res = await fetch(`${BASE}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},    // dit au serveur que c'est du JSON
      body: JSON.stringify({ email, password })          // il converti objet JS en texte JSON
    })
    if (!res.ok) throw new Error('Invalid credentials')   // sera capturé par rejectWithValue dans authSlice
    const data = await res.json()
    return data.body.token                              // on ne retourne que le token, pas tout le JSON
}
// FONCTION 2  Profil  envoie le token, reçoit les infos du profil utilisateur
export const apiGetProfile = async (token) => {
  const res = await fetch(`${BASE}/user/profile`, {
    headers: { 'Authorization': `Bearer ${token}` }     // le token prouve que l'utilisateur est authentifié
  }) 
  if (!res.ok)  throw new Error('Profile fetch failed')
  const data = await res.json()
return data.body                                        // { id, email, firstName, lastName, userName }
}
// FONCTION 3  Modifier le username  envoie token et nouveau userName
export const apiUpdateProfile  = async (token,username) => {
 const res = await fetch(`${BASE}/user/profile`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`                   // token requis pour les routes protégées
   }, 
    body: JSON.stringify({ username })                  // seul le username peut être modifié
 })
 if (!res.ok) throw new Error ('Update failed')
    const data = await res.json()
return data.body   
}
