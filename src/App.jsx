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
import EventDetails from './pages/EventDetails'
import EditEvent from "./pages/EditEvent"
import MyEvents from './pages/MyEvents'
import EventRegistrations from './pages/EventRegistrations'
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminUsers from "./pages/admin/AdminUsers"



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
    if (user) fetchAllEvents()
  }, [user])

  const handleAddEvent = async (formData) => {
    const newEvent = await eventService.create(formData)
    const updatedEvents = [newEvent, ...events]
    setEvents(updatedEvents)
  }

  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<Home />} />
        {user ? (
          <>
            {(user.role === "orgnizer" || user.role === "admin") && (
              <>
                <Route path='/events/new' element={<CreateEvent setEvents={setEvents} handleAddEvent={handleAddEvent} />} />
                <Route path='/events/:eventId/registrations' element={<EventRegistrations />} />
                <Route path='/events/events/:registrationId/assign' element={<EventRegistrations />} />

              </>
            )}

            <Route path='/events' element={<EventList events={events} />} />
            <Route path='/events/:eventId' element={<EventDetails events={events} user={user} setEvents={setEvents} />} />
            <Route path='/events/:eventId/edit' element={<EditEvent events={events} user={user} setEvents={setEvents} />} />
            <Route path='/events/my-events' element={<MyEvents />} />

          </>
        ) : (
          <>
            <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />
            <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
          </>
        )}
        {user && user.role === "admin" && (
          <>
            <Route path="/admin" element={<AdminDashboard />} />

            <Route path="/admin/users" element={<AdminUsers />}
            />
          </>
        )}
      </Routes>
    </div>
  )
}

export default App
