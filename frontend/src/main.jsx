import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'      // Provider = enveloppe Redux pour toute l'app
import { store } from './store/store'      // le store Redux : notre boîte de données globale
import App from './App'                     // composant racine qui contient toutes les routes
import './assets/main.css'                 // CSS global pour toute l'app

ReactDOM.createRoot(
  document.getElementById('root')          // pointe vers dans index.html
).render(
  <React.StrictMode>     {/* outil de détection d'erreurs en développement */}          
    { /*  Provider rend le store accessible dans TOUS les composants enfants*/}
    { /*  Sans lui useSelector et useDispatch ne fonctionnent pas */}
    <Provider store={store}>    {  /* composant Provider et la prop store  */ }
      <App />
    </Provider>
  </React.StrictMode>
)