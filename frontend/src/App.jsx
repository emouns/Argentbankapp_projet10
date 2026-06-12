import { BrowserRouter, Routes, Route }
  from 'react-router-dom'
import Home         from './pages/Home/Home'
import Login        from './pages/Login/Login'
import Profile      from './pages/Profile/Profile'
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