import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SetPassword from './pages/Password/SetPassword'
import Dashboard from './pages/Dashboard/Dashboard'
import Profile from './pages/Profile/Profile'
import Clients from './pages/Clients/Clients'
import { authContext } from './components/context/authContext'
import { useContext } from 'react'
import PrivacyPolicy from './pages/Policy/PrivacyPolicy'

function App() {

  const { isAuthenticated } = useContext(authContext)

  return (
    <>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate replace to={"/dashboard"} /> : <Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/setnewpassword/:userid' element={<SetPassword />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/dashboard' element={!isAuthenticated ? <Navigate replace to={"/login"} /> : <Dashboard />} />
        <Route path='/profile' element={!isAuthenticated ? <Navigate replace to={"/login"} /> : <Profile />} />
        <Route path='/clients' element={!isAuthenticated ? <Navigate replace to={"/login"} /> : <Clients />} />
      </Routes>
    </>
  )
}

export default App
