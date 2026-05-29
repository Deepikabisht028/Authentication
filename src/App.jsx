import './App.css'
import Home from './Home'
import Login from './login/Login'
import Signup from './signup/Signup'
import { BrowserRouter, Route, Routes } from "react-router"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
