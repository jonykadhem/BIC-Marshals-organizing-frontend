import { Link } from "react-router"
import { index } from "../services/events"



const EventList = (props) => {
    return (
        <main className="event-list">
            <h1>Events</h1>
            <div className="events-container">

                {props.events.map((event) => {
                    <Link key={event._id} to={`/events/${event._id}`} className="event-card">

                        <h2>{event.title}</h2>

                        <p>{event.description}</p>

                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date(event.date).toLocaleDateString()}
                        </p>

                        <p>
                            <strong>Maximum Marshals</strong>
                            {event.maxMarshals}
                        </p>

                        <span>{event.status}</span>

                    </Link>
                })}
            </div>
        </main>
    )
}

export default EventList