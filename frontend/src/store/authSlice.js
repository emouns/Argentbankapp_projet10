import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiLogin, apiGetProfile} from '../services/apiService'

// createAsyncThunk gère automatiquement les états pending/fulfilled/rejected
// C'est l'action qu'on dispatch depuis Login.jsx
export const loginUser = createAsyncThunk(
   'auth/loginUser',
   async ({email, password }, thunkAPI) => {
    try {
      const token = await apiLogin(email, password)
      const  user = await apiGetProfile(token)
      return { token, user  }  
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)  
    }
   }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  },
  reducers: {
    logout:(state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null  
    },
    updateUser: (state, action) => {
        state.user = { ...state.user, ...action.payload}
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
       state.isLoading = true
       state.error = null 
    })
    .addCase(loginUser.fulfilled, (state, action) => {
       state.isLoading = false
       state.isAuthenticated = true
       state.token = action.payload.token
       state.user = action.payload.user 
    })
    .addCase(loginUser.rejected, (state, action) => {
       state.isLoading =false
       state.error = action.payload 
    })
  }  
})

export const { logout, updateUser} = authSlice.actions
export default authSlice.reducer