import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiLogin, apiGetProfile} from '../services/apiService'

// createAsyncThunk gère automatiquement les états pending/fulfilled/rejected
// C'est l'action qu'on dispatch depuis Login.jsx
export const loginUser = createAsyncThunk(
   'auth/loginUser',
   async ({email, password }, thunkAPI) => {
    try {
      const token = await apiLogin(email, password) // appelle l'API, récupère le token 
      const  user = await apiGetProfile(token)      // utilise le token pour récupérer le profil
      return { token, user  }                       // ces données iront dans state.auth
    } catch (err) {                                 
      // rejectWithValue envoie le message d'erreur dans state.auth.error
      return thunkAPI.rejectWithValue(err.message)  
    }
   }
)

const authSlice = createSlice({
  name: 'auth',
 // État initial : pas connecté, pas de données 
  initialState: {
    user: null,                                                // contient  firstName, lastName, userName, email 
    token: localStorage.getItem('token') || null,             //le JWT reçu après login, est sauvegardé dans localStorage 
    isAuthenticated: !!localStorage.getItem('token'),        // true si un token existe dans localStorage au démarrage ou après login  
    isLoading: false,                                       // true pendant l'appel API affiche "Connexion"
    error: null                                            // affiche un message d'erreur si login raté
  },
  reducers: {
    // logout = action synchrone : remet tout à zéro
    logout:(state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem('token')  
    },
    // updateUser = action pour mettre à jour le userName après édition
    updateUser: (state, action) => {
        state.user = { ...state.user, ...action.payload}
    }
  },
    // extraReducers gère les 3 états automatiques créés par createAsyncThunk, sans lui le store ne se mettrait pas à jour après un appel API
  extraReducers: (builder) => {
    builder
    // pending : l'appel API est en cours
    .addCase(loginUser.pending, (state) => {
       state.isLoading = true      // affiche Connexion sur le bouton
       state.error = null 
    })
    // fulfilled : l'API a répondu avec succès  on stocke tout
    .addCase(loginUser.fulfilled, (state, action) => {
       state.isLoading = false
       state.isAuthenticated = true   // PrivateRoute laisse passer car c'ests true
       state.token = action.payload.token
       state.user = action.payload.user
       localStorage.setItem('token', action.payload.token) 
    })
    // rejected : identifiants incorrects ou serveur en panne
    .addCase(loginUser.rejected, (state, action) => {
       state.isLoading =false
       state.error = action.payload    // affichera le message d'erreur retourné par rejectWithValue
    })
  }  
})

export const { logout, updateUser} = authSlice.actions
export default authSlice.reducer