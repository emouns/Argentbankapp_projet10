import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiLogin, apiGetProfile} from '../services/apiService'

// createAsyncThunk gère automatiquement les états pending/fulfilled/rejected
// C'est l'action qu'on dispatch depuis Login.jsx
export const loginUser = createAsyncThunk(
   'auth/loginUser',
   async ({email, password }, thunkAPI) => {
    try {
      const token = await apiLogin(email, password) // recupération du token 
      const  user = await apiGetProfile(token)      // récupération du profil
      return { token, user  }                       // va dans fulfilled
    } catch (err) {                                 // va dans rejected
      return thunkAPI.rejectWithValue(err.message)  
    }
   }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,       // firstaname, lastname, username etc..
    token: null,      // le JWT (clé accés à l'API)
    isAuthenticated: false,  // lu par privateRoute qui bloque ou autoriser 
    isLoading: false,        // affiche la connexion dans le bouton
    error: null              // affiche un message d'erreur si login raté
  },
  reducers: {
    // action synchrone vide le store = déconnexion
    logout:(state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null  
    },
    // Met à jour le username  Navbar et Profile se mettent à jour auto
    updateUser: (state, action) => {
        state.user = { ...state.user, ...action.payload}
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
       state.isLoading = true      // bouton de Connexion
       state.error = null 
    })
    .addCase(loginUser.fulfilled, (state, action) => {
       state.isLoading = false
       state.isAuthenticated = true   // PrivateRoute laisse passer car c'ests true
       state.token = action.payload.token
       state.user = action.payload.user 
    })
    .addCase(loginUser.rejected, (state, action) => {
       state.isLoading =false
       state.error = action.payload    // affiché en rouge dans Login.jsx
    })
  }  
})

export const { logout, updateUser} = authSlice.actions
export default authSlice.reducer