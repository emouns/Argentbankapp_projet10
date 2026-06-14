import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'          // le reducer va gèrer l'état d'authentification

export const store = configureStore({
reducer: {
    // "auth" est le nom que j'utiliserai dans useSelector : state.auth.user
    auth: authReducer
  }
})