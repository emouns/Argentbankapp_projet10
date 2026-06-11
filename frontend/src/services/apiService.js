const BASE = 'http://localhost:3001/api/v1'

export const apiLogin = async (email,password) => {
    const res = await fetch(`${BASE}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })  
    })
    if (!res.ok) throw new Error('Invalid credentials')
    const data = await res.json()
    return data.body.token     
}

export const apiGetProfile = async (token) => {
  const res = await fetch('${BASE}/user/profile', {
  header: { 'Authorization': `Bearer ${token}` }
  }) 
  if (!res.ok)  throw new Error('Profile fetch failed')
  const data = await res.json()
return data.body  
}

export const apiUpdateProfile  = async (token,username) => {
 const res = await fetch(`${BASE}/user/profile`, {
  method: 'PUT',
  header: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
   }, 
    body: JSON.stringify({ username })  
 })
 if (!res.ok) throw new Error ('Update failed')
    const data = await res.json()
return data.body   
}
