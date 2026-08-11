import { Link } from "react-router"

const EventList = ({events}) => {
    return (
        <main className="event-list">
            <h1>Events</h1>
            <div className="events-container">

                {events.map((event) => (

                    <Link key={event._id} to={`/events/${event._id}`} className="event-card">

                        <h2>{event.title}</h2>

                        <p>{event.description}</p>

                        <p>
                            <strong>Date: </strong>{" "}
                            {new Date(event.eventDate).toLocaleDateString()}
                        </p>

                        <p>
                            <strong>Maximum Marshals: </strong>
                            {event.maxMarshals}
                        </p>

                        <span>{event.status}</span>

                    </Link>
                ))}
            </div>
        </main>
    )
}

export default EventList