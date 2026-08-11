import { useParams, useNavigate } from "react-router"
import * as eventService from "../services/events"
import { useState, useEffect } from "react"


const EventDetails = ({ user }) => {
    const { eventId } = useParams()
    const navigate = useNavigate()

    const [event, setEvent] = useState(null)
    const [message, setmessage] = useState('')

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await eventService.show(eventId)
                setEvent(eventData)
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
            await eventService.deleteEvent(eventId)

            navigate("/events")
        } catch (error) {
            setMessage(error.message)
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
                <strong>Date:</strong>{" "}
                {new Date(event.eventDate).toLocaleDateString()}
            </p>

            <p>
                <strong>Maximum Marshals:</strong>{" "}
                {event.maxMarshals}
            </p>

            <p>
                <strong>Status:</strong> {event.status}
            </p>

            <p> <strong>Created By:</strong> {event.createdBy.fullName}</p>

            {message && <p>{message}</p>}

            {(user.role === "admin" ||
                (user.role === "organizer" &&
                    event.createdBy === user._id)) && (
                    <button onClick={handleDelete}>
                        Delete Event
                    </button>
                )}
        </div>
    )
}

export default EventDetails