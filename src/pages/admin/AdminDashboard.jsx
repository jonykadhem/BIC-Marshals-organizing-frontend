import { useEffect, useState } from "react"
import { Link } from "react-router"
import * as adminService from "../../services/admin"


const AdminDashboard = () => {

    const [stats, setStats] = useState(null)
    const [message, setMessage] = useState("")

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const data = await adminService.dashboard()
                setStats(data)
            } catch (error) {
                setMessage(error.message)
            }
        }
        fetchDashboard()
    }, [])

    if (message) {
        return <p>{message}</p>
    }
    if (!stats) {
        return <p>Loading...</p>
    }

    return (
        <main>

            <h1>Admin Dashboard</h1>

            <div className="dashboard">

                <div className="stat-card">
                    <h2>{stats.totalEvents}</h2>
                    <p>Total Events</p>
                </div>

                <div className="stat-card">
                    <h2>{stats.totalMarshals}</h2>
                    <p>Total Marshals</p>
                </div>

                <div className="stat-card">
                    <h2>{stats.totalOrganizers}</h2>
                    <p>Total Organizers</p>
                </div>

                <div className="stat-card">
                    <h2>{stats.upcomingEvents}</h2>
                    <p>Upcoming Events</p>
                </div>

            </div>

            <div className="admin-actions">

                <Link to="/events">
                    View Events
                </Link>

                <Link to="/events/new">
                    Create Event
                </Link>

            </div>

        </main>
    )
}

export default AdminDashboard