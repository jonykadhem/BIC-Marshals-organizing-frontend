import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import * as registrationService from "../services/registrations"


const MyEvents = () => {
    const navigate = useNavigate()

    const [registrations, setRegistrations] = useState([])
    const [message, setMessage] = useState("")

    useEffect(() => {
        const fetchMyEvents = async () => {
            try {
                const data = await registrationService.myRegistration()
                setRegistrations(data)
            } catch (error) {
                setMessage(error.message)
            }
        }
        fetchMyEvents()
    }, [])

    if (message) {
        return <p>{message}</p>
    }

    return (
        <main>

            <h1>My Events</h1>

            {registrations.length === 0 ? (
                <p>You haven't registered for any events yet.</p>
            ) : (
                <div className="my-events">
                    {registrations.map((registration) => (
                        <div className="event-card" key={registration._id}>
                            <h2>{registration.event.title}</h2>

                            <p>
                                <strong>Date:</strong>{" "}
                                {new Date(
                                    registration.event.eventDate
                                ).toLocaleDateString()}
                            </p>

                            <p>
                                <strong>Location:</strong>{" "}
                                {registration.event.location}
                            </p>

                            <p>
                                <strong>My Positions:</strong>{" "}
                                {registration.positions.join(", ")}
                            </p>

                            <p>
                                <strong>Assigned Post:</strong>{" "}
                                {registration.assignedPost ||
                                    "Not assigned yet"}
                            </p>

                            <p>
                                <strong>Status:</strong>{" "}
                                {registration.status}
                            </p>
                            <button
                                onClick={() =>
                                    navigate(
                                        `/events/${registration.event._id}`
                                    )
                                }
                            >
                                View Event
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}

export default MyEvents