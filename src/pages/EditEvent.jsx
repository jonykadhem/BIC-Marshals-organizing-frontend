import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import * as eventService from "../services/events"

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

        setFormData({ ...formData, [event.target.name]: event.target.value, })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await eventService.update(
                eventId,
                {
                    ...formData,
                    maxMarshals: Number(formData.maxMarshals),
                }
            );

            navigate(`/events/${eventId}`)

        } catch (error) {
            setMessage(error.message)
        }
    }
    return (
        <main className="create-event">

            <h1>Create Event</h1>

            {message && (
                <p className="error">
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit}>

                <label htmlFor="title">
                    Event Title
                </label>

                <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}

                    required
                />

                <label htmlFor="description">
                    Description
                </label>

                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter event description"
                />



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

                <div className="actions">

                    <button type="submit">
                        Edit Event
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(`/events/${eventId}`)}
                    >
                        Cancel
                    </button>


                </div>

            </form>

        </main>
    )
}

export default EditEvent