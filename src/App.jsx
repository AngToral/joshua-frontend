import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SetPassword from './pages/Password/setPassword'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/setnewpassword/:userid' element={<SetPassword />} />
      </Routes>
    </>
  )
}

export default App
