import { useParams, useNavigate } from "react-router"
import * as eventService from "../services/events"
import { useState, useEffect } from "react"
import RegistrationModal from '../components/RegistrationModal'
import * as registrationService from "../services/registrations"
import "../styles/EventDetails.css"

const EventDetails = (props) => {
    const { eventId } = useParams()
    const navigate = useNavigate()

    const [showRegistration, setShowRegistration] = useState(false)
    const [registration, setRegistration] = useState(null)

    const [event, setEvent] = useState(null)
    const [message, setmessage] = useState('')

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await eventService.show(eventId)
                setEvent(eventData)
                try {
                    const registrationData = await registrationService.getMyRegistrationForEvent(eventId)
                    setRegistration(registrationData)
                } catch (error) {
                    setRegistration(null)
                }
            } catch (error) {
                setmessage(error.message)
            }
        }
        fetchEvent()
    }, [eventId])
    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this event?"
        )
        if (!confirmed) return

        try {
            const deletedEvent = await eventService.deleteEvent(eventId)
            props.setEvents(props.events.filter((event) => event._id !== eventId))

            navigate("/events")
        } catch (error) {
            // setMessage(error.message)
            console.log(error)
        }
    }

    const handleCancelRegistration = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to cancel your registration?"
        )
        if (!confirmed) return

        try {
            const updatedRegistration = await registrationService.cancelRegistration(
                registration._id
            )

            setRegistration(updatedRegistration)
        } catch (error) {
            setmessage(error.message)
        }
    }

    if (!event) {
        return <p>Loading...</p>
    }
    return (
    <main className="event-details-page">

        {/* Back Button */}
        <div className="event-details-container">

            <button
                className="back-button"
                onClick={() => navigate("/events")}
            >
                ← Back to Events
            </button>


            {/* Event Header */}
            <section className="event-details-header">

                <div className="event-details-title">

                    <span className="section-label">
                        EVENT DETAILS
                    </span>

                    <h1>{event.title}</h1>

                    <p className="event-description">
                        {event.description}
                    </p>

                </div>

                <span
                    className={`event-status event-status-${event.status?.toLowerCase()}`}
                >
                    {event.status}
                </span>

            </section>


            {/* Event Information */}
            <section className="event-info-card">

                <h2>Event Information</h2>

                <div className="event-details-grid">

                    <div className="detail-item">
                        <span className="detail-label">
                            Event Date
                        </span>

                        <span className="detail-value">
                            {new Date(
                                event.eventDate
                            ).toLocaleDateString()}
                        </span>
                    </div>


                    <div className="detail-item">
                        <span className="detail-label">
                            Registration Deadline
                        </span>

                        <span className="detail-value">
                            {new Date(
                                event.registrationDeadline
                            ).toLocaleDateString()}
                        </span>
                    </div>


                    <div className="detail-item">
                        <span className="detail-label">
                            Maximum Marshals
                        </span>

                        <span className="detail-value">
                            {event.maxMarshals}
                        </span>
                    </div>


                    <div className="detail-item">
                        <span className="detail-label">
                            Registered Marshals
                        </span>

                        <span className="detail-value">
                            {event.registrationCount} /{" "}
                            {event.maxMarshals}
                        </span>
                    </div>


                    <div className="detail-item">
                        <span className="detail-label">
                            Created By
                        </span>

                        <span className="detail-value">
                            {event.createdBy.fullName}
                        </span>
                    </div>

                </div>

            </section>


            {/* Your Registration */}
            {registration && (
                <section className="registration-card">

                    <div className="registration-header">

                        <div>
                            <span className="section-label">
                                YOUR REGISTRATION
                            </span>

                            <h2>
                                Registration Details
                            </h2>
                        </div>

                        <span
                            className={`registration-status registration-status-${registration.status?.toLowerCase()}`}
                        >
                            {registration.status}
                        </span>

                    </div>


                    <div className="registration-details">

                        <div className="registration-detail">

                            <span>
                                Positions
                            </span>

                            <strong>
                                {registration.positions.join(", ")}
                            </strong>

                        </div>


                        <div className="registration-detail">

                            <span>
                                Assigned Post
                            </span>

                            <strong>
                                {registration.assignedPost ||
                                    "Not assigned yet"}
                            </strong>

                        </div>

                    </div>


                    {registration.status === "Registered" && (
                        <button
                            className="btn btn-danger"
                            onClick={handleCancelRegistration}
                        >
                            Cancel Registration
                        </button>
                    )}

                </section>
            )}


            {/* Message */}
            {message && (
                <div className="message-box">
                    {message}
                </div>
            )}


            {/* Organizer / Admin Actions */}
            {(props.user.role === "admin" ||
                (props.user.role === "organizer" &&
                    event.createdBy._id === props.user._id)) && (

                <section className="management-card">

                    <div>
                        <span className="section-label">
                            EVENT MANAGEMENT
                        </span>

                        <h2>
                            Manage Event
                        </h2>

                        <p>
                            Manage the event and marshal
                            registrations.
                        </p>
                    </div>


                    <div className="management-actions">

                        <button
                            className="btn btn-secondary"
                            onClick={() =>
                                navigate(
                                    `/events/${eventId}/edit`
                                )
                            }
                        >
                            Edit Event
                        </button>


                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                navigate(
                                    `/events/${eventId}/registrations`
                                )
                            }
                        >
                            Manage Registrations
                        </button>


                        <button
                            className="btn btn-danger"
                            onClick={handleDelete}
                        >
                            Delete Event
                        </button>

                    </div>

                </section>
            )}


            {/* Registration */}
            {!registration ||
                registration.status === "Cancelled" ? (

                event.registrationCount >= event.maxMarshals ? (

                    <section className="event-full-card">

                        <h2>
                            Event Full
                        </h2>

                        <p>
                            This event has reached the maximum
                            number of marshals.
                        </p>

                    </section>

                ) : (

                    <section className="register-card">

                        <div>
                            <span className="section-label">
                                JOIN THIS EVENT
                            </span>

                            <h2>
                                Ready to participate?
                            </h2>

                            <p>
                                Select your available marshal
                                positions and register for this event.
                            </p>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                setShowRegistration(true)
                            }
                        >
                            Register for Event
                        </button>

                    </section>
                )

            ) : (

                <section className="already-registered-card">

                    <span className="success-icon">
                        ✓
                    </span>

                    <div>
                        <h3>
                            You're registered!
                        </h3>

                        <p>
                            Your registration is confirmed
                            for this event.
                        </p>
                    </div>

                </section>
            )}


            {/* Registration Modal */}
            {showRegistration && (
                <RegistrationModal
                    event={event}
                    onClose={() =>
                        setShowRegistration(false)
                    }
                    onRegistered={(newRegistration) => {
                        setRegistration(newRegistration)
                    }}
                />
            )}

        </div>

    </main>
)
}

export default EventDetails