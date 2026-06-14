import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'      // Provider = enveloppe Redux pour toute l'app
import { store } from './store/store'      // notre boîte de données // notre store Redux 
import App from './App'                     // composant racine qui contient toutes les routes
import './assets/main.css'                 // CSS global pour toute l'app

ReactDOM.createRoot(
  document.getElementById('root')          // pointe vers <div id="root"> dans index.html
).render(
  <React.StrictMode>              {  /*  Provider rend le store accessible dans TOUS les composants enfants*/}
                                   {/*  Sans lui useSelector et useDispatch ne fonctionnent pas */}
    <Provider store={store}>        {  /* indispensable */ }
      <App />
    </Provider>
  </React.StrictMode>
)