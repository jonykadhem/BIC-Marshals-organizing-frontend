import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import * as registrationService from "../services/registrations"
import '../styles/MyEvents.css'


const MyEvents = () => {
    const navigate = useNavigate()

    const [registrations, setRegistrations] = useState([])
    const [message, setMessage] = useState("")

    useEffect(() => {
        const fetchMyEvents = async () => {
            try {
                const data = await registrationService.myRegistration()
                setRegistrations(data)
            } catch (error) {
                setMessage(error.message)
            }
        }
        fetchMyEvents()
    }, [])

    if (message) {
        return <p>{message}</p>
    }

    return (
        <main className="my-events-page">

            <div className="my-events-container">

                {/* Header */}
                <div className="my-events-header">

                    <span className="section-label">
                        MARSHAL DASHBOARD
                    </span>

                    <h1>My Events</h1>

                    <p>
                        View your registered events, selected positions,
                        and assigned posts.
                    </p>

                </div>


                {registrations.length === 0 ? (

                    /* Empty State */
                    <div className="my-events-empty">

                        <div className="empty-icon">
                            —
                        </div>

                        <h2>
                            No registered events
                        </h2>

                        <p>
                            You haven't registered for any events yet.
                        </p>

                        <button
                            className="my-events-browse-button"
                            onClick={() => navigate("/events")}
                        >
                            Browse Events
                        </button>

                    </div>

                ) : (

                    /* Events */
                    <div className="my-events-grid">

                        {registrations.map((registration) => (

                            <article
                                className="my-event-card"
                                key={registration._id}
                            >

                                {/* Card Header */}
                                <div className="my-event-card-header">

                                    <h2>
                                        {registration.event.title}
                                    </h2>

                                    <span
                                        className={`my-event-status my-event-status-${registration.status?.toLowerCase()}`}
                                    >
                                        {registration.status}
                                    </span>

                                </div>


                                {/* Event Information */}
                                <div className="my-event-info">

                                    <div className="my-event-info-item">

                                        <span>
                                            Event Date
                                        </span>

                                        <strong>
                                            {new Date(
                                                registration.event.eventDate
                                            ).toLocaleDateString()}
                                        </strong>

                                    </div>


                                    <div className="my-event-info-item">

                                        <span>
                                            Location
                                        </span>

                                        <strong>
                                            {registration.event.location ||
                                                "Bahrain International Circuit"}
                                        </strong>

                                    </div>

                                </div>


                                {/* Marshal Assignment */}
                                <div className="marshal-assignment">

                                    <div className="assignment-item">

                                        <span>
                                            My Positions
                                        </span>

                                        <strong>
                                            {registration.positions.join(", ")}
                                        </strong>

                                    </div>


                                    <div className="assignment-item">

                                        <span>
                                            Assigned Post
                                        </span>

                                        <strong
                                            className={
                                                registration.assignedPost
                                                    ? "assigned"
                                                    : "not-assigned"
                                            }
                                        >
                                            {registration.assignedPost ||
                                                "Not assigned yet"}
                                        </strong>

                                    </div>

                                </div>


                                {/* Footer */}
                                <div className="my-event-card-footer">

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/events/${registration.event._id}`
                                            )
                                        }
                                    >
                                        View Event
                                        <span>→</span>
                                    </button>

                                </div>

                            </article>

                        ))}

                    </div>

                )}

            </div>

        </main>
    )
}

export default MyEvents