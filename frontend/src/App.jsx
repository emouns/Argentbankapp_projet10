import { BrowserRouter, Routes, Route }
  from 'react-router-dom'
import Home         from './pages/Home/home'
import Login        from './pages/Login/login'
import Profile      from './pages/Profile/profile'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"        element={<Home/>}     />
        <Route path="/login"   element={<Login/>}    />
        <Route path="/profile" element={
          <PrivateRoute><Profile/></PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}
export default App