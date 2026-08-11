import { useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import { Routes, Route, useNavigate } from 'react-router'
import SignInForm from './pages/authPages/SignIn'
import Home from './pages/Home'
import SignUpForm from './pages/authPages/SignUp'
import eventList from './pages/EventsList'



const getUserFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState(getUserFromToken())
  const [events, setEvents] = useState([])

  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<Home />} />
        {user ? (
          <>
          <Route path='/events' element={<eventList />} />
          
          </>
        ) : (
          <>
            <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />
            <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
          </>
        )}
      </Routes>
    </div>
  )
}

export default App
