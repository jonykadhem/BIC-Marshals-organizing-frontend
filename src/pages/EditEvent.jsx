import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import * as eventService from "../services/events"
import "../styles/EditEvent.css"

const EditEvent = (props) => {
    const { eventId } = useParams()
    const navigate = useNavigate()

    const initalState = {
        title: "",
        description: "",
        eventDate: "",
        registrationDeadline: "",
        maxMarshals: "",
        status: "Open",
    }

    const [formData, setFormData] = useState(initalState)
    const [message, setMessage] = useState('')

    // useEffect to git the existing data
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const event = await eventService.show(eventId)

                setFormData({
                    title: event.title,
                    description: event.description,
                    eventDate: event.eventDate
                        ? event.eventDate.slice(0, 16)
                        : "",
                    registrationDeadline: event.registrationDeadline
                        ? event.registrationDeadline.slice(0, 16)
                        : "",
                    maxMarshals: event.maxMarshals,
                    status: event.status
                })
            } catch (error) {
                setMessage(error.message)
            }
        }
        fetchEvent()
    }, [eventId])

    const handleChange = (event) => {
        setMessage("")
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
           const updatedEvent = await eventService.update(
                eventId,
                {
                    ...formData,
                    maxMarshals: Number(formData.maxMarshals),
                }
            )
            console.log('updated event: ', updatedEvent)
            const updatedEventList = props.events.map((event)=> {
                return eventId === event._id ? updatedEvent : event
            })
            props.setEvents(updatedEventList)
            setFormData(updatedEventList)
            navigate(`/events/${eventId}`)

        } catch (error) {
            setMessage(error.message)
        }
    }
    return (
    <main className="edit-event-page">

        <div className="edit-event-container">

            {/* Header */}
            <div className="edit-event-header">

                <span className="section-label">
                    EVENT MANAGEMENT
                </span>

                <h1>Edit Event</h1>

                <p>
                    Update the event details and registration
                    information.
                </p>

            </div>


            {/* Error Message */}
            {message && (
                <p className="edit-event-error">
                    {message}
                </p>
            )}


            {/* Form */}
            <form
                className="edit-event-form"
                onSubmit={handleSubmit}
            >

                <div className="form-group">

                    <label htmlFor="title">
                        Event Title
                    </label>

                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter event title"
                        required
                    />

                </div>


                <div className="form-group">

                    <label htmlFor="description">
                        Description
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter event description"
                        rows="5"
                    />

                </div>


                <div className="form-row">

                    <div className="form-group">

                        <label htmlFor="eventDate">
                            Event Date
                        </label>

                        <input
                            id="eventDate"
                            type="datetime-local"
                            name="eventDate"
                            value={formData.eventDate}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="registrationDeadline">
                            Registration Deadline
                        </label>

                        <input
                            id="registrationDeadline"
                            type="datetime-local"
                            name="registrationDeadline"
                            value={formData.registrationDeadline}
                            onChange={handleChange}
                            required
                        />

                    </div>

                </div>


                <div className="form-group">

                    <label htmlFor="maxMarshals">
                        Maximum Marshals
                    </label>

                    <input
                        id="maxMarshals"
                        type="number"
                        name="maxMarshals"
                        value={formData.maxMarshals}
                        onChange={handleChange}
                        min="1"
                        placeholder="100"
                        required
                    />

                </div>


                {/* Actions */}
                <div className="form-actions">

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() =>
                            navigate(`/events/${eventId}`)
                        }
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Save Changes
                    </button>

                </div>

            </form>

        </div>

    </main>
)
}

export default EditEvent