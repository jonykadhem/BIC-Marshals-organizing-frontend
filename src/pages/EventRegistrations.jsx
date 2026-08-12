import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import * as registrationService from "../services/registrations"

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
        <main>

            <button onClick={() => navigate(`/events/${eventId}`)}>
                ← Back to Event
            </button>

            <h1>Event Registrations</h1>

            {message && <p>{message}</p>}

            {registrations.length === 0 ? (
                <p>No marshals have registered yet.</p>
            ) : (
                <div>

                    {registrations.map((registration) => (
                        <div
                            key={registration._id}
                            className="registration-card"
                        >

                            <h2>
                                {registration.user.fullName}
                            </h2>

                            <p>
                                <strong>License:</strong>{" "}
                                {registration.user.licenseNo}
                            </p>

                            <p>
                                <strong>Positions:</strong>{" "}
                                {registration.positions.join(", ")}
                            </p>

                            <p>
                                <strong>Status:</strong>{" "}
                                {registration.status}
                            </p>

                            <p>
                                <strong>Assigned Post:</strong>{" "}
                                {registration.assignedPost ||
                                    "Not assigned"}
                            </p>
                            <div>
                                <label >Assign Position</label>
                                <select value={selectedPositions[registration._id] || ""}
                                    onChange={(e) => handlePositionChange(registration._id, e.target.value)}
                                >
                                    <option value="">
                                        Select Position
                                    </option>

                                    {registration.positions.map((position) => (
                                        <option
                                            key={position}
                                            value={position}
                                        >
                                            {position}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Assign Post:</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Sector 4 - Post 12"
                                    value={assignedPosts[registration._id] || ""}
                                    onChange={(e) =>
                                        handlePostChange(
                                            registration._id,
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <button onClick={() => handleAssignPost(registration._id)} >
                                Assign Post
                            </button>

                        </div>
                    ))}

                </div>
            )}

        </main>
    )
}

export default EventRegistrations