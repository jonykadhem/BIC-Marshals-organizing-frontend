import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import * as registrationService from "../services/registrations"
import '../styles/EventRegistrations.css'

const EventRegistrations = () => {

    const { eventId } = useParams()
    const navigate = useNavigate()

    const [registrations, setRegistrations] = useState([])
    const [selectedPositions, setSelectedPositions] = useState({})
    const [assignedPosts, setAssignedPosts] = useState({})
    const [message, setMessage] = useState('')
    

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const data = await registrationService.getEventRegistrations(eventId)

                setRegistrations(data)
            } catch (error) {
                setMessage(error.message)
            }
        }
        fetchRegistrations()
    }, [eventId])

    const handlePositionChange = (registrationId, position) => {
        setSelectedPositions({ ...selectedPositions, [registrationId]: position })
    }

    const handlePostChange = (registrationId, value) => {
        setAssignedPosts({
            ...assignedPosts,
            [registrationId]: value
        })
    }


    const handleAssignPost = async (registrationId) => {
        const position = selectedPositions[registrationId]
        const post = assignedPosts[registrationId]

        if (!position) {
            setMessage("Please select a position.")
            return
        }

        if (!post) {
            setMessage("Please enter the assigned post.")
            return
        }

        try {
            const updatedRegistration =
                await registrationService.assignPost(
                    registrationId,
                    `${position} - ${post}`
                )

            setRegistrations(
                registrations.map((registration) =>
                    registration._id === registrationId
                        ? updatedRegistration
                        : registration
                )
            )

            setMessage("Post assigned successfully.")

        } catch (error) {
            setMessage(error.message)
        }
    }

    return (
    <main className="event-registrations-page">

        <div className="event-registrations-container">

            {/* Back */}
            <button
                className="back-button"
                onClick={() => navigate(`/events/${eventId}`)}
            >
                ← Back to Event
            </button>


            {/* Header */}
            <section className="registrations-header">

                <div>

                    <span className="section-label">
                        EVENT MANAGEMENT
                    </span>

                    <h1>
                        Event Registrations
                    </h1>

                    <p>
                        Review registered marshals and assign
                        their positions and posts.
                    </p>

                </div>

                <div className="registration-count">

                    <span>
                        Registered
                    </span>

                    <strong>
                        {registrations.length}
                    </strong>

                </div>

            </section>


            {/* Message */}
            {message && (
                <div className="registration-message">
                    {message}
                </div>
            )}


            {/* Registrations */}
            {registrations.length === 0 ? (

                <div className="no-registrations">

                    <div className="empty-icon">
                        —
                    </div>

                    <h2>
                        No registrations yet
                    </h2>

                    <p>
                        No marshals have registered for
                        this event yet.
                    </p>

                </div>

            ) : (

                <div className="registrations-list">

                    {registrations.map((registration) => (

                        <article
                            key={registration._id}
                            className="marshal-registration-card"
                        >

                            {/* Marshal Header */}
                            <div className="marshal-header">

                                <div className="marshal-info">

                                    <div className="marshal-avatar">
                                        {registration.user.fullName
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div>

                                        <h2>
                                            {registration.user.fullName}
                                        </h2>

                                        <p>
                                            License:{" "}
                                            {registration.user.licenseNo}
                                        </p>

                                    </div>

                                </div>


                                <span
                                    className={`registration-status registration-status-${registration.status?.toLowerCase()}`}
                                >
                                    {registration.status}
                                </span>

                            </div>


                            {/* Current Registration */}
                            <div className="marshal-details">

                                <div className="marshal-detail">

                                    <span>
                                        Selected Positions
                                    </span>

                                    <strong>
                                        {registration.positions.join(", ")}
                                    </strong>

                                </div>


                                <div className="marshal-detail">

                                    <span>
                                        Assigned Post
                                    </span>

                                    <strong>
                                        {registration.assignedPost ||
                                            "Not assigned"}
                                    </strong>

                                </div>

                            </div>


                            {/* Assignment */}
                            <div className="assignment-section">

                                <div className="assignment-header">

                                    <h3>
                                        Assign Marshal
                                    </h3>

                                    <p>
                                        Select one of their registered
                                        positions and assign a post.
                                    </p>

                                </div>


                                <div className="assignment-form">

                                    <div className="assignment-field">

                                        <label>
                                            Assign Position
                                        </label>

                                        <select
                                            value={
                                                selectedPositions[
                                                    registration._id
                                                ] || ""
                                            }
                                            onChange={(e) =>
                                                handlePositionChange(
                                                    registration._id,
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="">
                                                Select Position
                                            </option>

                                            {registration.positions.map(
                                                (position) => (
                                                    <option
                                                        key={position}
                                                        value={position}
                                                    >
                                                        {position}
                                                    </option>
                                                )
                                            )}

                                        </select>

                                    </div>


                                    <div className="assignment-field">

                                        <label>
                                            Assigned Post
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="e.g. Sector 4 - Post 12"
                                            value={
                                                assignedPosts[
                                                    registration._id
                                                ] || ""
                                            }
                                            onChange={(e) =>
                                                handlePostChange(
                                                    registration._id,
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>


                                    <button
                                        className="btn btn-primary assign-button"
                                        onClick={() =>
                                            handleAssignPost(
                                                registration._id
                                            )
                                        }
                                    >
                                        Assign Post
                                    </button>

                                </div>

                            </div>

                        </article>

                    ))}

                </div>

            )}

        </div>

    </main>
)
}

export default EventRegistrations