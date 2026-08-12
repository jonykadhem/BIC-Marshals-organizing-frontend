import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import * as registrationService from "../services/registrations"

const EventRegistrations = () => {

    const {eventId} = useParams()
    const navigate = useNavigate()

    const [registrations, setRegistrations] = useState([])
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
    },[eventId])

    return(
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

                        </div>
                    ))}

                </div>
            )}

        </main>
    )
}

export default EventRegistrations