import { useParams, useNavigate } from "react-router"
import * as eventService from "../services/events"
import { useState, useEffect } from "react"
import RegistrationModal from '../components/RegistrationModal'
import * as registrationService from "../services/registrations"

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
        <div>
            <h1>{event.title}</h1>

            <p>{event.description}</p>

            <p>
                <strong>Event Date:</strong>{" "}
                {new Date(event.eventDate).toLocaleDateString()}
            </p>

            <p>
                <strong>Maximum Marshals:</strong>{" "}
                {event.maxMarshals}
            </p>

            <p>
                <strong>Status:</strong> {event.status}
            </p>
            <p>
                <strong>Registration Deadline:</strong> {new Date(event.registrationDeadline).toLocaleDateString()}
            </p>

            <p> <strong>Created By:</strong> {event.createdBy.fullName}</p>

            {registration && (
                <div>
                    <h3>Your Registration</h3>

                    <p>
                        <strong>Positions:</strong>{" "}
                        {registration.positions.join(", ")}
                    </p>

                    <p>
                        <strong>Assigned Post:</strong>{" "}
                        {registration.assignedPost || "Not assigned yet"}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        {registration.status}
                    </p>

                    {registration.status === "Registered" && (
                        <button onClick={handleCancelRegistration}>
                            Cancel Registration
                        </button>
                    )}
                </div>
            )}

            {message && <p>{message}</p>}

            {(props.user.role === "admin" ||
                (props.user.role === "organizer" &&
                    event.createdBy._id === props.user._id)) && (
                    <>
                        <button onClick={handleDelete}>
                            Delete Event
                        </button>
                        <button type="button"
                            onClick={() => navigate(`/events/${eventId}/edit`)}>
                            Edit Event
                        </button>
                        <button onClick={() => navigate(`/events/${eventId}/registrations`)}>Manage Registrations</button>
                    </>
                )}
            {!registration || registration.status === "Cancelled" ? (
                <button onClick={() => setShowRegistration(true)}>
                    Register for Event
                </button>
            ) : (
                <p>✓ You are registered for this event</p>
            )}
            {showRegistration && (
                <RegistrationModal event={event} onClose={() => setShowRegistration(false)}
                    onRegistered={(newRegistration) => { setRegistration(newRegistration) }} />
            )}
        </div>

    )
}

export default EventDetails