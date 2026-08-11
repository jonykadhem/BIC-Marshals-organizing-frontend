import { useEffect, useState } from 'react'
import './App.css'
import * as eventService from './services/events'
import Nav from './components/Nav'
import { Routes, Route, useNavigate } from 'react-router'
import SignInForm from './pages/authPages/SignIn'
import Home from './pages/Home'
import SignUpForm from './pages/authPages/SignUp'
import EventList from './pages/EventsList'
import CreateEvent from './pages/CreateEvent'




const getUserFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState(getUserFromToken())
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchAllEvents = async () => {
      const eventsData = await eventService.index()
      setEvents(eventsData)
    }
    if(user) fetchAllEvents()
  }, [user])

  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<Home />} />
        {user ? (
          <>
          {(user.role === "orgnizer" && user.role === "admin") && (
            <Route path='/events/new' element={<CreateEvent />} />

          )}
          
          <Route path='/events' element={<EventList events={events} setEvents={setEvents} />} />
          
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
