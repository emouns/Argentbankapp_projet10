import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'     // connecte Redux à React
import { store } from './store/store'      // notre boîte de données
import App from './App'
import './assets/main.css'                 // CSS global pour toute l'app

ReactDOM.createRoot(
  document.getElementById('root')          // pointe vers <div id="root"> dans index.html
).render(
  <React.StrictMode>                {/* Provider rend le store accessible à TOUS les composants */ }  
                                   {/*  Sans lui useSelector et useDispatch ne fonctionnent pas */}
    <Provider store={store}>        {  /* indispensable */ }
      <App />
    </Provider>
  </React.StrictMode>
)