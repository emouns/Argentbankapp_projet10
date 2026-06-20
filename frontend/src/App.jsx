import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home"; //page d'accceuil
import Login from "./pages/Login/login"; //page de connexion
import Profile from "./pages/Profile/profile"; // affiche dashboard et username
import PrivateRoute from "./components/PrivateRoute"; // garde de la page profil

function App() {
  return (
    <BrowserRouter>
      {" "}
      {/* BrowserRouter active la navigation sans rechargement de page  */}
      <Routes>
        {/* Routes publiques : accessibles sans connexion */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Route privée : PrivateRoute vérifie isAuthenticated*/}
        {/* Si non connecté il redirige vers /login automatiquement */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
