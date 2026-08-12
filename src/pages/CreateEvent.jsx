import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import * as eventService from '../services/events'

const CreateEvent = (props) => {

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

    const handleChange = (event) => {
        setMessage("")

        setFormData({...formData, [event.target.name]: event.target.value,})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
        props.handleAddEvent(formData)
            setFormData(initalState)
            navigate('/events')
        } catch (error) {
            setMessage(error.message)
        }
    }

    return(
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
                    placeholder="Enter event title"
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
                        Create Event
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/events")}
                    >
                        Cancel
                    </button>


                </div>

            </form>

        </main>
    );
}

export default CreateEvent