import { useEffect, useState } from "react"
import { Link } from "react-router"
import * as adminService from "../../services/admin"
import '../../styles/AdminDashboard.css'


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
    <main className="admin-dashboard-page">

        <div className="admin-dashboard-container">

            {/* Header */}
            <div className="admin-dashboard-header">

                <span className="section-label">
                    ADMINISTRATION
                </span>

                <h1>
                    Admin Dashboard
                </h1>

                <p>
                    Monitor the BIC Marshals system and manage
                    events, users, and organizers.
                </p>

            </div>


            {/* Statistics */}
            <section className="dashboard-stats">

                <div className="stat-card">

                    <div className="stat-icon">
                        E
                    </div>

                    <div>
                        <span>Total Events</span>

                        <h2>
                            {stats.totalEvents}
                        </h2>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        M
                    </div>

                    <div>
                        <span>Total Marshals</span>

                        <h2>
                            {stats.totalMarshals}
                        </h2>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        O
                    </div>

                    <div>
                        <span>Total Organizers</span>

                        <h2>
                            {stats.totalOrganizers}
                        </h2>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        ↑
                    </div>

                    <div>
                        <span>Upcoming Events</span>

                        <h2>
                            {stats.upcomingEvents}
                        </h2>
                    </div>

                </div>

            </section>


            {/* Management */}
            <section className="admin-management">

                <div className="admin-management-header">

                    <span className="section-label">
                        MANAGEMENT
                    </span>

                    <h2>
                        Quick Actions
                    </h2>

                    <p>
                        Access the main administration tools.
                    </p>

                </div>


                <div className="admin-actions">

                    <Link
                        className="admin-action-card"
                        to="/events"
                    >

                        <div className="admin-action-icon">
                            E
                        </div>

                        <div>
                            <h3>
                                View Events
                            </h3>

                            <p>
                                Browse and manage all events.
                            </p>
                        </div>

                        <span className="admin-action-arrow">
                            →
                        </span>

                    </Link>


                    <Link
                        className="admin-action-card"
                        to="/events/new"
                    >

                        <div className="admin-action-icon">
                            +
                        </div>

                        <div>
                            <h3>
                                Create Event
                            </h3>

                            <p>
                                Create a new motorsport event.
                            </p>
                        </div>

                        <span className="admin-action-arrow">
                            →
                        </span>

                    </Link>


                    <Link
                        className="admin-action-card"
                        to="/admin/users"
                    >

                        <div className="admin-action-icon">
                            U
                        </div>

                        <div>
                            <h3>
                                Manage Users
                            </h3>

                            <p>
                                Manage users and assign roles.
                            </p>
                        </div>

                        <span className="admin-action-arrow">
                            →
                        </span>

                    </Link>

                </div>

            </section>

        </div>

    </main>
)
}

export default AdminDashboard