import './App.css'
import Auth from './Auth'
import Home from './Home'
import Login from './login/Login'
import Signup from './signup/Signup'
import { BrowserRouter, Route, Routes } from "react-router"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth />}>
          <Route index element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Route>
         <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
