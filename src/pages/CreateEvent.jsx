import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import * as eventService from '../services/events'
import "../styles/CreateEvent.css"

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

    return (
    <main className="create-event-page">

        <div className="create-event-container">

            <div className="create-event-header">

                <span className="section-label">
                    EVENT MANAGEMENT
                </span>

                <h1>Create Event</h1>

                <p>
                    Create a new motorsport event and set the
                    registration details for marshals.
                </p>

            </div>


            {message && (
                <p className="create-event-error">
                    {message}
                </p>
            )}


            <form
                className="create-event-form"
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


                <div className="form-actions">

                    <button
                        className="btn btn-primary"
                        type="submit"
                    >
                        Create Event
                    </button>


                    <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => navigate("/events")}
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    </main>
)
}

export default CreateEvent